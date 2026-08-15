"use client";

import { useServerTableData } from "@/hooks/useServerTableData";
import { Download, Plus } from "lucide-react";
import { useState } from "react";

import { AddInvestmentModal } from "./AddInvestmentModal";
import { InvestmentFilters } from "./InvestmentFilters";
import { InvestmentSummaryCards } from "./InvestmentSummaryCards";
import { InvestmentItem, InvestmentTable } from "./InvestmentTable";

export function InvestmentManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const {
    data: investments,
    loading,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRows,
    refetch,
  } = useServerTableData<InvestmentItem>({
    endpoint: "/api/investments",
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* 1. Page Header & Actions */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Investment Portfolio
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track multi-currency equities, regional portfolios, and absolute
            returns.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 shadow-sm shadow-blue-600/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Investment
          </button>
        </div>
      </div>

      {/* 2. KPI Summary Cards */}
      <InvestmentSummaryCards investments={investments} />

      {/* 3. Filters & Search */}
      <InvestmentFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* 4. Abstracted Data Table & Pagination */}
      <InvestmentTable
        investments={investments}
        loading={loading}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalRows={totalRows}
        refetch={refetch}
      />

      {/* 5. Add Investment Modal */}
      <AddInvestmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          refetch();
          setPage(1);
        }}
      />
    </div>
  );
}
