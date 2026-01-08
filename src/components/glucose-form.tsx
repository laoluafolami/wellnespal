"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { classifyGlucose } from "@/lib/glucose-utils";
import { glucoseReadingSchema, type GlucoseReadingFormData } from "@/lib/validations";

interface GlucoseFormProps {
  onSubmit: (data: GlucoseReadingFormData) => Promise<void>;
  isLoading?: boolean;
}

function getCurrentDateTime() {
  const now = new Date();
  return format(now, "yyyy-MM-dd'T'HH:mm");
}

export function GlucoseForm({ onSubmit, isLoading }: GlucoseFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<GlucoseReadingFormData>({
    resolver: zodResolver(glucoseReadingSchema),
    defaultValues: {
      measurement_type: "random",
      measured_at: getCurrentDateTime(),
    },
  });

  const glucoseValue = watch("glucose_value");
  const measurementType = watch("measurement_type");

  const handleFormSubmit = async (data: GlucoseReadingFormData) => {
    await onSubmit(data);
    reset({
      measurement_type: "random",
      measured_at: getCurrentDateTime(),
    });
  };

  const category = glucoseValue > 0 && measurementType 
    ? classifyGlucose(glucoseValue, measurementType) 
    : null;

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />

      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-6">Add Glucose Reading</h3>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Glucose Value Input */}
          <div className="space-y-2">
            <label htmlFor="glucose_value" className="block text-sm font-medium text-zinc-400">
              Glucose Level (mg/dL)
            </label>
            <input
              id="glucose_value"
              type="number"
              step="0.1"
              placeholder="100"
              className={`input-modern text-center text-xl font-bold ${errors.glucose_value ? 'border-red-500/50' : ''}`}
              {...register("glucose_value", { valueAsNumber: true })}
            />
            {errors.glucose_value && (
              <p className="text-xs text-red-400">{errors.glucose_value.message}</p>
            )}
          </div>

          {/* Measurement Type */}
          <div className="space-y-2">
            <label htmlFor="measurement_type" className="block text-sm font-medium text-zinc-400">
              Measurement Type
            </label>
            <select 
              id="measurement_type" 
              className={`input-modern ${errors.measurement_type ? 'border-red-500/50' : ''}`}
              {...register("measurement_type")}
            >
              <option value="fasting">Fasting</option>
              <option value="pre_meal">Pre-Meal</option>
              <option value="post_meal">Post-Meal (2 hours)</option>
              <option value="bedtime">Bedtime</option>
              <option value="random">Random</option>
            </select>
            {errors.measurement_type && (
              <p className="text-xs text-red-400">{errors.measurement_type.message}</p>
            )}
          </div>

          {/* Classification Preview */}
          {category && (
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              category.category === 'normal' ? 'bg-green-500/10 border-green-500/20' :
              category.category === 'low' ? 'bg-red-500/10 border-red-500/20' :
              category.category === 'prediabetic' ? 'bg-yellow-500/10 border-yellow-500/20' :
              'bg-red-500/10 border-red-500/20'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`badge badge-${category.category}`}>{category.label}</span>
                <span className="text-sm text-zinc-400">{category.description}</span>
              </div>
            </div>
          )}

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

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-zinc-400">
              Notes (optional)
            </label>
            <input
              id="notes"
              placeholder="Before breakfast, after exercise..."
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