"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { schemes } from "@/data/schemes";
import { cn } from "@/lib/utils";
import type { Scheme } from "@/types";

function SchemeCard({ scheme, index }: { scheme: Scheme; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const countryColors: Record<string, string> = {
    india: "#F59E0B",
    singapore: "#22C55E",
    both: "#06B6D4",
  };
  const color = countryColors[scheme.country] || "#94A3B8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -2 }}
      className="glass-card p-6"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl flex-shrink-0">{scheme.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
                  {scheme.country === "india" ? "🇮🇳 India" : scheme.country === "singapore" ? "🇸🇬 Singapore" : "🌏 Both"}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full text-zinc-400"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {scheme.category}
                </span>
              </div>
              <h3 className="text-white font-semibold text-sm">{scheme.name}</h3>
              <p className="text-zinc-500 text-xs mt-0.5">{scheme.ministry}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold",
                scheme.isEligible ? "text-green-400" : "text-red-400")}
                style={{
                  background: scheme.isEligible ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  border: `1px solid ${scheme.isEligible ? "rgba(34,197,94,0.25)" : "rgba(239,68,68,0.25)"}`,
                }}>
                {scheme.isEligible ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                {scheme.isEligible ? "Eligible" : "Not Yet"}
              </div>
              {scheme.amount && (
                <span className="text-white font-bold text-xs">{scheme.amount}</span>
              )}
            </div>
          </div>

          <p className="text-zinc-400 text-xs mt-3 leading-relaxed line-clamp-2">
            {scheme.benefit}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {scheme.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "#71717A" }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Expand toggle */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 mt-4 text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {expanded ? "Show less" : "View details"}
          </button>

          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 pt-4 border-t border-white/5"
            >
              <p className="text-zinc-300 text-xs leading-relaxed mb-4">{scheme.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-zinc-500 text-xs mb-2 font-medium">Eligibility</p>
                  {scheme.eligibility.map((e) => (
                    <div key={e} className="flex items-start gap-2 mb-1.5">
                      <CheckCircle2 className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-zinc-400 text-xs">{e}</p>
                    </div>
                  ))}
                </div>
                {!scheme.isEligible && scheme.missingCriteria.length > 0 && (
                  <div>
                    <p className="text-zinc-500 text-xs mb-2 font-medium">Missing Criteria</p>
                    {scheme.missingCriteria.map((m) => (
                      <div key={m} className="flex items-start gap-2 mb-1.5">
                        <XCircle className="w-3 h-3 text-red-400 mt-0.5 flex-shrink-0" />
                        <p className="text-zinc-400 text-xs">{m}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {scheme.isEligible && (
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-medium"
                  style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>
                  <ExternalLink className="w-3.5 h-3.5" />Apply for {scheme.name}
                </button>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function GovernmentPage() {
  const eligible = schemes.filter((s) => s.isEligible);
  const notEligible = schemes.filter((s) => !s.isEligible);
  const [filter, setFilter] = useState<"all" | "eligible" | "future">("all");

  const filtered = filter === "eligible" ? eligible : filter === "future" ? notEligible : schemes;

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Government Schemes</h1>
        <p className="text-zinc-400 text-sm">Benefits from India and Singapore you qualify for</p>
      </motion.div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Eligible Now", value: eligible.length, color: "#22C55E" },
          { label: "Future Eligible", value: notEligible.length, color: "#F59E0B" },
          { label: "Total Value", value: "₹1.2L+", color: "#2563EB", isString: true },
        ].map(({ label, value, color, isString }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card p-5 text-center">
            <p className="text-3xl font-black" style={{ color }}>{isString ? value : value}</p>
            <p className="text-zinc-400 text-xs mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {([["all", "All Schemes"], ["eligible", "✅ Eligible Now"], ["future", "🎯 Future"]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={cn("px-4 py-2 rounded-xl text-sm font-medium transition-all",
              filter === key ? "text-white" : "text-zinc-500 hover:text-zinc-300")}
            style={filter === key ? { background: "linear-gradient(135deg, #2563EB, #7C3AED)" } :
              { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filtered.map((scheme, i) => (
          <SchemeCard key={scheme.id} scheme={scheme} index={i} />
        ))}
      </div>
    </div>
  );
}
