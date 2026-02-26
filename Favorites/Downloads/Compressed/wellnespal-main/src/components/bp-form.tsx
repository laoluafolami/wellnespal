"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { classifyBP } from "@/lib/bp-utils";
import { readingSchema, type ReadingFormData } from "@/lib/validations";

interface BPFormProps {
  onSubmit: (data: ReadingFormData) => Promise<void>;
  isLoading?: boolean;
}

// Get current datetime in local format for input default
function getCurrentDateTime() {
  const now = new Date();
  return format(now, "yyyy-MM-dd'T'HH:mm");
}

export function BPForm({ onSubmit, isLoading }: BPFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReadingFormData>({
    resolver: zodResolver(readingSchema),
    defaultValues: {
      arm: "left",
      position: "sitting",
      measured_at: getCurrentDateTime(),
    },
  });

  const systolic = watch("systolic");
  const diastolic = watch("diastolic");

  const handleFormSubmit = async (data: ReadingFormData) => {
    await onSubmit(data);
    reset({
      arm: "left",
      position: "sitting",
      measured_at: getCurrentDateTime(),
    });
  };

  const category = systolic > 0 && diastolic > 0 ? classifyBP(systolic, diastolic) : null;

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-6">Add Reading</h3>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* BP Input Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="systolic" className="block text-sm font-medium text-zinc-400">
                Systolic
              </label>
              <input
                id="systolic"
                type="number"
                placeholder="120"
                className={`input-modern text-center text-xl font-bold ${errors.systolic ? 'border-red-500/50' : ''}`}
                {...register("systolic", { valueAsNumber: true })}
              />
              {errors.systolic && (
                <p className="text-xs text-red-400">{errors.systolic.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="diastolic" className="block text-sm font-medium text-zinc-400">
                Diastolic
              </label>
              <input
                id="diastolic"
                type="number"
                placeholder="80"
                className={`input-modern text-center text-xl font-bold ${errors.diastolic ? 'border-red-500/50' : ''}`}
                {...register("diastolic", { valueAsNumber: true })}
              />
              {errors.diastolic && (
                <p className="text-xs text-red-400">{errors.diastolic.message}</p>
              )}
            </div>
          </div>

          {/* Classification Preview */}
          {category && (
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              category.category === 'normal' ? 'bg-green-500/10 border-green-500/20' :
              category.category === 'elevated' ? 'bg-yellow-500/10 border-yellow-500/20' :
              category.category === 'hypertension-1' ? 'bg-orange-500/10 border-orange-500/20' :
              'bg-red-500/10 border-red-500/20'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`badge badge-${category.category}`}>{category.label}</span>
                <span className="text-sm text-zinc-400">{category.description}</span>
              </div>
            </div>
          )}

          {/* Pulse */}
          <div className="space-y-2">
            <label htmlFor="pulse" className="block text-sm font-medium text-zinc-400">
              Pulse (optional)
            </label>
            <input
              id="pulse"
              type="number"
              placeholder="72 bpm"
              className={`input-modern ${errors.pulse ? 'border-red-500/50' : ''}`}
              {...register("pulse", { valueAsNumber: true })}
            />
          </div>

          {/* Date & Time */}
          <div className="space-y-2">
            <label htmlFor="measured_at" className="block text-sm font-medium text-zinc-400">
              Date & Time
            </label>
            <div className="relative">
              <input
                id="measured_at"
                type="datetime-local"
                className={`input-modern ${errors.measured_at ? 'border-red-500/50' : ''}`}
                {...register("measured_at")}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            {errors.measured_at && (
              <p className="text-xs text-red-400">{errors.measured_at.message}</p>
            )}
          </div>

          {/* Arm & Position */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="arm" className="block text-sm font-medium text-zinc-400">
                Arm
              </label>
              <select id="arm" className="input-modern" {...register("arm")}>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="position" className="block text-sm font-medium text-zinc-400">
                Position
              </label>
              <select id="position" className="input-modern" {...register("position")}>
                <option value="sitting">Sitting</option>
                <option value="standing">Standing</option>
                <option value="lying">Lying</option>
              </select>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-zinc-400">
              Notes (optional)
            </label>
            <input
              id="notes"
              placeholder="After exercise, stressed..."
              className="input-modern"
              {...register("notes")}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Save Reading
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
