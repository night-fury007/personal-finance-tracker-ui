"use client";

import { ColumnDef, DataTable } from "@/components/common/DataTable";
import { TablePagination } from "@/components/common/TablePagination";
import {
  Edit2,
  PieChart,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export interface InvestmentItem {
  id: string;
  assetName: string;
  ticker: string;
  assetClass: string;
  units: number;
  currentValue: number;
  currency: "USD" | "INR";
  performance: number; // e.g., 5.4 for +5.4%, -2.1 for -2.1%
}

interface InvestmentTableProps {
  investments: InvestmentItem[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalRows: number;
  refetch: () => void;
}

export function InvestmentTable({
  investments,
  loading,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalRows,
  refetch,
}: InvestmentTableProps) {
  const columns: ColumnDef<InvestmentItem>[] = [
    {
      header: "Asset",
      cell: (item) => (
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
            <PieChart className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-900">{item.assetName}</div>
            <div className="text-xs text-slate-500">{item.ticker}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Asset Class",
      accessorKey: "assetClass",
    },
    {
      header: "Holdings",
      cell: (item) => (
        <span className="text-slate-700 font-medium">
          {item.units.toLocaleString()} units
        </span>
      ),
    },
    {
      header: "Current Value",
      cell: (item) => (
        <span className="font-semibold text-slate-900">
          {item.currency === "USD" ? "$" : "₹"}
          {item.currentValue.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Performance",
      cell: (item) => {
        const isPositive = item.performance >= 0;
        return (
          <div
            className={`flex items-center gap-1 font-semibold ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {isPositive ? "+" : ""}
            {item.performance}%
          </div>
        );
      },
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (item) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => console.log("Edit investment:", item.id)}
            className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
            title="Edit Record"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={async () => {
              if (confirm("Remove this asset from your portfolio?")) {
                try {
                  await fetch(`/api/investments?id=${item.id}`, {
                    method: "DELETE",
                  });
                  refetch();
                } catch (error) {
                  console.error("Failed to delete investment record:", error);
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
        data={investments}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyMessage="No investments found in your portfolio. Click 'Add Investment' to get started."
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
