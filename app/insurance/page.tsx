"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle2, ExternalLink, Sparkles, Star } from "lucide-react";
import { insurance } from "@/data/insurance";
import type { InsurancePlan } from "@/types";
import { cn } from "@/lib/utils";

const typeConfig: Record<string, { color: string; label: string }> = {
  health: { color: "#22C55E", label: "Health" },
  life: { color: "#2563EB", label: "Life" },
  travel: { color: "#06B6D4", label: "Travel" },
  professional: { color: "#7C3AED", label: "Professional" },
};

function InsuranceCard({ plan, index }: { plan: InsurancePlan; index: number }) {
  const config = typeConfig[plan.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={cn("glass-card p-6 relative", plan.recommended && "ring-1 ring-primary/30")}
    >
      {plan.recommended && (
        <div className="absolute -top-3 left-6">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)", boxShadow: "0 0 20px rgba(37,99,235,0.4)" }}>
            <Star className="w-3 h-3 fill-current" />Recommended
          </div>
        </div>
      )}

      <div className="flex items-start gap-4 mt-1">
        <div className="text-3xl flex-shrink-0">{plan.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <span className="text-xs px-2 py-0.5 rounded-full font-medium mb-1 inline-block"
                style={{ background: `${config.color}15`, color: config.color, border: `1px solid ${config.color}25` }}>
                {config.label} Insurance
              </span>
              <h3 className="text-white font-semibold text-sm">{plan.name}</h3>
              <p className="text-zinc-500 text-xs mt-0.5">{plan.provider}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-black text-lg">
                ₹{plan.premium.toLocaleString()}
              </p>
              <p className="text-zinc-500 text-xs">{plan.period}</p>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-300 text-xs font-medium">Coverage: {plan.coverage}</span>
          </div>

          {/* Match bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-zinc-500 text-xs">Profile Match</span>
              <span className="text-xs font-bold" style={{ color: config.color }}>{plan.match}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: config.color }}
                initial={{ width: 0 }}
                animate={{ width: `${plan.match}%` }}
                transition={{ duration: 1.2, delay: index * 0.1 + 0.3 }}
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-4 space-y-1.5">
            {plan.benefits.map((b) => (
              <div key={b} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: config.color }} />
                <p className="text-zinc-400 text-xs">{b}</p>
              </div>
            ))}
          </div>

          <p className="text-zinc-500 text-xs mt-4 leading-relaxed">{plan.description}</p>

          <button className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-medium"
            style={{ background: `${config.color}20`, border: `1px solid ${config.color}30`, color: config.color }}>
            <ExternalLink className="w-3.5 h-3.5" />Get Quote
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function InsurancePage() {
  const recommended = insurance.filter((p) => p.recommended);
  const totalPremium = recommended.reduce((sum, p) => sum + p.premium, 0);

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Insurance</h1>
        <p className="text-zinc-400 text-sm">AI-recommended coverage for your career journey</p>
      </motion.div>

      {/* AI Insight */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }} className="glass-card p-6 mb-8"
        style={{ borderColor: "rgba(37,99,235,0.2)", boxShadow: "0 0 40px rgba(37,99,235,0.06)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-white font-semibold text-sm">AI Insurance Strategy</p>
        </div>
        <p className="text-zinc-300 text-sm leading-relaxed">
          As a 22-year-old planning to relocate internationally, your insurance priorities are: Health (essential before EP application),
          Travel (required for Singapore visa trips), and Life (low cost, high coverage at your age). Professional indemnity
          becomes critical if you take on freelance work.
        </p>
        <div className="mt-4 flex items-center gap-6 flex-wrap">
          <div>
            <p className="text-zinc-500 text-xs">Recommended Annual Premium</p>
            <p className="text-white font-bold text-lg mt-0.5">₹{totalPremium.toLocaleString()}/year</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs">Coverage Gap Risk</p>
            <p className="text-red-400 font-bold text-lg mt-0.5">High</p>
          </div>
          <div>
            <p className="text-zinc-500 text-xs">Priority Plans</p>
            <p className="text-white font-bold text-lg mt-0.5">{recommended.length} plans</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {insurance.map((plan, i) => (
          <InsuranceCard key={plan.id} plan={plan} index={i} />
        ))}
      </div>
    </div>
  );
}
