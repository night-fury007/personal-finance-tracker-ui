"use client";

import { DollarSign, IndianRupee } from "lucide-react";

interface IncomeSummaryCardsProps {
  totalUSD: number;
  totalINR: number;
  count: number;
}

export function IncomeSummaryCards({
  totalUSD,
  totalINR,
  count,
}: IncomeSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Total INR Income Tile */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Total Income (INR Streams)
          </p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">
            ₹
            {totalINR.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Indian salary, bonuses & rental income
          </p>
        </div>
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold text-lg">
          <IndianRupee className="w-6 h-6" />
        </div>
      </div>
      {/* Total USD Income Tile */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Total Income (USD Streams)
          </p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">
            $
            {totalUSD.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Salary, consulting & US dividends
          </p>
        </div>
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
