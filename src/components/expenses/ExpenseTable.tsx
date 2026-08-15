"use client";

import { ColumnDef, DataTable } from "@/components/common/DataTable";
import { TablePagination } from "@/components/common/TablePagination";
import { ArrowUpRight, Edit2, Trash2 } from "lucide-react";

export interface ExpenseItem {
  id: string;
  merchant: string;
  category: string;
  amount: number;
  currency: "USD" | "INR";
  date: string;
}

interface ExpenseTableProps {
  expenses: ExpenseItem[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalRows: number;
  refetch: () => void;
}

export function ExpenseTable({
  expenses,
  loading,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalRows,
  refetch,
}: ExpenseTableProps) {
  const columns: ColumnDef<ExpenseItem>[] = [
    {
      header: "Merchant",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <ArrowUpRight className="w-4 h-4 text-rose-500" />
          <span className="font-semibold text-slate-900">{item.merchant}</span>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (item) => (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700">
          {item.category}
        </span>
      ),
    },
    {
      header: "Amount",
      cell: (item) => (
        <span className="font-medium text-rose-600">
          -{item.currency === "USD" ? "$" : "₹"}
          {item.amount.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (item) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => console.log("Edit expense:", item.id)}
            className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
            title="Edit Record"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={async () => {
              if (confirm("Delete this expense record?")) {
                try {
                  await fetch(`/api/expenses?id=${item.id}`, {
                    method: "DELETE",
                  });
                  refetch();
                } catch (error) {
                  console.error("Failed to delete expense record:", error);
                }
              }
            }}
            className="p-1.5 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
            title="Delete Record"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-0">
      <DataTable
        columns={columns}
        data={expenses}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyMessage="No expenses recorded yet. Click 'Add Expense' to start."
      />
      <TablePagination
        page={page}
        setPage={setPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalRows={totalRows}
        loading={loading}
      />
    </div>
  );
}
