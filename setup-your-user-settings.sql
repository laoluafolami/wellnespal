-- Setup settings for your specific user ID: 3b24d55c-0daa-437d-9e94-c634da7d2344
-- Run this in your Supabase SQL Editor

INSERT INTO user_settings (
  user_id,
  glucose_monitoring_enabled,
  medication_reminders_enabled,
  bp_reminder_enabled,
  bp_reminder_frequency,
  bp_reminder_times,
  glucose_reminder_enabled,
  glucose_reminder_frequency,
  glucose_reminder_times,
  browser_notifications_enabled,
  email_reminders_enabled,
  sound_alerts_enabled,
  vibration_enabled,
  reminder_lead_time
) VALUES (
  '3b24d55c-0daa-437d-9e94-c634da7d2344',
  false,
  true,
  true,
  'daily',
  ARRAY['09:00', '21:00'],
  true,
  'daily',
  ARRAY['08:00', '12:00', '18:00'],
  false,
  false,
  true,
  true,
  5
) ON CONFLICT (user_id) DO UPDATE SET
  bp_reminder_enabled = true,
  sound_alerts_enabled = true,
  vibration_enabled = true,
  glucose_reminder_enabled = true,
  reminder_lead_time = 5,
  updated_at = NOW();

-- Verify the settings were created
SELECT * FROM user_settings WHERE user_id = '3b24d55c-0daa-437d-9e94-c634da7d2344';