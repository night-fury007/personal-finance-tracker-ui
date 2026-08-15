"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalRows: number;
  loading?: boolean;
}

export function TablePagination({
  page,
  setPage,
  pageSize = 10,
  setPageSize,
  totalRows,
  loading = false,
}: TablePaginationProps) {
  const totalPages = Math.ceil(totalRows / pageSize) || 1;
  const startItem = totalRows === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalRows);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4 bg-white border-t border-slate-200">
      {/* Results Count Text */}
      <div className="text-sm text-slate-500 font-medium">
        Showing{" "}
        <span className="font-semibold text-slate-700">{startItem}</span> to{" "}
        <span className="font-semibold text-slate-700">{endItem}</span> of{" "}
        <span className="font-semibold text-slate-700">{totalRows}</span>{" "}
        results
      </div>

      <div className="flex items-center gap-4">
        {/* Rows Per Page Dropdown */}
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1); // Reset to first page on size change
            }}
            disabled={loading}
            className="border border-slate-200 rounded-lg px-2.5 py-1 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        {/* Page Navigation Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page <= 1 || loading}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-3 py-1 text-sm font-medium text-slate-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page >= totalPages || loading}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
