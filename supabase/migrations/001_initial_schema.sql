-- Blood Pressure Readings Table
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  systolic INTEGER NOT NULL CHECK (systolic >= 60 AND systolic <= 250),
  diastolic INTEGER NOT NULL CHECK (diastolic >= 40 AND diastolic <= 150),
  pulse INTEGER CHECK (pulse >= 30 AND pulse <= 220),
  measured_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  arm TEXT NOT NULL DEFAULT 'left' CHECK (arm IN ('left', 'right')),
  position TEXT NOT NULL DEFAULT 'sitting' CHECK (position IN ('sitting', 'standing', 'lying')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries by user
CREATE INDEX IF NOT EXISTS readings_user_id_idx ON readings(user_id);
CREATE INDEX IF NOT EXISTS readings_measured_at_idx ON readings(measured_at DESC);

-- Enable Row Level Security
ALTER TABLE readings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own readings
CREATE POLICY "Users can view their own readings"
  ON readings FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own readings
CREATE POLICY "Users can insert their own readings"
  ON readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own readings
CREATE POLICY "Users can update their own readings"
  ON readings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own readings
CREATE POLICY "Users can delete their own readings"
  ON readings FOR DELETE
  USING (auth.uid() = user_id);
