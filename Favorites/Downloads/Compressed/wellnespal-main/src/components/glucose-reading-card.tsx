"use client";

import { format } from "date-fns";
import { classifyGlucose, getMeasurementTypeLabel } from "@/lib/glucose-utils";
import type { GlucoseReading } from "@/types";

interface GlucoseReadingCardProps {
  reading: GlucoseReading;
  onDelete: (id: string) => void;
}

export function GlucoseReadingCard({ reading, onDelete }: GlucoseReadingCardProps) {
  const category = classifyGlucose(reading.glucose_value, reading.measurement_type as any);
  const measurementLabel = getMeasurementTypeLabel(reading.measurement_type as any);

  return (
    <div className="glass glass-hover rounded-xl p-4 relative group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold text-white">
              {reading.glucose_value}
            </span>
            <span className="text-sm text-zinc-500">mg/dL</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`badge badge-${category.category} text-xs`}>
              {category.label}
            </span>
            <span className="text-xs text-zinc-500">
              {measurementLabel}
            </span>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(reading.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-500/20 rounded-lg"
          title="Delete reading"
        >
          <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {format(new Date(reading.measured_at), "MMM d, h:mm a")}
        </div>

        {reading.notes && (
          <p className="text-xs text-zinc-400 bg-white/5 rounded-lg p-2">
            {reading.notes}
          </p>
        )}
      </div>
    </div>
  );
}