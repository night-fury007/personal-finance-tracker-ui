"use client";

import { IncomeItem } from "@/lib/mockdata";
import { Trash2, Wallet } from "lucide-react";

interface IncomeTableProps {
  incomes: IncomeItem[];
  onDelete: (id: string) => void;
}

export function IncomeTable({ incomes, onDelete }: IncomeTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-6">Source / Payer</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Frequency</th>
              <th className="py-3 px-6">Date</th>
              <th className="py-3 px-6">Currency</th>
              <th className="py-3 px-6 text-right">Amount</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {incomes.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  No income records found matching your search.
                </td>
              </tr>
            ) : (
              incomes.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-slate-900 flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                      <Wallet className="w-4 h-4" />
                    </div>
                    {item.source}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{item.frequency}</td>
                  <td className="py-4 px-6 text-slate-500">{item.date}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        item.currency === "USD"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {item.currency}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-semibold text-emerald-600">
                    +{item.currency === "USD" ? "$" : "₹"}
                    {item.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
