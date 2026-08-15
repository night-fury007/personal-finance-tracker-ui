"use client";

import { DollarSign, IndianRupee } from "lucide-react";

interface AccountSummaryCardsProps {
  totalUSD: number;
  totalINR: number;
  count: number;
}

export function AccountSummaryCards({
  totalUSD,
  totalINR,
  count,
}: AccountSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* INR Liquid Balance Tile */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Total Liquid Cash (INR)
          </p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">
            ₹
            {totalINR.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Across Indian salary & emergency accounts
          </p>
        </div>
        <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold text-lg">
          <IndianRupee className="w-6 h-6" />
        </div>
      </div>
      {/* USD Liquid Balance Tile */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Total Liquid Cash (USD)
          </p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">
            $
            {totalUSD.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Across US checking, savings & wallets
          </p>
        </div>
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold text-lg">
          <DollarSign className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
