"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight, Sparkles, Globe, AlertTriangle } from "lucide-react";
import { mobility } from "@/data/mobility";
import {
  RadialBarChart, RadialBar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell,
} from "recharts";

function ReadinessGauge({ score }: { score: number }) {
  const color = score >= 80 ? "#22C55E" : score >= 60 ? "#F59E0B" : "#EF4444";
  const data = [{ value: score, fill: color }];

  return (
    <div className="relative w-40 h-40 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius={45} outerRadius={68}
          startAngle={90} endAngle={-270} data={data}>
          <RadialBar dataKey="value" cornerRadius={8} background={{ fill: "rgba(255,255,255,0.04)" }} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-4xl font-black" style={{ color }}>{score}%</p>
        <p className="text-zinc-400 text-xs mt-0.5">Ready</p>
      </div>
    </div>
  );
}

export default function MobilityPage() {
  const costData = mobility.costOfLiving.filter((c) => c.category !== "Total Monthly Est.");

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Globe className="w-6 h-6 text-primary" />
          <h1 className="text-3xl font-black text-white">Global Mobility</h1>
        </div>
        <p className="text-zinc-400 text-sm">Your personalized India → Singapore transition roadmap</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left: Readiness score + AI insight */}
        <div className="xl:col-span-1 space-y-6">
          {/* Readiness card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} className="glass-card p-6 text-center"
            style={{ borderColor: "rgba(37,99,235,0.2)" }}>
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-2xl">🇮🇳</span>
              <ArrowRight className="w-5 h-5 text-zinc-500" />
              <span className="text-2xl">🇸🇬</span>
            </div>
            <p className="text-zinc-400 text-xs mb-4">India → Singapore</p>
            <ReadinessGauge score={mobility.readinessScore} />
            <div className="mt-5 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Visa Type</span>
                <span className="text-white font-medium">{mobility.visaType}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Est. Salary</span>
                <span className="text-white font-medium">
                  S${mobility.estimatedSalary.min.toLocaleString()} – S${mobility.estimatedSalary.max.toLocaleString()}/mo
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Timeline</span>
                <span className="text-white font-medium">{mobility.timelineMonths} months</span>
              </div>
            </div>
          </motion.div>

          {/* Missing skills */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <p className="text-white font-semibold text-sm">Missing Skills</p>
            </div>
            {mobility.missingSkills.map((s) => (
              <div key={s} className="flex items-center gap-2 p-2 rounded-xl mb-2"
                style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.12)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                <p className="text-zinc-300 text-xs">{s}</p>
              </div>
            ))}
          </motion.div>

          {/* AI Insight */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }} className="glass-card p-5"
            style={{ borderColor: "rgba(37,99,235,0.2)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-white font-semibold text-sm">AI Insight</p>
            </div>
            <p className="text-zinc-300 text-xs leading-relaxed">{mobility.aiInsight}</p>
          </motion.div>
        </div>

        {/* Right: Roadmap + Cost of Living */}
        <div className="xl:col-span-2 space-y-6">
          {/* Roadmap */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }} className="glass-card p-6">
            <h3 className="text-white font-semibold text-sm mb-6">6-Month Migration Roadmap</h3>
            <div className="space-y-4">
              {mobility.steps.map((step, i) => (
                <motion.div key={step.step}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex gap-4">
                  {/* Step indicator */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0`}
                      style={{
                        background: step.status === "done" ? "rgba(34,197,94,0.15)" : step.status === "in-progress" ? "rgba(37,99,235,0.15)" : "rgba(255,255,255,0.04)",
                        border: `1px solid ${step.status === "done" ? "rgba(34,197,94,0.3)" : step.status === "in-progress" ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.08)"}`,
                      }}>
                      {step.status === "done"
                        ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                        : step.status === "in-progress"
                        ? <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        : <Circle className="w-4 h-4 text-zinc-600" />}
                    </div>
                    {i < mobility.steps.length - 1 && (
                      <div className="w-0.5 h-8 mt-1"
                        style={{ background: step.status === "done" ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.06)" }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <p className={`text-sm font-semibold ${step.status === "done" ? "text-green-400" : step.status === "in-progress" ? "text-white" : "text-zinc-400"}`}>
                        {step.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500">{step.duration}</span>
                        {step.status === "in-progress" && (
                          <span className="text-xs px-2 py-0.5 rounded-full text-primary"
                            style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}>
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-zinc-500 text-xs mt-1">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Cost of Living */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }} className="glass-card p-6">
            <h3 className="text-white font-semibold text-sm mb-5">Monthly Living Costs (Singapore)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={costData} layout="vertical">
                    <XAxis type="number" tick={{ fill: "#52525B", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="category" tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
                    <Tooltip
                      formatter={(value) => [`S$${value}`, "Amount"]}
                      contentStyle={{ background: "rgba(9,9,11,0.95)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }} />
                    <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                      {costData.map((_, i) => (
                        <Cell key={i} fill={["#2563EB", "#7C3AED", "#22C55E", "#F59E0B", "#06B6D4", "#EF4444"][i % 6]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {mobility.costOfLiving.map(({ category, amount, currency }) => (
                  <div key={category} className="flex items-center justify-between p-2 rounded-xl"
                    style={{ background: category === "Total Monthly Est." ? "rgba(37,99,235,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${category === "Total Monthly Est." ? "rgba(37,99,235,0.2)" : "rgba(255,255,255,0.04)"}` }}>
                    <p className={`text-xs ${category === "Total Monthly Est." ? "text-white font-bold" : "text-zinc-400"}`}>
                      {category}
                    </p>
                    <p className={`text-xs font-bold ${category === "Total Monthly Est." ? "text-primary" : "text-zinc-300"}`}>
                      S${amount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
