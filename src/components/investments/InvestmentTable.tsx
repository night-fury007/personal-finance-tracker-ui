"use client";

import { InvestmentItem } from "@/lib/mockdata";
import { PieChart, Trash2 } from "lucide-react";

interface InvestmentTableProps {
  investments: InvestmentItem[];
  onDelete: (id: string) => void;
}

export function InvestmentTable({
  investments,
  onDelete,
}: InvestmentTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-6">Asset Name & Ticker</th>
              <th className="py-3 px-6">Region</th>
              <th className="py-3 px-6">Type</th>
              <th className="py-3 px-6 text-right">Invested</th>
              <th className="py-3 px-6 text-right">Current Value</th>
              <th className="py-3 px-6 text-right">Overall Return</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {investments.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  No investments found matching your search.
                </td>
              </tr>
            ) : (
              investments.map((item) => {
                const profit = item.currentValue - item.investedAmount;
                const roi =
                  item.investedAmount > 0
                    ? (profit / item.investedAmount) * 100
                    : 0;
                const isPositive = profit >= 0;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium text-slate-900 flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <PieChart className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-slate-400 font-mono">
                          {item.ticker}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${
                          item.region === "India"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-emerald-50 text-emerald-700"
                        }`}
                      >
                        {item.region} ({item.currency})
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 font-medium">
                      {item.type}
                    </td>
                    <td className="py-4 px-6 text-right text-slate-600 font-medium">
                      {item.currency === "USD" ? "$" : "₹"}
                      {item.investedAmount.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="py-4 px-6 text-right font-bold text-slate-900">
                      {item.currency === "USD" ? "$" : "₹"}
                      {item.currentValue.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td
                      className={`py-4 px-6 text-right font-semibold ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      {isPositive ? "+" : ""}
                      {item.currency === "USD" ? "$" : "₹"}
                      {Math.abs(profit).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      <span className="block text-xs font-normal">
                        ({isPositive ? "+" : ""}
                        {roi.toFixed(2)}%)
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => onDelete(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Investment"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
