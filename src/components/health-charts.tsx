"use client";

import { useState } from "react";
import { BPChart } from "./bp-chart";
import { GlucoseChart } from "./glucose-chart";
import type { Reading, GlucoseReading } from "@/types";

interface HealthChartsProps {
  bpReadings: Reading[];
  glucoseReadings: GlucoseReading[];
  isGlucoseEnabled?: boolean;
}

export function HealthCharts({ bpReadings, glucoseReadings, isGlucoseEnabled }: HealthChartsProps) {
  const [layout, setLayout] = useState<"stacked" | "side-by-side">("stacked");

  // If glucose is not enabled, just show BP chart
  if (!isGlucoseEnabled) {
    return <BPChart readings={bpReadings} />;
  }

  // If no glucose readings yet, show BP chart with option to add glucose
  if (glucoseReadings.length === 0) {
    return (
      <div className="space-y-6">
        <BPChart readings={bpReadings} />
        <div className="glass rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
          <div className="relative text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Glucose Chart Available</h3>
            <p className="text-zinc-400">Add glucose readings to see your glucose trend alongside blood pressure</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Layout Toggle - Only show if both charts have data */}
      {bpReadings.length > 0 && glucoseReadings.length > 0 && (
        <div className="flex justify-end">
          <div className="glass rounded-xl p-1">
            <div className="flex gap-1">
              <button
                onClick={() => setLayout("stacked")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  layout === "stacked"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Stacked
                </span>
              </button>
              <button
                onClick={() => setLayout("side-by-side")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  layout === "side-by-side"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 4h6v16H9V4zM4 8h2v8H4V8zM18 8h2v8h-2V8z" />
                  </svg>
                  Side by Side
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Charts Layout */}
      {layout === "stacked" ? (
        <div className="space-y-6">
          <BPChart readings={bpReadings} />
          <GlucoseChart readings={glucoseReadings} />
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          <BPChart readings={bpReadings} />
          <GlucoseChart readings={glucoseReadings} />
        </div>
      )}
    </div>
  );
}