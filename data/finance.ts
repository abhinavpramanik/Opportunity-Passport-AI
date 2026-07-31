import type { FinanceData } from "@/types";

export const finance: FinanceData = {
  monthlySalary: 45000,
  currency: "INR",
  savings: 120000,
  savingsRate: 28,
  emergencyFund: {
    current: 120000,
    recommended: 270000,
    months: 1.33,
  },
  categories: [
    { label: "Housing & Utilities", current: 12000, recommended: 10000, currency: "INR" },
    { label: "Food & Dining", current: 8000, recommended: 6000, currency: "INR" },
    { label: "Transportation", current: 4000, recommended: 3000, currency: "INR" },
    { label: "Learning & Courses", current: 3000, recommended: 5000, currency: "INR" },
    { label: "Entertainment", current: 5000, recommended: 3000, currency: "INR" },
    { label: "Savings & Investments", current: 8000, recommended: 15000, currency: "INR" },
    { label: "Miscellaneous", current: 5000, recommended: 3000, currency: "INR" },
  ],
  investments: [
    {
      type: "Index Mutual Funds",
      allocation: 50,
      expectedReturn: 12,
      risk: "medium",
      description: "Nifty 50 index fund — best for long-term wealth creation.",
    },
    {
      type: "Fixed Deposit",
      allocation: 30,
      expectedReturn: 7.5,
      risk: "low",
      description: "Safe parking for emergency fund top-up.",
    },
    {
      type: "ELSS (Tax Saving)",
      allocation: 20,
      expectedReturn: 14,
      risk: "medium",
      description: "Save ₹1.5L/year under 80C with higher expected returns.",
    },
  ],
  creditScore: 748,
  aiInsight:
    "Your savings rate of 28% is good, but your emergency fund covers only 1.3 months. Aim for 3 months. Redirect ₹7,000/month from entertainment and miscellaneous to reach your Singapore fund target in 8 months.",
  monthlyChart: [
    { month: "Jan", income: 45000, expenses: 32000, savings: 13000 },
    { month: "Feb", income: 45000, expenses: 34000, savings: 11000 },
    { month: "Mar", income: 48000, expenses: 31000, savings: 17000 },
    { month: "Apr", income: 45000, expenses: 36000, savings: 9000 },
    { month: "May", income: 50000, expenses: 33000, savings: 17000 },
    { month: "Jun", income: 45000, expenses: 30000, savings: 15000 },
    { month: "Jul", income: 45000, expenses: 32000, savings: 13000 },
  ],
};
