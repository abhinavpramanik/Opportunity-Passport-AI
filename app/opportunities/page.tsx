"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Briefcase, MapPin, Clock, Wifi, ExternalLink,
  Search, SlidersHorizontal, Sparkles, GraduationCap,
  ChevronRight, Building,
} from "lucide-react";
import { jobs } from "@/data/jobs";
import { scholarships } from "@/data/scholarships";
import { cn } from "@/lib/utils";
import type { Job, Scholarship } from "@/types";

function MatchBadge({ match }: { match: number }) {
  const color = match >= 85 ? "#22C55E" : match >= 65 ? "#F59E0B" : "#EF4444";
  const bg = match >= 85 ? "rgba(34,197,94,0.1)" : match >= 65 ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)";
  const border = match >= 85 ? "rgba(34,197,94,0.25)" : match >= 65 ? "rgba(245,158,11,0.25)" : "rgba(239,68,68,0.25)";
  return (
    <span className="text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1"
      style={{ color, background: bg, border: `1px solid ${border}` }}>
      <Sparkles className="w-3 h-3" />
      {match}% Match
    </span>
  );
}

function JobCard({ job, index }: { job: Job; index: number }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      className="glass-card p-6 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-lg flex-shrink-0"
          style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))", border: "1px solid rgba(255,255,255,0.08)" }}>
          {job.logo}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-white font-semibold text-sm">{job.title}</h3>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <div className="flex items-center gap-1 text-zinc-400 text-xs">
                  <Building className="w-3 h-3" />{job.company}
                </div>
                <div className="flex items-center gap-1 text-zinc-400 text-xs">
                  <MapPin className="w-3 h-3" />{job.location}
                </div>
                <div className="flex items-center gap-1 text-zinc-400 text-xs">
                  <Clock className="w-3 h-3" />{job.type}
                </div>
                {job.isRemote && (
                  <div className="flex items-center gap-1 text-zinc-400 text-xs">
                    <Wifi className="w-3 h-3" />Remote
                  </div>
                )}
              </div>
            </div>
            <MatchBadge match={job.match} />
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {job.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#94A3B8" }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3">
            <span className="text-white text-sm font-semibold">
              {job.salary.currency === "INR"
                ? `₹${(job.salary.min / 100000).toFixed(1)}L – ₹${(job.salary.max / 100000).toFixed(1)}L/yr`
                : `${job.salary.currency === "SGD" ? "S$" : "$"}${job.salary.min.toLocaleString()} – ${job.salary.max.toLocaleString()}/mo`}
            </span>
            <span className="text-zinc-500 text-xs">{job.postedAt}</span>
          </div>
        </div>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-5 pt-5 border-t border-white/5"
        >
          <p className="text-zinc-300 text-sm leading-relaxed mb-4">{job.description}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {job.skills.map((s) => (
              <span key={s} className="text-xs px-2 py-1 rounded-lg"
                style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", color: "#60A5FA" }}>
                {s}
              </span>
            ))}
          </div>
          <div className="p-3 rounded-xl mb-4"
            style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.12)" }}>
            <p className="text-xs text-zinc-400">
              <span className="text-primary font-semibold">AI Insight: </span>{job.aiInsight}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>
            <ExternalLink className="w-4 h-4" />Apply Now
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

function ScholarshipCard({ s, index }: { s: Scholarship; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const catColor: Record<string, string> = {
    merit: "#F59E0B", "need-based": "#22C55E",
    "field-specific": "#7C3AED", "country-specific": "#06B6D4",
  };
  const color = catColor[s.category] || "#94A3B8";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      whileHover={{ y: -3 }}
      className="glass-card p-6 cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
              {s.category.replace("-", " ")}
            </span>
          </div>
          <h3 className="text-white font-semibold text-sm">{s.name}</h3>
          <p className="text-zinc-400 text-xs mt-0.5">{s.provider}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <MatchBadge match={s.match} />
          <span className="text-white font-bold text-sm">
            {s.currency === "INR" ? "₹" : s.currency === "SGD" ? "S$" : "$"}
            {s.amount.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-3 text-xs text-zinc-500">
        <Clock className="w-3 h-3" />Deadline: {s.deadline}
      </div>

      {expanded && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 pt-5 border-t border-white/5">
          <p className="text-zinc-300 text-sm leading-relaxed mb-3">{s.description}</p>
          <div className="mb-3">
            <p className="text-zinc-500 text-xs mb-2">Eligibility Criteria:</p>
            {s.eligibility.map((e) => (
              <div key={e} className="flex items-start gap-2 mb-1">
                <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <p className="text-zinc-400 text-xs">{e}</p>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-xl mb-4"
            style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.12)" }}>
            <p className="text-xs text-zinc-400">
              <span className="font-semibold" style={{ color }}>AI Insight: </span>{s.aiInsight}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium"
            style={{ background: `linear-gradient(135deg, ${color}, #7C3AED)` }}>
            <ExternalLink className="w-4 h-4" />Apply Now
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function OpportunitiesPage() {
  const [tab, setTab] = useState<"jobs" | "scholarships">("jobs");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.company.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredScholarships = scholarships.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { key: "jobs", label: "Jobs & Internships", count: jobs.length, icon: Briefcase },
    { key: "scholarships", label: "Scholarships", count: scholarships.length, icon: GraduationCap },
  ] as const;

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Opportunities</h1>
        <p className="text-zinc-400 text-sm">AI-matched opportunities personalized for Alex Sharma</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
        {tabs.map(({ key, label, count, icon: Icon }) => (
          <button key={key} onClick={() => { setTab(key); setSearchQuery(""); }}
            className={cn("flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all", tab === key ? "text-white" : "text-zinc-500 hover:text-zinc-300")}
            style={tab === key ? { background: "linear-gradient(135deg, #2563EB, #7C3AED)", boxShadow: "0 0 20px rgba(37,99,235,0.3)" } : {}}>
            <Icon className="w-4 h-4" />{label}
            <span className={cn("text-xs px-1.5 py-0.5 rounded-full", tab === key ? "bg-white/20" : "bg-white/5")}>{count}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder={tab === "jobs" ? "Search jobs or companies..." : "Search scholarships..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder:text-zinc-600 outline-none transition-all"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {tab === "jobs"
          ? filteredJobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)
          : filteredScholarships.map((s, i) => <ScholarshipCard key={s.id} s={s} index={i} />)}
      </div>
    </div>
  );
}
