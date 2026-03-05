"use client";

import { useState } from "react";
import { formatTime } from "@/lib/medication-utils";
import { useMedicationSchedule, useLogMedication, useUpdateMedicationLog, useMedications, useCreateMedication } from "@/hooks/use-medications";
import { MedicationForm } from "./medication-form";
import type { MedicationScheduleItem, MedicationStatus } from "@/types";
import type { MedicationFormData } from "@/lib/validations";

interface MedicationScheduleProps {
  date?: Date;
}

export function MedicationSchedule({ date = new Date() }: MedicationScheduleProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const { data: schedule = [], isLoading } = useMedicationSchedule(date);
  const { data: medications = [] } = useMedications();
  const logMedication = useLogMedication();
  const updateLog = useUpdateMedicationLog();
  const createMedication = useCreateMedication();

  const handleStatusChange = async (item: MedicationScheduleItem, status: MedicationStatus) => {
    try {
      if (item.log_id) {
        // Update existing log
        await updateLog.mutateAsync({
          id: item.log_id,
          updates: {
            status,
            taken_at: status === 'taken' ? new Date().toISOString() : null,
          },
        });
      } else {
        // Create new log
        await logMedication.mutateAsync({
          medication_id: item.medication_id,
          scheduled_time: item.scheduled_time,
          status,
          taken_at: status === 'taken' ? new Date().toISOString() : null,
        });
      }
    } catch (error) {
      console.error("Failed to update medication status:", error);
    }
  };

  const handleAddMedication = async (data: MedicationFormData) => {
    try {
      await createMedication.mutateAsync(data);
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add medication:", error);
    }
  };

  const existingColors = medications.map(med => med.color);

  if (showAddForm) {
    return (
      <MedicationForm
        onSubmit={handleAddMedication}
        onCancel={() => setShowAddForm(false)}
        isLoading={createMedication.isPending}
        existingColors={existingColors}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="glass rounded-2xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-white/10 rounded w-1/3"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-white/5 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (schedule.length === 0 && medications.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No medications added</h3>
        <p className="text-zinc-400 mb-4">Start tracking your medications and never miss a dose</p>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary px-6 py-3"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Your First Medication
          </span>
        </button>
      </div>
    );
  }

  if (schedule.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No medications scheduled today</h3>
        <p className="text-zinc-400 mb-4">You have {medications.length} medication(s) but none scheduled for today</p>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-secondary px-6 py-3"
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Medication
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            Today&apos;s Medications
          </h3>
          <button
            onClick={() => setShowAddForm(true)}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Medication
          </button>
        </div>

        <div className="space-y-3">
          {schedule.map((item) => (
            <div
              key={`${item.medication_id}-${item.scheduled_time}`}
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              {/* Medication info with color indicator */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                    <h4 className="font-medium text-white truncate">
                      {item.medication_name}
                    </h4>
                    <span className="text-sm text-zinc-400">
                      {item.dosage}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500">
                    {formatTime(new Date(item.scheduled_time).toTimeString().slice(0, 5))}
                  </p>
                </div>
              </div>

              {/* Status buttons */}
              <div className="flex gap-2 self-end sm:self-center">
                <button
                  onClick={() => handleStatusChange(item, 'taken')}
                  disabled={logMedication.isPending || updateLog.isPending}
                  className={`p-2 rounded-lg transition-colors ${
                    item.status === 'taken'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-white/10 text-zinc-400 hover:bg-green-500/20 hover:text-green-400'
                  }`}
                  title="Mark as taken"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handleStatusChange(item, 'skipped')}
                  disabled={logMedication.isPending || updateLog.isPending}
                  className={`p-2 rounded-lg transition-colors ${
                    item.status === 'skipped'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-white/10 text-zinc-400 hover:bg-yellow-500/20 hover:text-yellow-400'
                  }`}
                  title="Mark as skipped"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}