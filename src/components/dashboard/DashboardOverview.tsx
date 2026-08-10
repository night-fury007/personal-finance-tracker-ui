"use client";

import { Download, Plus } from "lucide-react";
import { mockMetrics, mockTransactions } from "../../lib/mockdata";
import { ActivityFeed } from "./ActivityFeed";
import { ExpenseBreakdownChart } from "./ExpenseBreakdownChart";
import { LiquidCashCard } from "./LiquidCashCard";
import { NetWorthTrajectoryChart } from "./NetWorthTrajectoryChart";
import { PortfolioCard } from "./PortfolioCard";

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
  const india = mockMetrics.indiaPortfolio;
  const us = mockMetrics.usPortfolio;
  const usCash = mockMetrics.usLiquidCash;
  const inrCash = mockMetrics.inrLiquidCash;

  return (
    <div className="space-y-8">
      {/* Page Title & Action Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Multi-currency equity health, liquid assets, and regional portfolio
            performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs">
            <Download className="w-4 h-4" /> Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20">
            <Plus className="w-4 h-4" /> Record Transaction
          </button>
        </div>
      </div>

      {/* Top 4 KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PortfolioCard
          title="🇮🇳 India Portfolio"
          badge="INR ₹"
          badgeColor="bg-emerald-50 text-emerald-700"
          currency={india.currency}
          currentValue={india.currentValue}
          investedAmount={india.investedAmount}
          absoluteProfitLoss={india.absoluteProfitLoss}
          percentageProfitLoss={india.percentageProfitLoss}
        />
        <LiquidCashCard
          title="💶 INR Liquid Cash"
          badge="INR ₹"
          badgeColor="bg-emerald-50 text-emerald-700"
          symbol={inrCash.symbol}
          balance={inrCash.balance}
          description="Salary & emergency fiat"
        />

        <PortfolioCard
          title="🇺🇸 US Portfolio"
          badge="USD $"
          badgeColor="bg-emerald-50 text-emerald-700"
          currency={us.currency}
          currentValue={us.currentValue}
          investedAmount={us.investedAmount}
          absoluteProfitLoss={us.absoluteProfitLoss}
          percentageProfitLoss={us.percentageProfitLoss}
        />

        <LiquidCashCard
          title="💵 USD Liquid Cash"
          badge="USD $"
          badgeColor="bg-emerald-50 text-emerald-700"
          symbol={usCash.symbol}
          balance={usCash.balance}
          description="Checking & Savings reserves"
        />
      </div>

      {/* Dual-Column Analytical Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Charts Stack) */}
        <div className="lg:col-span-2 space-y-8">
          <ExpenseBreakdownChart data={spendingData} />
          <NetWorthTrajectoryChart data={growthData} />
        </div>

        {/* Right Column (Activity Feed) */}
        <ActivityFeed transactions={mockTransactions} />
      </div>
    </div>
  );
}
