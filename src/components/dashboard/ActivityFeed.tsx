import { Transaction } from "../../lib/mockdata";

interface ActivityFeedProps {
  transactions: Transaction[];
}

export function ActivityFeed({ transactions }: ActivityFeedProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col">
      <h3 className="text-base font-semibold text-slate-900 mb-4">
        Recent Activity Feed
      </h3>
      <div className="space-y-4 flex-1 overflow-y-auto">
        {transactions.map((tx) => (
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
  );
}
