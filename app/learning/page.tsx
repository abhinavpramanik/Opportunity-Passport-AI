"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  BookOpen, ExternalLink, Clock, Star, Zap, ChevronRight,
  CheckCircle2, TrendingUp, Sparkles,
} from "lucide-react";
import { courses, roadmap, futureSkills } from "@/data/learning";
import type { Course, FutureSkill } from "@/types";
import { cn } from "@/lib/utils";

const levelColors: Record<string, string> = {
  beginner: "#22C55E",
  intermediate: "#F59E0B",
  advanced: "#EF4444",
};

const relevanceColors: Record<string, string> = {
  critical: "#EF4444",
  important: "#F59E0B",
  "nice-to-have": "#94A3B8",
};

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -3 }}
      className="glass-card p-5 cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl flex-shrink-0">{course.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div>
              <h3 className="text-white font-semibold text-sm">{course.title}</h3>
              <p className="text-zinc-500 text-xs mt-0.5">{course.provider}</p>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-lg"
              style={{
                background: `${levelColors[course.level]}10`,
                color: levelColors[course.level],
                border: `1px solid ${levelColors[course.level]}25`,
              }}>
              {course.level}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <div className="flex items-center gap-1 text-zinc-400 text-xs">
              <Clock className="w-3 h-3" />{course.duration}
            </div>
            {course.certificate && (
              <div className="flex items-center gap-1 text-yellow-400 text-xs">
                <Star className="w-3 h-3 fill-current" />Certificate
              </div>
            )}
            <div className="flex items-center gap-1 text-xs"
              style={{ color: course.free ? "#22C55E" : "#94A3B8" }}>
              {course.free ? "Free" : `₹${course.price?.toLocaleString()}`}
            </div>
          </div>

          {/* Match bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-zinc-500 text-xs">Career Match</span>
              <span className="text-xs font-bold text-primary">{course.match}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED)" }}
                initial={{ width: 0 }}
                animate={{ width: `${course.match}%` }}
                transition={{ duration: 1.2, delay: index * 0.08 + 0.3 }}
              />
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {course.skills.slice(0, 4).map((s) => (
              <span key={s} className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", color: "#60A5FA" }}>
                {s}
              </span>
            ))}
          </div>

          {/* Progress if in progress */}
          {(course.completionRate ?? 0) > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-zinc-500 text-xs">Progress</span>
                <span className="text-xs font-bold text-green-400">{course.completionRate}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-green-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${course.completionRate}%` }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
              </div>
            </div>
          )}

          <button className="mt-4 flex items-center gap-1.5 text-primary text-xs font-medium hover:text-primary/80 transition-colors">
            <ExternalLink className="w-3 h-3" />Start Learning <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function FutureSkillCard({ skill, index }: { skill: FutureSkill; index: number }) {
  const color = relevanceColors[skill.relevance];
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex items-center gap-4 p-4 rounded-xl"
      style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-white text-sm font-semibold">{skill.name}</p>
          <span className="text-xs px-1.5 py-0.5 rounded-full"
            style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}>
            {skill.relevance}
          </span>
        </div>
        <p className="text-zinc-500 text-xs">{skill.description}</p>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-white font-bold text-sm">{skill.demand}%</p>
        <p className="text-zinc-600 text-xs">demand</p>
      </div>
    </motion.div>
  );
}

export default function LearningPage() {
  const [tab, setTab] = useState<"courses" | "roadmap" | "future">("courses");

  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Learning</h1>
        <p className="text-zinc-400 text-sm">Your personalized learning path to Singapore</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {([["courses", "📚 Courses", BookOpen], ["roadmap", "🗺️ Roadmap", TrendingUp], ["future", "⚡ Future Skills", Zap]] as const).map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={cn("px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
              tab === key ? "text-white" : "text-zinc-500 hover:text-zinc-300")}
            style={tab === key ? { background: "linear-gradient(135deg, #2563EB, #7C3AED)" } :
              { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "courses" && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {courses.map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
        </div>
      )}

      {tab === "roadmap" && (
        <div className="max-w-3xl">
          <div className="glass-card p-6 mb-6">
            <h2 className="text-white font-bold text-lg mb-1">{roadmap.title}</h2>
            <p className="text-zinc-400 text-sm">{roadmap.description}</p>
          </div>
          <div className="space-y-4">
            {roadmap.steps.map((step, i) => (
              <motion.div key={step.step}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}
                className="glass-card p-6 flex gap-5">
                <div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white"
                    style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>
                    {step.step}
                  </div>
                  {i < roadmap.steps.length - 1 && (
                    <div className="w-0.5 h-8 bg-white/10 mx-auto mt-2" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                    <h3 className="text-white font-semibold text-sm">{step.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-lg text-zinc-400"
                      style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <Clock className="w-3 h-3 inline mr-1" />{step.duration}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl mb-3"
                    style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.12)" }}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <p className="text-zinc-300 text-xs font-medium">Outcome: {step.outcome}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === "future" && (
        <div className="max-w-2xl space-y-3">
          <div className="glass-card p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <p className="text-white font-semibold text-sm">Skills to Learn in 2026–2028</p>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              These are the highest-demand skills in Singapore's tech market that will significantly boost your salary and opportunities in the next 2 years.
            </p>
          </div>
          {futureSkills.map((skill, i) => (
            <FutureSkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
