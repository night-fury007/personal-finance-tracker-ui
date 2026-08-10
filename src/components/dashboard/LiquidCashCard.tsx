interface LiquidCashCardProps {
  title: string;
  badge: string;
  badgeColor: string;
  symbol: string;
  balance: number;
  description: string;
}

export function LiquidCashCard({
  title,
  badge,
  badgeColor,
  symbol,
  balance,
  description,
}: LiquidCashCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded ${badgeColor}`}
          >
            {badge}
          </span>
        </div>
        <div className="text-3xl font-bold text-slate-900 mt-2">
          {symbol}
          {balance.toLocaleString()}
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 mt-4 bg-slate-100 w-fit px-2.5 py-1 rounded-full">
        {description}
      </div>
    </div>
  );
}
