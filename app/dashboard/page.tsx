"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Bell,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Building2,
  Globe,
  Zap,
  PiggyBank,
} from "lucide-react";
import { passport } from "@/data/passport";
import { user } from "@/data/user";
import { notifications } from "@/data/notifications";
import { jobs } from "@/data/jobs";
import { cn } from "@/lib/utils";
import type { PassportScore, Notification } from "@/types";
import Link from "next/link";

// Animated number counter
function AnimatedNumber({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const steps = 60;
    const increment = value / steps;
    const interval = (duration * 1000) / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, interval);
    return () => clearInterval(timer);
  }, [value, duration]);
  return <>{display}</>;
}

// Circular progress ring
function ScoreRing({
  score,
  color,
  size = 80,
}: {
  score: number;
  color: string;
  size?: number;
}) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={5}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={5}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color}60)` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white font-black text-lg tabular-nums">
          <AnimatedNumber value={score} />
        </span>
      </div>
    </div>
  );
}

// Score card
function ScoreCard({ score }: { score: PassportScore }) {
  const TrendIcon = score.trend === "up" ? TrendingUp : score.trend === "down" ? TrendingDown : Minus;
  const trendColor = score.trend === "up" ? "#22C55E" : score.trend === "down" ? "#EF4444" : "#94A3B8";

  const icons: Record<string, React.ElementType> = {
    employability: Briefcase,
    learning: GraduationCap,
    finance: PiggyBank,
    insurance: Zap,
    mobility: Globe,
    government: Building2,
  };
  const CategoryIcon = icons[score.category] || Zap;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="glass-card p-5 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: `${score.color}15`, border: `1px solid ${score.color}30` }}
            >
              <CategoryIcon className="w-3.5 h-3.5" style={{ color: score.color }} />
            </div>
            <span className="text-zinc-400 text-xs font-medium">{score.label}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <TrendIcon className="w-3.5 h-3.5" style={{ color: trendColor }} />
            <span className="text-xs font-medium" style={{ color: trendColor }}>
              +{score.trendValue}% this month
            </span>
          </div>
        </div>
        <ScoreRing score={score.score} color={score.color} size={72} />
      </div>

      <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">{score.description}</p>

      {/* Mini breakdown bars */}
      <div className="mt-4 space-y-1.5">
        {score.breakdowns.slice(0, 3).map((b) => (
          <div key={b.label} className="flex items-center gap-2">
            <span className="text-zinc-600 text-xs w-28 truncate">{b.label}</span>
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: score.color }}
                initial={{ width: 0 }}
                animate={{ width: `${b.value}%` }}
                transition={{ duration: 1.2, delay: 0.3 }}
              />
            </div>
            <span className="text-zinc-500 text-xs w-6 text-right">{b.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: score.color }}
      >
        View details <ChevronRight className="w-3 h-3" />
      </div>
    </motion.div>
  );
}

// Notification item
function NotifItem({ notif, index }: { notif: Notification; index: number }) {
  const typeColors: Record<string, string> = {
    job: "#2563EB",
    scholarship: "#F59E0B",
    scheme: "#06B6D4",
    learning: "#7C3AED",
    finance: "#22C55E",
    system: "#94A3B8",
  };
  const color = typeColors[notif.type] || "#94A3B8";

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 text-base"
        style={{ background: `${color}15`, border: `1px solid ${color}25` }}
      >
        {notif.icon || "📌"}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm font-medium leading-tight", notif.isRead ? "text-zinc-300" : "text-white")}>
            {notif.title}
          </p>
          {!notif.isRead && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1" />}
        </div>
        <p className="text-zinc-500 text-xs mt-0.5 line-clamp-1">{notif.description}</p>
        <p className="text-zinc-600 text-xs mt-1">{notif.time}</p>
      </div>
    </motion.div>
  );
}

// AI Insight card
function AIInsightCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-card p-6"
      style={{ borderColor: "rgba(37,99,235,0.2)", boxShadow: "0 0 40px rgba(37,99,235,0.08)" }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "rgba(37,99,235,0.15)", border: "1px solid rgba(37,99,235,0.3)" }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-white text-sm font-semibold">AI Insight</p>
          <p className="text-zinc-500 text-xs">Personalized for Alex Sharma</p>
        </div>
        <div className="ml-auto flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </div>
      <p className="text-zinc-300 text-sm leading-relaxed">{passport.aiSummary}</p>
      <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-zinc-500 text-xs mb-2 font-medium">Strengths</p>
          {passport.strengths.slice(0, 2).map((s) => (
            <div key={s} className="flex items-start gap-2 mb-1.5">
              <div className="w-1 h-1 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />
              <p className="text-zinc-400 text-xs">{s}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-zinc-500 text-xs mb-2 font-medium">Gaps to Close</p>
          {passport.gaps.slice(0, 2).map((g) => (
            <div key={g} className="flex items-start gap-2 mb-1.5">
              <div className="w-1 h-1 rounded-full bg-yellow-400 mt-1.5 flex-shrink-0" />
              <p className="text-zinc-400 text-xs">{g}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.15)" }}>
        <p className="text-xs text-zinc-400">
          <span className="text-primary font-semibold">Top Action: </span>
          {passport.topRecommendation}
        </p>
      </div>
    </motion.div>
  );
}

// Quick action button
function QuickAction({ icon: Icon, label, href, color }: { icon: React.ElementType; label: string; href: string; color: string }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex flex-col items-center gap-2 p-4 rounded-2xl cursor-pointer"
        style={{ background: `${color}08`, border: `1px solid ${color}15` }}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <span className="text-zinc-300 text-xs font-medium text-center">{label}</span>
      </motion.div>
    </Link>
  );
}

const quickActions = [
  { icon: Briefcase, label: "Find Jobs", href: "/opportunities", color: "#2563EB" },
  { icon: GraduationCap, label: "Scholarships", href: "/opportunities", color: "#F59E0B" },
  { icon: Building2, label: "Gov Schemes", href: "/government", color: "#06B6D4" },
  { icon: Globe, label: "Go Singapore", href: "/mobility", color: "#22C55E" },
  { icon: PiggyBank, label: "Finance Plan", href: "/finance", color: "#7C3AED" },
  { icon: Sparkles, label: "AI Mentor", href: "/mentor", color: "#EF4444" },
];

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const topJobs = jobs.slice(0, 3);

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between mb-10"
      >
        <div>
          <p className="text-zinc-500 text-sm mb-1">Good evening, 👋</p>
          <h1 className="text-3xl font-black text-white">{user.name}</h1>
          <p className="text-zinc-400 text-sm mt-1">{user.tagline}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Bell className="w-5 h-5 text-zinc-400" />
              {unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{unreadCount}</span>
                </div>
              )}
            </motion.div>
          </div>
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            AS
          </div>
        </div>
      </motion.div>

      {/* Overall score banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6 mb-8"
        style={{
          background: "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.08) 100%)",
          borderColor: "rgba(37,99,235,0.2)",
        }}
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-zinc-400 text-sm mb-1">Your Opportunity Passport Score</p>
            <div className="flex items-end gap-3">
              <span className="text-6xl font-black text-white tabular-nums">
                <AnimatedNumber value={passport.overallScore} />
              </span>
              <div className="mb-2">
                <span className="text-zinc-500 text-lg">/100</span>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                  <span className="text-green-400 text-xs font-medium">+8 from last week</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {passport.scores.slice(0, 3).map((s) => (
              <div key={s.category} className="text-center">
                <ScoreRing score={s.score} color={s.color} size={56} />
                <p className="text-zinc-500 text-xs mt-1.5">{s.label.split(" ")[0]}</p>
              </div>
            ))}
          </div>

          <Link href="/passport">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                boxShadow: "0 0 30px rgba(37,99,235,0.3)",
              }}
            >
              View Full Passport
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Score cards grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-8"
      >
        {passport.scores.map((score) => (
          <motion.div key={score.category} variants={fadeUp}>
            <ScoreCard score={score} />
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom section: 3 columns */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* AI Insight */}
        <div className="xl:col-span-1">
          <AIInsightCard />
        </div>

        {/* Quick Actions */}
        <div className="xl:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <h3 className="text-white font-semibold text-sm mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action) => (
                <QuickAction key={action.label} {...action} />
              ))}
            </div>

            {/* Top matching jobs preview */}
            <div className="mt-6 pt-5 border-t border-white/5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-zinc-400 text-xs font-medium">Top Job Matches</p>
                <Link href="/opportunities" className="text-primary text-xs hover:text-primary/80 transition-colors">
                  View all →
                </Link>
              </div>
              <div className="space-y-2">
                {topJobs.map((job) => (
                  <div key={job.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {job.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{job.company}</p>
                      <p className="text-zinc-500 text-xs truncate">{job.title}</p>
                    </div>
                    <span
                      className="text-xs font-bold flex-shrink-0 px-1.5 py-0.5 rounded-md"
                      style={{
                        background: job.match >= 85 ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                        color: job.match >= 85 ? "#22C55E" : "#F59E0B",
                      }}
                    >
                      {job.match}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Notifications */}
        <div className="xl:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="space-y-1">
              {notifications.map((notif, i) => (
                <NotifItem key={notif.id} notif={notif} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
