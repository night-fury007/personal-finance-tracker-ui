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

export interface AccountItem {
  id: string;
  institution: string;
  alias: string;
  type: "Checking" | "Savings" | "Credit Card" | "Wallet" | "Investment Cash";
  currency: "USD" | "INR";
  balance: number;
  status: "Active" | "Syncing" | "Inactive";
}

export const mockAccounts: AccountItem[] = [
  {
    id: "acc-1",
    institution: "Chase Bank",
    alias: "Primary Checking",
    type: "Checking",
    currency: "USD",
    balance: 14250.0,
    status: "Active",
  },
  {
    id: "acc-2",
    institution: "HDFC Bank",
    alias: "Salary & Bills",
    type: "Checking",
    currency: "INR",
    balance: 385000.0,
    status: "Active",
  },
  {
    id: "acc-3",
    institution: "American Express",
    alias: "Platinum Rewards",
    type: "Credit Card",
    currency: "USD",
    balance: -1240.5,
    status: "Active",
  },
  {
    id: "acc-4",
    institution: "Interactive Brokers",
    alias: "Uninvested Cash",
    type: "Investment Cash",
    currency: "USD",
    balance: 8500.0,
    status: "Active",
  },
  {
    id: "acc-5",
    institution: "ICICI Bank",
    alias: "Emergency Fund",
    type: "Savings",
    currency: "INR",
    balance: 750000.0,
    status: "Active",
  },
];

export interface IncomeItem {
  id: string;
  source: string;
  category: "Salary" | "Freelance" | "Dividends" | "Rental" | "Bonus" | "Other";
  currency: "USD" | "INR";
  amount: number;
  frequency: "Monthly" | "Quarterly" | "Annually" | "One-Time";
  date: string;
}

export const mockIncomes: IncomeItem[] = [
  {
    id: "inc-1",
    source: "Tech Corp Inc.",
    category: "Salary",
    currency: "USD",
    amount: 8500.0,
    frequency: "Monthly",
    date: "2026-06-01",
  },
  {
    id: "inc-2",
    source: "Bangalore Tech Labs",
    category: "Salary",
    currency: "INR",
    amount: 220000.0,
    frequency: "Monthly",
    date: "2026-06-05",
  },
  {
    id: "inc-3",
    source: "S&P 500 ETF",
    category: "Dividends",
    currency: "USD",
    amount: 450.0,
    frequency: "Quarterly",
    date: "2026-05-15",
  },
  {
    id: "inc-4",
    source: "Advisory Client X",
    category: "Freelance",
    currency: "USD",
    amount: 3200.0,
    frequency: "One-Time",
    date: "2026-05-28",
  },
  {
    id: "inc-5",
    source: "Whitefield Property Rent",
    category: "Rental",
    currency: "INR",
    amount: 45000.0,
    frequency: "Monthly",
    date: "2026-06-02",
  },
];

export interface InvestmentItem {
  id: string;
  name: string;
  ticker: string;
  region: "India" | "US";
  type: "Stock" | "Mutual Fund" | "ETF" | "PPF" | "Crypto";
  currency: "INR" | "USD";
  investedAmount: number;
  currentValue: number;
}

export const mockInvestments: InvestmentItem[] = [
  {
    id: "inv-1",
    name: "Reliance Industries",
    ticker: "RELIANCE",
    region: "India",
    type: "Stock",
    currency: "INR",
    investedAmount: 120000.0,
    currentValue: 155000.0,
  },
  {
    id: "inv-2",
    name: "Tata Consultancy Services",
    ticker: "TCS",
    region: "India",
    type: "Stock",
    currency: "INR",
    investedAmount: 90000.0,
    currentValue: 108000.0,
  },
  {
    id: "inv-3",
    name: "Vanguard S&P 500 ETF",
    ticker: "VOO",
    region: "US",
    type: "ETF",
    currency: "USD",
    investedAmount: 25000.0,
    currentValue: 31500.0,
  },
  {
    id: "inv-4",
    name: "Apple Inc.",
    ticker: "AAPL",
    region: "US",
    type: "Stock",
    currency: "USD",
    investedAmount: 10000.0,
    currentValue: 13400.0,
  },
  {
    id: "inv-5",
    name: "Public Provident Fund",
    ticker: "PPF-IND",
    region: "India",
    type: "PPF",
    currency: "INR",
    investedAmount: 500000.0,
    currentValue: 580000.0,
  },
];
