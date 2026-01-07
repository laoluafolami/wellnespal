"use client";

import { useRouter } from "next/navigation";
import { NavHeader } from "@/components/nav-header";
import { AddReadingTabs } from "@/components/add-reading-tabs";
import { useCreateReading } from "@/hooks/use-readings";
import { useCreateGlucoseReading } from "@/hooks/use-glucose-readings";
import { useUserSettings } from "@/hooks/use-settings";
import type { ReadingFormData, GlucoseReadingFormData } from "@/lib/validations";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function NewReadingPage() {
  const router = useRouter();
  const createReading = useCreateReading();
  const createGlucoseReading = useCreateGlucoseReading();
  const { data: settings } = useUserSettings();

  const isGlucoseEnabled = settings?.glucose_monitoring_enabled;

  const handleBPSubmit = async (data: ReadingFormData) => {
    await createReading.mutateAsync(data);
    router.push("/dashboard");
  };

  const handleGlucoseSubmit = async (data: GlucoseReadingFormData) => {
    await createGlucoseReading.mutateAsync(data);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated gradient background */}
      <div className="gradient-bg" />

      <NavHeader />

      <main className="relative z-10 max-w-md mx-auto px-4 py-8">
        <div className="mb-8 slide-up">
          <h1 className="text-3xl font-bold text-white mb-2">Add Reading</h1>
          <p className="text-zinc-400">
            Record a new {isGlucoseEnabled ? 'health' : 'blood pressure'} measurement
          </p>
        </div>

        <div className="slide-up stagger-1" style={{ opacity: 0 }}>
          <AddReadingTabs
            onBPSubmit={handleBPSubmit}
            onGlucoseSubmit={handleGlucoseSubmit}
            isBPLoading={createReading.isPending}
            isGlucoseLoading={createGlucoseReading.isPending}
            isGlucoseEnabled={isGlucoseEnabled}
          />
        </div>

        {/* Tips Cards */}
        <div className="space-y-4 mt-6">
          {/* BP Tips Card */}
          <div className="glass rounded-2xl p-6 slide-up stagger-2" style={{ opacity: 0 }}>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Blood Pressure Tips
            </h3>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                Rest for 5 minutes before measuring
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                Sit with your back supported and feet flat
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                Don&apos;t talk during the measurement
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                Measure at the same time each day
              </li>
            </ul>
          </div>

          {/* Glucose Tips Card - Only show if glucose monitoring is enabled */}
          {isGlucoseEnabled && (
            <div className="glass rounded-2xl p-6 slide-up stagger-3" style={{ opacity: 0 }}>
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                Blood Glucose Tips
              </h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  Wash hands before testing
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  Use the side of your fingertip
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  Test at consistent times daily
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  Record what you ate and when
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">•</span>
                  Fasting: 8+ hours without food
                </li>
              </ul>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
