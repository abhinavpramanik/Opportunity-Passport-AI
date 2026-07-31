"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, RadialBarChart, RadialBar,
} from "recharts";
import { TrendingUp, AlertTriangle, Target, Sparkles, PiggyBank } from "lucide-react";
import { finance } from "@/data/finance";

const CHART_COLORS = ["#2563EB", "#7C3AED", "#22C55E"];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-3 rounded-xl text-xs"
      style={{ background: "rgba(9,9,11,0.95)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <p className="text-zinc-400 mb-2 font-medium">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-zinc-400">{p.name}: </span>
          <span className="text-white font-semibold">₹{p.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

function EmergencyFundGauge() {
  const pct = Math.min((finance.emergencyFund.current / finance.emergencyFund.recommended) * 100, 100);
  const data = [{ value: pct, fill: pct < 50 ? "#EF4444" : pct < 80 ? "#F59E0B" : "#22C55E" }];

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-4 h-4 text-yellow-400" />
        <h3 className="text-white font-semibold text-sm">Emergency Fund</h3>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative w-32 h-32">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius={35} outerRadius={55}
              startAngle={90} endAngle={-270} data={data}>
              <RadialBar dataKey="value" cornerRadius={5} background={{ fill: "rgba(255,255,255,0.05)" }} />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-black text-white">{Math.round(pct)}%</span>
            <span className="text-zinc-500 text-xs">Funded</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="space-y-3">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Current Fund</p>
              <p className="text-white font-bold">₹{finance.emergencyFund.current.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-zinc-500 text-xs mb-1">Recommended (3 months)</p>
              <p className="text-zinc-300 font-semibold">₹{finance.emergencyFund.recommended.toLocaleString()}</p>
            </div>
            <div className="p-2 rounded-lg"
              style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}>
              <p className="text-yellow-400 text-xs font-medium">
                Covers only {finance.emergencyFund.months.toFixed(1)} months
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FinancePage() {
  const spendingData = finance.categories.map((c) => ({
    name: c.label.split(" ")[0],
    current: c.current,
    recommended: c.recommended,
  }));

  const investPieData = finance.investments.map((inv, i) => ({
    name: inv.type,
    value: inv.allocation,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }));

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Finance</h1>
        <p className="text-zinc-400 text-sm">Your financial health and savings roadmap</p>
      </motion.div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Monthly Income", value: `₹${(finance.monthlySalary / 1000).toFixed(0)}K`, color: "#22C55E", icon: PiggyBank },
          { label: "Savings Rate", value: `${finance.savingsRate}%`, color: "#2563EB", icon: TrendingUp },
          { label: "Total Savings", value: `₹${(finance.savings / 1000).toFixed(0)}K`, color: "#7C3AED", icon: Target },
          { label: "Credit Score", value: `${finance.creditScore}`, color: "#F59E0B", icon: Sparkles },
        ].map(({ label, value, color, icon: Icon }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card p-5">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4" style={{ color }} />
              <p className="text-zinc-500 text-xs">{label}</p>
            </div>
            <p className="text-2xl font-black" style={{ color }}>{value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Monthly cash flow chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <h3 className="text-white font-semibold text-sm mb-5">Monthly Cash Flow</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={finance.monthlyChart}>
              <defs>
                <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="savings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="Income" stroke="#22C55E" strokeWidth={2} fill="url(#income)" />
              <Area type="monotone" dataKey="expenses" name="Expenses" stroke="#EF4444" strokeWidth={2} fill="url(#expenses)" />
              <Area type="monotone" dataKey="savings" name="Savings" stroke="#2563EB" strokeWidth={2} fill="url(#savings)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Spending vs recommended */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="text-white font-semibold text-sm mb-5">Spending vs Recommended</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={spendingData} barCategoryGap="35%">
              <XAxis dataKey="name" tick={{ fill: "#52525B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="current" name="Current" fill="#7C3AED" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
              <Bar dataKey="recommended" name="Recommended" fill="#22C55E" radius={[4, 4, 0, 0]} fillOpacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <EmergencyFundGauge />

        {/* Investment allocation */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6">
          <h3 className="text-white font-semibold text-sm mb-4">Recommended Allocation</h3>
          <div className="flex items-center gap-4 mb-4">
            <PieChart width={100} height={100}>
              <Pie data={investPieData} cx={50} cy={50} innerRadius={28} outerRadius={46}
                dataKey="value" paddingAngle={3}>
                {investPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className="flex-1 space-y-2">
              {investPieData.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <p className="text-zinc-400 text-xs flex-1 truncate">{d.name}</p>
                  <p className="text-white text-xs font-bold">{d.value}%</p>
                </div>
              ))}
            </div>
          </div>
          {finance.investments.map((inv) => (
            <div key={inv.type} className="p-3 rounded-xl mb-2"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center justify-between mb-1">
                <p className="text-white text-xs font-medium">{inv.type}</p>
                <span className="text-green-400 text-xs font-bold">+{inv.expectedReturn}% pa</span>
              </div>
              <p className="text-zinc-500 text-xs">{inv.description}</p>
            </div>
          ))}
        </motion.div>

        {/* AI Insight */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-white font-semibold text-sm">AI Finance Insight</h3>
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">{finance.aiInsight}</p>

          <div className="mt-6 space-y-3">
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wide">Action Plan</p>
            {[
              "Redirect ₹7K/mo from entertainment to savings",
              "Open Zerodha + invest ₹10K/mo in Nifty 50 index",
              "Top up emergency fund to ₹2.7L in 6 months",
              "Get a Wise multi-currency account before SG move",
            ].map((action, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>
                  {i + 1}
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">{action}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
