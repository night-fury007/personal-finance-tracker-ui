"use client";

import { Landmark, Wallet } from "lucide-react";

// 1. Define the shape of the data we are passing in
interface AccountItem {
  id: string;
  institution: string;
  accountName: string;
  accountType: "Checking" | "Savings" | "Credit Card" | "Brokerage";
  balance: number;
  currency: "USD" | "INR";
}

// 2. Define the props for this component
interface AccountSummaryCardsProps {
  accounts: AccountItem[];
}

export function AccountSummaryCards({
  accounts = [],
}: AccountSummaryCardsProps) {
  // 3. Dynamically calculate the totals based on the passed accounts array
  const totalUSD = accounts
    .filter((acc) => acc.currency === "USD")
    .reduce((sum, acc) => sum + acc.balance, 0);

  const totalINR = accounts
    .filter((acc) => acc.currency === "INR")
    .reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* USD Total Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <Wallet className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Total Balance (USD)
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

      {/* INR Total Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center gap-4">
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <Landmark className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-0.5">
            Total Balance (INR)
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
