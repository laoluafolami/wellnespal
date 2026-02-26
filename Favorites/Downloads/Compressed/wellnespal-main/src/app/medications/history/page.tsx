"use client";

import { useState } from "react";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays } from "date-fns";
import { NavHeader } from "@/components/nav-header";
import { useMedicationAdherence } from "@/hooks/use-medications";
import { getAdherenceColor, getAdherenceLabel } from "@/lib/medication-utils";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function MedicationHistoryPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "3months">("week");
  
  const days = timeRange === "week" ? 7 : timeRange === "month" ? 30 : 90;
  const { data: adherenceData = [], isLoading } = useMedicationAdherence(days);

  const getRangeLabel = () => {
    const now = new Date();
    switch (timeRange) {
      case "week":
        return `${format(startOfWeek(now), "MMM d")} - ${format(endOfWeek(now), "MMM d")}`;
      case "month":
        return `${format(startOfMonth(now), "MMM d")} - ${format(endOfMonth(now), "MMM d")}`;
      case "3months":
        return `${format(subDays(now, 90), "MMM d")} - ${format(now, "MMM d")}`;
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="gradient-bg" />
      <NavHeader />

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 slide-up">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Medication History</h1>
            <p className="text-zinc-400">Track your medication adherence over time</p>
          </div>

          {/* Time Range Filter */}
          <div className="flex gap-2">
            {[
              { key: "week", label: "This Week" },
              { key: "month", label: "This Month" },
              { key: "3months", label: "3 Months" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTimeRange(item.key as typeof timeRange)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  timeRange === item.key
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                    : "glass text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Display */}
        <div className="glass rounded-xl p-4 mb-6 slide-up stagger-1" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-2 text-zinc-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{getRangeLabel()}</span>
          </div>
        </div>

        {/* Adherence Summary */}
        {isLoading ? (
          <div className="glass rounded-2xl p-8 text-center mb-6">
            <div className="inline-flex items-center gap-2 text-zinc-400">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading adherence data...
            </div>
          </div>
        ) : adherenceData.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {adherenceData.map((medication: any, index: number) => (
              <div
                key={medication.medication_id}
                className="glass rounded-2xl p-6 relative overflow-hidden slide-up"
                style={{ animationDelay: `${0.1 * index}s`, opacity: 0 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {medication.medication_name}
                    </h3>
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getAdherenceColor(medication.adherence_percentage) }}
                    />
                  </div>

                  <div className="space-y-3">
                    {/* Adherence Percentage */}
                    <div className="text-center">
                      <div
                        className="text-4xl font-bold mb-1"
                        style={{ color: getAdherenceColor(medication.adherence_percentage) }}
                      >
                        {medication.adherence_percentage}%
                      </div>
                      <p className="text-sm text-zinc-400">
                        {getAdherenceLabel(medication.adherence_percentage)} Adherence
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${medication.adherence_percentage}%`,
                          backgroundColor: getAdherenceColor(medication.adherence_percentage),
                        }}
                      />
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-white font-semibold">
                          {medication.total_taken}
                        </div>
                        <div className="text-zinc-500">Taken</div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold">
                          {medication.total_scheduled}
                        </div>
                        <div className="text-zinc-500">Scheduled</div>
                      </div>
                    </div>

                    {/* Missed Doses */}
                    {medication.total_scheduled - medication.total_taken > 0 && (
                      <div className="text-center pt-2 border-t border-white/10">
                        <div className="text-red-400 font-semibold">
                          {medication.total_scheduled - medication.total_taken}
                        </div>
                        <div className="text-zinc-500 text-xs">Missed/Skipped</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No medication data</h3>
            <p className="text-zinc-500">
              Start tracking medications to see your adherence history
            </p>
          </div>
        )}

        {/* Overall Summary */}
        {adherenceData.length > 0 && (
          <div className="glass rounded-2xl p-6 slide-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <h3 className="text-lg font-semibold text-white mb-4">Overall Summary</h3>
            
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {adherenceData.reduce((sum: number, med: any) => sum + med.total_scheduled, 0)}
                </div>
                <div className="text-zinc-400 text-sm">Total Scheduled</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {adherenceData.reduce((sum: number, med: any) => sum + med.total_taken, 0)}
                </div>
                <div className="text-zinc-400 text-sm">Doses Taken</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">
                  {adherenceData.reduce((sum: number, med: any) => sum + (med.total_scheduled - med.total_taken), 0)}
                </div>
                <div className="text-zinc-400 text-sm">Missed/Skipped</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-400 mb-1">
                  {adherenceData.length > 0 
                    ? Math.round(
                        adherenceData.reduce((sum: number, med: any) => sum + med.adherence_percentage, 0) / 
                        adherenceData.length
                      )
                    : 0}%
                </div>
                <div className="text-zinc-400 text-sm">Avg Adherence</div>
              </div>
            </div>
          </div>
        )}

        {/* Tips for Better Adherence */}
        <div className="glass rounded-2xl p-6 mt-6 slide-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tips for Better Adherence
          </h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                Set consistent times for taking medications
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                Use this app to track and get reminders
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                Keep medications in visible locations
              </li>
            </ul>
            
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                Use pill organizers for complex schedules
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                Link medication times to daily routines
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400 mt-1">•</span>
                Share your adherence data with your doctor
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}