"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, AreaChart, Area, XAxis, Tooltip,
} from "recharts";
import { TrendingUp, Zap, Globe, BookOpen, Rocket, Sparkles } from "lucide-react";

const BASE = {
  salary: 45000,     // INR per month
  savings: 28,       // percent
  careerGrowth: 50,  // index
  globalMobility: 71,
  opportunityIndex: 82,
};

const SCENARIOS = [
  {
    id: "learn-ai",
    icon: BookOpen,
    label: "Master AI/ML",
    color: "#7C3AED",
    impact: { salary: 35, savings: 8, careerGrowth: 40, globalMobility: 15, opportunityIndex: 12 },
  },
  {
    id: "move-sg",
    icon: Globe,
    label: "Move to Singapore",
    color: "#06B6D4",
    impact: { salary: 180, savings: 15, careerGrowth: 30, globalMobility: 100, opportunityIndex: 20 },
  },
  {
    id: "higher-studies",
    icon: Zap,
    label: "Higher Studies (NTU)",
    color: "#F59E0B",
    impact: { salary: 60, savings: -10, careerGrowth: 50, globalMobility: 25, opportunityIndex: 18 },
  },
  {
    id: "startup",
    icon: Rocket,
    label: "Launch a Startup",
    color: "#EF4444",
    impact: { salary: -20, savings: -30, careerGrowth: 80, globalMobility: 10, opportunityIndex: 15 },
  },
];

function Slider({ label, value, onChange, min = 0, max = 100, color = "#2563EB" }: {
  label: string; value: number; onChange: (v: number) => void;
  min?: number; max?: number; color?: string;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-zinc-300 text-sm font-medium">{label}</span>
        <span className="text-white font-bold text-sm tabular-nums" style={{ color }}>{value}%</span>
      </div>
      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div className="absolute left-0 top-0 h-full rounded-full"
          style={{ width: `${((value - min) / (max - min)) * 100}%`, background: color }} />
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-1 opacity-0 absolute cursor-pointer"
        style={{ marginTop: -14, height: 14, position: "relative" }} />
    </div>
  );
}

export default function SimulatorPage() {
  const [activeScenarios, setActiveScenarios] = useState<string[]>([]);
  const [sliders, setSliders] = useState({
    "learn-ai": 50,
    "move-sg": 30,
    "higher-studies": 20,
    "startup": 10,
  });

  function toggleScenario(id: string) {
    setActiveScenarios((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  function computeMetric(key: keyof typeof BASE) {
    let value = BASE[key];
    for (const scenId of activeScenarios) {
      const scenario = SCENARIOS.find((s) => s.id === scenId)!;
      const sliderPct = (sliders as Record<string, number>)[scenId] / 100;
      const impact = scenario.impact[key] || 0;
      value += (value * (impact / 100)) * sliderPct;
    }
    return Math.round(value);
  }

  const results = {
    salary: computeMetric("salary"),
    savings: computeMetric("savings"),
    careerGrowth: computeMetric("careerGrowth"),
    globalMobility: Math.min(computeMetric("globalMobility"), 100),
    opportunityIndex: Math.min(computeMetric("opportunityIndex"), 100),
  };

  const radarData = [
    { subject: "Career Growth", value: Math.min(results.careerGrowth, 100), base: BASE.careerGrowth },
    { subject: "Mobility", value: results.globalMobility, base: BASE.globalMobility },
    { subject: "Opp. Index", value: results.opportunityIndex, base: BASE.opportunityIndex },
    { subject: "Savings Rate", value: Math.max(Math.min(results.savings, 100), 0), base: BASE.savings },
    { subject: "Salary Growth", value: Math.min(Math.round(((results.salary - BASE.salary) / BASE.salary) * 100 + 50), 100), base: 50 },
  ];

  const salaryHistory = [
    { year: "2026", base: BASE.salary / 1000, projected: BASE.salary / 1000 },
    { year: "2027", base: BASE.salary * 1.1 / 1000, projected: results.salary * 1.05 / 1000 },
    { year: "2028", base: BASE.salary * 1.2 / 1000, projected: results.salary * 1.2 / 1000 },
    { year: "2029", base: BASE.salary * 1.3 / 1000, projected: results.salary * 1.4 / 1000 },
    { year: "2030", base: BASE.salary * 1.4 / 1000, projected: results.salary * 1.65 / 1000 },
  ];

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Future Simulator</h1>
        <p className="text-zinc-400 text-sm">Explore how different choices reshape your career trajectory</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Scenario toggles + sliders */}
        <div className="xl:col-span-1 space-y-5">
          <div className="glass-card p-6">
            <p className="text-white font-semibold text-sm mb-4">Choose Scenarios</p>
            <div className="space-y-3">
              {SCENARIOS.map(({ id, icon: Icon, label, color }) => {
                const isActive = activeScenarios.includes(id);
                return (
                  <div key={id}>
                    <motion.button
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleScenario(id)}
                      className="w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left"
                      style={{
                        background: isActive ? `${color}15` : "rgba(255,255,255,0.03)",
                        border: `1px solid ${isActive ? color + "40" : "rgba(255,255,255,0.06)"}`,
                        boxShadow: isActive ? `0 0 20px ${color}20` : "none",
                      }}
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background: `${color}20` }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <span className="text-sm font-medium" style={{ color: isActive ? "white" : "#71717A" }}>
                        {label}
                      </span>
                      <div className="ml-auto">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center`}
                          style={{ borderColor: isActive ? color : "rgba(255,255,255,0.2)" }}>
                          {isActive && <div className="w-2 h-2 rounded-full" style={{ background: color }} />}
                        </div>
                      </div>
                    </motion.button>

                    {isActive && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 px-3">
                        <Slider
                          label={`${label} intensity`}
                          value={(sliders as Record<string, number>)[id]}
                          onChange={(v) => setSliders((prev) => ({ ...prev, [id]: v }))}
                          color={color}
                        />
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Summary */}
          <div className="glass-card p-5" style={{ borderColor: "rgba(37,99,235,0.2)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-white font-semibold text-sm">AI Prediction</p>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">
              {activeScenarios.length === 0
                ? "Select scenarios above to see how your choices reshape your future. The AI will predict salary, savings, career growth, and global mobility."
                : `With your selected paths, your projected monthly salary reaches ₹${results.salary.toLocaleString()} by 2027, with a ${results.globalMobility}% global mobility score. ${results.salary > BASE.salary ? "🚀 Strong upward trajectory." : "⚠️ Some short-term trade-offs required."}`}
            </p>
          </div>
        </div>

        {/* Right: Charts */}
        <div className="xl:col-span-2 space-y-6">
          {/* Result metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Projected Salary", value: `₹${(results.salary / 1000).toFixed(0)}K/mo`, base: `₹${(BASE.salary / 1000).toFixed(0)}K`, color: "#22C55E" },
              { label: "Savings Rate", value: `${Math.max(results.savings, 0)}%`, base: `${BASE.savings}%`, color: "#2563EB" },
              { label: "Career Growth Index", value: `${Math.min(results.careerGrowth, 100)}`, base: `${BASE.careerGrowth}`, color: "#7C3AED" },
              { label: "Global Mobility", value: `${results.globalMobility}%`, base: `${BASE.globalMobility}%`, color: "#06B6D4" },
              { label: "Opportunity Index", value: `${results.opportunityIndex}`, base: `${BASE.opportunityIndex}`, color: "#F59E0B" },
            ].map(({ label, value, base, color }) => (
              <motion.div key={label} className="glass-card p-4"
                whileHover={{ y: -2 }}>
                <p className="text-zinc-500 text-xs mb-1">{label}</p>
                <motion.p key={value} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className="text-white font-black text-xl" style={{ color }}>
                  {value}
                </motion.p>
                <p className="text-zinc-600 text-xs mt-1">Base: {base}</p>
              </motion.div>
            ))}
          </div>

          {/* Radar chart */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold text-sm mb-5">Capability Radar</h3>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#71717A", fontSize: 11 }} />
                <Radar name="Base" dataKey="base" stroke="#3F3F46" fill="#3F3F46" fillOpacity={0.2} />
                <Radar name="Projected" dataKey="value" stroke="#2563EB" fill="#2563EB" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Salary projection chart */}
          <div className="glass-card p-6">
            <h3 className="text-white font-semibold text-sm mb-5">5-Year Salary Projection (₹K/month)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={salaryHistory}>
                <defs>
                  <linearGradient id="projGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3F3F46" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3F3F46" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fill: "#52525B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "rgba(9,9,11,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                  labelStyle={{ color: "#94A3B8" }}
                />
                <Area type="monotone" dataKey="base" name="Base Path" stroke="#3F3F46" fill="url(#baseGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="projected" name="Projected Path" stroke="#2563EB" fill="url(#projGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
