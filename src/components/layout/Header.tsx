"use client";

import { Bell, ChevronDown, Search } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 shadow-xs">
      {/* Search Input Bar */}
      <div className="relative w-96">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search accounts, expenses, transactions..."
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Right Action Cluster */}
      <div className="flex items-center gap-5">
        {/* Currency Preference Toggle */}
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 border border-slate-200">
          <span>Currency:</span>
          <select className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer">
            <option value="USD">USD ($)</option>
            <option value="INR">INR (₹)</option>
          </select>
        </div>

        {/* Notification Bell */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full" />
        </button>

        {/* User Profile Dropdown Placeholder */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            AE
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-semibold text-slate-800 leading-tight">
              Architect Admin
            </span>
            <span className="text-xs text-slate-500">
              admin@wealthengine.io
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
        </div>
      </div>
    </header>
  );
}
