"use client";

import { IncomeItem, mockIncomes } from "@/lib/mockdata";
import { Download, Plus } from "lucide-react";
import { useState } from "react";
import { AddIncomeModal } from "./AddIncomeModal";
import { IncomeFilters } from "./IncomeFilters";
import { IncomeSummaryCards } from "./IncomeSummaryCards";
import { IncomeTable } from "./IncomeTable";

export function IncomeManagement() {
  const [incomes, setIncomes] = useState<IncomeItem[]>(mockIncomes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter income list
  const filteredIncomes = incomes.filter((item) => {
    const matchesSearch =
      item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate totals by currency
  const totalUSD = incomes
    .filter((inc) => inc.currency === "USD")
    .reduce((sum, inc) => sum + inc.amount, 0);

  const totalINR = incomes
    .filter((inc) => inc.currency === "INR")
    .reduce((sum, inc) => sum + inc.amount, 0);

  const handleAddIncome = (newIncome: IncomeItem) => {
    setIncomes([newIncome, ...incomes]);
  };

  const handleDeleteIncome = (id: string) => {
    setIncomes(incomes.filter((inc) => inc.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Income Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track multi-currency salary streams, freelance consulting, and
            investment dividends.
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
            <Plus className="w-4 h-4" /> Add Income
          </button>
        </div>
      </div>

      {/* 2 Currency KPI Cards */}
      <IncomeSummaryCards
        totalUSD={totalUSD}
        totalINR={totalINR}
        count={incomes.length}
      />

      {/* Filter & Search Toolbar */}
      <IncomeFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Income Table */}
      <IncomeTable incomes={filteredIncomes} onDelete={handleDeleteIncome} />

      {/* Add Income Modal */}
      <AddIncomeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddIncome}
      />
    </div>
  );
}
