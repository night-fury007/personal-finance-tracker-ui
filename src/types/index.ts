export interface Account {
  id: string;
  name: string;
  type: "Checking" | "Savings" | "Credit Card" | "Cash Wallet" | "Investment";
  balance: number;
  currency: "USD" | "INR";
  institution: string;
  accountNumberMasked: string;
}

export interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  currency: "USD" | "INR";
  type: "expense" | "income" | "investment";
}

export interface DashboardMetrics {
  totalNetWorth: number;
  monthlyCashFlow: number;
  liquidCashBalance: number;
  netWorthChangePercent: number;
  cashFlowChangePercent: number;
  liquidCashChangePercent: number;
}

export interface PortfolioHolding {
  id: string;
  assetName: string;
  ticker: string;
  assetType: "Stock" | "Mutual Fund" | "PPF" | "Crypto";
  investedValue: number;
  currentValuation: number;
  currency: "USD" | "INR";
  returnsPercent: number;
}
