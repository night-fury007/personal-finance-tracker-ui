"use client";

import { AccountItem } from "@/lib/mockdata";
import { Building2, Trash2 } from "lucide-react";

interface AccountTableProps {
  accounts: AccountItem[];
  onDelete: (id: string) => void;
}

export function AccountTable({ accounts, onDelete }: AccountTableProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-6">Account Name</th>
              <th className="py-3 px-6">Type</th>
              <th className="py-3 px-6">Currency</th>
              <th className="py-3 px-6 text-right">Balance</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {accounts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-slate-400">
                  No accounts found matching your criteria.
                </td>
              </tr>
            ) : (
              accounts.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-4 px-6 font-medium text-slate-900 flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4" />
                    </div>
                    {item.institution}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                      {item.type}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold ${
                        item.currency === "USD"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {item.currency}
                    </span>
                  </td>
                  <td
                    className={`py-4 px-6 text-right font-semibold ${
                      item.balance < 0 ? "text-rose-600" : "text-slate-900"
                    }`}
                  >
                    {item.currency === "USD" ? "$" : "₹"}
                    {Math.abs(item.balance).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    {item.balance < 0 && " (Cr)"}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Account"
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
