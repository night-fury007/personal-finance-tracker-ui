"use client";

import { Modal } from "@/components/common/Modal";
import { Loader2, PieChart } from "lucide-react";
import React, { useState } from "react";

interface AddInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddInvestmentModal({
  isOpen,
  onClose,
  onSuccess,
}: AddInvestmentModalProps) {
  const [assetName, setAssetName] = useState("");
  const [ticker, setTicker] = useState("");
  const [assetClass, setAssetClass] = useState("Stock");
  const [units, setUnits] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [performance, setPerformance] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/investments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetName,
          ticker: ticker.toUpperCase(),
          assetClass,
          units: parseFloat(units) || 0,
          currentValue: parseFloat(currentValue) || 0,
          currency,
          performance: parseFloat(performance) || 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to record investment");
      }

      // Reset form fields
      setAssetName("");
      setTicker("");
      setUnits("");
      setCurrentValue("");
      setPerformance("");

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding investment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Investment"
      icon={<PieChart className="w-5 h-5" />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Asset Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Apple Inc, Vanguard Index"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Ticker Symbol
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AAPL, VOO"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Asset Class
            </label>
            <select
              value={assetClass}
              onChange={(e) => setAssetClass(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="Stock">Stock</option>
              <option value="Mutual Fund">Mutual Fund</option>
              <option value="ETF">ETF</option>
              <option value="Crypto">Crypto</option>
              <option value="Real Estate">Real Estate</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Units Held
            </label>
            <input
              type="number"
              step="any"
              required
              placeholder="0.00"
              value={units}
              onChange={(e) => setUnits(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Current Value
            </label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              required
              placeholder="e.g. 12.5"
              value={performance}
              onChange={(e) => setPerformance(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-50 transition-all shadow-sm shadow-blue-600/20 cursor-pointer"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            Save Investment
          </button>
        </div>
      </form>
    </Modal>
  );
}
