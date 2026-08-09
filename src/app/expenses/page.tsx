"use client";

import { AppShell } from "@/components/layout/AppShell";
import { DataTable } from "@/components/ui/DataTable";
import { mockTransactions } from "@/lib/mockdata";
import { Transaction } from "@/types";

export default function ExpensesPage() {
  const expenseData = mockTransactions.filter((tx) => tx.type === "expense");

  const columns = [
    { header: "Date", accessor: "date" as keyof Transaction },
    { header: "Category", accessor: "category" as keyof Transaction },
    { header: "Description", accessor: "description" as keyof Transaction },
    {
      header: "Amount",
      accessor: (row: Transaction) => `$${row.amount.toFixed(2)}`,
    },
    { header: "Currency", accessor: "currency" as keyof Transaction },
  ];

  return (
    <AppShell>
      <DataTable title="Expenses" data={expenseData} columns={columns} />
    </AppShell>
  );
}
