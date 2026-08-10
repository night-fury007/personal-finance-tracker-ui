export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "income" | "expense" | "investment";
}

export interface PortfolioMetric {
  market: string;
  currency: string;
  currentValue: number;
  investedAmount: number;
  absoluteProfitLoss: number;
  percentageProfitLoss: number;
}

export interface LiquidCashMetric {
  currencyCode: string;
  symbol: string;
  balance: number;
}

export const mockMetrics = {
  indiaPortfolio: {
    market: "India Portfolio",
    currency: "₹",
    currentValue: 850000,
    investedAmount: 720000,
    absoluteProfitLoss: 130000,
    percentageProfitLoss: 18.06,
  },
  usPortfolio: {
    market: "US Portfolio",
    currency: "$",
    currentValue: 42500,
    investedAmount: 35000,
    absoluteProfitLoss: 7500,
    percentageProfitLoss: 21.43,
  },
  usLiquidCash: {
    currencyCode: "USD",
    symbol: "$",
    balance: 12450,
  },
  inrLiquidCash: {
    currencyCode: "INR",
    symbol: "₹",
    balance: 245000,
  },
};

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2026-06-01",
    description: "Tech Corp Salary",
    category: "Income",
    amount: 4500,
    type: "income",
  },
  {
    id: "2",
    date: "2026-06-03",
    description: "Rent & Utilities",
    category: "Housing",
    amount: 1500,
    type: "expense",
  },
  {
    id: "3",
    date: "2026-06-05",
    description: "US Index ETF Buy",
    category: "Investment",
    amount: 1200,
    type: "investment",
  },
  {
    id: "4",
    date: "2026-06-08",
    description: "Whole Foods Market",
    category: "Dining",
    amount: 250,
    type: "expense",
  },
  {
    id: "5",
    date: "2026-06-10",
    description: "Nifty 50 Index Fund",
    category: "Investment",
    amount: 25000,
    type: "investment",
  },
];

export interface ExpenseItem {
  id: string;
  date: string;
  description: string;
  category:
    | "Housing"
    | "Dining"
    | "Utilities"
    | "Travel"
    | "Healthcare"
    | "Subscriptions";
  amount: number;
  currency: "INR" | "USD";
  paymentMethod: string;
}

export const mockExpenses: ExpenseItem[] = [
  {
    id: "exp-1",
    date: "2026-06-01",
    description: "Apartment Rent",
    category: "Housing",
    amount: 1200,
    currency: "USD",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "exp-2",
    date: "2026-06-03",
    description: "Grocery Run (Whole Foods)",
    category: "Dining",
    amount: 350,
    currency: "USD",
    paymentMethod: "Credit Card",
  },
  {
    id: "exp-3",
    date: "2026-06-05",
    description: "Electricity & Fiber Internet",
    category: "Utilities",
    amount: 4500,
    currency: "INR",
    paymentMethod: "Auto Debit",
  },
  {
    id: "exp-4",
    date: "2026-06-08",
    description: "Flight to Mumbai",
    category: "Travel",
    amount: 850,
    currency: "USD",
    paymentMethod: "Credit Card",
  },
  {
    id: "exp-5",
    date: "2026-06-10",
    description: "Cloud Infrastructure & SaaS",
    category: "Subscriptions",
    amount: 120,
    currency: "USD",
    paymentMethod: "Corporate Card",
  },
  {
    id: "exp-6",
    date: "2026-06-12",
    description: "Annual Health Checkup",
    category: "Healthcare",
    amount: 6500,
    currency: "INR",
    paymentMethod: "UPI",
  },
];
