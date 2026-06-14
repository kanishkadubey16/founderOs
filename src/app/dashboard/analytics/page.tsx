"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Target,
  Activity,
  Gem,
  Briefcase,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Database
} from "lucide-react";

/* ─── Mock Data ────────────────────────────────────────────────── */

const topMetrics = [
  { label: "Net Revenue", value: "$84.5k", change: "+12%", positive: true, icon: DollarSign },
  { label: "Total Users", value: "3,240", change: "+4.2%", positive: true, icon: Users },
  { label: "Market Share", value: "12.0%", change: "+1.5%", positive: true, icon: Target },
  { label: "Burn Rate", value: "$38.2k", change: "-5%", positive: true, icon: Activity },
];

const revenueData = [12, 18, 24, 35, 42, 58, 71, 84.5];
const expensesData = [18, 22, 25, 38, 45, 42, 40, 38.2];
const userGrowthData = [1200, 1450, 1800, 2100, 2500, 2850, 3100, 3240];
const retentionData = [89, 90, 88, 92, 91, 93, 94, 94.2];
const marketShareData = [3.5, 4.2, 5.0, 7.5, 9.1, 10.5, 11.2, 12.0];
const productivityData = [78, 82, 80, 85, 89, 90, 91, 92];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

/* ─── Custom Charts ────────────────────────────────────────────── */

function AreaChart({ data, colorHex, height = 140 }: { data: number[]; colorHex: string; height?: number }) {
  const w = 100;
  const maxVal = Math.max(...data) * 1.1;
  const minVal = Math.min(...data) * 0.9;
  const range = maxVal - minVal || 1; // Prevent div by 0

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = height - ((val - minVal) / range) * height;
    return `${x},${y}`;
  });

  const linePath = points.join(" ");
  const areaPath = `0,${height} ${linePath} ${w},${height}`;

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <svg viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`grad-${colorHex.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorHex} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colorHex} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={areaPath} fill={`url(#grad-${colorHex.replace("#", "")})`} />
        <polyline points={linePath} fill="none" stroke={colorHex} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        {data.map((val, i) => {
          const cx = (i / (data.length - 1)) * w;
          const cy = height - ((val - minVal) / range) * height;
          return <circle key={i} cx={cx} cy={cy} r="2" fill="#0e0e14" stroke={colorHex} strokeWidth="1" vectorEffect="non-scaling-stroke" />;
        })}
      </svg>
    </div>
  );
}

function DualBarChart({ dataA, dataB, colorA, colorB }: { dataA: number[], dataB: number[], colorA: string, colorB: string }) {
  const height = 140;
  const maxVal = Math.max(...dataA, ...dataB) * 1.1;

  return (
    <div className="flex items-end justify-between w-full gap-2" style={{ height: `${height}px` }}>
      {dataA.map((valA, i) => {
        const valB = dataB[i];
        const hA = (valA / maxVal) * 100;
        const hB = (valB / maxVal) * 100;

        return (
          <div key={i} className="flex flex-col items-center justify-end h-full w-full gap-0.5 group">
            <div className="flex items-end justify-center w-full h-full gap-1">
              <div className="w-1/2 rounded-t-sm transition-all" style={{ height: `${hA}%`, backgroundColor: colorA }} title={`Revenue: ${valA}`} />
              <div className="w-1/2 rounded-t-sm transition-all" style={{ height: `${hB}%`, backgroundColor: colorB }} title={`Expenses: ${valB}`} />
            </div>
            <span className="text-[8px] font-bold text-zinc-600 mt-2">{months[i]}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function AnalyticsCommandCenterPage() {
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-400 uppercase tracking-wider">
              <Database className="h-3 w-3" />
              BI Platform
            </span>
            <span className="text-xs font-semibold text-zinc-500">Global System View</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Analytics Command Center</h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            The master dashboard. Aggregate insights across finance, growth, market positioning, and team performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-colors">
            Custom Report
          </button>
          <button className="h-10 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Export Dashboard
          </button>
        </div>
      </motion.div>

      {/* ─── Top Level Metrics ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {topMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-5 flex flex-col relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
                <Icon className="h-24 w-24" />
              </div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">{metric.label}</p>
              <div className="flex items-end justify-between mt-auto">
                <p className="text-2xl font-black text-white tracking-tight">{metric.value}</p>
                <div className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  metric.positive ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-red-400 bg-red-500/10 border-red-500/20"
                }`}>
                  {metric.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {metric.change}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Main Charts Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Financial Analytics (Dual Bar) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Financial Analytics</h2>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-400" /> Revenue</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-400" /> Expenses</div>
            </div>
          </div>
          <DualBarChart dataA={revenueData} dataB={expensesData} colorA="#34d399" colorB="#f87171" />
        </motion.div>

        {/* Growth Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              <h2 className="text-lg font-bold text-white">User Growth</h2>
            </div>
            <span className="text-xs text-zinc-500 font-bold">Active Accounts</span>
          </div>
          <AreaChart data={userGrowthData} colorHex="#3b82f6" />
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-xs">
            <span className="text-zinc-500">Avg MoM Growth</span>
            <span className="font-bold text-blue-400">+14.2%</span>
          </div>
        </motion.div>

        {/* Retention Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-bold text-white">Platform Retention</h2>
            </div>
            <span className="text-xs text-zinc-500 font-bold">% Retained (90 days)</span>
          </div>
          <AreaChart data={retentionData} colorHex="#a855f7" />
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-xs">
            <span className="text-zinc-500">Current Churn Rate</span>
            <span className="font-bold text-purple-400">5.8%</span>
          </div>
        </motion.div>

        {/* Market Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Market Share Capture</h2>
            </div>
            <span className="text-xs text-zinc-500 font-bold">Global %</span>
          </div>
          <AreaChart data={marketShareData} colorHex="#fbbf24" />
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-xs">
            <span className="text-zinc-500">Competitor Rank</span>
            <span className="font-bold text-amber-400">#3 in Category</span>
          </div>
        </motion.div>

        {/* Employee Productivity */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-cyan-400" />
              <h2 className="text-lg font-bold text-white">Team Productivity</h2>
            </div>
            <span className="text-xs text-zinc-500 font-bold">Output Score</span>
          </div>
          <AreaChart data={productivityData} colorHex="#22d3ee" />
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between text-xs">
            <span className="text-zinc-500">Avg Happiness</span>
            <span className="font-bold text-cyan-400">4.6/5</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
