"use client";

import { ChevronDown, Search } from "lucide-react";

interface InvestmentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
}

export function InvestmentFilters({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
}: InvestmentFiltersProps) {
  const assetClasses = [
    "All",
    "Stock",
    "Mutual Fund",
    "ETF",
    "Crypto",
    "Real Estate",
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
      {/* Search Bar */}
      <div className="relative w-full sm:w-96">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Search asset names or tickers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
        />
      </div>

      {/* Asset Class Dropdown */}
      <div className="relative w-full sm:w-56">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 pr-10 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer shadow-2xs transition-all"
        >
          {assetClasses.map((type) => (
            <option key={type} value={type}>
              {type === "All" ? "All Asset Classes" : type}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
