"use client";

import { motion } from "framer-motion";
import {
  DollarSign, TrendingUp, Users, UserCheck,
  Flame, Clock, Gem, PieChart,
  ArrowUpRight, ArrowDownRight,
  Zap, BrainCircuit, AlertTriangle, CalendarClock,
  Sparkles, Rocket, ShieldAlert, Target,
  MessageSquare, FileWarning,
  Info, ChevronRight, Activity,
} from "lucide-react";
import { DashboardCard } from "@/components/dashboard/DashboardWidgets";

/* ─── Mock Data ────────────────────────────────────────────────── */

const revenueData = [
  { month: "Jan", value: 12400 },
  { month: "Feb", value: 15800 },
  { month: "Mar", value: 14200 },
  { month: "Apr", value: 19600 },
  { month: "May", value: 23100 },
  { month: "Jun", value: 21800 },
  { month: "Jul", value: 28400 },
  { month: "Aug", value: 32100 },
  { month: "Sep", value: 35600 },
  { month: "Oct", value: 38900 },
  { month: "Nov", value: 42300 },
  { month: "Dec", value: 48700 },
];

const userGrowthData = [
  { month: "Jan", value: 120 },
  { month: "Feb", value: 240 },
  { month: "Mar", value: 380 },
  { month: "Apr", value: 520 },
  { month: "May", value: 710 },
  { month: "Jun", value: 890 },
  { month: "Jul", value: 1140 },
  { month: "Aug", value: 1420 },
  { month: "Sep", value: 1780 },
  { month: "Oct", value: 2150 },
  { month: "Nov", value: 2640 },
  { month: "Dec", value: 3240 },
];

const retentionData = [
  { month: "Jan", value: 88 },
  { month: "Feb", value: 86 },
  { month: "Mar", value: 89 },
  { month: "Apr", value: 91 },
  { month: "May", value: 87 },
  { month: "Jun", value: 90 },
  { month: "Jul", value: 92 },
  { month: "Aug", value: 91 },
  { month: "Sep", value: 93 },
  { month: "Oct", value: 94 },
  { month: "Nov", value: 92 },
  { month: "Dec", value: 95 },
];

const churnData = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 14 },
  { month: "Mar", value: 11 },
  { month: "Apr", value: 9 },
  { month: "May", value: 13 },
  { month: "Jun", value: 10 },
  { month: "Jul", value: 8 },
  { month: "Aug", value: 9 },
  { month: "Sep", value: 7 },
  { month: "Oct", value: 6 },
  { month: "Nov", value: 8 },
  { month: "Dec", value: 5 },
];

const recentEvents = [
  { icon: Rocket, color: "text-blue-400", bg: "bg-blue-500/10", title: "Product Hunt Launch", desc: "Gained 340 upvotes and 89 new signups in first 24h", time: "2h ago", type: "milestone" },
  { icon: DollarSign, color: "text-green-400", bg: "bg-green-500/10", title: "Revenue milestone", desc: "Monthly recurring revenue crossed $48.7K", time: "5h ago", type: "revenue" },
  { icon: Users, color: "text-purple-400", bg: "bg-purple-500/10", title: "User spike detected", desc: "Active users surged 18% after TechCrunch mention", time: "12h ago", type: "growth" },
  { icon: UserCheck, color: "text-cyan-400", bg: "bg-cyan-500/10", title: "Key hire accepted", desc: "VP of Engineering accepted offer — starts Month 4", time: "1d ago", type: "team" },
  { icon: MessageSquare, color: "text-amber-400", bg: "bg-amber-500/10", title: "Customer feedback surge", desc: "42 new NPS responses received, avg score: 8.4/10", time: "1d ago", type: "feedback" },
  { icon: Target, color: "text-indigo-400", bg: "bg-indigo-500/10", title: "Partnership signed", desc: "Integration deal with CloudSync Corp finalized", time: "2d ago", type: "deal" },
];

const aiInsights = [
  { severity: "high", icon: TrendingUp, title: "Optimize pricing tier", desc: "Analysis suggests a 15% price increase on Pro tier would yield +$6.2K MRR with only 3% churn risk. Enterprise customers show low price sensitivity.", action: "View Analysis" },
  { severity: "medium", icon: BrainCircuit, title: "Hiring bottleneck ahead", desc: "At current growth rate, engineering capacity hits ceiling in Month 6. Recommend initiating 2 senior dev hires now to maintain velocity.", action: "See Forecast" },
  { severity: "low", icon: Sparkles, title: "Feature opportunity", desc: "Usage data shows 67% of power users access the API daily. A dedicated API dashboard could increase retention by ~8% and unlock developer tier pricing.", action: "Explore Data" },
];

const upcomingRisks = [
  { level: "critical", icon: Flame, title: "Burn rate acceleration", desc: "Monthly burn increased 22% to $34.2K. At current trajectory, runway drops below 10 months by Q3.", metric: "Runway: 14mo → 10mo" },
  { level: "warning", icon: ShieldAlert, title: "Competitor pricing war", desc: "RivalStack dropped prices 30% this week. Agent_Competitive detects potential customer migration risk of 8-12%.", metric: "Risk: 8-12% churn" },
  { level: "watch", icon: FileWarning, title: "Regulatory compliance gap", desc: "SOC 2 Type II audit deadline approaching in 60 days. Current readiness score: 64%. Requires immediate attention.", metric: "Readiness: 64%" },
];

/* ─── Animation Variants ──────────────────────────────────────── */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ─── Sparkline Component ──────────────────────────────────────── */

function Sparkline({ data, color = "stroke-purple-400", positive = true }: { data: number[]; color?: string; positive?: boolean }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 90;
  const height = 30;
  const padding = 3;
  const adjHeight = height - padding * 2;

  // Map data to coordinates
  const pointsArr = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = padding + adjHeight - ((v - min) / range) * adjHeight;
    return { x, y };
  });

  const linePath = pointsArr.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ");
  const dPath = `M ${pointsArr[0].x.toFixed(1)},${pointsArr[0].y.toFixed(1)} L ${linePath}`;
  const areaPath = `${dPath} L ${width.toFixed(1)},${height} L 0,${height} Z`;

  // Parse color class name (e.g., "stroke-red-400" -> "red")
  const colorName = color.replace("stroke-", "").split("-")[0];
  
  const hexMap: Record<string, string> = {
    red: "#f87171",
    green: "#4ade80",
    emerald: "#34d399",
    blue: "#60a5fa",
    purple: "#c084fc",
    orange: "#fb923c",
    amber: "#fbbf24",
    violet: "#a78bfa",
    cyan: "#22d3ee",
  };

  const strokeColor = hexMap[colorName] || "#c084fc";
  const gradId = `sparkGrad-${colorName}`;
  const lastPoint = pointsArr[pointsArr.length - 1];

  return (
    <div className="relative bg-white/[0.015] border border-white/[0.04] rounded-lg p-1 shrink-0 overflow-hidden shadow-inner flex items-center justify-center">
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        
        {/* Subtle background grid lines */}
        <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" strokeDasharray="2,2" />
        <line x1="0" y1={height - 1} x2={width} y2={height - 1} stroke="rgba(255,255,255,0.05)" strokeWidth="0.75" />

        {/* Gradient Area Fill */}
        <path d={areaPath} fill={`url(#${gradId})`} />
        
        {/* Sparkline Stroke */}
        <path
          d={dPath}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dynamic pulsing endpoint indicator */}
        <circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill={strokeColor} className="animate-pulse opacity-40" />
        <circle cx={lastPoint.x} cy={lastPoint.y} r="1.5" fill={strokeColor} />
      </svg>
    </div>
  );
}

/* ─── Bar Chart Component ──────────────────────────────────────── */

function BarChart({ data, maxVal, gradientFrom, gradientTo, label, unit = "" }: {
  data: { month: string; value: number }[];
  maxVal: number;
  gradientFrom: string;
  gradientTo: string;
  label: string;
  unit?: string;
}) {
  return (
    <div>
      <div className="flex items-end gap-[5px] h-44 w-full">
        {data.map((d, i) => {
          const pct = (d.value / maxVal) * 100;
          const isLast = i === data.length - 1;
          return (
            <motion.div
              key={i}
              className="flex-1 flex flex-col items-center gap-1.5 group relative"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "bottom" }}
            >
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                <div className="whitespace-nowrap rounded-xl border border-white/10 bg-[#0c0c14] px-2.5 py-1.5 text-[10px] font-bold text-white shadow-xl">
                  {unit}{d.value.toLocaleString()}
                </div>
              </div>
              <div className="w-full relative" style={{ height: "160px" }}>
                <div
                  className={`absolute bottom-0 w-full rounded-t-md transition-all duration-300 group-hover:brightness-125 ${
                    isLast ? "opacity-100" : "opacity-60 group-hover:opacity-90"
                  }`}
                  style={{
                    height: `${pct}%`,
                    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
                  }}
                />
              </div>
              <span className="text-[8px] text-zinc-600 font-medium">{d.month.slice(0, 1)}</span>
            </motion.div>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-zinc-500">
        <span>{label}</span>
        <span>{data[0].month} – {data[data.length - 1].month}</span>
      </div>
    </div>
  );
}

/* ─── Area Chart Component ─────────────────────────────────────── */

function AreaChart({ data, maxVal, colorStroke, colorFill, label, suffix = "" }: {
  data: { month: string; value: number }[];
  maxVal: number;
  colorStroke: string;
  colorFill: string;
  label: string;
  suffix?: string;
}) {
  const h = 160;
  const w = 100;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - (d.value / maxVal) * h;
    return `${x},${y}`;
  });

  const linePath = points.join(" ");
  const areaPath = `0,${h} ${linePath} ${w},${h}`;

  return (
    <div>
      <div className="relative w-full" style={{ height: `${h}px` }}>
        <svg
          viewBox={`0 0 ${w} ${h}`}
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id={`grad-${label.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={colorFill} stopOpacity="0.25" />
              <stop offset="100%" stopColor={colorFill} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={areaPath}
            fill={`url(#grad-${label.replace(/\s/g, "")})`}
          />
          <polyline
            points={linePath}
            fill="none"
            stroke={colorStroke}
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dot on the last data point */}
          {(() => {
            const lastD = data[data.length - 1];
            const lastX = 100;
            const lastY = h - (lastD.value / maxVal) * h;
            return (
              <>
                <circle cx={lastX} cy={lastY} r="4" fill={colorStroke} opacity="0.3">
                  <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx={lastX} cy={lastY} r="2.5" fill={colorStroke} />
              </>
            );
          })()}
        </svg>
        {/* Current value label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute top-3 right-3 rounded-xl border border-white/10 bg-[#0c0c14]/90 px-3 py-1.5 text-[12px] font-black text-white backdrop-blur-sm shadow-lg"
        >
          {data[data.length - 1].value.toLocaleString()}{suffix}
        </motion.div>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {data.map((d, i) => (
          i % 3 === 0 ? (
            <span key={i} className="text-[8px] text-zinc-600 font-medium flex-1 text-center">{d.month}</span>
          ) : null
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-zinc-500">
        <span>{label}</span>
      </div>
    </div>
  );
}

/* ─── KPI Card Component ───────────────────────────────────────── */

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
  iconBg: string;
  sparkData: number[];
  sparkColor: string;
  delay: number;
}

function KPICard({ title, value, change, positive, icon, iconBg, sparkData, sparkColor, delay }: KPICardProps) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
      className="dashboard-card p-5 cursor-default group"
    >
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className={`h-10 w-10 rounded-xl ${iconBg} border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <Sparkline data={sparkData} color={sparkColor} positive={positive} />
        </div>
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.12em] mb-1">{title}</p>
        <p className="text-[22px] font-black text-white tracking-tight leading-tight">{value}</p>
        <div className="flex items-center gap-1.5 mt-2">
          {positive ? (
            <div className="flex items-center gap-1 rounded-lg bg-emerald-500/10 px-1.5 py-0.5">
              <ArrowUpRight className="h-3 w-3 text-emerald-400" />
              <span className="text-[11px] font-bold text-emerald-400">{change}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 rounded-lg bg-red-500/10 px-1.5 py-0.5">
              <ArrowDownRight className="h-3 w-3 text-red-400" />
              <span className="text-[11px] font-bold text-red-400">{change}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Dashboard Page ──────────────────────────────────────── */

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10 bg-dot-pattern min-h-full">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed top-0 left-60 right-0 h-[500px] bg-gradient-to-b from-purple-500/[0.03] via-blue-500/[0.02] to-transparent" />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/8 border border-emerald-500/15 px-3 py-1 text-[10px] font-bold text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              LIVE SIMULATION
            </span>
            <span className="text-[11px] text-zinc-600 font-medium">Month 3 of 24</span>
          </div>
          <h1 className="text-[28px] font-black text-white tracking-tight leading-none">
            Dashboard Overview
          </h1>
          <p className="text-sm text-zinc-500 mt-1.5 flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-purple-400/60" />
            VentureAI Labs · SaaS · B2B · Seed Stage
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex h-10 items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 text-xs font-semibold text-zinc-400 hover:bg-white/[0.06] hover:text-zinc-300 transition-all duration-300"
          >
            <CalendarClock className="h-3.5 w-3.5 text-zinc-500" />
            Month 3, Week 2
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex h-10 items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-5 text-xs font-bold text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Summary
          </motion.button>
        </div>
      </motion.div>

      {/* ─── KPI Cards Grid ─────────────────────────────────────── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <KPICard
          title="Cash Balance"
          value="$284,600"
          change="-$34.2K"
          positive={false}
          icon={<DollarSign className="h-4.5 w-4.5 text-emerald-400" />}
          iconBg="bg-emerald-500/10"
          sparkData={[420, 405, 388, 372, 355, 340, 328, 312, 298, 285]}
          sparkColor="stroke-red-400"
          delay={0}
        />
        <KPICard
          title="Revenue (MRR)"
          value="$48,700"
          change="+15.1%"
          positive={true}
          icon={<TrendingUp className="h-4.5 w-4.5 text-green-400" />}
          iconBg="bg-green-500/10"
          sparkData={[12, 16, 14, 20, 23, 22, 28, 32, 36, 39, 42, 49]}
          sparkColor="stroke-green-400"
          delay={0}
        />
        <KPICard
          title="Active Users"
          value="3,240"
          change="+22.7%"
          positive={true}
          icon={<Users className="h-4.5 w-4.5 text-blue-400" />}
          iconBg="bg-blue-500/10"
          sparkData={[120, 240, 380, 520, 710, 890, 1140, 1420, 1780, 2150, 2640, 3240]}
          sparkColor="stroke-blue-400"
          delay={0}
        />
        <KPICard
          title="Employees"
          value="14"
          change="+2 hires"
          positive={true}
          icon={<UserCheck className="h-4.5 w-4.5 text-purple-400" />}
          iconBg="bg-purple-500/10"
          sparkData={[3, 4, 5, 5, 6, 7, 8, 9, 10, 11, 12, 14]}
          sparkColor="stroke-purple-400"
          delay={0}
        />
        <KPICard
          title="Burn Rate"
          value="$34,200/mo"
          change="+22%"
          positive={false}
          icon={<Flame className="h-4.5 w-4.5 text-orange-400" />}
          iconBg="bg-orange-500/10"
          sparkData={[18, 19, 20, 22, 23, 24, 26, 27, 29, 30, 32, 34]}
          sparkColor="stroke-orange-400"
          delay={0}
        />
        <KPICard
          title="Runway"
          value="14 months"
          change="-2 months"
          positive={false}
          icon={<Clock className="h-4.5 w-4.5 text-amber-400" />}
          iconBg="bg-amber-500/10"
          sparkData={[22, 21, 20, 19, 18, 18, 17, 16, 16, 15, 15, 14]}
          sparkColor="stroke-amber-400"
          delay={0}
        />
        <KPICard
          title="Valuation"
          value="$4.2M"
          change="+38%"
          positive={true}
          icon={<Gem className="h-4.5 w-4.5 text-violet-400" />}
          iconBg="bg-violet-500/10"
          sparkData={[2.0, 2.1, 2.3, 2.5, 2.8, 3.0, 3.2, 3.4, 3.6, 3.8, 4.0, 4.2]}
          sparkColor="stroke-violet-400"
          delay={0}
        />
        <KPICard
          title="Market Share"
          value="2.8%"
          change="+0.6%"
          positive={true}
          icon={<PieChart className="h-4.5 w-4.5 text-cyan-400" />}
          iconBg="bg-cyan-500/10"
          sparkData={[0.4, 0.6, 0.8, 1.0, 1.2, 1.5, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8]}
          sparkColor="stroke-cyan-400"
          delay={0}
        />
      </motion.div>

      {/* ─── Charts Grid ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard
          title="Revenue Growth"
          subtitle="Monthly recurring revenue trajectory"
          delay={0.2}
          actions={
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/8 border border-emerald-500/15 rounded-lg px-2.5 py-1">
              +15.1% MoM
            </span>
          }
        >
          <BarChart
            data={revenueData}
            maxVal={55000}
            gradientFrom="rgba(139, 92, 246, 0.2)"
            gradientTo="rgba(139, 92, 246, 0.85)"
            label="Monthly Recurring Revenue"
            unit="$"
          />
        </DashboardCard>

        <DashboardCard
          title="User Growth"
          subtitle="Cumulative active user accounts"
          delay={0.25}
          actions={
            <span className="text-[11px] font-bold text-blue-400 bg-blue-500/8 border border-blue-500/15 rounded-lg px-2.5 py-1">
              +22.7% MoM
            </span>
          }
        >
          <AreaChart
            data={userGrowthData}
            maxVal={3600}
            colorStroke="#3b82f6"
            colorFill="#3b82f6"
            label="Total Active Users"
          />
        </DashboardCard>

        <DashboardCard
          title="Retention Rate"
          subtitle="Monthly customer retention percentage"
          delay={0.3}
          actions={
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/8 border border-emerald-500/15 rounded-lg px-2.5 py-1">
              95% current
            </span>
          }
        >
          <AreaChart
            data={retentionData}
            maxVal={100}
            colorStroke="#10b981"
            colorFill="#10b981"
            label="Retention Rate"
            suffix="%"
          />
        </DashboardCard>

        <DashboardCard
          title="Churn Rate"
          subtitle="Monthly customer churn percentage"
          delay={0.35}
          actions={
            <span className="text-[11px] font-bold text-red-400 bg-red-500/8 border border-red-500/15 rounded-lg px-2.5 py-1">
              5% current ↓
            </span>
          }
        >
          <BarChart
            data={churnData}
            maxVal={18}
            gradientFrom="rgba(239, 68, 68, 0.15)"
            gradientTo="rgba(239, 68, 68, 0.75)"
            label="Monthly Churn Rate"
            unit=""
          />
        </DashboardCard>
      </div>

      {/* ─── Panels Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <DashboardCard
          title="Recent Events"
          subtitle="Latest simulation activity"
          delay={0.4}
          actions={
            <button className="text-[11px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
              View all <ChevronRight className="h-3 w-3" />
            </button>
          }
        >
          <div className="space-y-2.5 max-h-[380px] overflow-y-auto styled-scrollbar pr-1">
            {recentEvents.map((event, i) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 cursor-pointer group"
                >
                  <div className={`h-9 w-9 rounded-xl ${event.bg} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-4 w-4 ${event.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors truncate">{event.title}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-2 leading-relaxed">{event.desc}</p>
                  </div>
                  <span className="text-[9px] text-zinc-600 shrink-0 mt-1 font-medium">{event.time}</span>
                </motion.div>
              );
            })}
          </div>
        </DashboardCard>

        {/* AI Insights */}
        <DashboardCard
          title="AI Insights"
          subtitle="AI Mentor recommendations"
          delay={0.45}
          actions={
            <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-purple-500/10 to-blue-500/8 border border-purple-500/15 px-2.5 py-1">
              <BrainCircuit className="h-3 w-3 text-purple-400" />
              <span className="text-[10px] font-bold text-purple-300">3 new</span>
            </div>
          }
        >
          <div className="space-y-3">
            {aiInsights.map((insight, i) => {
              const Icon = insight.icon;
              const severityColors = {
                high: { border: "border-purple-500/15", bg: "bg-purple-500/[0.04]", accent: "text-purple-400", pill: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
                medium: { border: "border-blue-500/15", bg: "bg-blue-500/[0.04]", accent: "text-blue-400", pill: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
                low: { border: "border-zinc-500/15", bg: "bg-zinc-500/[0.04]", accent: "text-zinc-400", pill: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" },
              };
              const s = severityColors[insight.severity as keyof typeof severityColors];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  className={`p-4 rounded-xl border ${s.border} ${s.bg} hover:bg-white/[0.03] transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-4 w-4 ${s.accent}`} />
                    <span className="text-xs font-bold text-white flex-1">{insight.title}</span>
                    <span className={`text-[9px] font-bold uppercase rounded-lg border px-2 py-0.5 ${s.pill}`}>
                      {insight.severity}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">{insight.desc}</p>
                  <button className={`text-[10px] font-bold ${s.accent} hover:underline flex items-center gap-1`}>
                    {insight.action}
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        </DashboardCard>

        {/* Upcoming Risks */}
        <DashboardCard
          title="Upcoming Risks"
          subtitle="Threats requiring attention"
          delay={0.5}
          actions={
            <div className="flex items-center gap-1.5 rounded-lg bg-red-500/8 border border-red-500/15 px-2.5 py-1">
              <AlertTriangle className="h-3 w-3 text-red-400" />
              <span className="text-[10px] font-bold text-red-300">3 active</span>
            </div>
          }
        >
          <div className="space-y-3">
            {upcomingRisks.map((risk, i) => {
              const Icon = risk.icon;
              const levelStyles = {
                critical: { border: "border-l-red-500", badge: "bg-red-500/10 text-red-400 border-red-500/20", icon: "text-red-400", bg: "bg-red-500/[0.04]" },
                warning: { border: "border-l-yellow-500", badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", icon: "text-yellow-400", bg: "bg-yellow-500/[0.04]" },
                watch: { border: "border-l-blue-500", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: "text-blue-400", bg: "bg-blue-500/[0.04]" },
              };
              const l = levelStyles[risk.level as keyof typeof levelStyles];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  className={`p-4 rounded-xl border border-white/[0.04] ${l.bg} border-l-2 ${l.border} hover:bg-white/[0.03] transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`h-4 w-4 ${l.icon}`} />
                    <span className="text-xs font-bold text-white flex-1">{risk.title}</span>
                    <span className={`text-[9px] font-bold uppercase rounded-lg border px-2 py-0.5 ${l.badge}`}>
                      {risk.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-2.5">{risk.desc}</p>
                  <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.03] px-2.5 py-1.5 w-fit">
                    <Info className="h-3 w-3 text-zinc-500" />
                    <span className="text-[10px] font-bold text-zinc-300">{risk.metric}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
