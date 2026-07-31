"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BadgeCheck,
  Briefcase,
  Share2,
  MessageSquare,
  TrendingUp,
  PiggyBank,
  Building2,
  Globe,
  Settings,
  Bell,
  ChevronRight,
  Zap,
  Shield,
  BookOpen,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { notifications } from "@/data/notifications";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/passport", label: "Passport", icon: BadgeCheck },
  { href: "/opportunities", label: "Opportunities", icon: Briefcase },
  { href: "/graph", label: "Opp. Graph", icon: Share2 },
  { href: "/mentor", label: "AI Mentor", icon: MessageSquare },
  { href: "/simulator", label: "Simulator", icon: TrendingUp },
  { href: "/finance", label: "Finance", icon: PiggyBank },
  { href: "/insurance", label: "Insurance", icon: Shield },
  { href: "/learning", label: "Learning", icon: BookOpen },
  { href: "/government", label: "Government", icon: Building2 },
  { href: "/mobility", label: "Mobility", icon: Globe },
  { href: "/timeline", label: "Timeline", icon: Clock },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-full w-64 flex flex-col z-40"
      style={{
        background: "rgba(9,9,11,0.95)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            <span className="text-white text-sm font-bold">OP</span>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Opportunity</p>
            <p className="text-zinc-400 text-xs mt-0.5">Passport AI</p>
          </div>
        </Link>
      </div>

      {/* User Card */}
      <div className="px-4 py-4 border-b border-white/5">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #2563EB, #7C3AED)" }}
          >
            AS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Alex Sharma</p>
            <p className="text-zinc-500 text-xs truncate">Score: 82/100</p>
          </div>
          <ChevronRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 2 }}
                  className={cn(
                    "nav-item",
                    isActive && "active"
                  )}
                >
                  <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-primary" : "text-zinc-500")} />
                  <span className="flex-1">{item.label}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Notifications Bell */}
      <div className="px-4 pb-4 border-t border-white/5 pt-4">
        <Link href="/dashboard">
          <div className="nav-item relative">
            <Bell className="w-4 h-4 text-zinc-500" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                {unreadCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </motion.aside>
  );
}
