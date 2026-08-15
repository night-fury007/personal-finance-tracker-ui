"use client";

import { AccountItem, mockAccounts } from "@/lib/mockdata";
import { Download, Plus } from "lucide-react";
import { useState } from "react";
import { AccountFilters } from "./AccountFilters";
import { AccountSummaryCards } from "./AccountSummaryCards";
import { AccountTable } from "./AccountTable";
import { AddAccountModal } from "./AddAccountModal";

export function AccountManagement() {
  const [accounts, setAccounts] = useState<AccountItem[]>(mockAccounts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter accounts
  const filteredAccounts = accounts.filter((item) => {
    const matchesSearch =
      item.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.alias.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "All" || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Calculate totals by currency
  const totalUSD = accounts
    .filter((acc) => acc.currency === "USD")
    .reduce((sum, acc) => sum + acc.balance, 0);

  const totalINR = accounts
    .filter((acc) => acc.currency === "INR")
    .reduce((sum, acc) => sum + acc.balance, 0);

  const handleAddAccount = (newAccount: AccountItem) => {
    setAccounts([newAccount, ...accounts]);
  };

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Accounts & Wallets
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage multi-currency bank accounts, cash reserves, and revolving
            credit lines.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" /> Add Account
          </button>
        </div>
      </div>

      {/* 2 KPI Cards (USD and INR) */}
      <AccountSummaryCards
        totalUSD={totalUSD}
        totalINR={totalINR}
        count={accounts.length}
      />

      {/* Filter & Search Toolbar */}
      <AccountFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* Accounts Table */}
      <AccountTable
        accounts={filteredAccounts}
        onDelete={handleDeleteAccount}
      />

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddAccount}
      />
    </div>
  );
}
