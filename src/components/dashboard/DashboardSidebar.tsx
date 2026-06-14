"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  LayoutDashboard,
  Microscope,
  Building2,
  Users,
  UserCheck,
  Swords,
  TrendingUp,
  Lightbulb,
  CalendarDays,
  BarChart3,
  BrainCircuit,
  Settings,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Sparkles,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, badge: null },
  { label: "Create Startup", href: "/dashboard/create", icon: PlusCircle, badge: null },
  { label: "Startup Analysis", href: "/dashboard/analysis", icon: Microscope, badge: null },
  { label: "Company", href: "/dashboard/company", icon: Building2, badge: null },
  { label: "Customers", href: "/dashboard/customers", icon: Users, badge: "3.2K" },
  { label: "Employees", href: "/dashboard/employees", icon: UserCheck, badge: "14" },
  { label: "Competitors", href: "/dashboard/competitors", icon: Swords, badge: null },
  { label: "Investors", href: "/dashboard/investors", icon: TrendingUp, badge: null },
  { label: "Decision Center", href: "/dashboard/decisions", icon: Lightbulb, badge: null },
  { label: "Board Meetings", href: "/dashboard/board", icon: CalendarDays, badge: null },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, badge: null },
  { label: "AI Mentor", href: "/dashboard/mentor", icon: BrainCircuit, badge: "AI" },
];

const bottomItems = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`relative flex flex-col border-r border-white/[0.04] bg-[#08080d]/90 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        collapsed ? "w-[72px]" : "w-[252px]"
      } shrink-0`}
    >
      {/* Subtle ambient glow at top */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-purple-500/[0.03] to-transparent" />
      
      {/* Logo */}
      <div
        className={`flex h-[68px] items-center border-b border-white/[0.04] px-4 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-purple-600 to-blue-500 shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 group-hover:scale-105 transition-all duration-300">
            <Activity className="h-4.5 w-4.5 text-white" />
            {/* Glowing ring */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-400/20 to-blue-400/20 animate-pulse-glow" />
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-bold tracking-tight text-white"
              >
                Founder<span className="text-gradient-purple-blue">OS</span>
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Collapse toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-[4.75rem] z-10 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#0c0c12] text-zinc-400 hover:text-white hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 shadow-xl shadow-black/40"
        aria-label="Toggle sidebar"
      >
        <motion.div
          animate={{ rotate: collapsed ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </motion.div>
      </button>

      {/* Section label */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-5 pt-5 pb-1"
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-600">Navigation</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav Items */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto overflow-x-hidden no-scrollbar p-3 pt-2">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                active
                  ? "bg-gradient-to-r from-purple-500/12 via-purple-500/8 to-blue-500/6 text-white sidebar-active-glow"
                  : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
              } ${collapsed ? "justify-center px-0 mx-auto w-11" : ""}`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              {/* Active indicator bar */}
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r-full bg-gradient-to-b from-purple-400 to-blue-500"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {/* Active background glow */}
              {active && (
                <div className="pointer-events-none absolute inset-0 rounded-xl border border-purple-500/15" />
              )}

              <Icon
                className={`shrink-0 transition-all duration-200 ${
                  active
                    ? "text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]"
                    : "text-zinc-600 group-hover:text-zinc-400"
                }`}
                style={{ height: "18px", width: "18px" }}
              />
              
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.15 }}
                    className="truncate flex-1"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Badges */}
              {!collapsed && item.badge && (
                <span className={`text-[9px] font-bold rounded-md px-1.5 py-0.5 ${
                  item.badge === "AI"
                    ? "bg-gradient-to-r from-purple-500/15 to-blue-500/15 text-purple-300 border border-purple-500/20"
                    : "bg-white/[0.06] text-zinc-500 border border-white/[0.06]"
                }`}>
                  {item.badge}
                </span>
              )}

              {/* Collapsed tooltip */}
              {collapsed && (
                <div className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-xl border border-white/10 bg-[#0f0f16]/95 backdrop-blur-xl px-3 py-2 text-xs font-semibold text-white shadow-2xl shadow-black/60 group-hover:block z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 h-2 w-2 rotate-45 bg-[#0f0f16] border-l border-b border-white/10" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider with shimmer */}
      <div className="mx-3 h-px shimmer-line" />

      {/* Bottom Items (Settings) */}
      <div className="p-3">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200 ${
                active
                  ? "bg-white/[0.06] text-white"
                  : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <Icon
                className={`shrink-0 transition-colors ${
                  active ? "text-purple-400" : "text-zinc-600 group-hover:text-zinc-400"
                }`}
                style={{ height: "18px", width: "18px" }}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {collapsed && (
                <div className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-xl border border-white/10 bg-[#0f0f16]/95 backdrop-blur-xl px-3 py-2 text-xs font-semibold text-white shadow-2xl shadow-black/60 group-hover:block z-50">
                  {item.label}
                </div>
              )}
            </Link>
          );
        })}

        {/* Pro badge at bottom */}
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="mt-3 rounded-xl bg-gradient-to-br from-purple-500/[0.08] to-blue-500/[0.05] border border-purple-500/10 p-3"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                <span className="text-[11px] font-bold text-white">FounderOS Pro</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">AI-powered insights and unlimited simulations active.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
