"use client";

import { ColumnDef, DataTable } from "@/components/common/DataTable";
import { TablePagination } from "@/components/common/TablePagination";
import { ArrowDownToLine, Edit2, Trash2 } from "lucide-react";

export interface IncomeItem {
  id: string;
  source: string;
  category: string;
  amount: number;
  currency: "USD" | "INR";
  date: string;
}

interface IncomeTableProps {
  incomes: IncomeItem[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalRows: number;
  refetch: () => void;
}

export function IncomeTable({
  incomes,
  loading,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalRows,
  refetch,
}: IncomeTableProps) {
  const columns: ColumnDef<IncomeItem>[] = [
    {
      header: "Source / Payer",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <ArrowDownToLine className="w-4 h-4 text-emerald-500" />
          <span className="font-semibold text-slate-900">{item.source}</span>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (item) => (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700">
          {item.category}
        </span>
      ),
    },
    {
      header: "Amount",
      cell: (item) => (
        <span className="font-medium text-emerald-600">
          +{item.currency === "USD" ? "$" : "₹"}
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
            onClick={() => console.log("Edit income:", item.id)}
            className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
            title="Edit Record"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={async () => {
              if (confirm("Delete this income record?")) {
                try {
                  await fetch(`/api/income?id=${item.id}`, {
                    method: "DELETE",
                  });
                  refetch();
                } catch (error) {
                  console.error("Failed to delete income record:", error);
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
        data={incomes}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyMessage="No income streams recorded yet. Click 'Add Income' to start."
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
