"use client";

import { NavHeader } from "@/components/nav-header";
import { useReadings } from "@/hooks/use-readings";
import { format } from "date-fns";

export default function SettingsPage() {
  const { data: readings = [] } = useReadings();

  const exportToCSV = () => {
    if (readings.length === 0) {
      alert("No readings to export");
      return;
    }

    const headers = ["Date", "Systolic", "Diastolic", "Pulse", "Arm", "Position", "Notes"];
    const rows = readings.map((r) => [
      format(new Date(r.measured_at), "yyyy-MM-dd HH:mm"),
      r.systolic,
      r.diastolic,
      r.pulse || "",
      r.arm,
      r.position,
      r.notes || "",
    ]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bp-readings-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated gradient background */}
      <div className="gradient-bg" />

      <NavHeader />

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 slide-up">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-zinc-400">Manage your account and export data</p>
        </div>

        <div className="space-y-6">
          {/* Export Card */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden slide-up stagger-1" style={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">Export Data</h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    Download all your blood pressure readings as a CSV file to share with your healthcare provider.
                  </p>
                  <button
                    onClick={exportToCSV}
                    className="btn-primary px-6 py-3"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Export to CSV ({readings.length} readings)
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BP Categories Reference */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden slide-up stagger-2" style={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-orange-500/5" />
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-1">Blood Pressure Categories</h3>
              <p className="text-zinc-400 text-sm mb-6">Based on American Heart Association guidelines</p>

              <div className="space-y-3">
                {[
                  { label: "Normal", range: "Less than 120/80 mmHg", badge: "badge-normal" },
                  { label: "Elevated", range: "120-129 / less than 80 mmHg", badge: "badge-elevated" },
                  { label: "High BP Stage 1", range: "130-139 / 80-89 mmHg", badge: "badge-hypertension-1" },
                  { label: "High BP Stage 2", range: "140+ / 90+ mmHg", badge: "badge-hypertension-2" },
                  { label: "Hypertensive Crisis", range: "Higher than 180/120 mmHg", badge: "badge-crisis" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-3 border-b border-white/5 last:border-0"
                  >
                    <span className={`badge ${item.badge}`}>{item.label}</span>
                    <span className="text-zinc-400 text-sm">{item.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* About Card */}
          <div className="glass rounded-2xl p-6 relative overflow-hidden slide-up stagger-3" style={{ opacity: 0 }}>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">BP Tracker</h3>
                  <p className="text-zinc-500 text-sm">Version 1.0.0</p>
                </div>
              </div>

              <p className="text-zinc-400 text-sm mb-4">
                BP Tracker helps you monitor your blood pressure over time. Regular tracking can help
                you and your healthcare provider make informed decisions about your health.
              </p>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <p className="text-amber-200 text-sm">
                  <strong>Disclaimer:</strong> This app is for informational purposes only and is not a
                  substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
