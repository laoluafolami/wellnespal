"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { getDefaultTimes, getNextMedicationColor, getMedicationColors } from "@/lib/medication-utils";
import { medicationSchema, type MedicationFormData } from "@/lib/validations";
import type { Medication } from "@/types";

interface MedicationFormProps {
  onSubmit: (data: MedicationFormData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
  medication?: Medication;
  existingColors?: string[];
}

function getCurrentDate() {
  return format(new Date(), "yyyy-MM-dd");
}

export function MedicationForm({ 
  onSubmit, 
  onCancel, 
  isLoading, 
  medication,
  existingColors = []
}: MedicationFormProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<string>(medication?.frequency || "once_daily");
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<MedicationFormData>({
    resolver: zodResolver(medicationSchema),
    defaultValues: {
      name: medication?.name || "",
      dosage: medication?.dosage || "",
      frequency: medication?.frequency as any || "once_daily",
      times: medication?.times || getDefaultTimes("once_daily"),
      start_date: medication?.start_date || getCurrentDate(),
      end_date: medication?.end_date || null,
      notes: medication?.notes || "",
      color: medication?.color || getNextMedicationColor(existingColors),
    },
  });

  // Get current times for rendering
  const currentTimes = watch("times") || [];
  const watchedFrequency = watch("frequency");

  useEffect(() => {
    if (watchedFrequency !== selectedFrequency) {
      setSelectedFrequency(watchedFrequency);
      if (watchedFrequency !== "custom" && watchedFrequency !== "as_needed") {
        const defaultTimes = getDefaultTimes(watchedFrequency as any);
        setValue("times", defaultTimes);
      }
    }
  }, [watchedFrequency, selectedFrequency, setValue]);

  const handleFormSubmit = async (data: MedicationFormData) => {
    await onSubmit(data);
  };

  const addTimeSlot = () => {
    const currentTimes = watch("times");
    setValue("times", [...currentTimes, "08:00"]);
  };

  const removeTimeSlot = (index: number) => {
    const currentTimes = watch("times");
    setValue("times", currentTimes.filter((_, i) => i !== index));
  };

  const colors = getMedicationColors();

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

      <div className="relative">
        <h3 className="text-lg font-semibold text-white mb-6">
          {medication ? "Edit Medication" : "Add Medication"}
        </h3>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
          {/* Medication Name */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-400">
              Medication Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="e.g., Lisinopril, Metformin"
              className={`input-modern ${errors.name ? 'border-red-500/50' : ''}`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Dosage */}
          <div className="space-y-2">
            <label htmlFor="dosage" className="block text-sm font-medium text-zinc-400">
              Dosage
            </label>
            <input
              id="dosage"
              type="text"
              placeholder="e.g., 10mg, 2 tablets, 1 tsp"
              className={`input-modern ${errors.dosage ? 'border-red-500/50' : ''}`}
              {...register("dosage")}
            />
            {errors.dosage && (
              <p className="text-xs text-red-400">{errors.dosage.message}</p>
            )}
          </div>

          {/* Frequency */}
          <div className="space-y-2">
            <label htmlFor="frequency" className="block text-sm font-medium text-zinc-400">
              Frequency
            </label>
            <select 
              id="frequency" 
              className={`input-modern ${errors.frequency ? 'border-red-500/50' : ''}`}
              {...register("frequency")}
            >
              <option value="once_daily">Once daily</option>
              <option value="twice_daily">Twice daily</option>
              <option value="three_times_daily">Three times daily</option>
              <option value="four_times_daily">Four times daily</option>
              <option value="as_needed">As needed</option>
              <option value="custom">Custom schedule</option>
            </select>
            {errors.frequency && (
              <p className="text-xs text-red-400">{errors.frequency.message}</p>
            )}
          </div>

          {/* Times */}
          {selectedFrequency !== "as_needed" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-zinc-400">
                  Times
                </label>
                {selectedFrequency === "custom" && (
                  <button
                    type="button"
                    onClick={addTimeSlot}
                    className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    + Add Time
                  </button>
                )}
              </div>
              <div className="grid gap-2">
                {currentTimes.map((time, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="time"
                      className="input-modern flex-1"
                      {...register(`times.${index}` as const)}
                    />
                    {selectedFrequency === "custom" && currentTimes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTimeSlot(index)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.times && (
                <p className="text-xs text-red-400">{errors.times.message}</p>
              )}
            </div>
          )}

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="start_date" className="block text-sm font-medium text-zinc-400">
                Start Date
              </label>
              <input
                id="start_date"
                type="date"
                className={`input-modern ${errors.start_date ? 'border-red-500/50' : ''}`}
                {...register("start_date")}
              />
              {errors.start_date && (
                <p className="text-xs text-red-400">{errors.start_date.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="end_date" className="block text-sm font-medium text-zinc-400">
                End Date (Optional)
              </label>
              <input
                id="end_date"
                type="date"
                className={`input-modern ${errors.end_date ? 'border-red-500/50' : ''}`}
                {...register("end_date")}
              />
              {errors.end_date && (
                <p className="text-xs text-red-400">{errors.end_date.message}</p>
              )}
            </div>
          </div>

          {/* Color */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-zinc-400">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setValue("color", color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    watch("color") === color 
                      ? "border-white scale-110" 
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="block text-sm font-medium text-zinc-400">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              placeholder="Special instructions, side effects to watch for..."
              className="input-modern resize-none"
              {...register("notes")}
            />
            {errors.notes && (
              <p className="text-xs text-red-400">{errors.notes.message}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary flex-1 py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {medication ? "Update Medication" : "Add Medication"}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary px-6 py-3 text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}