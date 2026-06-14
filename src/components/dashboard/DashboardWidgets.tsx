"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: ReactNode;
  iconBg?: string;
  delay?: number;
}

export function StatCard({ title, value, change, positive = true, icon, iconBg = "bg-purple-500/10", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="dashboard-card p-5 group cursor-default"
    >
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mb-2">{title}</p>
          <p className="text-2xl font-black text-white tracking-tight truncate animate-counter-value">{value}</p>
          <p className={`mt-2 text-xs font-semibold ${positive ? "text-emerald-400" : "text-red-400"}`}>
            {change}
          </p>
        </div>
        <div className={`h-11 w-11 rounded-xl ${iconBg} border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
  actions?: ReactNode;
}

export function DashboardCard({ title, subtitle, children, className = "", delay = 0, actions }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`dashboard-card overflow-hidden ${className}`}
    >
      <div className="flex items-start justify-between gap-3 px-6 py-4 border-b border-white/[0.04]">
        <div>
          <h3 className="text-sm font-bold text-white">{title}</h3>
          {subtitle && <p className="text-[11px] text-zinc-500 mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

interface AgentStatusBadgeProps {
  status: "running" | "idle" | "complete" | "error";
}

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  const styles = {
    running: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    idle: "bg-zinc-500/10 border-zinc-500/20 text-zinc-400",
    complete: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    error: "bg-red-500/10 border-red-500/20 text-red-400",
  };
  const dots = {
    running: "bg-emerald-500",
    idle: "bg-zinc-400",
    complete: "bg-blue-400",
    error: "bg-red-400",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold capitalize ${styles[status]}`}>
      <span className="relative flex h-1.5 w-1.5">
        {status === "running" && (
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${dots[status]} opacity-60`} />
        )}
        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${dots[status]}`} />
      </span>
      {status}
    </span>
  );
}
