"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Wallet,
  PieChart,
  History,
  Briefcase,
  Target,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Building,
  Activity,
  User,
} from "lucide-react";

/* ─── Mock Data ────────────────────────────────────────────────── */

const fundingStats = [
  { label: "Current Valuation", value: "$12.5M", sub: "Post-Money", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { label: "Total Capital Raised", value: "$1.75M", sub: "Seed + Pre-Seed", icon: Wallet, color: "text-blue-400", bg: "bg-blue-500/10" },
  { label: "Remaining Authorization", value: "$750K", sub: "Current Round", icon: PieChart, color: "text-purple-400", bg: "bg-purple-500/10" },
];

const capTable = [
  { owner: "Founders", share: 65, color: "bg-blue-500" },
  { owner: "Seed Investors", share: 15, color: "bg-emerald-500" },
  { owner: "Employee Pool", share: 10, color: "bg-purple-500" },
  { owner: "Angel Syndicate", share: 10, color: "bg-amber-500" },
];

const fundingHistory = [
  { date: "Oct 2025", type: "Seed Round", amount: "$1.5M", valuation: "$12.5M Post", lead: "Nexus Venture Partners" },
  { date: "Jan 2025", type: "Pre-Seed", amount: "$250K", valuation: "$2.5M Post", lead: "Y Combinator" },
];

const investorProfiles = [
  {
    name: "Nexus Venture Partners",
    style: "Lead Investor",
    risk: "Medium",
    checkSize: "$1M - $3M",
    interest: 95,
    status: "Committed",
    avatar: "N",
  },
  {
    name: "Sequoia Scout Fund",
    style: "Follow-on",
    risk: "High",
    checkSize: "$100K - $250K",
    interest: 75,
    status: "Term Sheet Sent",
    avatar: "S",
  },
  {
    name: "Bessemer Cloud",
    style: "Lead Investor",
    risk: "Low",
    checkSize: "$2M - $5M",
    interest: 45,
    status: "In Due Diligence",
    avatar: "B",
  },
  {
    name: "Acme Angel Syndicate",
    style: "Strategic Angel",
    risk: "High",
    checkSize: "$50K - $100K",
    interest: 85,
    status: "Soft Circled",
    avatar: "A",
  },
];

export default function InvestorIntelligencePage() {
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
              <Building className="h-3 w-3" />
              Capital Markets
            </span>
            <span className="text-xs font-semibold text-zinc-500">Seed Round Active</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Investor Intelligence</h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Manage your capitalization, track active term sheets, and evaluate prospective venture partners.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-colors flex items-center gap-2">
            <FileText className="h-4 w-4" /> Data Room
          </button>
          <button className="h-10 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 hover:opacity-90 transition-opacity">
            Open New Round
          </button>
        </div>
      </motion.div>

      {/* ─── Funding Dashboard Grid ──────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fundingStats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 flex items-center gap-5"
            >
              <div className={`h-14 w-14 rounded-2xl ${stat.bg} border border-white/5 flex items-center justify-center shrink-0`}>
                <Icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-black text-white tracking-tight leading-none">{stat.value}</p>
                  <p className="text-[10px] text-zinc-400 pb-0.5">{stat.sub}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ─── Cap Table Visualization ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
            <PieChart className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Cap Table Distribution</h2>
          </div>

          <div className="flex flex-col gap-6">
            {/* Visual Stacked Bar */}
            <div className="h-8 w-full rounded-full overflow-hidden flex shadow-inner shadow-black/50">
              {capTable.map((cap, i) => (
                <div key={i} className={`h-full ${cap.color} transition-all duration-1000`} style={{ width: `${cap.share}%` }} title={`${cap.owner}: ${cap.share}%`} />
              ))}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-4">
              {capTable.map((cap, i) => (
                <div key={i} className="flex items-center justify-between bg-white/3 border border-white/5 p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${cap.color}`} />
                    <span className="text-sm font-semibold text-white">{cap.owner}</span>
                  </div>
                  <span className="text-sm font-black text-zinc-300">{cap.share}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─── Funding History ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
            <History className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">Funding History</h2>
          </div>

          <div className="space-y-4">
            {fundingHistory.map((history, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Wallet className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-base font-bold text-white">{history.type}</h3>
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{history.date}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <div>
                      <p className="text-zinc-500 mb-0.5 font-semibold">Raised</p>
                      <p className="font-bold text-emerald-400">{history.amount}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 mb-0.5 font-semibold">Valuation</p>
                      <p className="font-bold text-white">{history.valuation}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500 mb-0.5 font-semibold">Lead</p>
                      <p className="font-bold text-zinc-300">{history.lead}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ─── Investor Profiles Grid ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
          <Target className="h-5 w-5 text-amber-400" />
          <h2 className="text-lg font-black text-white">Active Investor Pipeline</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {investorProfiles.map((investor, i) => (
            <div key={i} className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 hover:border-white/10 transition-colors flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center text-xl font-black text-white shadow-lg">
                  {investor.avatar}
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border ${
                  investor.status === 'Committed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                  investor.status === 'Term Sheet Sent' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                  'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {investor.status}
                </span>
              </div>
              
              <h3 className="text-base font-bold text-white leading-tight mb-1">{investor.name}</h3>
              <p className="text-xs text-zinc-400 mb-6">{investor.style}</p>

              <div className="bg-[#08080c] border border-white/5 rounded-xl p-3 mb-6 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-medium">Risk Appetite</span>
                  <span className={`font-bold ${
                    investor.risk === 'High' ? 'text-red-400' :
                    investor.risk === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                  }`}>{investor.risk}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 font-medium">Target Check</span>
                  <span className="font-bold text-white">{investor.checkSize}</span>
                </div>
              </div>

              <div className="mt-auto">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1">
                    <Activity className="h-3 w-3 text-cyan-400" /> Interest Level
                  </span>
                  <span className="text-xs font-bold text-white">{investor.interest}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${investor.interest}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
