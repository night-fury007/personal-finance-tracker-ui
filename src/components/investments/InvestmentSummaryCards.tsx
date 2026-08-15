"use client";

import { InvestmentItem } from "@/lib/mockdata";
import { ArrowUpRight, Globe, TrendingUp } from "lucide-react";

interface InvestmentSummaryCardsProps {
  investments: InvestmentItem[];
}

export function InvestmentSummaryCards({
  investments,
}: InvestmentSummaryCardsProps) {
  // India Portfolio Calculations
  const indiaItems = investments.filter((i) => i.region === "India");
  const indiaInvested = indiaItems.reduce(
    (acc, curr) => acc + curr.investedAmount,
    0,
  );
  const indiaCurrent = indiaItems.reduce(
    (acc, curr) => acc + curr.currentValue,
    0,
  );
  const indiaProfit = indiaCurrent - indiaInvested;
  const indiaROI = indiaInvested > 0 ? (indiaProfit / indiaInvested) * 100 : 0;

  // US Portfolio Calculations
  const usItems = investments.filter((i) => i.region === "US");
  const usInvested = usItems.reduce(
    (acc, curr) => acc + curr.investedAmount,
    0,
  );
  const usCurrent = usItems.reduce((acc, curr) => acc + curr.currentValue, 0);
  const usProfit = usCurrent - usInvested;
  const usROI = usInvested > 0 ? (usProfit / usInvested) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* India Portfolio Tile */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              🇮🇳 India Portfolio (INR)
            </p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              ₹
              {indiaCurrent.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold text-lg">
            <Globe className="w-6 h-6" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block">Invested Capital</span>
            <span className="font-semibold text-slate-700">
              ₹{indiaInvested.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block">Overall P&L</span>
            <span
              className={`font-bold flex items-center gap-0.5 justify-end ${indiaProfit >= 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              {indiaProfit >= 0 ? "+" : ""}₹
              {indiaProfit.toLocaleString("en-IN")} ({indiaROI.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* US Portfolio Tile */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              🇺🇸 US Portfolio (USD)
            </p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              $
              {usCurrent.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block">Invested Capital</span>
            <span className="font-semibold text-slate-700">
              ${usInvested.toLocaleString("en-US")}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block">Overall P&L</span>
            <span
              className={`font-bold flex items-center gap-0.5 justify-end ${usProfit >= 0 ? "text-emerald-600" : "text-rose-600"}`}
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              {usProfit >= 0 ? "+" : ""}${usProfit.toLocaleString("en-US")} (
              {usROI.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
