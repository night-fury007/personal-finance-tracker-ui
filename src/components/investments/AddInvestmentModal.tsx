"use client";

import { InvestmentItem } from "@/lib/mockdata";
import { X } from "lucide-react";
import { useState } from "react";

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (investment: InvestmentItem) => void;
}

export function AddInvestmentModal({
  isOpen,
  onClose,
  onAdd,
}: AddInvestmentModalProps) {
  const [name, setName] = useState("");
  const [ticker, setTicker] = useState("");
  const [region, setRegion] = useState<"India" | "US">("India");
  const [type, setType] = useState<InvestmentItem["type"]>("Stock");
  const [investedAmount, setInvestedAmount] = useState("");
  const [currentValue, setCurrentValue] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !ticker || !investedAmount || !currentValue) return;

    const newInvestment: InvestmentItem = {
      id: `inv-${Date.now()}`,
      name,
      ticker: ticker.toUpperCase(),
      region,
      type,
      currency: region === "India" ? "INR" : "USD",
      investedAmount: parseFloat(investedAmount),
      currentValue: parseFloat(currentValue),
    };

    onAdd(newInvestment);
    setName("");
    setTicker("");
    setInvestedAmount("");
    setCurrentValue("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-lg">
            Add New Investment
          </h3>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Asset Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Apple Inc., Reliance Industries"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Ticker Symbol
              </label>
              <input
                type="text"
                required
                placeholder="e.g. AAPL, RELIANCE"
                value={ticker}
                onChange={(e) => setTicker(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Market Region
              </label>
              <select
                value={region}
                onChange={(e) => {
                  const reg = e.target.value as "India" | "US";
                  setRegion(reg);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              >
                <option value="India">India (INR ₹)</option>
                <option value="US">US (USD $)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
              Asset Type
            </label>
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value as InvestmentItem["type"])
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            >
              <option value="Stock">Stock / Equity</option>
              <option value="Mutual Fund">Mutual Fund</option>
              <option value="ETF">ETF</option>
              <option value="PPF">PPF / Provident Fund</option>
              <option value="Crypto">Crypto</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Invested Amount
              </label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                value={investedAmount}
                onChange={(e) => setInvestedAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">
                Current Value
              </label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
            >
              Save Investment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
