"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  User,
  Swords,
  DollarSign,
  Users,
  BrainCircuit,
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  Eye,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

/* ─── Mock Data ────────────────────────────────────────────────── */

const months = ["August 2025", "July 2025", "June 2025"];

const agents = [
  {
    id: "customer",
    name: "Customer Agent",
    role: "User Sentiment Analysis",
    icon: User,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    feedback: {
      observation: "User engagement increased by 15% after the new dashboard layout. The UX overhaul is paying dividends in daily active time.",
      concern: "We are seeing an uptick in support tickets related to SSO integration bugs in the Enterprise tier.",
      recommendation: "Prioritize bug fixes for enterprise auth flows before launching any new features this quarter.",
    }
  },
  {
    id: "competitor",
    name: "Competitor Agent",
    role: "Market Threat Analysis",
    icon: Swords,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    feedback: {
      observation: "AlphaStack just dropped their Starter tier pricing by 20%, aggressively targeting our mid-market segment.",
      concern: "If we don't adjust our value proposition, we risk a 5-8% churn to AlphaStack over the next 90 days.",
      recommendation: "Do not engage in a price war. Instead, highlight our superior AI workflows in targeted marketing campaigns.",
    }
  },
  {
    id: "investor",
    name: "Investor Agent",
    role: "Capital & Growth Logic",
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    feedback: {
      observation: "Burn rate has stabilized at $38K/mo, and runway is healthy at 32 months. Excellent capital efficiency.",
      concern: "Month-over-month revenue growth is only 12%. To secure a strong Series A, we need to push this closer to 20%.",
      recommendation: "Increase marketing spend by $15K/mo to test new acquisition channels and accelerate top-line growth.",
    }
  },
  {
    id: "employee",
    name: "Employee Agent",
    role: "Team Health & Culture",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    feedback: {
      observation: "Engineering team productivity is at an all-time high (95%) following the hiring of a Senior Engineer.",
      concern: "The marketing team feels under-resourced and is reporting early signs of burnout due to the new ad campaign demands.",
      recommendation: "Open a req for a Junior Content Writer to alleviate the workload on the Growth Marketer.",
    }
  },
  {
    id: "mentor",
    name: "CEO Mentor",
    role: "Strategic Governance",
    icon: BrainCircuit,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    feedback: {
      observation: "You've successfully balanced product delivery with fiscal responsibility this month. Solid leadership.",
      concern: "You are still heavily involved in daily product decisions. This is bottlenecking the PM.",
      recommendation: "Delegate the upcoming feature sprint entirely to the PM. Focus your time on the upcoming investor roadshow.",
    }
  },
];

export default function BoardMeetingsPage() {
  const [activeMonth, setActiveMonth] = useState(months[0]);
  const [activeAgent, setActiveAgent] = useState(agents[4].id); // Default to CEO Mentor

  const currentAgent = agents.find((a) => a.id === activeAgent) || agents[0];
  const CurrentIcon = currentAgent.icon;

  return (
    <div className="space-y-6 pb-12 h-full flex flex-col">
      {/* ─── Header ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
              <CalendarDays className="h-3 w-3" />
              Corporate Governance
            </span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Virtual Board Meeting</h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Simulate your monthly board meetings. Review insights, address concerns, and strategize with your AI Board of Directors.
          </p>
        </div>

        {/* Month Selector */}
        <div className="flex bg-[#0e0e14]/80 backdrop-blur-sm border border-white/10 rounded-xl p-1">
          {months.map((month) => (
            <button
              key={month}
              onClick={() => setActiveMonth(month)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeMonth === month ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {month}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ─── Presentation Layout ─────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        
        {/* Left Sidebar: Agent Selection */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-4 xl:col-span-3 flex flex-col gap-3"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-2">
            <h2 className="text-sm font-bold text-white mb-1">Board Roster</h2>
            <p className="text-xs text-zinc-400">Select a board member to review their monthly packet.</p>
          </div>

          {agents.map((agent) => {
            const Icon = agent.icon;
            const isActive = activeAgent === agent.id;
            return (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                  isActive 
                    ? `bg-[#0e0e14]/90 border-white/20 shadow-lg` 
                    : "bg-[#0e0e14]/40 border-white/5 hover:border-white/10 hover:bg-[#0e0e14]/60"
                }`}
              >
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border ${
                  isActive ? `${agent.bg} ${agent.border}` : "bg-white/5 border-white/10"
                }`}>
                  <Icon className={`h-5 w-5 ${isActive ? agent.color : "text-zinc-500"}`} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-sm font-bold ${isActive ? "text-white" : "text-zinc-300"}`}>{agent.name}</h3>
                  <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mt-0.5">{agent.role}</p>
                </div>
                {isActive && <ChevronRight className="h-4 w-4 text-white opacity-50" />}
              </button>
            );
          })}
        </motion.div>

        {/* Right Main Area: Active Agent Presentation */}
        <motion.div
          key={activeAgent}
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-8 xl:col-span-9 rounded-2xl border border-white/10 bg-[#0e0e14]/80 backdrop-blur-md overflow-hidden flex flex-col relative"
        >
          {/* Header Glow Banner */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${currentAgent.color.replace('text-', '')} to-transparent opacity-50`} />
          
          <div className="p-8 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-4 mb-4">
              <div className={`h-16 w-16 rounded-2xl border ${currentAgent.bg} ${currentAgent.border} flex items-center justify-center shadow-lg`}>
                <CurrentIcon className={`h-8 w-8 ${currentAgent.color}`} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white tracking-tight">{currentAgent.name} Report</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${currentAgent.bg} ${currentAgent.color} ${currentAgent.border}`}>
                    {currentAgent.role}
                  </span>
                  <span className="text-xs font-semibold text-zinc-500">• {activeMonth}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-zinc-400">
              "Here is my analysis of the company's trajectory over the last 30 days. Please review the observations and act on the recommendations before our next sprint."
            </p>
          </div>

          <div className="p-8 flex-1 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent">
            <div className="space-y-6 max-w-3xl">
              
              {/* Observation */}
              <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-blue-500/50" />
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-blue-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Key Observation</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  {currentAgent.feedback.observation}
                </p>
              </div>

              {/* Concern */}
              <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500/50" />
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Primary Concern</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  {currentAgent.feedback.concern}
                </p>
              </div>

              {/* Recommendation */}
              <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-emerald-500/50" />
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Strategic Recommendation</h3>
                </div>
                <p className="text-zinc-300 leading-relaxed text-sm font-medium">
                  {currentAgent.feedback.recommendation}
                </p>
              </div>

            </div>
          </div>

          <div className="p-6 border-t border-white/5 bg-[#0e0e14] flex justify-between items-center">
            <button className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">
              Download PDF Report
            </button>
            <button className={`h-10 px-6 rounded-xl border text-xs font-bold text-white transition-colors ${currentAgent.bg} ${currentAgent.border} hover:opacity-80`}>
              Acknowledge & Save
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
