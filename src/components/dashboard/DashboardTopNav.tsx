"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Bell,
  Search,
  CalendarDays,
  Circle,
  Check,
  Rocket,
  TrendingUp,
  AlertCircle,
  LogOut,
  User,
  CreditCard,
  Sparkles,
  Command,
  X,
} from "lucide-react";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const notifications = [
  { icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10", title: "Revenue milestone hit", desc: "Crossed $50K ARR in simulation", time: "2m ago", unread: true },
  { icon: AlertCircle, color: "text-yellow-400", bg: "bg-yellow-500/10", title: "Market shift detected", desc: "Competitor launched new product", time: "18m ago", unread: true },
  { icon: Rocket, color: "text-blue-400", bg: "bg-blue-500/10", title: "Agent task complete", desc: "Marketing campaign v3 drafted", time: "1h ago", unread: true },
  { icon: Check, color: "text-purple-400", bg: "bg-purple-500/10", title: "Board meeting scheduled", desc: "Q2 review set for Month 6", time: "3h ago", unread: false },
];

export default function DashboardTopNav() {
  const now = new Date();
  const currentMonth = MONTHS[now.getMonth()];
  const currentYear = now.getFullYear();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [unread, setUnread] = useState(3);
  const [searchFocused, setSearchFocused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" as const } },
    exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.15 } },
  };

  return (
    <header className="relative z-20 flex h-[68px] items-center justify-between border-b border-white/[0.04] bg-[#08080d]/70 backdrop-blur-2xl px-6 lg:px-8 shrink-0">
      {/* Subtle top border glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/10 to-transparent" />

      {/* Left — Startup name + Month */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Startup Selector */}
        <motion.button
          initial={mounted ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          className="group flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
        >
          <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-[10px] font-black text-white shrink-0 shadow-sm shadow-purple-500/20">
            V
          </div>
          <span className="text-sm font-semibold text-white truncate max-w-[140px]">VentureAI Labs</span>
          <ChevronDown className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-400 shrink-0 transition-colors" />
        </motion.button>

        {/* Month Badge */}
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-1.5 text-xs font-medium text-zinc-500">
          <CalendarDays className="h-3.5 w-3.5 text-purple-400/70" />
          <span>{currentMonth} {currentYear}</span>
          <span className="ml-0.5 rounded-lg bg-gradient-to-r from-purple-500/15 to-blue-500/10 border border-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300">
            Month 3
          </span>
        </div>

        {/* Live Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15 px-2.5 py-1 text-[10px] font-bold text-emerald-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          LIVE
        </div>
      </div>

      {/* Right — Search + Notifs + Profile */}
      <div className="flex items-center gap-2.5">
        {/* Search */}
        <button
          onClick={() => setSearchFocused(true)}
          className="hidden md:flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2 text-xs text-zinc-500 hover:bg-white/[0.06] hover:border-white/10 hover:text-zinc-400 transition-all duration-300 w-48"
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span>Search anything...</span>
          <div className="ml-auto flex items-center gap-0.5">
            <kbd className="inline-flex items-center rounded-md border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-600 font-medium">
              <Command className="h-2.5 w-2.5 mr-0.5" />K
            </kbd>
          </div>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            id="notifications-btn"
            onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); setUnread(0); }}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03] text-zinc-500 hover:text-white hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-[9px] font-bold text-white shadow-lg shadow-purple-500/30"
              >
                {unread}
              </motion.span>
            )}
          </button>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-[52px] w-[340px] rounded-2xl border border-white/[0.08] bg-[#0c0c14]/98 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.04]">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Notifications</span>
                    <span className="rounded-lg bg-purple-500/10 border border-purple-500/20 px-1.5 py-0.5 text-[9px] font-bold text-purple-300">4 new</span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-white/[0.06] text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="flex flex-col max-h-80 overflow-y-auto styled-scrollbar">
                  {notifications.map((n, i) => {
                    const Icon = n.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.03] transition-colors cursor-pointer border-b border-white/[0.03] last:border-0 ${n.unread ? "bg-purple-500/[0.02]" : ""}`}
                      >
                        <div className={`h-9 w-9 rounded-xl ${n.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Icon className={`h-4 w-4 ${n.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-semibold text-white truncate">{n.title}</p>
                            {n.unread && <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0" />}
                          </div>
                          <p className="text-[11px] text-zinc-500 truncate mt-0.5">{n.desc}</p>
                        </div>
                        <span className="text-[10px] text-zinc-600 shrink-0 mt-1">{n.time}</span>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="border-t border-white/[0.04] px-5 py-3">
                  <button className="w-full text-center text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                    View all notifications →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            id="profile-btn"
            onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
            className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
            aria-label="User profile"
          >
            <div className="relative h-7 w-7 rounded-lg bg-gradient-to-br from-purple-400 via-purple-500 to-blue-500 flex items-center justify-center text-[11px] font-bold text-white shadow-sm shadow-purple-500/20">
              K
              <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-[#0c0c14]" />
            </div>
            <span className="hidden sm:block text-sm font-medium text-white max-w-[100px] truncate">Kanishka</span>
            <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-zinc-600" />
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 top-[52px] w-60 rounded-2xl border border-white/[0.08] bg-[#0c0c14]/98 backdrop-blur-2xl shadow-2xl shadow-black/60 overflow-hidden"
              >
                <div className="px-5 py-4 border-b border-white/[0.04]">
                  <p className="text-sm font-bold text-white">Kanishka Dubey</p>
                  <p className="text-xs text-zinc-500 truncate mt-0.5">kanishka@founderos.ai</p>
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/8 border border-purple-500/15 px-2.5 py-1 text-[10px] font-bold text-purple-300">
                    <Sparkles className="h-2.5 w-2.5" />
                    Founder OS Pro
                  </div>
                </div>
                <div className="p-2">
                  <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-zinc-400 hover:bg-white/[0.04] hover:text-white transition-all duration-200">
                    <User className="h-4 w-4 text-zinc-600" />
                    My Profile
                  </Link>
                  <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-zinc-400 hover:bg-white/[0.04] hover:text-white transition-all duration-200">
                    <CreditCard className="h-4 w-4 text-zinc-600" />
                    Billing & Plans
                  </Link>
                </div>
                <div className="border-t border-white/[0.04] p-2">
                  <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] text-red-400/80 hover:bg-red-500/8 hover:text-red-400 transition-all duration-200">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Backdrop to close dropdowns */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => { setShowNotifications(false); setShowProfile(false); }}
        />
      )}
    </header>
  );
}
