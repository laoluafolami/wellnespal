"use client";

import { NavHeader } from "@/components/nav-header";
import { BPReadingCard } from "@/components/bp-reading-card";
import { GlucoseReadingCard } from "@/components/glucose-reading-card";
import { AddReadingTabs } from "@/components/add-reading-tabs";
import { HealthCharts } from "@/components/health-charts";
import { MedicationSchedule } from "@/components/medication-schedule";
import { ClientOnly } from "@/components/client-only";
import { ReminderNotifications } from "@/components/reminder-notifications";
import { useReadings, useCreateReading, useDeleteReading } from "@/hooks/use-readings";
import { useGlucoseReadings, useCreateGlucoseReading, useDeleteGlucoseReading } from "@/hooks/use-glucose-readings";
import { useUserSettings } from "@/hooks/use-settings";
import { classifyBP } from "@/lib/bp-utils";
import { classifyGlucose } from "@/lib/glucose-utils";
import type { ReadingFormData, GlucoseReadingFormData } from "@/lib/validations";

export function DashboardClient() {
  const { data: readings = [], isLoading } = useReadings();
  const { data: glucoseReadings = [] } = useGlucoseReadings();
  const { data: settings, isLoading: settingsLoading } = useUserSettings();
  const createReading = useCreateReading();
  const deleteReading = useDeleteReading();
  const createGlucoseReading = useCreateGlucoseReading();
  const deleteGlucoseReading = useDeleteGlucoseReading();

  const handleSubmit = async (data: ReadingFormData) => {
    await createReading.mutateAsync(data);
  };

  const handleGlucoseSubmit = async (data: GlucoseReadingFormData) => {
    await createGlucoseReading.mutateAsync(data);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this reading?")) {
      deleteReading.mutate(id);
    }
  };

  const handleGlucoseDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this glucose reading?")) {
      deleteGlucoseReading.mutate(id);
    }
  };

  // Calculate BP stats
  const recentReadings = readings.slice(0, 6);
  const latestReading = readings[0];
  const avgSystolic =
    readings.length > 0
      ? Math.round(readings.reduce((acc, r) => acc + r.systolic, 0) / readings.length)
      : 0;
  const avgDiastolic =
    readings.length > 0
      ? Math.round(readings.reduce((acc, r) => acc + r.diastolic, 0) / readings.length)
      : 0;

  const latestCategory = latestReading
    ? classifyBP(latestReading.systolic, latestReading.diastolic)
    : null;

  // Calculate Glucose stats
  const recentGlucoseReadings = glucoseReadings.slice(0, 6);
  const latestGlucoseReading = glucoseReadings[0];
  const avgGlucose =
    glucoseReadings.length > 0
      ? Math.round(glucoseReadings.reduce((acc, r) => acc + r.glucose_value, 0) / glucoseReadings.length)
      : 0;

  const latestGlucoseCategory = latestGlucoseReading
    ? classifyGlucose(latestGlucoseReading.glucose_value, latestGlucoseReading.measurement_type as any)
    : null;

  const isGlucoseEnabled = settings?.glucose_monitoring_enabled;
  const isMedicationEnabled = settings?.medication_reminders_enabled;

  // Show loading state while settings are being fetched
  if (settingsLoading) {
    return (
      <div className="min-h-screen relative">
        <div className="gradient-bg" />
        <NavHeader />
        <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="glass rounded-2xl p-8 text-center">
              <div className="inline-flex items-center gap-2 text-zinc-400">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading your health dashboard...
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Animated gradient background */}
      <div className="gradient-bg" />

      <NavHeader />

      {/* Floating Reminder Notifications */}
      <ClientOnly>
        <ReminderNotifications 
          onMedicationClick={(medicationId: string) => {
            // Could scroll to medication schedule or open medication details
            console.log('Medication reminder clicked:', medicationId);
          }}
          onBPReadingClick={() => {
            // Could scroll to BP form or open reading modal
            console.log('BP reminder clicked');
          }}
          onGlucoseReadingClick={() => {
            // Could scroll to glucose form or open reading modal
            console.log('Glucose reminder clicked');
          }}
        />
      </ClientOnly>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 slide-up">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-zinc-400">
            Track and monitor your {isGlucoseEnabled ? 'blood pressure and glucose' : 'blood pressure'} health
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`grid gap-4 mb-8 ${
          isGlucoseEnabled 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5' 
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
        }`}>
          {/* Latest BP Reading Card */}
          <div className="glass glass-hover rounded-2xl p-6 stat-card slide-up stagger-1" style={{ opacity: 0 }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-zinc-500 text-sm font-medium">Latest BP</p>
              </div>
              {latestCategory && (
                <span className={`badge badge-${latestCategory.category}`}>
                  {latestCategory.label}
                </span>
              )}
            </div>
            {latestReading ? (
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white bp-number">{latestReading.systolic}</span>
                  <span className="text-2xl font-bold text-zinc-500">/</span>
                  <span className="text-4xl font-bold text-white bp-number">{latestReading.diastolic}</span>
                  <span className="text-zinc-500 ml-2 text-sm">mmHg</span>
                </div>
                {latestReading.pulse && (
                  <p className="text-zinc-500 text-sm mt-2">
                    <span className="inline-flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {latestReading.pulse} bpm
                    </span>
                  </p>
                )}
              </div>
            ) : (
              <div className="text-4xl font-bold text-zinc-600">--/--</div>
            )}
          </div>

          {/* Average BP Card */}
          <div className="glass glass-hover rounded-2xl p-6 stat-card slide-up stagger-2" style={{ opacity: 0 }}>
            <div className="mb-4">
              <p className="text-zinc-500 text-sm font-medium">Average BP</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white bp-number">
                {readings.length > 0 ? avgSystolic : "--"}
              </span>
              <span className="text-2xl font-bold text-zinc-500">/</span>
              <span className="text-4xl font-bold text-white bp-number">
                {readings.length > 0 ? avgDiastolic : "--"}
              </span>
              <span className="text-zinc-500 ml-2 text-sm">mmHg</span>
            </div>
            <p className="text-zinc-600 text-sm mt-2">
              Based on {readings.length} readings
            </p>
          </div>

          {/* Glucose Stats - Only show if enabled */}
          {isGlucoseEnabled && (
            <>
              {/* Latest Glucose Reading */}
              <div className="glass glass-hover rounded-2xl p-6 stat-card slide-up stagger-3" style={{ opacity: 0 }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-zinc-500 text-sm font-medium">Latest Glucose</p>
                  </div>
                  {latestGlucoseCategory && (
                    <span className={`badge badge-${latestGlucoseCategory.category}`}>
                      {latestGlucoseCategory.label}
                    </span>
                  )}
                </div>
                {latestGlucoseReading ? (
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-white bp-number">{latestGlucoseReading.glucose_value}</span>
                      <span className="text-zinc-500 ml-2 text-sm">mg/dL</span>
                    </div>
                    <p className="text-zinc-500 text-sm mt-2 capitalize">
                      {latestGlucoseReading.measurement_type.replace('_', ' ')}
                    </p>
                  </div>
                ) : (
                  <div className="text-4xl font-bold text-zinc-600">--</div>
                )}
              </div>

              {/* Average Glucose */}
              <div className="glass glass-hover rounded-2xl p-6 stat-card slide-up stagger-4" style={{ opacity: 0 }}>
                <div className="mb-4">
                  <p className="text-zinc-500 text-sm font-medium">Avg Glucose</p>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white bp-number">
                    {glucoseReadings.length > 0 ? avgGlucose : "--"}
                  </span>
                  <span className="text-zinc-500 ml-2 text-sm">mg/dL</span>
                </div>
                <p className="text-zinc-600 text-sm mt-2">
                  Based on {glucoseReadings.length} readings
                </p>
              </div>
            </>
          )}

          {/* Total Readings Card */}
          <div className={`glass glass-hover rounded-2xl p-6 stat-card slide-up ${isGlucoseEnabled ? 'stagger-5' : 'stagger-3'}`} style={{ opacity: 0 }}>
            <div className="mb-4">
              <p className="text-zinc-500 text-sm font-medium">Total Readings</p>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold gradient-text bp-number">
                {readings.length + (isGlucoseEnabled ? glucoseReadings.length : 0)}
              </span>
              <span className="text-zinc-500 text-sm">recorded</span>
            </div>
            <p className="text-zinc-600 text-sm mt-2">
              Keep tracking for better insights
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="space-y-6 xl:grid xl:gap-6 xl:grid-cols-3 xl:space-y-0">
          {/* Charts - Takes 2 columns on desktop, full width on mobile */}
          <div className="xl:col-span-2 space-y-6 slide-up stagger-6" style={{ opacity: 0 }}>
            <HealthCharts 
              bpReadings={readings} 
              glucoseReadings={glucoseReadings}
              isGlucoseEnabled={isGlucoseEnabled}
            />
            
            {/* Medication Schedule - Only show if enabled */}
            {isMedicationEnabled && (
              <MedicationSchedule />
            )}
          </div>

          {/* Combined Add Reading Form - Full width on mobile, sidebar on desktop */}
          <div className="slide-up stagger-7 add-reading-form" style={{ opacity: 0 }}>
            <AddReadingTabs
              onBPSubmit={handleSubmit}
              onGlucoseSubmit={handleGlucoseSubmit}
              isBPLoading={createReading.isPending}
              isGlucoseLoading={createGlucoseReading.isPending}
              isGlucoseEnabled={isGlucoseEnabled}
            />
          </div>
        </div>

        {/* Recent Readings */}
        <div className="mt-8 slide-up" style={{ animationDelay: '0.9s', opacity: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent BP Readings</h2>
            {readings.length > 6 && (
              <a href="/readings" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                View all
              </a>
            )}
          </div>

          {isLoading ? (
            <div className="glass rounded-2xl p-8 text-center">
              <div className="inline-flex items-center gap-2 text-zinc-400">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Loading readings...
              </div>
            </div>
          ) : recentReadings.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recentReadings.map((reading, index) => (
                <div key={reading.id} className="fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                  <BPReadingCard reading={reading} onDelete={handleDelete} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No readings yet</h3>
              <p className="text-zinc-500 mb-4">Add your first blood pressure reading to get started</p>
            </div>
          )}
        </div>

        {/* Recent Glucose Readings - Only show if enabled */}
        {isGlucoseEnabled && (
          <div className="mt-8 slide-up" style={{ animationDelay: '1.0s', opacity: 0 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Recent Glucose Readings</h2>
            </div>

            {recentGlucoseReadings.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recentGlucoseReadings.map((reading, index) => (
                  <div key={reading.id} className="fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                    <GlucoseReadingCard reading={reading} onDelete={handleGlucoseDelete} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">No glucose readings yet</h3>
                <p className="text-zinc-500 mb-4">Add your first glucose reading to get started</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}