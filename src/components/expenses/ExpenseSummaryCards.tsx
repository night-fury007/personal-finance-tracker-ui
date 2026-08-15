"use client";

import { DollarSign, IndianRupee } from "lucide-react";
import { ExpenseItem } from "./ExpenseTable";

interface ExpenseSummaryCardsProps {
  expenses: ExpenseItem[];
}

export function ExpenseSummaryCards({
  expenses = [],
}: ExpenseSummaryCardsProps) {
  const totalUSD = expenses
    .filter((exp) => exp.currency === "USD")
    .reduce((sum, exp) => sum + exp.amount, 0);

  const totalINR = expenses
    .filter((exp) => exp.currency === "INR")
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
          <DollarSign className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Total Expenses (USD)
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
        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
          <IndianRupee className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Total Expenses (INR)
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
