"use client";

import { useServerTableData } from "@/hooks/useServerTableData";
import { Download, Plus } from "lucide-react";
import { useState } from "react";

import { AddExpenseModal } from "./AddExpenseModal";
import { ExpenseFilters } from "./ExpenseFilters";
import { ExpenseSummaryCards } from "./ExpenseSummaryCards";
import { ExpenseItem, ExpenseTable } from "./ExpenseTable";

export function ExpenseManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const {
    data: expenses,
    loading,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalRows,
    refetch,
  } = useServerTableData<ExpenseItem>({
    endpoint: "/api/expenses",
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* 1. Page Header & Actions */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Expense Tracking
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Monitor and manage your outgoing cash flow.
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
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>
      </div>

      {/* 2. KPI Summary Cards */}
      <ExpenseSummaryCards expenses={expenses} />

      {/* 3. Filters & Search */}
      <ExpenseFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* 4. Abstracted Data Table & Pagination */}
      <ExpenseTable
        expenses={expenses}
        loading={loading}
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalRows={totalRows}
        refetch={refetch}
      />

      {/* 5. Add Expense Modal */}
      <AddExpenseModal
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
