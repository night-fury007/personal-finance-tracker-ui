"use client";

import { Edit, Filter, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
}

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  onAddClick?: () => void;
}

export function DataTable<T extends { id: string }>({
  title,
  data,
  columns,
  onAddClick,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      {/* Header Action Block */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {title} Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage, filter, and audit your enterprise financial records.
          </p>
        </div>
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Record
        </button>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors border border-slate-200">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Data Table Presentation Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {columns.map((col, index) => (
                <th key={index} className="px-6 py-4">
                  {col.header}
                </th>
              ))}
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50/70 transition-colors"
              >
                {columns.map((col, index) => (
                  <td key={index} className="px-6 py-4">
                    {typeof col.accessor === "function"
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Edit className="w-4 h-4 inline" />
                  </button>
                  <button className="text-slate-400 hover:text-rose-600 transition-colors">
                    <Trash2 className="w-4 h-4 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer Controls */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing 1 to {data.length} of {data.length} entries
          </span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 bg-white border border-slate-200 rounded font-medium text-slate-700 hover:bg-slate-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
