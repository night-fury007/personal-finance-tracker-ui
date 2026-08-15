"use client";

import { ColumnDef, DataTable } from "@/components/common/DataTable";
import { TablePagination } from "@/components/common/TablePagination";
import { Building2, Edit2, Trash2 } from "lucide-react";

// 1. Export the interface so the parent can use it too
export interface AccountItem {
  id: string;
  institution: string;
  accountName: string;
  accountType: "Checking" | "Savings" | "Credit Card" | "Brokerage";
  balance: number;
  currency: "USD" | "INR";
}

interface AccountTableProps {
  accounts: AccountItem[];
  loading: boolean;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalRows: number;
  refetch: () => void;
}

export function AccountTable({
  accounts,
  loading,
  page,
  setPage,
  pageSize,
  setPageSize,
  totalRows,
  refetch,
}: AccountTableProps) {
  // 2. Column definitions live here, keeping the main page clean
  const columns: ColumnDef<AccountItem>[] = [
    {
      header: "Institution",
      cell: (item) => (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-900">
            {item.institution}
          </span>
        </div>
      ),
    },
    {
      header: "Account Name",
      accessorKey: "accountName",
    },
    {
      header: "Type",
      cell: (item) => {
        const colors = {
          Checking: "bg-blue-50 text-blue-700",
          Savings: "bg-emerald-50 text-emerald-700",
          "Credit Card": "bg-rose-50 text-rose-700",
          Brokerage: "bg-purple-50 text-purple-700",
        };
        return (
          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded-full ${colors[item.accountType]}`}
          >
            {item.accountType}
          </span>
        );
      },
    },
    {
      header: "Balance",
      cell: (item) => (
        <span className="font-medium text-slate-900">
          {item.currency === "USD" ? "$" : "₹"}
          {item.balance.toLocaleString()}
        </span>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      cell: (item) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => console.log("Edit:", item.id)}
            className="p-1.5 hover:bg-blue-50 text-slate-500 hover:text-blue-600 rounded-lg transition-colors cursor-pointer"
            title="Edit Account"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={async () => {
              if (confirm("Delete this account mapping?")) {
                try {
                  await fetch(`/api/accounts?id=${item.id}`, {
                    method: "DELETE",
                  });
                  refetch();
                } catch (error) {
                  console.error("Failed to delete account:", error);
                }
              }
            }}
            className="p-1.5 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
            title="Delete Account"
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
        data={accounts}
        loading={loading}
        keyExtractor={(item) => item.id}
        emptyMessage="No linked accounts found. Click 'Add Account' to get started."
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
