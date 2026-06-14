"use client";

import { motion } from "framer-motion";
import {
  Users,
  Heart,
  UserMinus,
  Star,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Info,
  TrendingUp,
  LineChart,
  Activity,
  Target,
  Sparkles,
  Zap,
} from "lucide-react";

/* ─── Mock Data ────────────────────────────────────────────────── */

const customerMetrics = [
  { label: "Active Users", value: "3,240", change: "+12.4%", positive: true, icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Retention Rate", value: "94.2%", change: "+2.1%", positive: true, icon: Heart, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Churn Rate", value: "5.8%", change: "-1.5%", positive: true, icon: UserMinus, color: "text-amber-400", bg: "bg-amber-500/10" },
  { label: "Satisfaction (CSAT)", value: "4.8/5", change: "+0.3", positive: true, icon: Star, color: "text-purple-400", bg: "bg-purple-500/10" },
];

const personas = [
  {
    name: "Enterprise Emma",
    age: 42,
    occupation: "Director of IT Operations",
    budget: "$15k - $50k / year",
    interests: ["Compliance", "SSO Integration", "System Reliability", "ROI Tracking"],
    painPoints: ["Scattered data silos", "High employee training costs", "Strict security requirements"],
    avatar: "bg-gradient-to-br from-purple-500 to-indigo-500",
  },
  {
    name: "Startup Sam",
    age: 28,
    occupation: "Solo Founder / Indie Hacker",
    budget: "$500 - $2k / year",
    interests: ["Growth Hacking", "Automation", "Community Building", "Rapid Prototyping"],
    painPoints: ["Limited runway", "Too many manual tasks", "Needs immediate customer feedback"],
    avatar: "bg-gradient-to-br from-emerald-500 to-cyan-500",
  },
];

const customerFeedback = [
  { user: "Alex J.", role: "CTO", sentiment: "positive", time: "2h ago", text: "The new analytics dashboard is incredible. Saved my team hours of manual reporting." },
  { user: "Sarah M.", role: "Product Manager", sentiment: "neutral", time: "5h ago", text: "Solid product, but the onboarding could use some tooltips. Took a bit to figure out the permissions." },
  { user: "David T.", role: "Freelancer", sentiment: "negative", time: "1d ago", text: "Pricing is getting a bit steep for solo users. Might have to look for alternatives if there's no indie plan." },
  { user: "Elena R.", role: "VP Engineering", sentiment: "positive", time: "1d ago", text: "SSO integration was flawless. Enterprise-grade security right out of the box." },
  { user: "Michael K.", role: "CEO", sentiment: "positive", time: "2d ago", text: "This operating system is exactly what we needed to scale our remote operations. Highly recommended!" },
];

const userGrowthData = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 1450 },
  { month: "Mar", value: 1800 },
  { month: "Apr", value: 2100 },
  { month: "May", value: 2500 },
  { month: "Jun", value: 2850 },
  { month: "Jul", value: 3240 },
];

const retentionData = [
  { month: "Jan", value: 89 },
  { month: "Feb", value: 90 },
  { month: "Mar", value: 88 },
  { month: "Apr", value: 92 },
  { month: "May", value: 91 },
  { month: "Jun", value: 93 },
  { month: "Jul", value: 94.2 },
];

/* ─── Custom Area Chart Component ──────────────────────────────── */

function SimpleAreaChart({ data, colorHex, suffix = "" }: { data: { month: string; value: number }[]; colorHex: string; suffix?: string }) {
  const h = 120;
  const w = 100;
  // Dynamic min/max for better visual scaling
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
                    {d.value.toLocaleString()}{suffix}
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

export default function CustomersPage() {
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
              <Users className="h-3 w-3" />
              User Base
            </span>
            <span className="text-xs font-semibold text-zinc-500">Live AI Synthesis</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Customer Intelligence</h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Analyze your user demographics, track retention cohorts, and monitor live sentiment.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-colors">
            Export CSV
          </button>
          <button className="h-10 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity">
            Run Survey
          </button>
        </div>
      </motion.div>

      {/* ─── Top Metrics Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {customerMetrics.map((metric, i) => {
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
                  metric.positive ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-red-400 bg-red-500/10 border-red-500/20"
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

      {/* ─── Charts Row ────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-400" /> User Growth
            </h3>
          </div>
          <SimpleAreaChart data={userGrowthData} colorHex="#3b82f6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Heart className="h-4 w-4 text-emerald-400" /> Retention Trend
            </h3>
          </div>
          <SimpleAreaChart data={retentionData} colorHex="#10b981" suffix="%" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 md:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-purple-400" /> Platform Activity
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Daily Active Users (DAU)</span>
              <span className="font-bold text-white">1,420</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">Weekly Active Users (WAU)</span>
              <span className="font-bold text-white">2,850</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-zinc-400">DAU / MAU Ratio</span>
              <span className="font-bold text-white">43.8%</span>
            </div>
            <div className="flex justify-between items-center text-xs border-t border-white/10 pt-4">
              <span className="text-zinc-400">Avg. Session Length</span>
              <span className="font-bold text-white">14m 22s</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── Personas & Feedback Row ─────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Personas Column */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="space-y-5"
        >
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-cyan-400" /> Primary Customer Personas
          </h2>
          
          <div className="space-y-4">
            {personas.map((persona, i) => (
              <div key={i} className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-4 mb-5 border-b border-white/5 pb-5">
                  <div className={`h-14 w-14 rounded-full ${persona.avatar} shadow-lg shrink-0 flex items-center justify-center text-white font-black text-xl border border-white/10`}>
                    {persona.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{persona.name}</h3>
                    <p className="text-xs text-zinc-400">{persona.age} yrs • {persona.occupation}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Avg Budget</p>
                    <p className="text-sm font-semibold text-white">{persona.budget}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Conversion Velocity</p>
                    <p className="text-sm font-semibold text-white">21-45 Days</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Core Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {persona.interests.map((interest, j) => (
                        <span key={j} className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-1 rounded-md">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2">Key Pain Points</p>
                    <ul className="space-y-1">
                      {persona.painPoints.map((pain, j) => (
                        <li key={j} className="text-xs text-zinc-300 flex items-start gap-2">
                          <span className="text-red-400 font-bold">•</span> {pain}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feedback Feed Column */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 flex flex-col h-[700px]"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-purple-400" /> Live Feedback Feed
            </h2>
            <span className="flex items-center gap-1.5 text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">
              <Sparkles className="h-3 w-3" /> AI Summarized
            </span>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar">
            {customerFeedback.map((feedback, i) => {
              const sentimentStyles = {
                positive: "border-emerald-500/20 bg-emerald-500/5",
                neutral: "border-zinc-500/20 bg-zinc-500/5",
                negative: "border-red-500/20 bg-red-500/5",
              };
              const s = sentimentStyles[feedback.sentiment as keyof typeof sentimentStyles];

              return (
                <div key={i} className={`p-4 rounded-xl border ${s} hover:bg-white/5 transition-colors group`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white border border-white/5">
                        {feedback.user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{feedback.user}</p>
                        <p className="text-[10px] text-zinc-500">{feedback.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-zinc-600">{feedback.time}</span>
                      {feedback.sentiment === "positive" ? (
                        <ThumbsUp className="h-3 w-3 text-emerald-400" />
                      ) : feedback.sentiment === "negative" ? (
                        <ThumbsDown className="h-3 w-3 text-red-400" />
                      ) : (
                        <Info className="h-3 w-3 text-zinc-400" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed group-hover:text-white transition-colors">
                    "{feedback.text}"
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5">
            <button className="w-full h-10 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors">
              Load More Feedback
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
