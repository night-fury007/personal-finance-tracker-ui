"use client";

import { ArrowUpRight, Download, Plus } from "lucide-react";
import {
  Area,
  AreaChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { mockMetrics, mockTransactions } from "../../lib/mockdata";

const spendingData = [
  { name: "Housing", value: 1500, color: "#3b82f6" },
  { name: "Dining", value: 450, color: "#10b981" },
  { name: "Utilities", value: 300, color: "#f59e0b" },
  { name: "Travel", value: 800, color: "#8b5cf6" },
];

const growthData = [
  { month: "Jan", netWorth: 42000 },
  { month: "Feb", netWorth: 45000 },
  { month: "Mar", netWorth: 48500 },
  { month: "Apr", netWorth: 51200 },
  { month: "May", netWorth: 53000 },
  { month: "Jun", netWorth: 54998 },
];

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Page Title & Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Consolidated multi-currency financial health and recent activity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
            <Plus className="w-4 h-4" /> Record Income / Expense
          </button>
        </div>
      </div>

      {/* Top Metric Strip (KPI Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Net Worth
            </span>
            <div className="text-3xl font-bold text-slate-900 mt-2">
              ${mockMetrics.totalNetWorth.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-4 bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
            <ArrowUpRight className="w-3.5 h-3.5" /> +
            {mockMetrics.netWorthChangePercent}% from last month
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Monthly Cash Flow
            </span>
            <div className="text-3xl font-bold text-slate-900 mt-2">
              ${mockMetrics.monthlyCashFlow.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-4 bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
            <ArrowUpRight className="w-3.5 h-3.5" /> +
            {mockMetrics.cashFlowChangePercent}% net positive
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Liquid Cash Balance
            </span>
            <div className="text-3xl font-bold text-slate-900 mt-2">
              ${mockMetrics.liquidCashBalance.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-4 bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
            <ArrowUpRight className="w-3.5 h-3.5" /> +
            {mockMetrics.liquidCashChangePercent}% stable
          </div>
        </div>
      </div>

      {/* Dual-Column Analytical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Pie Chart on Top, Area Chart Below) */}
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Expense Category Breakdown (Pie Chart) - Placed First */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-12 items-center gap-4">
            <div className="md:col-span-4 h-44 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingData}
                    dataKey="value"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                  >
                    {spendingData.map((entry, index) => (
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
                {spendingData.map((item) => (
                  <li key={item.name} className="flex items-center gap-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-700 font-medium">
                      {item.name}
                    </span>
                    <span className="text-slate-900 font-bold ml-auto">
                      ${item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. Portfolio Growth Line Chart - Placed Second */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-base font-semibold text-slate-900 mb-4">
              Net Worth Trajectory
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient
                      id="colorNetWorth"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
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
        </div>

        {/* Right Column (Activity Feed) */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col">
          <h3 className="text-base font-semibold text-slate-900 mb-4">
            Recent Activity Feed
          </h3>
          <div className="space-y-4 flex-1 overflow-y-auto">
            {mockTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-xs ${tx.type === "income" ? "bg-emerald-100 text-emerald-700" : tx.type === "investment" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {tx.category.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900">
                      {tx.description}
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      {tx.date} • {tx.category}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs font-bold ${tx.type === "income" ? "text-emerald-600" : "text-slate-900"}`}
                >
                  {tx.type === "income" ? "+" : "-"}${tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
