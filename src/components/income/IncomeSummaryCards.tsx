"use client";

import { DollarSign, IndianRupee } from "lucide-react";

export interface IncomeItem {
  id: string;
  source: string;
  category: string;
  amount: number;
  currency: "USD" | "INR";
  date: string;
}

interface IncomeSummaryCardsProps {
  incomes: IncomeItem[];
}

export function IncomeSummaryCards({ incomes = [] }: IncomeSummaryCardsProps) {
  const totalUSD = incomes
    .filter((inc) => inc.currency === "USD")
    .reduce((sum, inc) => sum + inc.amount, 0);

  const totalINR = incomes
    .filter((inc) => inc.currency === "INR")
    .reduce((sum, inc) => sum + inc.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <DollarSign className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Total Income (USD)
          </p>
          <p className="text-2xl font-bold text-slate-900">
            $
            {totalUSD.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <IndianRupee className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Total Income (INR)
          </p>
          <p className="text-2xl font-bold text-slate-900">
            ₹
            {totalINR.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
