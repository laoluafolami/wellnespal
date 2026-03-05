"use client";

import { format } from "date-fns";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";
import { getMeasurementTypeLabel } from "@/lib/glucose-utils";
import type { GlucoseReading } from "@/types";

interface GlucoseChartProps {
  readings: GlucoseReading[];
}

export function GlucoseChart({ readings }: GlucoseChartProps) {
  // Sort by date ascending for chart
  const chartData = [...readings]
    .sort((a, b) => new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime())
    .slice(-30) // Last 30 readings
    .map((reading) => ({
      date: format(new Date(reading.measured_at), "MMM d"),
      glucose: reading.glucose_value,
      type: reading.measurement_type,
      typeLabel: getMeasurementTypeLabel(reading.measurement_type as any),
    }));

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
        <div className="relative">
          <h3 className="text-lg font-semibold text-white mb-6">Blood Glucose Trend</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-zinc-400">Add glucose readings to see your trend</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      return (
        <div className="glass rounded-xl p-4 border border-white/10">
          <p className="text-zinc-400 text-sm mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-emerald-400 font-semibold">
              Glucose: {payload[0]?.value} mg/dL
            </p>
            <p className="text-teal-400 text-sm">
              Type: {data?.typeLabel}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Blood Glucose Trend</h3>
          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-zinc-400">Glucose Level</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="glucoseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="date"
              stroke="#52525b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#52525b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[50, 250]}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Reference lines for glucose thresholds */}
            <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="5 5" strokeOpacity={0.5} />
            <ReferenceLine y={100} stroke="#eab308" strokeDasharray="5 5" strokeOpacity={0.5} />
            <ReferenceLine y={140} stroke="#eab308" strokeDasharray="5 5" strokeOpacity={0.3} />
            <ReferenceLine y={180} stroke="#ef4444" strokeDasharray="5 5" strokeOpacity={0.3} />
            <Area
              type="monotone"
              dataKey="glucose"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#glucoseGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Legend for thresholds */}
        <div className="flex justify-center gap-6 mt-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-red-500 opacity-50" />
            <span>Low (&lt;70)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-yellow-500 opacity-50" />
            <span>Prediabetic (100-140)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-red-500 opacity-30" />
            <span>High (&gt;180)</span>
          </div>
        </div>
      </div>
    </div>
  );
}