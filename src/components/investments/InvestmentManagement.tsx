"use client";

import { InvestmentItem, mockInvestments } from "@/lib/mockdata";
import { Download, Plus } from "lucide-react";
import { useState } from "react";
import { AddInvestmentModal } from "./AddInvestmentModal";
import { InvestmentFilters } from "./InvestmentFilters";
import { InvestmentSummaryCards } from "./InvestmentSummaryCards";
import { InvestmentTable } from "./InvestmentTable";

export function InvestmentManagement() {
  const [investments, setInvestments] = useState<InvestmentItem[]>(
    mockInvestments || [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter investments safely with fallback to empty array
  const filteredInvestments = (investments || []).filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ticker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || item.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const handleAddInvestment = (newInvestment: InvestmentItem) => {
    setInvestments([newInvestment, ...investments]);
  };

  const handleDeleteInvestment = (id: string) => {
    setInvestments(investments.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Investments Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track multi-currency equities, regional portfolios, mutual funds,
            and absolute returns.
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
            <Plus className="w-4 h-4" /> Add Investment
          </button>
        </div>
      </div>

      {/* Regional Performance KPI Cards */}
      <InvestmentSummaryCards investments={investments} />

      {/* Filter & Search Toolbar */}
      <InvestmentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />

      {/* Investments Table */}
      <InvestmentTable
        investments={filteredInvestments}
        onDelete={handleDeleteInvestment}
      />

      {/* Add Investment Modal */}
      <AddInvestmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddInvestment}
      />
    </div>
  );
}
