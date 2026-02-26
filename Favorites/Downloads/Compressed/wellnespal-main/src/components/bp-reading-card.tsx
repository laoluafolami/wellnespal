"use client";

import { format } from "date-fns";
import { classifyBP } from "@/lib/bp-utils";
import type { Reading } from "@/types";

interface BPReadingCardProps {
  reading: Reading;
  onDelete?: (id: string) => void;
}

export function BPReadingCard({ reading, onDelete }: BPReadingCardProps) {
  const category = classifyBP(reading.systolic, reading.diastolic);

  return (
    <div className="glass glass-hover rounded-2xl p-5 relative overflow-hidden group">
      {/* Top gradient accent */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        category.category === 'normal' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
        category.category === 'elevated' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
        category.category === 'hypertension-1' ? 'bg-gradient-to-r from-orange-500 to-red-500' :
        'bg-gradient-to-r from-red-500 to-rose-500'
      }`} />

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white bp-number">{reading.systolic}</span>
          <span className="text-xl font-bold text-zinc-500">/</span>
          <span className="text-3xl font-bold text-white bp-number">{reading.diastolic}</span>
          <span className="text-zinc-500 ml-1 text-sm">mmHg</span>
        </div>
        <span className={`badge badge-${category.category}`}>
          {category.label}
        </span>
      </div>

      <div className="space-y-2">
        {reading.pulse && (
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {reading.pulse} bpm
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {format(new Date(reading.measured_at), "MMM d, yyyy 'at' h:mm a")}
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-600">
          <span className="capitalize">{reading.arm} arm</span>
          <span className="w-1 h-1 rounded-full bg-zinc-700" />
          <span className="capitalize">{reading.position}</span>
        </div>

        {reading.notes && (
          <p className="text-sm text-zinc-400 pt-2 border-t border-white/5 mt-2">
            {reading.notes}
          </p>
        )}
      </div>

      {/* Delete button - shows on hover */}
      {onDelete && (
        <button
          onClick={() => onDelete(reading.id)}
          className="absolute top-4 right-4 p-2 rounded-lg bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </div>
  );
}
