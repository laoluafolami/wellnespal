"use client";

import { useState, useEffect } from "react";
import { useUserSettings, useUpdateUserSettings } from "@/hooks/use-settings";
import { setupNotificationPermission, canSendNotifications } from "@/lib/notification-utils";

export function ReminderSettings() {
  const { data: settings } = useUserSettings();
  const updateSettings = useUpdateUserSettings();
  const [browserPermission, setBrowserPermission] = useState(false);

  useEffect(() => {
    setBrowserPermission(canSendNotifications());
  }, []);

  const handleNumericUpdate = async (field: string, value: number) => {
    try {
      await updateSettings.mutateAsync({ [field]: value });
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const handleToggle = async (field: string, value: boolean) => {
    try {
      await updateSettings.mutateAsync({ [field]: value });
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const handleTimesUpdate = async (field: string, times: string[]) => {
    try {
      await updateSettings.mutateAsync({ [field]: times });
    } catch (error) {
      console.error(`Failed to update ${field}:`, error);
    }
  };

  const requestNotificationPermission = async () => {
    const granted = await setupNotificationPermission();
    setBrowserPermission(granted);
    if (granted) {
      handleToggle('browser_notifications_enabled', true);
    }
  };

  const addTime = (field: string, currentTimes: string[]) => {
    const newTimes = [...currentTimes, '09:00'];
    handleTimesUpdate(field, newTimes);
  };

  const removeTime = (field: string, currentTimes: string[], index: number) => {
    const newTimes = currentTimes.filter((_, i) => i !== index);
    handleTimesUpdate(field, newTimes);
  };

  const updateTime = (field: string, currentTimes: string[], index: number, newTime: string) => {
    const newTimes = [...currentTimes];
    newTimes[index] = newTime;
    handleTimesUpdate(field, newTimes);
  };

  if (!settings) return null;

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
      
      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-1">Reminder Settings</h3>
        <p className="text-zinc-400 text-sm mb-6">Configure when and how you want to be reminded</p>

        <div className="space-y-6">
          {/* Browser Notifications */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Notification Methods</h4>
            
            <div className="flex items-center justify-between py-3 border-b border-white/5">
              <div className="flex-1">
                <h5 className="text-white font-medium">Browser Notifications</h5>
                <p className="text-zinc-400 text-sm">Get popup notifications even when the app is closed</p>
              </div>
              {browserPermission ? (
                <button
                  onClick={() => handleToggle('browser_notifications_enabled', !settings.browser_notifications_enabled)}
                  disabled={updateSettings.isPending}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.browser_notifications_enabled ? 'bg-indigo-600' : 'bg-zinc-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.browser_notifications_enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              ) : (
                <button
                  onClick={requestNotificationPermission}
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  Enable
                </button>
              )}
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex-1">
                <h5 className="text-white font-medium">Email Reminders</h5>
                <p className="text-zinc-400 text-sm">Daily summary and missed reminder emails</p>
              </div>
              <button
                onClick={() => handleToggle('email_reminders_enabled', !settings.email_reminders_enabled)}
                disabled={updateSettings.isPending}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.email_reminders_enabled ? 'bg-indigo-600' : 'bg-zinc-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.email_reminders_enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Phone Alarm Features */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="text-white font-medium mb-1">Phone Alarm Features</h5>
                  <p className="text-purple-700 dark:text-purple-200/80 text-sm">
                    Enhanced mobile notifications with sound and vibration
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h6 className="text-white text-sm font-medium">Sound Alerts</h6>
                    <p className="text-purple-600 dark:text-purple-200/70 text-xs">Play notification sounds</p>
                  </div>
                  <button
                    onClick={() => handleToggle('sound_alerts_enabled', !settings.sound_alerts_enabled)}
                    disabled={updateSettings.isPending}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      settings.sound_alerts_enabled ? 'bg-purple-600' : 'bg-zinc-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        settings.sound_alerts_enabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h6 className="text-white text-sm font-medium">Vibration</h6>
                    <p className="text-purple-600 dark:text-purple-200/70 text-xs">Vibrate phone for reminders</p>
                  </div>
                  <button
                    onClick={() => handleToggle('vibration_enabled', !settings.vibration_enabled)}
                    disabled={updateSettings.isPending}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      settings.vibration_enabled ? 'bg-purple-600' : 'bg-zinc-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        settings.vibration_enabled ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Info about limitations */}
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-blue-300 dark:text-blue-200 text-xs font-medium mb-1">Phone Alarm Limitations</p>
                    <p className="text-blue-600 dark:text-blue-200/70 text-xs leading-relaxed">
                      Web apps can&apos;t set true system alarms. For critical reminders, consider setting manual phone alarms or adding the app to your home screen for better notifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blood Pressure Reminders */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">Blood Pressure Reminders</h4>
              <button
                onClick={() => handleToggle('bp_reminder_enabled', !settings.bp_reminder_enabled)}
                disabled={updateSettings.isPending}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.bp_reminder_enabled ? 'bg-indigo-600' : 'bg-zinc-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.bp_reminder_enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {settings.bp_reminder_enabled && (
              <div className="space-y-3 pl-4 border-l-2 border-indigo-500/30">
                <div className="flex items-center justify-between">
                  <label className="text-zinc-400 text-sm">Reminder Times</label>
                  <button
                    onClick={() => addTime('bp_reminder_times', settings.bp_reminder_times || [])}
                    className="text-indigo-400 hover:text-indigo-300 text-sm"
                  >
                    + Add Time
                  </button>
                </div>
                
                <div className="space-y-2">
                  {(settings.bp_reminder_times || []).map((time, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => updateTime('bp_reminder_times', settings.bp_reminder_times || [], index, e.target.value)}
                        className="input-modern flex-1"
                      />
                      {(settings.bp_reminder_times || []).length > 1 && (
                        <button
                          onClick={() => removeTime('bp_reminder_times', settings.bp_reminder_times || [], index)}
                          className="p-2 text-red-400 hover:text-red-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Glucose Reminders */}
          {settings.glucose_monitoring_enabled && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-medium">Glucose Reminders</h4>
                <button
                  onClick={() => handleToggle('glucose_reminder_enabled', !settings.glucose_reminder_enabled)}
                  disabled={updateSettings.isPending}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.glucose_reminder_enabled ? 'bg-emerald-600' : 'bg-zinc-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.glucose_reminder_enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {settings.glucose_reminder_enabled && (
                <div className="space-y-3 pl-4 border-l-2 border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <label className="text-zinc-400 text-sm">Reminder Times</label>
                    <button
                      onClick={() => addTime('glucose_reminder_times', settings.glucose_reminder_times || [])}
                      className="text-emerald-400 hover:text-emerald-300 text-sm"
                    >
                      + Add Time
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {(settings.glucose_reminder_times || []).map((time, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="time"
                          value={time}
                          onChange={(e) => updateTime('glucose_reminder_times', settings.glucose_reminder_times || [], index, e.target.value)}
                          className="input-modern flex-1"
                        />
                        {(settings.glucose_reminder_times || []).length > 1 && (
                          <button
                            onClick={() => removeTime('glucose_reminder_times', settings.glucose_reminder_times || [], index)}
                            className="p-2 text-red-400 hover:text-red-300"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Advanced Settings */}
          <div className="space-y-4">
            <h4 className="text-white font-medium">Advanced Settings</h4>
            
            {/* Reminder Lead Time Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-white font-medium">Reminder Lead Time</h5>
                    <select
                      value={settings.reminder_lead_time || 5}
                      onChange={(e) => handleNumericUpdate('reminder_lead_time', parseInt(e.target.value))}
                      className="input-modern w-24 text-sm"
                    >
                      <option value={0}>0 min</option>
                      <option value={5}>5 min</option>
                      <option value={10}>10 min</option>
                      <option value={15}>15 min</option>
                      <option value={30}>30 min</option>
                    </select>
                  </div>
                  <p className="text-amber-700 dark:text-amber-200/80 text-sm leading-relaxed">
                    Get notified this many minutes before your scheduled medication times and reading reminders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}