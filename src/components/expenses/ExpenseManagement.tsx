"use client";

import { Download, Plus } from "lucide-react";
import { useState } from "react";
import { ExpenseItem, mockExpenses } from "../../lib/mockdata";
import { AddExpenseModal } from "./AddExpenseModal";
import { ExpenseFilters } from "./ExpenseFilters";
import { ExpenseSummaryCards } from "./ExpenseSummaryCards";
import { ExpenseTable } from "./ExpenseTable";

export function ExpenseManagement() {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(mockExpenses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter logic
  const filteredExpenses = expenses.filter((item) => {
    const matchesSearch =
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate totals
  const totalUSD = expenses
    .filter((e) => e.currency === "USD")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalINR = expenses
    .filter((e) => e.currency === "INR")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddExpense = (newExpense: ExpenseItem) => {
    setExpenses([newExpense, ...expenses]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Expenses Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track, categorize, and filter multi-currency living expenses and
            overhead.
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
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <ExpenseSummaryCards
        totalUSD={totalUSD}
        totalINR={totalINR}
        count={expenses.length}
      />

      {/* Filter & Search Toolbar */}
      <ExpenseFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Data Table */}
      <ExpenseTable
        expenses={filteredExpenses}
        onDelete={handleDeleteExpense}
      />

      {/* Add Expense Modal Form */}
      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddExpense}
      />
    </div>
  );
}
