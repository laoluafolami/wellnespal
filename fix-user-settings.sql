-- Fix existing users who don't have complete reminder settings
-- Run this in your Supabase SQL Editor to update existing users

-- Update existing user_settings to add missing reminder fields with defaults
UPDATE user_settings 
SET 
  bp_reminder_enabled = COALESCE(bp_reminder_enabled, true),
  bp_reminder_frequency = COALESCE(bp_reminder_frequency, 'daily'),
  bp_reminder_times = COALESCE(bp_reminder_times, ARRAY['09:00', '21:00']),
  glucose_reminder_enabled = COALESCE(glucose_reminder_enabled, true),
  glucose_reminder_frequency = COALESCE(glucose_reminder_frequency, 'daily'),
  glucose_reminder_times = COALESCE(glucose_reminder_times, ARRAY['08:00', '12:00', '18:00']),
  browser_notifications_enabled = COALESCE(browser_notifications_enabled, false),
  email_reminders_enabled = COALESCE(email_reminders_enabled, false),
  sound_alerts_enabled = COALESCE(sound_alerts_enabled, true),
  vibration_enabled = COALESCE(vibration_enabled, true),
  reminder_lead_time = COALESCE(reminder_lead_time, 5),
  updated_at = NOW()
WHERE 
  bp_reminder_enabled IS NULL 
  OR bp_reminder_times IS NULL 
  OR glucose_reminder_enabled IS NULL 
  OR browser_notifications_enabled IS NULL 
  OR sound_alerts_enabled IS NULL 
  OR vibration_enabled IS NULL;

-- Verify the update
SELECT 
  user_id,
  glucose_monitoring_enabled,
  medication_reminders_enabled,
  bp_reminder_enabled,
  glucose_reminder_enabled,
  browser_notifications_enabled,
  sound_alerts_enabled,
  vibration_enabled
FROM user_settings 
ORDER BY created_at DESC 
LIMIT 5;