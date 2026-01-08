"use client";

import { useState, useEffect } from "react";
import { isAfter, isBefore, addMinutes } from "date-fns";
import { useMedicationSchedule } from "@/hooks/use-medications";
import { useUserSettings } from "@/hooks/use-settings";
import { getNotificationManager } from "@/lib/notification-utils";
import { formatTime } from "@/lib/medication-utils";

interface ReminderNotificationsProps {
  onMedicationClick?: (medicationId: string) => void;
  onBPReadingClick?: () => void;
  onGlucoseReadingClick?: () => void;
}

interface Reminder {
  id: string;
  type: 'medication' | 'bp_reading' | 'glucose_reading';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  action: () => void;
  color: string;
}

export function ReminderNotifications({
  onMedicationClick,
  onBPReadingClick,
  onGlucoseReadingClick,
}: ReminderNotificationsProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dismissedReminders, setDismissedReminders] = useState<Set<string>>(new Set());
  const { data: todaySchedule = [] } = useMedicationSchedule();
  const { data: settings } = useUserSettings();

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Get upcoming and overdue items
  const now = currentTime;
  const upcomingWindow = addMinutes(now, 15); // 15 minutes ahead

  const overdueItems = todaySchedule.filter(item => {
    const scheduledTime = new Date(item.scheduled_time);
    return (
      isBefore(scheduledTime, now) &&
      item.status === 'pending' &&
      !dismissedReminders.has(`medication-${item.medication_id}-${item.scheduled_time}`)
    );
  });

  const upcomingItems = todaySchedule.filter(item => {
    const scheduledTime = new Date(item.scheduled_time);
    return (
      isAfter(scheduledTime, now) &&
      isBefore(scheduledTime, upcomingWindow) &&
      item.status === 'pending' &&
      !dismissedReminders.has(`medication-${item.medication_id}-${item.scheduled_time}`)
    );
  });

  // Check for reading reminders
  const shouldShowBPReminder = () => {
    if (!settings?.bp_reminder_enabled) return false;
    
    const bpTimes = settings.bp_reminder_times || [];
    return bpTimes.some(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const reminderTime = new Date();
      reminderTime.setHours(hours, minutes, 0, 0);
      
      const timeDiff = Math.abs(now.getTime() - reminderTime.getTime());
      return timeDiff <= 15 * 60 * 1000; // Within 15 minutes
    });
  };

  const shouldShowGlucoseReminder = () => {
    if (!settings?.glucose_monitoring_enabled || !settings?.glucose_reminder_enabled) return false;
    
    const glucoseTimes = settings.glucose_reminder_times || [];
    return glucoseTimes.some(time => {
      const [hours, minutes] = time.split(':').map(Number);
      const reminderTime = new Date();
      reminderTime.setHours(hours, minutes, 0, 0);
      
      const timeDiff = Math.abs(now.getTime() - reminderTime.getTime());
      return timeDiff <= 15 * 60 * 1000; // Within 15 minutes
    });
  };

  const dismissReminder = (id: string) => {
    setDismissedReminders(prev => new Set([...prev, id]));
  };

  const handleMedicationReminder = (item: any) => {
    dismissReminder(`medication-${item.medication_id}-${item.scheduled_time}`);
    onMedicationClick?.(item.medication_id);
  };

  const handleBPReminder = () => {
    dismissReminder('bp-reminder');
    onBPReadingClick?.();
  };

  const handleGlucoseReminder = () => {
    dismissReminder('glucose-reminder');
    onGlucoseReadingClick?.();
  };

  // Send browser notifications for overdue items
  useEffect(() => {
    if (!settings?.browser_notifications_enabled) return;

    overdueItems.forEach(item => {
      // Check if sound and vibration are enabled in settings
      const soundEnabled = settings?.sound_alerts_enabled ?? true;
      const vibrationEnabled = settings?.vibration_enabled ?? true;
      
      if (soundEnabled || vibrationEnabled) {
        getNotificationManager().sendMedicationReminder(
          item.medication_name,
          item.dosage
        );
      }
    });
  }, [overdueItems.length, settings?.browser_notifications_enabled, settings?.sound_alerts_enabled, settings?.vibration_enabled]);

  const allReminders: Reminder[] = [
    ...overdueItems.map(item => ({
      id: `medication-${item.medication_id}-${item.scheduled_time}`,
      type: 'medication' as const,
      priority: 'high' as const,
      title: `Overdue: ${item.medication_name}`,
      message: `${item.dosage} was due at ${formatTime(new Date(item.scheduled_time).toTimeString().slice(0, 5))}`,
      action: () => handleMedicationReminder(item),
      color: item.color,
    })),
    ...upcomingItems.map(item => ({
      id: `medication-${item.medication_id}-${item.scheduled_time}`,
      type: 'medication' as const,
      priority: 'medium' as const,
      title: `Upcoming: ${item.medication_name}`,
      message: `${item.dosage} due at ${formatTime(new Date(item.scheduled_time).toTimeString().slice(0, 5))}`,
      action: () => handleMedicationReminder(item),
      color: item.color,
    })),
  ];

  // Add reading reminders
  if (shouldShowBPReminder() && !dismissedReminders.has('bp-reminder')) {
    allReminders.push({
      id: 'bp-reminder',
      type: 'bp_reading' as const,
      priority: 'medium' as const,
      title: 'Blood Pressure Reading',
      message: 'Time for your scheduled BP check',
      action: handleBPReminder,
      color: '#6366f1',
    });
  }

  if (shouldShowGlucoseReminder() && !dismissedReminders.has('glucose-reminder')) {
    allReminders.push({
      id: 'glucose-reminder',
      type: 'glucose_reading' as const,
      priority: 'medium' as const,
      title: 'Glucose Reading',
      message: 'Time for your scheduled glucose check',
      action: handleGlucoseReminder,
      color: '#10b981',
    });
  }

  if (allReminders.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[999] space-y-2 max-w-sm">
      {allReminders.map((reminder) => (
        <div
          key={reminder.id}
          className={`glass rounded-xl p-4 border-l-4 animate-slide-in-right ${
            reminder.priority === 'high' 
              ? 'border-red-500 bg-red-500/10' 
              : 'border-indigo-500 bg-indigo-500/10'
          }`}
          style={{ borderLeftColor: reminder.color }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
              style={{ backgroundColor: reminder.color }}
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-medium text-white text-sm truncate">
                  {reminder.title}
                </h4>
                {reminder.priority === 'high' && (
                  <span className="text-red-400 text-xs">OVERDUE</span>
                )}
              </div>
              <p className="text-zinc-400 text-xs mb-3">
                {reminder.message}
              </p>
              
              <div className="flex gap-2">
                <button
                  onClick={reminder.action}
                  className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  {reminder.type === 'medication' ? 'Mark Taken' : 'Record'}
                </button>
                <button
                  onClick={() => dismissReminder(reminder.id)}
                  className="text-xs px-3 py-1 text-zinc-400 hover:text-white transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>

            <button
              onClick={() => dismissReminder(reminder.id)}
              className="text-zinc-400 hover:text-white transition-colors p-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// CSS for slide-in animation (add to globals.css)
export const reminderAnimationCSS = `
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  animation: slide-in-right 0.3s ease-out;
}
`;