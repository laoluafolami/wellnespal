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
import type { Reading } from "@/types";

interface BPChartProps {
  readings: Reading[];
}

export function BPChart({ readings }: BPChartProps) {
  // Sort by date ascending for chart
  const chartData = [...readings]
    .sort((a, b) => new Date(a.measured_at).getTime() - new Date(b.measured_at).getTime())
    .slice(-30) // Last 30 readings
    .map((reading) => ({
      date: format(new Date(reading.measured_at), "MMM d"),
      systolic: reading.systolic,
      diastolic: reading.diastolic,
      pulse: reading.pulse,
    }));

  if (chartData.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
        <div className="relative">
          <h3 className="text-lg font-semibold text-white mb-6">Blood Pressure Trend</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-zinc-400">Add readings to see your trend</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass rounded-xl p-4 border border-white/10">
          <p className="text-zinc-400 text-sm mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-indigo-400 font-semibold">
              Systolic: {payload[0]?.value} mmHg
            </p>
            <p className="text-purple-400 font-semibold">
              Diastolic: {payload[1]?.value} mmHg
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />

      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Blood Pressure Trend</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-zinc-400">Systolic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-zinc-400">Diastolic</span>
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="systolicGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="diastolicGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
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
              domain={[40, 180]}
            />
            <Tooltip content={<CustomTooltip />} />
            {/* Reference lines for BP thresholds */}
            <ReferenceLine y={120} stroke="#eab308" strokeDasharray="5 5" strokeOpacity={0.5} />
            <ReferenceLine y={140} stroke="#ef4444" strokeDasharray="5 5" strokeOpacity={0.5} />
            <ReferenceLine y={80} stroke="#eab308" strokeDasharray="5 5" strokeOpacity={0.3} />
            <ReferenceLine y={90} stroke="#ef4444" strokeDasharray="5 5" strokeOpacity={0.3} />
            <Area
              type="monotone"
              dataKey="systolic"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#systolicGradient)"
            />
            <Area
              type="monotone"
              dataKey="diastolic"
              stroke="#a855f7"
              strokeWidth={2}
              fill="url(#diastolicGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Legend for thresholds */}
        <div className="flex justify-center gap-6 mt-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-yellow-500 opacity-50" />
            <span>Elevated (120/80)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-red-500 opacity-50" />
            <span>High BP (140/90)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
