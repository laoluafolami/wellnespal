-- Add medication management tables
-- Run this in your Supabase SQL Editor

-- Medications Table
CREATE TABLE IF NOT EXISTS medications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  dosage TEXT NOT NULL, -- e.g., "10mg", "2 tablets"
  frequency TEXT NOT NULL CHECK (frequency IN ('once_daily', 'twice_daily', 'three_times_daily', 'four_times_daily', 'as_needed', 'custom')),
  times TEXT[] NOT NULL, -- Array of times like ['08:00', '20:00']
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE, -- NULL for ongoing medications
  notes TEXT,
  color TEXT DEFAULT '#6366f1', -- For UI color coding
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Medication Logs Table (for tracking actual doses taken)
CREATE TABLE IF NOT EXISTS medication_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  medication_id UUID REFERENCES medications(id) ON DELETE CASCADE NOT NULL,
  scheduled_time TIMESTAMPTZ NOT NULL, -- When it was supposed to be taken
  taken_at TIMESTAMPTZ, -- When it was actually taken (NULL if missed)
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'taken', 'missed', 'skipped')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Update user_settings to include medication reminders toggle
ALTER TABLE user_settings 
ADD COLUMN IF NOT EXISTS medication_reminders_enabled BOOLEAN NOT NULL DEFAULT true;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS medications_user_id_idx ON medications(user_id);
CREATE INDEX IF NOT EXISTS medications_active_idx ON medications(is_active);
CREATE INDEX IF NOT EXISTS medication_logs_user_id_idx ON medication_logs(user_id);
CREATE INDEX IF NOT EXISTS medication_logs_medication_id_idx ON medication_logs(medication_id);
CREATE INDEX IF NOT EXISTS medication_logs_scheduled_time_idx ON medication_logs(scheduled_time);
CREATE INDEX IF NOT EXISTS medication_logs_status_idx ON medication_logs(status);

-- Enable Row Level Security
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE medication_logs ENABLE ROW LEVEL SECURITY;

-- Medications Policies
CREATE POLICY "Users can view their own medications"
  ON medications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own medications"
  ON medications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medications"
  ON medications FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medications"
  ON medications FOR DELETE
  USING (auth.uid() = user_id);

-- Medication Logs Policies
CREATE POLICY "Users can view their own medication logs"
  ON medication_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own medication logs"
  ON medication_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medication logs"
  ON medication_logs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medication logs"
  ON medication_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Function to generate medication schedule for a given date range
CREATE OR REPLACE FUNCTION generate_medication_schedule(
  p_user_id UUID,
  p_start_date DATE DEFAULT CURRENT_DATE,
  p_end_date DATE DEFAULT CURRENT_DATE + INTERVAL '7 days'
)
RETURNS TABLE (
  medication_id UUID,
  medication_name TEXT,
  dosage TEXT,
  scheduled_time TIMESTAMPTZ,
  color TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    m.name,
    m.dosage,
    (p_start_date + (t.time_str || ':00')::TIME)::TIMESTAMPTZ as scheduled_time,
    m.color
  FROM medications m
  CROSS JOIN UNNEST(m.times) AS t(time_str)
  WHERE m.user_id = p_user_id
    AND m.is_active = true
    AND (m.end_date IS NULL OR m.end_date >= p_start_date)
    AND m.start_date <= p_end_date
  ORDER BY scheduled_time;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get medication adherence stats
CREATE OR REPLACE FUNCTION get_medication_adherence(
  p_user_id UUID,
  p_days INTEGER DEFAULT 7
)
RETURNS TABLE (
  medication_id UUID,
  medication_name TEXT,
  total_scheduled INTEGER,
  total_taken INTEGER,
  adherence_percentage NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    m.name,
    COUNT(ml.id)::INTEGER as total_scheduled,
    COUNT(CASE WHEN ml.status = 'taken' THEN 1 END)::INTEGER as total_taken,
    CASE 
      WHEN COUNT(ml.id) > 0 
      THEN ROUND((COUNT(CASE WHEN ml.status = 'taken' THEN 1 END)::NUMERIC / COUNT(ml.id)::NUMERIC) * 100, 1)
      ELSE 0
    END as adherence_percentage
  FROM medications m
  LEFT JOIN medication_logs ml ON m.id = ml.medication_id 
    AND ml.scheduled_time >= (CURRENT_DATE - INTERVAL '1 day' * p_days)
  WHERE m.user_id = p_user_id
    AND m.is_active = true
  GROUP BY m.id, m.name
  ORDER BY m.name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;