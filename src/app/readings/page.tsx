"use client";

import { useState } from "react";
import { NavHeader } from "@/components/nav-header";
import { BPReadingCard } from "@/components/bp-reading-card";
import { GlucoseReadingCard } from "@/components/glucose-reading-card";
import { useReadings, useDeleteReading } from "@/hooks/use-readings";
import { useGlucoseReadings, useDeleteGlucoseReading } from "@/hooks/use-glucose-readings";
import { useUserSettings } from "@/hooks/use-settings";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function ReadingsPage() {
  const { data: readings = [], isLoading: isBPLoading } = useReadings();
  const { data: glucoseReadings = [], isLoading: isGlucoseLoading } = useGlucoseReadings();
  const { data: settings } = useUserSettings();
  const deleteReading = useDeleteReading();
  const deleteGlucoseReading = useDeleteGlucoseReading();
  const [filter, setFilter] = useState<"all" | "week" | "month">("all");
  const [readingType, setReadingType] = useState<"all" | "bp" | "glucose">("all");

  const isGlucoseEnabled = settings?.glucose_monitoring_enabled;

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

  // Filter readings by time
  const filterByTime = (date: string) => {
    if (filter === "all") return true;
    const readingDate = new Date(date);
    const now = new Date();
    if (filter === "week") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return readingDate >= weekAgo;
    }
    if (filter === "month") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return readingDate >= monthAgo;
    }
    return true;
  };

  // Filter and combine readings
  const filteredBPReadings = readings.filter((reading) => filterByTime(reading.measured_at));
  const filteredGlucoseReadings = isGlucoseEnabled 
    ? glucoseReadings.filter((reading) => filterByTime(reading.measured_at))
    : [];

  // Combine and sort all readings by date
  const allReadings = [
    ...filteredBPReadings.map(r => ({ ...r, type: 'bp' as const })),
    ...filteredGlucoseReadings.map(r => ({ ...r, type: 'glucose' as const }))
  ].sort((a, b) => new Date(b.measured_at).getTime() - new Date(a.measured_at).getTime());

  // Filter by reading type
  const displayReadings = readingType === "all" 
    ? allReadings
    : allReadings.filter(r => r.type === readingType);

  const isLoading = isBPLoading || (isGlucoseEnabled && isGlucoseLoading);

  return (
    <div className="min-h-screen relative">
      {/* Animated gradient background */}
      <div className="gradient-bg" />

      <NavHeader />

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 slide-up">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Reading History</h1>
            <p className="text-zinc-400">
              View and manage all your {isGlucoseEnabled ? 'health' : 'blood pressure'} readings
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-col sm:flex-row gap-2">
            {/* Reading Type Filter - Only show if glucose is enabled */}
            {isGlucoseEnabled && (
              <div className="flex gap-2">
                {[
                  { key: "all", label: "All Readings" },
                  { key: "bp", label: "Blood Pressure" },
                  { key: "glucose", label: "Glucose" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setReadingType(item.key as typeof readingType)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      readingType === item.key
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                        : "glass text-zinc-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            {/* Time Filter */}
            <div className="flex gap-2">
              {[
                { key: "all", label: "All Time" },
                { key: "month", label: "This Month" },
                { key: "week", label: "This Week" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key as typeof filter)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    filter === item.key
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "glass text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* BP Stats */}
          <div className="glass rounded-2xl p-4 slide-up stagger-1" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">{filteredBPReadings.length} BP readings</p>
                  <p className="text-zinc-500 text-sm">
                    {filter === "all" ? "All time" : filter === "week" ? "Past 7 days" : "Past 30 days"}
                  </p>
                </div>
              </div>
              {filteredBPReadings.length > 0 && (
                <div className="text-right">
                  <p className="text-zinc-400 text-sm">Average</p>
                  <p className="text-white font-bold bp-number">
                    {Math.round(filteredBPReadings.reduce((a, r) => a + r.systolic, 0) / filteredBPReadings.length)}/
                    {Math.round(filteredBPReadings.reduce((a, r) => a + r.diastolic, 0) / filteredBPReadings.length)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Glucose Stats - Only show if enabled */}
          {isGlucoseEnabled && (
            <div className="glass rounded-2xl p-4 slide-up stagger-2" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold">{filteredGlucoseReadings.length} glucose readings</p>
                    <p className="text-zinc-500 text-sm">
                      {filter === "all" ? "All time" : filter === "week" ? "Past 7 days" : "Past 30 days"}
                    </p>
                  </div>
                </div>
                {filteredGlucoseReadings.length > 0 && (
                  <div className="text-right">
                    <p className="text-zinc-400 text-sm">Average</p>
                    <p className="text-white font-bold bp-number">
                      {Math.round(filteredGlucoseReadings.reduce((a, r) => a + r.glucose_value, 0) / filteredGlucoseReadings.length)} mg/dL
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Total Stats */}
          <div className={`glass rounded-2xl p-4 slide-up ${isGlucoseEnabled ? 'stagger-3' : 'stagger-2'}`} style={{ opacity: 0 }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">{displayReadings.length} total readings</p>
                  <p className="text-zinc-500 text-sm">
                    {readingType === "all" ? "All types" : readingType === "bp" ? "Blood pressure" : "Glucose"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Readings Grid */}
        {isLoading ? (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="inline-flex items-center gap-2 text-zinc-400">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading readings...
            </div>
          </div>
        ) : displayReadings.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {displayReadings.map((reading, index) => (
              <div
                key={`${reading.type}-${reading.id}`}
                className="slide-up"
                style={{ animationDelay: `${0.05 * Math.min(index, 10)}s`, opacity: 0 }}
              >
                {reading.type === 'bp' ? (
                  <BPReadingCard reading={reading} onDelete={handleDelete} />
                ) : (
                  <GlucoseReadingCard reading={reading} onDelete={handleGlucoseDelete} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {filter === "all" ? "No readings yet" : `No readings ${filter === "week" ? "this week" : "this month"}`}
            </h3>
            <p className="text-zinc-500">
              {filter === "all"
                ? `Start tracking your ${isGlucoseEnabled ? 'health metrics' : 'blood pressure'} to see your history`
                : "Try selecting a different time period or reading type"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
