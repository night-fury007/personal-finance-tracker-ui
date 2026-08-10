"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GrowthItem {
  month: string;
  netWorth: number;
}

interface NetWorthTrajectoryChartProps {
  data: GrowthItem[];
}

export function NetWorthTrajectoryChart({
  data,
}: NetWorthTrajectoryChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
      <h3 className="text-base font-semibold text-slate-900 mb-4">
        Net Worth Trajectory
      </h3>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="netWorth"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorNetWorth)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
