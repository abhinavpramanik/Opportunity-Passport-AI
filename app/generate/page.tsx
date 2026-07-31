"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Upload,
  Brain,
  Search,
  Briefcase,
  GraduationCap,
  Building2,
  PiggyBank,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: Upload,
    title: "Uploading Profile",
    description: "Securely processing your resume and academic records...",
    duration: 1600,
    color: "#2563EB",
  },
  {
    id: 2,
    icon: Brain,
    title: "Extracting Skills",
    description: "AI is identifying your technical skills, soft skills, and competency levels...",
    duration: 2000,
    color: "#7C3AED",
  },
  {
    id: 3,
    icon: Sparkles,
    title: "Building AI Profile",
    description: "Constructing your unique opportunity fingerprint using 47 career signals...",
    duration: 1800,
    color: "#06B6D4",
  },
  {
    id: 4,
    icon: Briefcase,
    title: "Matching Jobs",
    description: "Scanning 50,000+ job listings across India and Singapore markets...",
    duration: 2200,
    color: "#22C55E",
  },
  {
    id: 5,
    icon: GraduationCap,
    title: "Checking Scholarships",
    description: "Evaluating eligibility for 200+ scholarship programs...",
    duration: 1600,
    color: "#F59E0B",
  },
  {
    id: 6,
    icon: Building2,
    title: "Finding Government Schemes",
    description: "Cross-referencing 80+ Central and State government schemes...",
    duration: 1800,
    color: "#EF4444",
  },
  {
    id: 7,
    icon: PiggyBank,
    title: "Calculating Financial Readiness",
    description: "Analyzing savings trajectory, insurance gaps, and relocation costs...",
    duration: 1600,
    color: "#22C55E",
  },
  {
    id: 8,
    icon: Sparkles,
    title: "Generating Opportunity Passport",
    description: "Compiling your personalized Opportunity Passport — almost ready!",
    duration: 2000,
    color: "#7C3AED",
  },
];

// Simulated insight lines that appear as the AI "thinks"
const aiThoughts = [
  "Detected React (Advanced) → 3 high-match Singapore roles found",
  "GPA 8.7 → Eligible for AICTE Scholarship",
  "Next.js expertise → Grab, Sea Group flagged as top employers",
  "PM Internship Scheme → Eligibility confirmed ✓",
  "Singapore EP salary threshold → SGD 5,000 (achievable)",
  "Emergency fund gap detected → Savings plan generated",
  "Machine Learning (Beginner) → Fast-track course identified",
  "AWS certification missing → 4 job matches blocked — course recommended",
];

function ProgressBar({ progress, color }: { progress: number; color: string }) {
  return (
    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  );
}

function StepItem({
  step,
  status,
}: {
  step: (typeof steps)[0];
  status: "completed" | "active" | "pending";
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-4"
    >
      {/* Icon */}
      <div className="relative flex-shrink-0 mt-0.5">
        <motion.div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background:
              status === "completed"
                ? "rgba(34,197,94,0.15)"
                : status === "active"
                ? `${step.color}20`
                : "rgba(255,255,255,0.04)",
            border:
              status === "completed"
                ? "1px solid rgba(34,197,94,0.3)"
                : status === "active"
                ? `1px solid ${step.color}40`
                : "1px solid rgba(255,255,255,0.06)",
          }}
          animate={
            status === "active"
              ? { boxShadow: [`0 0 0px ${step.color}00`, `0 0 15px ${step.color}50`, `0 0 0px ${step.color}00`] }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {status === "completed" ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <Icon
              className="w-4 h-4"
              style={{
                color: status === "active" ? step.color : "rgba(255,255,255,0.2)",
              }}
            />
          )}
        </motion.div>

        {/* Pulse ring for active */}
        {status === "active" && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ border: `1px solid ${step.color}` }}
            animate={{ opacity: [0.6, 0], scale: [1, 1.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p
            className="text-sm font-semibold"
            style={{
              color:
                status === "completed"
                  ? "#22C55E"
                  : status === "active"
                  ? "white"
                  : "rgba(255,255,255,0.3)",
            }}
          >
            {step.title}
          </p>
          {status === "active" && (
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 h-1 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          )}
          {status === "completed" && (
            <span className="text-xs text-green-500 font-medium">Done</span>
          )}
        </div>
        {(status === "active" || status === "completed") && (
          <p
            className="text-xs leading-relaxed"
            style={{
              color: status === "active" ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)",
            }}
          >
            {step.description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function GeneratePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visibleThoughts, setVisibleThoughts] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Total duration across all steps
  const totalDuration = steps.reduce((acc, s) => acc + s.duration, 0);

  useEffect(() => {
    let elapsed = 0;
    let thoughtIndex = 0;

    // Run through steps sequentially
    steps.forEach((step, index) => {
      setTimeout(() => {
        setCurrentStep(index);
        setProgress(Math.round((index / steps.length) * 100));
      }, elapsed);
      elapsed += step.duration;
    });

    // Show AI thoughts progressively
    const thoughtInterval = setInterval(() => {
      if (thoughtIndex < aiThoughts.length) {
        setVisibleThoughts((prev) => [...prev, aiThoughts[thoughtIndex]]);
        thoughtIndex++;
      } else {
        clearInterval(thoughtInterval);
      }
    }, totalDuration / aiThoughts.length);

    // Mark complete and redirect
    setTimeout(() => {
      setCurrentStep(steps.length);
      setProgress(100);
      setIsComplete(true);
      setTimeout(() => router.push("/dashboard"), 1800);
    }, elapsed + 200);

    return () => clearInterval(thoughtInterval);
  }, []);

  const activeStep = steps[currentStep];

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: activeStep
            ? `radial-gradient(ellipse at center, ${activeStep.color}08 0%, transparent 60%)`
            : "none",
        }}
      />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)" }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">AI Processing Your Profile</span>
          </div>

          <h1 className="text-3xl font-black text-white mb-3">
            {isComplete ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: "linear-gradient(135deg, #22C55E, #06B6D4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Passport Generated! 🎉
              </motion.span>
            ) : (
              "Building Your Opportunity Passport"
            )}
          </h1>
          <p className="text-zinc-400 text-sm">
            {isComplete
              ? "Redirecting you to your personal dashboard..."
              : "Our AI is scanning thousands of opportunities tailored just for you"}
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 mb-6"
        >
          {/* Overall progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zinc-400 text-xs font-medium">Overall Progress</span>
              <motion.span
                key={progress}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white text-xs font-bold tabular-nums"
              >
                {progress}%
              </motion.span>
            </div>
            <ProgressBar
              progress={progress}
              color={activeStep ? activeStep.color : "#22C55E"}
            />
          </div>

          {/* Steps list */}
          <div className="space-y-5">
            {steps.map((step, index) => {
              const status =
                index < currentStep
                  ? "completed"
                  : index === currentStep
                  ? "active"
                  : "pending";
              return <StepItem key={step.id} step={step} status={status} />;
            })}

            {/* Final complete state */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 pt-2"
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }}
                >
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-green-400 text-sm font-semibold">Opportunity Passport Ready</p>
                  <p className="text-zinc-500 text-xs">Score: 82/100 · 6 opportunity categories unlocked</p>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* AI Thoughts terminal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-5"
          style={{ fontFamily: "monospace" }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-zinc-500 text-xs">AI Analysis Stream</span>
          </div>

          <div className="space-y-2 min-h-[80px]">
            <AnimatePresence>
              {visibleThoughts.map((thought, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2"
                >
                  <span className="text-green-400 text-xs flex-shrink-0">→</span>
                  <p className="text-zinc-300 text-xs leading-relaxed">{thought}</p>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Blinking cursor */}
            {!isComplete && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-green-400 text-xs"
              >
                ▋
              </motion.span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
