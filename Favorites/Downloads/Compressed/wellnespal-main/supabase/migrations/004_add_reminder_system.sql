-- Add comprehensive reminder system
-- Run this in your Supabase SQL Editor

-- Update user_settings to include reminder preferences
ALTER TABLE user_settings 
ADD COLUMN IF NOT EXISTS bp_reminder_enabled BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS bp_reminder_frequency TEXT DEFAULT 'daily' CHECK (bp_reminder_frequency IN ('daily', 'twice_daily', 'weekly', 'custom')),
ADD COLUMN IF NOT EXISTS bp_reminder_times TEXT[] DEFAULT ARRAY['09:00', '21:00'],
ADD COLUMN IF NOT EXISTS glucose_reminder_enabled BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS glucose_reminder_frequency TEXT DEFAULT 'daily' CHECK (glucose_reminder_frequency IN ('daily', 'twice_daily', 'before_meals', 'custom')),
ADD COLUMN IF NOT EXISTS glucose_reminder_times TEXT[] DEFAULT ARRAY['08:00', '12:00', '18:00'],
ADD COLUMN IF NOT EXISTS browser_notifications_enabled BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS email_reminders_enabled BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS sound_alerts_enabled BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS vibration_enabled BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN IF NOT EXISTS reminder_lead_time INTEGER DEFAULT 5; -- minutes before scheduled time

-- Reminders Table for tracking sent reminders
CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('medication', 'bp_reading', 'glucose_reading')),
  reference_id UUID, -- medication_id for medication reminders, null for readings
  scheduled_time TIMESTAMPTZ NOT NULL,
  sent_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  method TEXT NOT NULL CHECK (method IN ('browser', 'email', 'in_app')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'acknowledged', 'expired')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Reading Reminders Table for custom reading schedules
CREATE TABLE IF NOT EXISTS reading_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('bp_reading', 'glucose_reading')),
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'twice_daily', 'weekly', 'custom')),
  times TEXT[] NOT NULL,
  days_of_week INTEGER[] DEFAULT ARRAY[1,2,3,4,5,6,7], -- 1=Monday, 7=Sunday
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS reminders_user_id_idx ON reminders(user_id);
CREATE INDEX IF NOT EXISTS reminders_scheduled_time_idx ON reminders(scheduled_time);
CREATE INDEX IF NOT EXISTS reminders_status_idx ON reminders(status);
CREATE INDEX IF NOT EXISTS reading_reminders_user_id_idx ON reading_reminders(user_id);

-- Enable RLS
ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_reminders ENABLE ROW LEVEL SECURITY;

-- Reminders Policies
CREATE POLICY "Users can view their own reminders"
  ON reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reminders"
  ON reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders"
  ON reminders FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Reading Reminders Policies
CREATE POLICY "Users can view their own reading reminders"
  ON reading_reminders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reading reminders"
  ON reading_reminders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reading reminders"
  ON reading_reminders FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reading reminders"
  ON reading_reminders FOR DELETE
  USING (auth.uid() = user_id);

-- Function to generate upcoming reminders
CREATE OR REPLACE FUNCTION generate_upcoming_reminders(
  p_user_id UUID,
  p_start_date TIMESTAMPTZ DEFAULT NOW(),
  p_end_date TIMESTAMPTZ DEFAULT NOW() + INTERVAL '24 hours'
)
RETURNS TABLE (
  reminder_type TEXT,
  reference_id UUID,
  scheduled_time TIMESTAMPTZ,
  title TEXT,
  message TEXT,
  priority INTEGER
) AS $$
BEGIN
  -- Medication reminders
  RETURN QUERY
  SELECT 
    'medication'::TEXT as reminder_type,
    m.id as reference_id,
    (DATE(p_start_date) + t.time_str::TIME)::TIMESTAMPTZ as scheduled_time,
    ('Take ' || m.name)::TEXT as title,
    ('Time to take ' || m.dosage || ' of ' || m.name)::TEXT as message,
    1 as priority
  FROM medications m
  CROSS JOIN UNNEST(m.times) AS t(time_str)
  WHERE m.user_id = p_user_id
    AND m.is_active = true
    AND (m.end_date IS NULL OR m.end_date >= DATE(p_start_date))
    AND m.start_date <= DATE(p_end_date)
    AND (DATE(p_start_date) + t.time_str::TIME)::TIMESTAMPTZ BETWEEN p_start_date AND p_end_date;

  -- BP Reading reminders
  RETURN QUERY
  SELECT 
    'bp_reading'::TEXT as reminder_type,
    NULL::UUID as reference_id,
    (DATE(p_start_date) + t.time_str::TIME)::TIMESTAMPTZ as scheduled_time,
    'Blood Pressure Reading'::TEXT as title,
    'Time to take your blood pressure reading'::TEXT as message,
    2 as priority
  FROM user_settings us
  CROSS JOIN UNNEST(us.bp_reminder_times) AS t(time_str)
  WHERE us.user_id = p_user_id
    AND us.bp_reminder_enabled = true
    AND (DATE(p_start_date) + t.time_str::TIME)::TIMESTAMPTZ BETWEEN p_start_date AND p_end_date;

  -- Glucose Reading reminders
  RETURN QUERY
  SELECT 
    'glucose_reading'::TEXT as reminder_type,
    NULL::UUID as reference_id,
    (DATE(p_start_date) + t.time_str::TIME)::TIMESTAMPTZ as scheduled_time,
    'Blood Glucose Reading'::TEXT as title,
    'Time to check your blood glucose level'::TEXT as message,
    2 as priority
  FROM user_settings us
  CROSS JOIN UNNEST(us.glucose_reminder_times) AS t(time_str)
  WHERE us.user_id = p_user_id
    AND us.glucose_monitoring_enabled = true
    AND us.glucose_reminder_enabled = true
    AND (DATE(p_start_date) + t.time_str::TIME)::TIMESTAMPTZ BETWEEN p_start_date AND p_end_date;

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark reminder as acknowledged
CREATE OR REPLACE FUNCTION acknowledge_reminder(p_reminder_id UUID, p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  UPDATE reminders 
  SET 
    acknowledged_at = NOW(),
    status = 'acknowledged'
  WHERE id = p_reminder_id 
    AND user_id = p_user_id 
    AND status = 'sent';
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;