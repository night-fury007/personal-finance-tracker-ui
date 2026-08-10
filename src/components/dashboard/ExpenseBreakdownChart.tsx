"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface SpendingItem {
  name: string;
  value: number;
  color: string;
}

interface ExpenseBreakdownChartProps {
  data: SpendingItem[];
}

export function ExpenseBreakdownChart({ data }: ExpenseBreakdownChartProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 items-center gap-4">
      <div className="md:col-span-4 h-44 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="md:col-span-8 pl-0 md:pl-2">
        <h3 className="text-base font-semibold text-slate-900 mb-1">
          Expense Category Breakdown
        </h3>
        <p className="text-sm text-slate-500 mb-3">
          Top spending categories for current cycle.
        </p>
        <ul className="space-y-2 text-sm">
          {data.map((item) => (
            <li key={item.name} className="flex items-center gap-3">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-700 font-medium">{item.name}</span>
              <span className="text-slate-900 font-bold ml-auto">
                ${item.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
