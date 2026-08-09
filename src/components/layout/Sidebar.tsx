"use client";

import clsx from "clsx";
import {
  BarChart3,
  Landmark,
  LayoutDashboard,
  ReceiptText,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Accounts / Wallets", href: "/accounts", icon: Wallet },
  { name: "Expenses", href: "/expenses", icon: ReceiptText },
  { name: "Income", href: "/income", icon: Landmark },
  { name: "Investments", href: "/investments", icon: TrendingUp },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800 bg-slate-950/50">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
          W
        </div>
        <span className="font-semibold text-lg text-white tracking-wide">
          Wealth Engine
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3.5 py-3 rounded-lg text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "hover:bg-slate-800/60 text-slate-400 hover:text-slate-100",
              )}
            >
              <Icon
                className={clsx(
                  "w-5 h-5",
                  isActive ? "text-white" : "text-slate-400",
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Session status */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        System Status:{" "}
        <span className="text-emerald-400 font-medium">Online (Mock Mode)</span>
      </div>
    </aside>
  );
}
