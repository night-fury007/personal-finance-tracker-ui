import { ArrowUpRight } from "lucide-react";

interface PortfolioCardProps {
  title: string;
  badge: string;
  badgeColor: string;
  currency: string;
  currentValue: number;
  investedAmount: number;
  absoluteProfitLoss: number;
  percentageProfitLoss: number;
}

export function PortfolioCard({
  title,
  badge,
  badgeColor,
  currency,
  currentValue,
  investedAmount,
  absoluteProfitLoss,
  percentageProfitLoss,
}: PortfolioCardProps) {
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
        <div className="text-2xl font-bold text-slate-900 mt-2">
          {currency}
          {currentValue.toLocaleString()}
        </div>
        <div className="text-xs text-slate-500 mt-1">
          Invested:{" "}
          <span className="font-medium text-slate-700">
            {currency}
            {investedAmount.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 mt-4 bg-emerald-50 w-fit px-2.5 py-1 rounded-full">
        <ArrowUpRight className="w-3.5 h-3.5" /> +{currency}
        {absoluteProfitLoss.toLocaleString()} (+{percentageProfitLoss}%)
      </div>
    </div>
  );
}
