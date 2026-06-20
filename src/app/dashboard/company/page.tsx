"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  Gem,
  Activity,
  Calendar,
  Flag,
  Rocket,
  Users,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  LineChart,
  Loader2,
  AlertCircle,
  UserCheck,
  Heart,
  UserMinus,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────── */

interface CompanyState {
  _id: string;
  startupId: {
    _id: string;
    startupName: string;
    industry: string;
    businessModel: string;
  };
  month: number;
  cash: number;
  revenue: number;
  expenses: number;
  users: number;
  employees: number;
  valuation: number;
  retention: number;
  churn: number;
  marketShare: number;
  createdAt: string;
}

/* ─── Static timeline stays as company history ───────────────────── */

const timelineEvents = [
  { date: "Month 3", title: "Seed Round Raised", desc: "Successfully closed $1.5M Seed round led by Nexus Venture Partners.", icon: Wallet, color: "text-emerald-400", bg: "bg-emerald-500/20" },
  { date: "Month 2", title: "First 100 Users", desc: "Hit the first customer milestone through organic product-led growth.", icon: Users, color: "text-blue-400", bg: "bg-blue-500/20" },
  { date: "Month 1", title: "Product Launched", desc: "Version 1.0 of the platform goes live in closed beta.", icon: Rocket, color: "text-orange-400", bg: "bg-orange-500/20" },
  { date: "Founding", title: "Startup Incorporated", desc: "Company officially registered and added to FounderOS.", icon: Flag, color: "text-zinc-400", bg: "bg-zinc-500/20" },
];

/* ─── Helpers ────────────────────────────────────────────────────── */

function fmt(n: number, prefix = "$") {
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(1)}k`;
  return `${prefix}${n.toLocaleString()}`;
}

/* ─── Simple Area Chart ─────────────────────────────────────────── */

function SimpleAreaChart({ data, colorHex }: { data: { label: string; value: number }[]; colorHex: string }) {
  const h = 160;
  const w = 100;
  const maxVal = Math.max(...data.map((d) => d.value), 1) * 1.2;

  const points = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * w;
    const y = h - (d.value / maxVal) * h;
    return `${x},${y}`;
  });

  const linePath = points.join(" ");
  const areaPath = `0,${h} ${linePath} ${w},${h}`;
  const gradId = `grad-${colorHex.replace("#", "")}`;

  return (
    <div className="w-full">
      <div className="relative w-full" style={{ height: `${h}px` }}>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorHex} stopOpacity="0.4" />
              <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPath} fill={`url(#${gradId})`} />
          <polyline points={linePath} fill="none" stroke={colorHex} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          {data.map((d, i) => {
            const cx = (i / Math.max(data.length - 1, 1)) * w;
            const cy = h - (d.value / maxVal) * h;
            return <circle key={i} cx={cx} cy={cy} r="1.5" fill="#0e0e14" stroke={colorHex} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />;
          })}
        </svg>
      </div>
      <div className="flex justify-between mt-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
        {data.map((d, i) => <span key={i}>{d.label}</span>)}
      </div>
    </div>
  );
}

/* ─── Skeleton Loader ───────────────────────────────────────────── */

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-5 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-10 w-10 rounded-xl bg-white/5" />
        <div className="space-y-2">
          <div className="h-2.5 w-20 bg-white/5 rounded" />
          <div className="h-4 w-24 bg-white/10 rounded" />
        </div>
      </div>
      <div className="h-2.5 w-16 bg-white/5 rounded mt-2" />
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */

export default function CompanyHQPage() {
  const [state, setState] = useState<CompanyState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchState() {
      try {
        // Fetch all startups first to get the most recent one
        const startupsRes = await fetch("/api/startup/list");
        if (!startupsRes.ok) throw new Error("Could not load startup list");
        const startupsData = await startupsRes.json();

        if (!startupsData.success || !startupsData.startups?.length) {
          setError("No startup found. Create one first in the wizard.");
          return;
        }

        // Use the most recent startup
        const latestStartup = startupsData.startups[0];
        const res = await fetch(`/api/company-state/${latestStartup._id}`);
        const data = await res.json();

        if (!data.success) throw new Error(data.error || "Failed to load company state");
        setState(data.companyState);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchState();
  }, []);

  /* ── Build live metric tiles from DB data ── */
  const metrics = state
    ? [
        { label: "Cash Balance",       value: fmt(state.cash),       icon: Wallet,    color: "text-emerald-400", bg: "bg-emerald-500/10" },
        { label: "Monthly Revenue",    value: fmt(state.revenue),    icon: TrendingUp, color: "text-blue-400",   bg: "bg-blue-500/10"   },
        { label: "Monthly Expenses",   value: fmt(state.expenses),   icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/10"    },
        { label: "Active Users",       value: state.users.toLocaleString(), icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10"  },
        { label: "Employees",          value: String(state.employees), icon: UserCheck, color: "text-purple-400", bg: "bg-purple-500/10" },
        { label: "Valuation",          value: fmt(state.valuation),  icon: Gem,       color: "text-amber-400",  bg: "bg-amber-500/10"  },
        { label: "Retention Rate",     value: `${state.retention}%`, icon: Heart,     color: "text-pink-400",   bg: "bg-pink-500/10"   },
        { label: "Churn Rate",         value: `${state.churn}%`,     icon: UserMinus, color: "text-orange-400", bg: "bg-orange-500/10" },
      ]
    : [];

  /* ── Single data point chart (grows as months tick) ── */
  const revenueChart = state
    ? [{ label: `Mo ${state.month}`, value: state.revenue }]
    : [];

  const cashChart = state
    ? [{ label: `Mo ${state.month}`, value: state.cash }]
    : [];

  /* ── Loading state ── */
  if (loading) {
    return (
      <div className="space-y-8 pb-12">
        <div className="flex items-center gap-3 text-zinc-400">
          <Loader2 className="h-5 w-5 animate-spin text-purple-400" />
          <span className="text-sm font-medium">Loading company data from MongoDB…</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  /* ── Error state ── */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4 text-center">
        <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Failed to load company data</h2>
        <p className="text-sm text-zinc-400 max-w-md">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="h-10 px-5 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* ─── Header ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold text-purple-400 uppercase tracking-wider">
              <Building2 className="h-3 w-3" /> Company Hub
            </span>
            <span className="text-xs font-semibold text-zinc-500">
              Month {state?.month} · {state?.startupId?.industry}
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            {state?.startupId?.startupName ?? "Company HQ"}
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Live financial health, burn trajectory, and corporate metrics — pulled from MongoDB.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live Data
          </span>
          <button className="h-10 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-xs font-bold text-white shadow-lg shadow-purple-500/20 hover:opacity-90 transition-opacity">
            Manage Cap Table
          </button>
        </div>
      </motion.div>

      {/* ─── Live Metrics Grid ────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-5 hover:border-white/10 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`h-10 w-10 rounded-xl ${metric.bg} border border-white/5 flex items-center justify-center shrink-0`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{metric.label}</p>
                  <p className="text-lg font-black text-white tracking-tight">{metric.value}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live from DB
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Business Model Info ──────────────────────────────────── */}
      {state && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Business Model", value: state.startupId?.businessModel },
            { label: "Industry", value: state.startupId?.industry },
            { label: "Simulation Month", value: `Month ${state.month}` },
            { label: "Market Share", value: `${state.marketShare}%` },
          ].map((item, i) => (
            <div key={i} className="border-r border-white/5 last:border-0 pr-6 last:pr-0">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-sm font-bold text-white">{item.value}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* ─── Company Timeline ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 lg:p-8"
      >
        <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
          <Calendar className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-bold text-white">Company Milestones</h2>
        </div>

        <div className="relative pl-6 space-y-8">
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500/50 via-white/10 to-transparent rounded-full" />

          {timelineEvents.map((event, i) => {
            const Icon = event.icon;
            return (
              <div key={i} className="relative group">
                <div className={`absolute -left-[30.5px] top-1.5 h-3 w-3 rounded-full border-2 border-[#0e0e14] ${event.bg.replace('/20', '')} z-10 transition-transform group-hover:scale-150`} />
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="shrink-0 w-24">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{event.date}</span>
                  </div>
                  <div className="flex-1 bg-white/3 border border-white/5 rounded-xl p-4 hover:bg-white/5 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`h-6 w-6 rounded-md ${event.bg} flex items-center justify-center`}>
                        <Icon className={`h-3 w-3 ${event.color}`} />
                      </div>
                      <h3 className="text-sm font-bold text-white">{event.title}</h3>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{event.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
