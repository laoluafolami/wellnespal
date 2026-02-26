# Blood Glucose Monitoring Feature

## Overview
Added comprehensive blood glucose monitoring to complement the existing blood pressure tracking functionality.

## Features Added

### 1. Database Schema
- **glucose_readings** table for storing glucose measurements
- **user_settings** table for feature toggles
- Proper RLS policies and indexes
- Migration file: `supabase/migrations/002_add_glucose_monitoring.sql`

### 2. Settings Toggle
- Users can enable/disable glucose monitoring in Settings
- Feature is disabled by default
- Only shows glucose UI when enabled

### 3. Glucose Tracking Components
- **GlucoseForm**: Form for adding glucose readings
- **GlucoseReadingCard**: Display component for glucose readings
- Real-time classification based on ADA guidelines

### 4. Glucose Categories
Based on American Diabetes Association guidelines:
- **Low**: < 70 mg/dL (Hypoglycemia)
- **Normal**: 70-99 mg/dL (fasting), < 140 mg/dL (post-meal)
- **Prediabetic**: 100-125 mg/dL (fasting), 140-199 mg/dL (post-meal)
- **Diabetic**: ≥ 126 mg/dL (fasting), ≥ 200 mg/dL (post-meal)

### 5. Measurement Types
- Fasting
- Pre-meal
- Post-meal (2 hours)
- Bedtime
- Random

### 6. Dashboard Integration
- Glucose stats cards (when enabled)
- Glucose form alongside BP form
- Recent glucose readings section
- Updated total readings counter

### 7. Enhanced Settings Page
- Feature toggle with smooth animation
- Glucose categories reference (when enabled)
- Updated app branding to "Health Tracker"

## Usage

1. **Enable Feature**: Go to Settings → Health Monitoring → Toggle "Blood Glucose Monitoring"
2. **Add Readings**: Use the glucose form on the dashboard
3. **View Data**: See glucose stats and recent readings on dashboard
4. **Categories**: Automatic classification based on measurement type and value

## Technical Implementation

### New Files Created:
- `src/lib/glucose-utils.ts` - Glucose classification logic
- `src/hooks/use-glucose-readings.ts` - Glucose data management
- `src/hooks/use-settings.ts` - User settings management
- `src/components/glucose-form.tsx` - Glucose input form
- `src/components/glucose-reading-card.tsx` - Glucose display card
- `supabase/migrations/002_add_glucose_monitoring.sql` - Database schema

### Files Modified:
- `src/types/database.ts` - Added glucose and settings types
- `src/types/index.ts` - Added glucose category types
- `src/lib/validations.ts` - Added glucose form validation
- `src/app/dashboard/page.tsx` - Integrated glucose monitoring
- `src/app/settings/page.tsx` - Added feature toggle
- `src/app/globals.css` - Added glucose badge styles

## Database Migration

Run the migration in your Supabase SQL Editor:
```sql
-- Copy and paste the contents of supabase/migrations/002_add_glucose_monitoring.sql
```

## Benefits

1. **Comprehensive Health Tracking**: Monitor both BP and glucose
2. **Medical Guidelines**: Based on AHA and ADA standards
3. **User Control**: Optional feature activation
4. **Seamless Integration**: Maintains existing BP functionality
5. **Scalable Architecture**: Easy to add more health metrics

## Future Enhancements

- Glucose trends and charts
- HbA1c tracking
- Medication correlation
- Export glucose data
- Glucose alerts and reminders