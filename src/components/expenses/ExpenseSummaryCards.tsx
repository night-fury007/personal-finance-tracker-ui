interface ExpenseSummaryCardsProps {
  totalUSD: number;
  totalINR: number;
  count: number;
}

export function ExpenseSummaryCards({
  totalUSD,
  totalINR,
  count,
}: ExpenseSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total USD Spending
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1.5">
            ${totalUSD.toLocaleString()}
          </div>
        </div>
        <div className="mt-4">
          <span className="inline-flex items-center text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
            Current billing cycle
          </span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Total INR Spending
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1.5">
            ₹{totalINR.toLocaleString()}
          </div>
        </div>
        <div className="mt-4">
          <span className="inline-flex items-center text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
            Domestic outflow
          </span>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Recorded Transactions
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1.5">
            {count} Items
          </div>
        </div>
        <div className="mt-4">
          <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            100% Reconciled
          </span>
        </div>
      </div>
    </div>
  );
}
