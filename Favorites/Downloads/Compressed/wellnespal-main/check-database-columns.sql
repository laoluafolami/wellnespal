-- Check if the reminder system columns exist in user_settings table
-- Run this in your Supabase SQL Editor first

SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'user_settings' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- If you don't see the reminder columns (bp_reminder_enabled, sound_alerts_enabled, etc.)
-- then you need to run the migration first.

-- Also check if there are any existing user_settings records
SELECT COUNT(*) as total_users, 
       COUNT(bp_reminder_enabled) as users_with_bp_reminders,
       COUNT(sound_alerts_enabled) as users_with_sound_alerts
FROM user_settings;