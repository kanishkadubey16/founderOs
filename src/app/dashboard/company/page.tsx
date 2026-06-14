"use client";

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
} from "lucide-react";

/* ─── Mock Data ────────────────────────────────────────────────── */

const companyMetrics = [
  { label: "Cash Balance", value: "$1,245,000", change: "+$250k", positive: true, icon: Wallet, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Monthly Revenue", value: "$84,500", change: "+12.4%", positive: true, icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Monthly Expenses", value: "$92,000", change: "+4.1%", positive: false, icon: TrendingDown, color: "text-red-400", bg: "bg-red-500/10" },
  { label: "Net Profit", value: "-$7,500", change: "+$2.5k", positive: true, icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Burn Rate", value: "$38,200/mo", change: "-5.2%", positive: true, icon: Activity, color: "text-orange-400", bg: "bg-orange-500/10" },
  { label: "Runway", value: "32 Months", change: "+6 Mo", positive: true, icon: Clock, color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { label: "Company Valuation", value: "$12.5M", change: "+$4.5M", positive: true, icon: Gem, color: "text-purple-400", bg: "bg-purple-500/10" },
];

const timelineEvents = [
  { date: "Oct 2025", title: "Seed Round Raised", desc: "Successfully closed $1.5M Seed round led by Nexus Venture Partners.", icon: Wallet, color: "text-emerald-400", bg: "bg-emerald-500/20" },
  { date: "Aug 2025", title: "Crossed 1,000 Users", desc: "Hit the first major customer milestone with organic growth.", icon: Users, color: "text-blue-400", bg: "bg-blue-500/20" },
  { date: "Jun 2025", title: "Product Hunt Launch", desc: "Finished #2 Product of the Day, driving 400 immediate signups.", icon: Rocket, color: "text-orange-400", bg: "bg-orange-500/20" },
  { date: "Apr 2025", title: "MVP Deployed", desc: "Version 1.0 of the platform goes live for closed beta testers.", icon: Building2, color: "text-purple-400", bg: "bg-purple-500/20" },
  { date: "Jan 2025", title: "Startup Incorporated", desc: "VentureAI Labs officially registered in Delaware as a C-Corp.", icon: Flag, color: "text-zinc-400", bg: "bg-zinc-500/20" },
];

const revenueHistory = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 18000 },
  { month: "Mar", value: 24000 },
  { month: "Apr", value: 35000 },
  { month: "May", value: 42000 },
  { month: "Jun", value: 58000 },
  { month: "Jul", value: 71000 },
  { month: "Aug", value: 84500 },
];

const burnHistory = [
  { month: "Jan", value: 18000 },
  { month: "Feb", value: 22000 },
  { month: "Mar", value: 25000 },
  { month: "Apr", value: 38000 },
  { month: "May", value: 45000 },
  { month: "Jun", value: 42000 },
  { month: "Jul", value: 40000 },
  { month: "Aug", value: 38200 },
];

/* ─── Custom Area Chart Component ──────────────────────────────── */

function SimpleAreaChart({ data, colorHex }: { data: { month: string; value: number }[]; colorHex: string }) {
  const h = 160;
  const w = 100;
  const maxVal = Math.max(...data.map((d) => d.value)) * 1.2;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (d.value / maxVal) * h;
    return `${x},${y}`;
  });

  const linePath = points.join(" ");
  const areaPath = `0,${h} ${linePath} ${w},${h}`;

  return (
    <div className="w-full">
      <div className="relative w-full" style={{ height: `${h}px` }}>
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id={`grad-${colorHex.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorHex} stopOpacity="0.4" />
              <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon points={areaPath} fill={`url(#grad-${colorHex.replace("#", "")})`} />
          <polyline points={linePath} fill="none" stroke={colorHex} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          
          {/* Data Points */}
          {data.map((d, i) => {
            const cx = (i / (data.length - 1)) * w;
            const cy = h - (d.value / maxVal) * h;
            return (
              <circle key={i} cx={cx} cy={cy} r="1.5" fill="#0e0e14" stroke={colorHex} strokeWidth="0.5" vectorEffect="non-scaling-stroke" className="hover:r-3 transition-all" />
            );
          })}
        </svg>
      </div>
      <div className="flex justify-between mt-3 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
        {data.map((d, i) => (
          <span key={i}>{d.month}</span>
        ))}
      </div>
    </div>
  );
}

export default function CompanyHQPage() {
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
              <Building2 className="h-3 w-3" />
              Company Hub
            </span>
            <span className="text-xs font-semibold text-zinc-500">Founded Jan 2025</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">VentureAI Labs</h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Financial health, burn trajectory, and major corporate milestones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-colors">
            Download P&L
          </button>
          <button className="h-10 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-xs font-bold text-white shadow-lg shadow-purple-500/20 hover:opacity-90 transition-opacity">
            Manage Cap Table
          </button>
        </div>
      </motion.div>

      {/* ─── Financial Metrics Grid ──────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {companyMetrics.map((metric, i) => {
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
              <div className="flex items-center gap-1.5 bg-white/3 rounded-lg px-2.5 py-1.5 w-fit border border-white/5">
                {metric.positive ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-400" />
                )}
                <span className={`text-[10px] font-bold ${metric.positive ? "text-emerald-400" : "text-red-400"}`}>
                  {metric.change}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Growth History Charts ───────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-blue-400" />
              <h2 className="text-sm font-bold text-white">Revenue Growth History</h2>
            </div>
            <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-2 py-1 rounded-lg border border-blue-500/20">
              YTD: +$84.5k
            </span>
          </div>
          <SimpleAreaChart data={revenueHistory} colorHex="#3b82f6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-orange-400" />
              <h2 className="text-sm font-bold text-white">Burn Rate Trajectory</h2>
            </div>
            <span className="text-xs font-black text-orange-400 bg-orange-500/10 px-2 py-1 rounded-lg border border-orange-500/20">
              Optimizing
            </span>
          </div>
          <SimpleAreaChart data={burnHistory} colorHex="#f97316" />
        </motion.div>
      </div>

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
          {/* Vertical Track Line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500/50 via-white/10 to-transparent rounded-full" />

          {timelineEvents.map((event, i) => {
            const Icon = event.icon;
            return (
              <div key={i} className="relative group">
                {/* Connector Dot */}
                <div className={`absolute -left-[30.5px] top-1.5 h-3 w-3 rounded-full border-2 border-[#0e0e14] ${event.bg.replace('/20', '')} ${event.color} z-10 transition-transform group-hover:scale-150`} />
                
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Date Badge */}
                  <div className="shrink-0 w-24">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{event.date}</span>
                  </div>
                  
                  {/* Content Card */}
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
