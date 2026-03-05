"use client";

import { useState } from "react";
import { BPForm } from "./bp-form";
import { GlucoseForm } from "./glucose-form";
import type { ReadingFormData, GlucoseReadingFormData } from "@/lib/validations";

interface AddReadingTabsProps {
  onBPSubmit: (data: ReadingFormData) => Promise<void>;
  onGlucoseSubmit: (data: GlucoseReadingFormData) => Promise<void>;
  isBPLoading?: boolean;
  isGlucoseLoading?: boolean;
  isGlucoseEnabled?: boolean;
}

export function AddReadingTabs({
  onBPSubmit,
  onGlucoseSubmit,
  isBPLoading,
  isGlucoseLoading,
  isGlucoseEnabled,
}: AddReadingTabsProps) {
  const [activeTab, setActiveTab] = useState<"bp" | "glucose">("bp");

  // If glucose is not enabled, just show BP form without tabs
  if (!isGlucoseEnabled) {
    return <BPForm onSubmit={onBPSubmit} isLoading={isBPLoading} />;
  }

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="glass rounded-xl p-1">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("bp")}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "bp"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Blood Pressure
            </span>
          </button>
          <button
            onClick={() => setActiveTab("glucose")}
            className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === "glucose"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                : "text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              Blood Glucose
            </span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "bp" ? (
          <BPForm onSubmit={onBPSubmit} isLoading={isBPLoading} />
        ) : (
          <GlucoseForm onSubmit={onGlucoseSubmit} isLoading={isGlucoseLoading} />
        )}
      </div>
    </div>
  );
}