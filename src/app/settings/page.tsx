"use client";

import { NavHeader } from "@/components/nav-header";
import { ReminderSettings } from "@/components/reminder-settings";
import { useReadings } from "@/hooks/use-readings";
import { useUserSettings, useUpdateUserSettings } from "@/hooks/use-settings";
import { format } from "date-fns";

export default function SettingsPage() {
  const { data: readings = [] } = useReadings();
  const { data: settings } = useUserSettings();
  const updateSettings = useUpdateUserSettings();

  const exportToCSV = () => {
    if (readings.length === 0) {
      alert("No readings to export");
      return;
    }

    const headers = ["Date", "Systolic", "Diastolic", "Pulse", "Arm", "Position", "Notes"];
    const rows = readings.map((r) => [
      format(new Date(r.measured_at), "yyyy-MM-dd HH:mm"),
      r.systolic,
      r.diastolic,
      r.pulse || "",
      r.arm,
      r.position,
      r.notes || "",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bp-readings-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleToggleGlucoseMonitoring = async () => {
    if (!settings) return;
    
    try {
      await updateSettings.mutateAsync({
        glucose_monitoring_enabled: !settings.glucose_monitoring_enabled,
      });
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  };

  const handleToggleMedicationReminders = async () => {
    if (!settings) return;
    
    try {
      await updateSettings.mutateAsync({
        medication_reminders_enabled: !settings.medication_reminders_enabled,
      });
    } catch (error) {
      console.error("Failed to update settings:", error);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated gradient background */}
      <div className="gradient-bg" />

      <NavHeader />

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 slide-up">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-zinc-400">Manage your account and monitoring preferences</p>
        </div>

        <div className="space-y-6">
          {/* Feature Toggles */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden slide-up stagger-1" style={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-1">Health Monitoring</h3>
              <p className="text-zinc-400 text-sm mb-6">Enable or disable additional health tracking features</p>

              <div className="space-y-4">
                {/* Glucose Monitoring Toggle */}
                <div className="flex items-center justify-between py-3 border-b border-white/5">
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Blood Glucose Monitoring</h4>
                    <p className="text-zinc-400 text-sm">Track your blood sugar levels alongside blood pressure</p>
                  </div>
                  <button
                    onClick={handleToggleGlucoseMonitoring}
                    disabled={updateSettings.isPending}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
                      settings?.glucose_monitoring_enabled 
                        ? 'bg-indigo-600' 
                        : 'bg-zinc-600'
                    } ${updateSettings.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings?.glucose_monitoring_enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Medication Reminders Toggle */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex-1">
                    <h4 className="text-white font-medium">Medication Reminders</h4>
                    <p className="text-zinc-400 text-sm">Get notifications for medication schedules and tracking</p>
                  </div>
                  <button
                    onClick={handleToggleMedicationReminders}
                    disabled={updateSettings.isPending}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
                      settings?.medication_reminders_enabled 
                        ? 'bg-indigo-600' 
                        : 'bg-zinc-600'
                    } ${updateSettings.isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings?.medication_reminders_enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Reminder Settings */}
          <div className="slide-up stagger-2" style={{ opacity: 0 }}>
            <ReminderSettings />
          </div>

          {/* Export Card */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden slide-up stagger-2" style={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Export Data</h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    Download all your blood pressure readings as a CSV file to share with your healthcare provider.
                  </p>
                  <button
                    onClick={exportToCSV}
                    className="btn-primary px-6 py-3"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export to CSV ({readings.length} readings)
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BP Categories Reference */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden slide-up stagger-3" style={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-orange-500/5" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-1">Blood Pressure Categories</h3>
              <p className="text-zinc-400 text-sm mb-6">Based on American Heart Association guidelines</p>

              <div className="space-y-3">
                {[
                  { label: "Normal", range: "Less than 120/80 mmHg", badge: "badge-normal" },
                  { label: "Elevated", range: "120-129 / less than 80 mmHg", badge: "badge-elevated" },
                  { label: "High BP Stage 1", range: "130-139 / 80-89 mmHg", badge: "badge-hypertension-1" },
                  { label: "High BP Stage 2", range: "140+ / 90+ mmHg", badge: "badge-hypertension-2" },
                  { label: "Hypertensive Crisis", range: "Higher than 180/120 mmHg", badge: "badge-crisis" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                  >
                    <span className={`badge ${item.badge}`}>{item.label}</span>
                    <span className="text-zinc-400 text-sm">{item.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Glucose Categories Reference - Only show if glucose monitoring is enabled */}
          {settings?.glucose_monitoring_enabled && (
            <div className="glass rounded-2xl p-6 relative overflow-hidden slide-up stagger-4" style={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-1">Blood Glucose Categories</h3>
                <p className="text-zinc-400 text-sm mb-6">Based on American Diabetes Association guidelines</p>

                <div className="space-y-3">
                  {[
                    { label: "Low", range: "Less than 70 mg/dL", badge: "badge-low", description: "Hypoglycemia" },
                    { label: "Normal (Fasting)", range: "70-99 mg/dL", badge: "badge-normal", description: "Healthy range" },
                    { label: "Normal (Post-meal)", range: "Less than 140 mg/dL", badge: "badge-normal", description: "2 hours after eating" },
                    { label: "Prediabetic (Fasting)", range: "100-125 mg/dL", badge: "badge-prediabetic", description: "Impaired fasting glucose" },
                    { label: "Prediabetic (Post-meal)", range: "140-199 mg/dL", badge: "badge-prediabetic", description: "Impaired glucose tolerance" },
                    { label: "Diabetic", range: "126+ mg/dL (fasting) or 200+ mg/dL (post-meal)", badge: "badge-diabetic", description: "Consult healthcare provider" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`badge ${item.badge}`}>{item.label}</span>
                          <span className="text-zinc-500 text-xs">{item.description}</span>
                        </div>
                        <span className="text-zinc-400 text-sm">{item.range}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PWA Installation Card */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden slide-up stagger-6" style={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5" />
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Install as App</h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    Add WellnessPal to your home screen for better notifications, offline access, and a native app experience.
                  </p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Better notification reliability
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Offline access to your data
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Faster loading and performance
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Native app-like experience
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-blue-300 dark:text-blue-200 text-xs font-medium mb-1">How to Install:</p>
                    <p className="text-blue-600 dark:text-blue-200/70 text-xs leading-relaxed">
                      <strong>iPhone:</strong> Tap Share → Add to Home Screen<br/>
                      <strong>Android:</strong> Tap Menu → Install App or Add to Home Screen
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Card */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden slide-up stagger-5" style={{ opacity: 0 }}>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">WellnessPal</h3>
                  <p className="text-zinc-500 text-sm">Version 1.1.0</p>
                </div>
              </div>

              <p className="text-zinc-400 text-sm mb-4">
                WellnessPal helps you monitor your blood pressure and glucose levels over time. Regular tracking can help
                you and your healthcare provider make informed decisions about your health.
              </p>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-700 dark:text-amber-200 text-sm">
                  <strong>Disclaimer:</strong> This app is for informational purposes only and is not a
                  substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}