"use client";

import { useRouter } from "next/navigation";
import { NavHeader } from "@/components/nav-header";
import { BPForm } from "@/components/bp-form";
import { useCreateReading } from "@/hooks/use-readings";
import type { ReadingFormData } from "@/lib/validations";

export default function NewReadingPage() {
  const router = useRouter();
  const createReading = useCreateReading();

  const handleSubmit = async (data: ReadingFormData) => {
    await createReading.mutateAsync(data);
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
          <p className="text-zinc-400">Record a new blood pressure measurement</p>
        </div>

        <div className="slide-up stagger-1" style={{ opacity: 0 }}>
          <BPForm onSubmit={handleSubmit} isLoading={createReading.isPending} />
        </div>

        {/* Tips Card */}
        <div className="glass rounded-2xl p-6 mt-6 slide-up stagger-2" style={{ opacity: 0 }}>
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tips for accurate readings
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
      </main>
    </div>
  );
}
