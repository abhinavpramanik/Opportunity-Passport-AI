"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Globe, Zap, Shield, TrendingUp } from "lucide-react";

// Animated counter hook
function useCounter(target: number, duration: number = 2) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setValue(target);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}

const stats = [
  { value: 50000, suffix: "+", label: "Opportunities Mapped" },
  { value: 92, suffix: "%", label: "Avg Match Accuracy" },
  { value: 6, suffix: " months", label: "Avg. Time to Singapore" },
];

const features = [
  { icon: Zap, label: "AI Passport", desc: "Instant career intelligence" },
  { icon: Globe, label: "Global Mobility", desc: "India → Singapore ready" },
  { icon: Shield, label: "Govt Schemes", desc: "All eligible benefits found" },
  { icon: TrendingUp, label: "Future Simulator", desc: "Predict your trajectory" },
];

// Floating particle component
function Particle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-primary/40"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: 4 + delay,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

// Passport card visual
function PassportCard() {
  return (
    <motion.div
      animate={{ y: [0, -16, 0], rotate: [0, 1, -1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-72 h-44 rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)",
        boxShadow: "0 25px 80px rgba(37,99,235,0.4), 0 0 120px rgba(124,58,237,0.2)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
      whileHover={{ scale: 1.03, rotate: 2 }}
    >
      {/* Holographic shimmer */}
      <motion.div
        className="absolute inset-0"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
        }}
      />

      {/* Chip */}
      <div className="absolute top-5 left-5 w-8 h-6 rounded-sm border border-yellow-500/50 bg-yellow-500/10 flex items-center justify-center">
        <div className="w-4 h-3 border border-yellow-400/40 rounded-sm" />
      </div>

      {/* Top bar */}
      <div className="absolute top-3 right-4 flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ background: i === 0 ? "#2563EB" : i === 1 ? "#7C3AED" : "#22C55E" }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute bottom-5 left-5 right-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-zinc-500 text-xs font-mono mb-1">OPPORTUNITY PASSPORT</p>
            <p className="text-white font-bold text-sm">Alex Sharma</p>
            <p className="text-zinc-400 text-xs">B.Tech CSE · Delhi, India</p>
          </div>
          <div className="text-right">
            <p className="text-zinc-500 text-xs mb-1">SCORE</p>
            <p
              className="text-2xl font-black"
              style={{
                background: "linear-gradient(135deg, #2563EB, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              82
            </p>
          </div>
        </div>

        {/* Score bar */}
        <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "82%" }}
            transition={{ duration: 2, delay: 0.5 }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED)" }}
          />
        </div>
      </div>

      {/* Globe icon watermark */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 opacity-5">
        <Globe className="w-20 h-20 text-white" />
      </div>
    </motion.div>
  );
}

// Stable pre-generated positions to avoid SSR hydration mismatch
const particles = [
  { x: 8, y: 12, delay: 0 }, { x: 23, y: 45, delay: 1.2 }, { x: 67, y: 8, delay: 0.5 },
  { x: 85, y: 33, delay: 2.1 }, { x: 12, y: 72, delay: 0.8 }, { x: 45, y: 90, delay: 1.7 },
  { x: 92, y: 65, delay: 0.3 }, { x: 38, y: 22, delay: 2.5 }, { x: 71, y: 78, delay: 1.0 },
  { x: 55, y: 55, delay: 1.5 }, { x: 18, y: 30, delay: 0.2 }, { x: 78, y: 15, delay: 2.8 },
  { x: 33, y: 62, delay: 0.7 }, { x: 62, y: 40, delay: 1.9 }, { x: 5, y: 50, delay: 2.3 },
  { x: 90, y: 88, delay: 0.6 }, { x: 48, y: 5, delay: 1.4 }, { x: 25, y: 85, delay: 2.0 },
  { x: 72, y: 52, delay: 0.9 }, { x: 40, y: 38, delay: 1.6 },
];

export default function LandingPage() {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleGenerate = () => {
    router.push("/generate");
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-dark-bg flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(34,197,94,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Particles */}
      {particles.map((p, i) => (
        <Particle key={i} x={p.x} y={p.y} delay={p.delay} />
      ))}

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Nav */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-8 py-6"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            <span className="text-white text-sm font-black">OP</span>
          </div>
          <div>
            <span className="text-white font-bold text-sm">Opportunity</span>
            <span className="text-zinc-500 text-sm"> Passport AI</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-zinc-500 text-sm hidden md:block">
            Singapore · India Hackathon 2026
          </span>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerate}
            className="text-sm text-white px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
          >
            Sign In
          </motion.button>
        </div>
      </motion.header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
            style={{
              background: "rgba(37,99,235,0.1)",
              border: "1px solid rgba(37,99,235,0.2)",
              color: "#60A5FA",
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Opportunity Intelligence
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight max-w-4xl mb-6"
        >
          One Intelligent{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #06B6D4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Passport.
          </span>
          <br />
          Unlimited{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #22C55E, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Opportunities.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-12"
        >
          Transform your resume into a living digital passport. Discover jobs, scholarships,
          government schemes, and your path from India to Singapore — powered by AI.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center mb-20"
        >
          <motion.button
            id="generate-passport-btn"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGenerate}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="relative group flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-semibold text-base overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #2563EB, #7C3AED)",
              boxShadow: "0 0 40px rgba(37,99,235,0.4), 0 0 80px rgba(124,58,237,0.2)",
            }}
          >
            {/* Button shimmer */}
            <motion.div
              className="absolute inset-0"
              animate={hovered ? { x: ["0%", "200%"] } : { x: "0%" }}
              transition={{ duration: 0.6 }}
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)",
              }}
            />
            <Sparkles className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Generate My Opportunity Passport</span>
            <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/dashboard")}
            className="px-6 py-4 rounded-2xl text-zinc-300 font-medium text-base border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
          >
            View Demo Dashboard →
          </motion.button>
        </motion.div>

        {/* Passport 3D card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
          style={{ perspective: 1000, rotateX, rotateY }}
          className="mb-20"
        >
          <PassportCard />
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-20"
        >
          {features.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.1 }}
              whileHover={{ y: -3, scale: 1.02 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(37,99,235,0.15)" }}
              >
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-white text-xs font-semibold">{label}</p>
                <p className="text-zinc-500 text-xs">{desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-12 items-center justify-center"
        >
          {stats.map(({ value, suffix, label }) => {
            const count = useCounter(value, 2.5);
            return (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-white tabular-nums">
                  {count.toLocaleString()}
                  {suffix}
                </p>
                <p className="text-zinc-500 text-sm mt-1">{label}</p>
              </div>
            );
          })}
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 py-6 text-center border-t border-white/5"
      >
        <p className="text-zinc-600 text-xs">
          Built for Singapore · India Hackathon 2026 · Powered by Gemini AI
        </p>
      </motion.footer>
    </div>
  );
}
