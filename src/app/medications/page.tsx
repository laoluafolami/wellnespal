"use client";

import { useState } from "react";
import { NavHeader } from "@/components/nav-header";
import { MedicationForm } from "@/components/medication-form";
import { useMedications, useCreateMedication, useUpdateMedication, useDeleteMedication } from "@/hooks/use-medications";
import { formatTimeRange, getFrequencyLabel } from "@/lib/medication-utils";
import type { Medication } from "@/types";
import type { MedicationFormData } from "@/lib/validations";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

export default function MedicationsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMedication, setEditingMedication] = useState<Medication | null>(null);
  const { data: medications = [], isLoading } = useMedications();
  const createMedication = useCreateMedication();
  const updateMedication = useUpdateMedication();
  const deleteMedication = useDeleteMedication();

  const handleAddMedication = async (data: MedicationFormData) => {
    try {
      await createMedication.mutateAsync(data);
      setShowAddForm(false);
    } catch (error) {
      console.error("Failed to add medication:", error);
    }
  };

  const handleUpdateMedication = async (data: MedicationFormData) => {
    if (!editingMedication) return;
    
    try {
      await updateMedication.mutateAsync({
        id: editingMedication.id,
        updates: data,
      });
      setEditingMedication(null);
    } catch (error) {
      console.error("Failed to update medication:", error);
    }
  };

  const handleDeleteMedication = async (id: string) => {
    if (confirm("Are you sure you want to delete this medication? This will also remove all associated logs.")) {
      try {
        await deleteMedication.mutateAsync(id);
      } catch (error) {
        console.error("Failed to delete medication:", error);
      }
    }
  };

  const existingColors = medications.map(med => med.color);

  if (showAddForm) {
    return (
      <div className="min-h-screen relative">
        <div className="gradient-bg" />
        <NavHeader />
        <main className="relative z-10 max-w-2xl mx-auto px-4 py-8">
          <div className="mb-8 slide-up">
            <h1 className="text-3xl font-bold text-white mb-2">Add Medication</h1>
            <p className="text-zinc-400">Add a new medication to your tracking list</p>
          </div>
          <MedicationForm
            onSubmit={handleAddMedication}
            onCancel={() => setShowAddForm(false)}
            isLoading={createMedication.isPending}
            existingColors={existingColors}
          />
        </main>
      </div>
    );
  }

  if (editingMedication) {
    return (
      <div className="min-h-screen relative">
        <div className="gradient-bg" />
        <NavHeader />
        <main className="relative z-10 max-w-2xl mx-auto px-4 py-8">
          <div className="mb-8 slide-up">
            <h1 className="text-3xl font-bold text-white mb-2">Edit Medication</h1>
            <p className="text-zinc-400">Update your medication details</p>
          </div>
          <MedicationForm
            onSubmit={handleUpdateMedication}
            onCancel={() => setEditingMedication(null)}
            isLoading={updateMedication.isPending}
            medication={editingMedication}
            existingColors={existingColors}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="gradient-bg" />
      <NavHeader />

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 slide-up">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Medications</h1>
            <p className="text-zinc-400">Manage your medication schedules and tracking</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/medications/history"
              className="btn-secondary px-6 py-3"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View History
              </span>
            </a>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary px-6 py-3"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Medication
              </span>
            </button>
          </div>
        </div>

        {/* Medications List */}
        {isLoading ? (
          <div className="glass rounded-2xl p-8 text-center">
            <div className="inline-flex items-center gap-2 text-zinc-400">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Loading medications...
            </div>
          </div>
        ) : medications.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {medications.map((medication, index) => (
              <div
                key={medication.id}
                className="glass rounded-2xl p-6 relative overflow-hidden slide-up"
                style={{ animationDelay: `${0.1 * index}s`, opacity: 0 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: medication.color }}
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{medication.name}</h3>
                        <p className="text-zinc-400 text-sm">{medication.dosage}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingMedication(medication)}
                        className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit medication"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteMedication(medication.id)}
                        disabled={deleteMedication.isPending}
                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete medication"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Frequency:</span>
                      <span className="text-white">{getFrequencyLabel(medication.frequency as any)}</span>
                    </div>
                    
                    {medication.times.length > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">Times:</span>
                        <span className="text-white">{formatTimeRange(medication.times)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-500">Start Date:</span>
                      <span className="text-white">{new Date(medication.start_date).toLocaleDateString()}</span>
                    </div>

                    {medication.end_date && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">End Date:</span>
                        <span className="text-white">{new Date(medication.end_date).toLocaleDateString()}</span>
                      </div>
                    )}

                    {medication.notes && (
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-zinc-400 text-sm">{medication.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No medications added</h3>
            <p className="text-zinc-500 mb-4">Start tracking your medications to never miss a dose</p>
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
        )}
      </main>
    </div>
  );
}