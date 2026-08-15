"use client";

import { Modal } from "@/components/common/Modal";
import { Building2, Loader2 } from "lucide-react";
import React, { useState } from "react";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function AddAccountModal({
  isOpen,
  onClose,
  onSuccess,
}: AddAccountModalProps) {
  const [institution, setInstitution] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState<
    "Checking" | "Savings" | "Credit Card" | "Brokerage"
  >("Checking");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          institution,
          accountName,
          accountType,
          balance: parseFloat(balance) || 0,
          currency,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      // Reset form fields
      setInstitution("");
      setAccountName("");
      setBalance("");

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error adding account:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Link New Account"
      icon={<Building2 className="w-5 h-5" />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Financial Institution
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Chase, HDFC, Vanguard"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Account Name / Number Suffix
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Primary Checking (...4921)"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Account Type
            </label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value as any)}
              className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
            >
              <option value="Checking">Checking</option>
              <option value="Savings">Savings</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Brokerage">Brokerage</option>
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

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
            Current Balance
          </label>
          <input
            type="number"
            step="0.01"
            required
            placeholder="0.00"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
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
            Save Account
          </button>
        </div>
      </form>
    </Modal>
  );
}
