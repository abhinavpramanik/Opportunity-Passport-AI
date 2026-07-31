"use client";

import { motion } from "framer-motion";
import { User, Bell, Moon, Globe, Shield, ChevronRight } from "lucide-react";
import { user } from "@/data/user";

const settingsSections = [
  {
    title: "Profile",
    icon: User,
    items: [
      { label: "Display Name", value: user.name },
      { label: "Email", value: user.email },
      { label: "Target Location", value: user.targetLocation },
      { label: "Current Goal", value: user.goal },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    items: [
      { label: "Job Match Alerts", value: "On", toggle: true },
      { label: "Scholarship Deadlines", value: "On", toggle: true },
      { label: "Scheme Eligibility Updates", value: "On", toggle: true },
      { label: "Weekly Progress Report", value: "Off", toggle: true },
    ],
  },
  {
    title: "Appearance",
    icon: Moon,
    items: [
      { label: "Theme", value: "Dark Mode" },
      { label: "Language", value: "English" },
    ],
  },
  {
    title: "Privacy & Security",
    icon: Shield,
    items: [
      { label: "Data Storage", value: "Local Only (Demo)" },
      { label: "AI Analysis", value: "Enabled" },
    ],
  },
  {
    title: "Region",
    icon: Globe,
    items: [
      { label: "Home Country", value: "India 🇮🇳" },
      { label: "Target Country", value: "Singapore 🇸🇬" },
      { label: "Currency", value: "INR / SGD" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">Settings</h1>
        <p className="text-zinc-400 text-sm">Manage your profile and preferences</p>
      </motion.div>

      {/* Profile header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="glass-card p-6 mb-8 flex items-center gap-5">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl"
          style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}>
          {user.avatar}
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">{user.name}</h2>
          <p className="text-zinc-400 text-sm">{user.tagline}</p>
          <p className="text-zinc-500 text-xs mt-1">{user.email}</p>
        </div>
        <div className="ml-auto">
          <div className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-300"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
            Demo Mode
          </div>
        </div>
      </motion.div>

      <div className="space-y-4 max-w-2xl">
        {settingsSections.map(({ title, icon: Icon, items }, si) => (
          <motion.div key={title}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.08 + 0.2 }}
            className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-4 h-4 text-primary" />
              <h3 className="text-white font-semibold text-sm">{title}</h3>
            </div>
            <div className="space-y-1">
              {items.map(({ label, value, toggle }: { label: string; value: string; toggle?: boolean }) => (
                <div key={label} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
                  <p className="text-zinc-300 text-sm">{label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-500 text-sm">{value}</span>
                    {!toggle && <ChevronRight className="w-4 h-4 text-zinc-700" />}
                    {toggle && (
                      <div className={`w-9 h-5 rounded-full transition-colors cursor-pointer ${value === "On" ? "bg-primary" : "bg-zinc-700"}`}
                        style={{ position: "relative" }}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${value === "On" ? "left-4" : "left-0.5"}`} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
