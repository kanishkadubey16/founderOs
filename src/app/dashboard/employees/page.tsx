"use client";

import { motion } from "framer-motion";
import {
  Users,
  Briefcase,
  DollarSign,
  Activity,
  Smile,
  Zap,
  GraduationCap,
  TrendingUp,
  LineChart,
  Code2,
  PenTool,
  Megaphone,
  Database,
} from "lucide-react";

/* ─── Mock Data ────────────────────────────────────────────────── */

const teamOverview = [
  { label: "Total Employees", value: "12", change: "+2 this quarter", positive: true, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Avg. Productivity", value: "92%", change: "+4.5%", positive: true, icon: Activity, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Happiness Score", value: "4.6/5", change: "+0.2", positive: true, icon: Smile, color: "text-purple-400", bg: "bg-purple-500/10" },
  { label: "Monthly Payroll", value: "$115,000", change: "-$5k (Optimized)", positive: true, icon: DollarSign, color: "text-amber-400", bg: "bg-amber-500/10" },
];

const employees = [
  {
    name: "Sarah Chen",
    role: "Lead Engineer",
    department: "Engineering",
    salary: "$145,000",
    productivity: 95,
    happiness: 4.8,
    skills: ["React", "Node.js", "AWS", "System Design"],
    avatarIcon: Code2,
    avatarColor: "text-cyan-400",
    avatarBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    name: "Marcus Johnson",
    role: "Product Designer",
    department: "Design",
    salary: "$110,000",
    productivity: 88,
    happiness: 4.5,
    skills: ["Figma", "UX Research", "Prototyping"],
    avatarIcon: PenTool,
    avatarColor: "text-purple-400",
    avatarBg: "bg-purple-500/10 border-purple-500/20",
  },
  {
    name: "Elena Rodriguez",
    role: "Growth Marketer",
    department: "Marketing",
    salary: "$95,000",
    productivity: 90,
    happiness: 4.2,
    skills: ["SEO", "Paid Ads", "Copywriting", "Analytics"],
    avatarIcon: Megaphone,
    avatarColor: "text-orange-400",
    avatarBg: "bg-orange-500/10 border-orange-500/20",
  },
  {
    name: "James Wilson",
    role: "Backend Developer",
    department: "Engineering",
    salary: "$130,000",
    productivity: 85,
    happiness: 4.0,
    skills: ["Python", "PostgreSQL", "Docker", "Go"],
    avatarIcon: Database,
    avatarColor: "text-emerald-400",
    avatarBg: "bg-emerald-500/10 border-emerald-500/20",
  },
];

const hiringVelocityData = [
  { month: "Jan", value: 3 },
  { month: "Feb", value: 3 },
  { month: "Mar", value: 5 },
  { month: "Apr", value: 6 },
  { month: "May", value: 8 },
  { month: "Jun", value: 10 },
  { month: "Jul", value: 12 },
];

const productivityTrendData = [
  { month: "Jan", value: 78 },
  { month: "Feb", value: 82 },
  { month: "Mar", value: 80 },
  { month: "Apr", value: 85 },
  { month: "May", value: 89 },
  { month: "Jun", value: 90 },
  { month: "Jul", value: 92 },
];

/* ─── Custom Area Chart Component ──────────────────────────────── */

function SimpleAreaChart({ data, colorHex, suffix = "" }: { data: { month: string; value: number }[]; colorHex: string; suffix?: string }) {
  const h = 120;
  const w = 100;
  const maxVal = Math.max(...data.map((d) => d.value)) * 1.1;
  const minVal = Math.min(...data.map((d) => d.value)) * 0.9;
  const range = maxVal - minVal;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d.value - minVal) / range) * h;
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
            const cy = h - ((d.value - minVal) / range) * h;
            const isLast = i === data.length - 1;
            return (
              <g key={i}>
                <circle cx={cx} cy={cy} r="2" fill="#0e0e14" stroke={colorHex} strokeWidth="1" vectorEffect="non-scaling-stroke" />
                {isLast && (
                  <text x={cx - 5} y={cy - 10} fill="#fff" fontSize="8" fontWeight="bold" textAnchor="end">
                    {d.value}{suffix}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="flex justify-between mt-3 text-[9px] font-bold text-zinc-500 uppercase tracking-wider">
        {data.map((d, i) => (
          i % 2 === 0 ? <span key={i}>{d.month}</span> : <span key={i} className="opacity-0">{d.month}</span>
        ))}
      </div>
    </div>
  );
}

export default function EmployeesPage() {
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
              <Briefcase className="h-3 w-3" />
              Human Resources
            </span>
            <span className="text-xs font-semibold text-zinc-500">Live Team Data</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Workforce Intelligence</h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Monitor team health, productivity benchmarks, and track payroll efficiency.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-colors">
            Run Payroll
          </button>
          <button className="h-10 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-opacity">
            Hire Talent
          </button>
        </div>
      </motion.div>

      {/* ─── Team Overview Grid ────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {teamOverview.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`h-10 w-10 rounded-xl ${metric.bg} border border-white/5 flex items-center justify-center shrink-0`}>
                  <Icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-md border ${
                  metric.positive ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-amber-400 bg-amber-500/10 border-amber-500/20"
                }`}>
                  {metric.change}
                </span>
              </div>
              <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">{metric.label}</p>
              <p className="text-2xl font-black text-white tracking-tight">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Workforce Analytics Charts ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" /> Hiring Velocity
            </h3>
          </div>
          <SimpleAreaChart data={hiringVelocityData} colorHex="#3b82f6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-400" /> Team Productivity Trend
            </h3>
          </div>
          <SimpleAreaChart data={productivityTrendData} colorHex="#10b981" suffix="%" />
        </motion.div>
      </div>

      {/* ─── Employee Roster Grid ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-cyan-400" /> Employee Roster
          </h2>
          <div className="text-xs font-bold text-zinc-400">Displaying {employees.length} active members</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {employees.map((emp, i) => {
            const AvatarIcon = emp.avatarIcon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] backdrop-blur-sm p-6 transition-colors group"
              >
                {/* Top Section */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-xl border flex items-center justify-center shrink-0 ${emp.avatarBg}`}>
                      <AvatarIcon className={`h-5 w-5 ${emp.avatarColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{emp.name}</h3>
                      <p className="text-xs font-medium text-zinc-400">{emp.role} • {emp.department}</p>
                    </div>
                  </div>
                  <div className="bg-[#08080c] border border-white/5 px-3 py-1.5 rounded-lg text-right">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">Salary</p>
                    <p className="text-sm font-black text-emerald-400">{emp.salary}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-[#0e0e14]/50 border border-white/5 rounded-xl p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                        <Zap className="h-3 w-3 text-amber-400" /> Productivity
                      </span>
                      <span className="text-xs font-bold text-white">{emp.productivity}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${emp.productivity}%` }} />
                    </div>
                  </div>

                  <div className="bg-[#0e0e14]/50 border border-white/5 rounded-xl p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                        <Smile className="h-3 w-3 text-purple-400" /> Happiness
                      </span>
                      <span className="text-xs font-bold text-white">{emp.happiness}/5</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-400 rounded-full" style={{ width: `${(emp.happiness / 5) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <GraduationCap className="h-3 w-3" /> Core Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {emp.skills.map((skill, j) => (
                      <span key={j} className="text-[10px] font-semibold text-zinc-300 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
