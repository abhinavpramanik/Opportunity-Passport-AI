"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";
import { CheckCircle2, Clock, Sparkles } from "lucide-react";
import type { TimelineEvent } from "@/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<string, { color: string; border: string; textColor: string }> = {
  completed: { color: "rgba(34,197,94,0.15)", border: "rgba(34,197,94,0.3)", textColor: "#22C55E" },
  current: { color: "rgba(37,99,235,0.15)", border: "rgba(37,99,235,0.4)", textColor: "#60A5FA" },
  upcoming: { color: "rgba(255,255,255,0.04)", border: "rgba(255,255,255,0.08)", textColor: "#94A3B8" },
};

const typeColors: Record<string, string> = {
  education: "#7C3AED",
  career: "#2563EB",
  achievement: "#F59E0B",
  milestone: "#22C55E",
  future: "#06B6D4",
};

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const config = statusConfig[event.status];
  const typeColor = typeColors[event.type] || "#94A3B8";
  const isLeft = index % 2 === 0;

  return (
    <div className={`flex items-start gap-4 ${isLeft ? "flex-row" : "flex-row-reverse"}`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.02 }}
        className="flex-1 max-w-sm p-5 rounded-2xl"
        style={{ background: config.color, border: `1px solid ${config.border}` }}
      >
        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{event.icon}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full capitalize"
              style={{ background: `${typeColor}20`, color: typeColor, border: `1px solid ${typeColor}30` }}>
              {event.type}
            </span>
          </div>
          <span className="text-xs font-mono font-bold" style={{ color: config.textColor }}>{event.year}</span>
        </div>

        <h3 className={cn("font-bold text-sm mb-1", event.status === "upcoming" ? "text-zinc-300" : "text-white")}>
          {event.title}
        </h3>
        <p className="text-zinc-400 text-xs leading-relaxed">{event.description}</p>

        {event.detail && (
          <p className="text-zinc-600 text-xs mt-2 leading-relaxed italic">{event.detail}</p>
        )}

        {event.status === "current" && (
          <div className="mt-3 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-medium">You are here</span>
          </div>
        )}
      </motion.div>

      {/* Center connector */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 48 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.1, type: "spring" }}
          className="w-10 h-10 rounded-full flex items-center justify-center z-10"
          style={{ background: config.color, border: `2px solid ${config.border}`, boxShadow: event.status === "current" ? "0 0 20px rgba(37,99,235,0.4)" : "none" }}
        >
          {event.status === "completed"
            ? <CheckCircle2 className="w-5 h-5 text-green-400" />
            : event.status === "current"
            ? <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
            : <Clock className="w-4 h-4 text-zinc-600" />}
        </motion.div>
      </div>

      {/* Spacer (mirror side) */}
      <div className="flex-1 max-w-sm" />
    </div>
  );
}

export default function TimelinePage() {
  const completed = timeline.filter((e) => e.status === "completed").length;
  const upcoming = timeline.filter((e) => e.status === "upcoming").length;

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Career Timeline</h1>
        <p className="text-zinc-400 text-sm">Your journey from graduation to global career</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg">
        {[
          { label: "Milestones Reached", value: completed, color: "#22C55E" },
          { label: "Current Stage", value: 1, color: "#2563EB" },
          { label: "Upcoming Goals", value: upcoming, color: "#06B6D4" },
        ].map(({ label, value, color }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="glass-card p-4 text-center">
            <p className="text-2xl font-black" style={{ color }}>{value}</p>
            <p className="text-zinc-500 text-xs mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* AI note */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="glass-card p-5 mb-10 max-w-2xl flex items-start gap-3"
        style={{ borderColor: "rgba(37,99,235,0.2)" }}>
        <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
        <p className="text-zinc-300 text-sm leading-relaxed">
          Based on your profile, Alex is projected to land a Singapore Software Engineer role within 6 months
          and achieve Tech Lead status by 2028. Your learning agility (88/100) is the key driver.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
          style={{ background: "linear-gradient(to bottom, rgba(37,99,235,0.3), rgba(124,58,237,0.3), rgba(34,197,94,0.2))" }} />

        <div className="space-y-8">
          {timeline.map((event, i) => (
            <TimelineCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
