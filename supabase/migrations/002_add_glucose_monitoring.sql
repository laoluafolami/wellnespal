-- Add glucose readings table and user settings
-- Run this in your Supabase SQL Editor

-- User Settings Table for feature toggles
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  glucose_monitoring_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Glucose Readings Table
CREATE TABLE IF NOT EXISTS glucose_readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  glucose_value DECIMAL(5,1) NOT NULL CHECK (glucose_value >= 20 AND glucose_value <= 600),
  measurement_type TEXT NOT NULL CHECK (measurement_type IN ('fasting', 'post_meal', 'random', 'bedtime', 'pre_meal')),
  measured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS user_settings_user_id_idx ON user_settings(user_id);
CREATE INDEX IF NOT EXISTS glucose_readings_user_id_idx ON glucose_readings(user_id);
CREATE INDEX IF NOT EXISTS glucose_readings_measured_at_idx ON glucose_readings(measured_at DESC);

-- Enable Row Level Security
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE glucose_readings ENABLE ROW LEVEL SECURITY;

-- User Settings Policies
CREATE POLICY "Users can view their own settings"
  ON user_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own settings"
  ON user_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own settings"
  ON user_settings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Glucose Readings Policies
CREATE POLICY "Users can view their own glucose readings"
  ON glucose_readings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own glucose readings"
  ON glucose_readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own glucose readings"
  ON glucose_readings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own glucose readings"
  ON glucose_readings FOR DELETE
  USING (auth.uid() = user_id);

-- Function to automatically create user settings on first access
CREATE OR REPLACE FUNCTION get_or_create_user_settings(user_uuid UUID)
RETURNS user_settings AS $$
DECLARE
  settings user_settings;
BEGIN
  SELECT * INTO settings FROM user_settings WHERE user_id = user_uuid;
  
  IF NOT FOUND THEN
    INSERT INTO user_settings (user_id) VALUES (user_uuid) RETURNING * INTO settings;
  END IF;
  
  RETURN settings;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;