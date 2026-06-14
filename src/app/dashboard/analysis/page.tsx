"use client";

import { motion } from "framer-motion";
import {
  Microscope,
  TrendingUp,
  Target,
  Swords,
  DollarSign,
  Zap,
  Users,
  LineChart,
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Building2,
  PieChart,
} from "lucide-react";

/* ─── Mock Data ────────────────────────────────────────────────── */

const overallScore = 88;

const scorecards = [
  { name: "Market Demand", score: 92, icon: Target, color: "text-blue-400", bg: "bg-blue-500/10", bar: "bg-blue-400" },
  { name: "Competition", score: 68, icon: Swords, color: "text-red-400", bg: "bg-red-500/10", bar: "bg-red-400" },
  { name: "Profitability", score: 85, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", bar: "bg-emerald-400" },
  { name: "Feasibility", score: 76, icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", bar: "bg-amber-400" },
  { name: "Growth Potential", score: 95, icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10", bar: "bg-purple-400" },
];

const personas = [
  {
    name: "Enterprise IT Manager",
    role: "Decision Maker",
    painPoint: "High compliance overhead and disconnected legacy systems.",
    budget: "High",
    acquisition: "Direct Sales / LinkedIn",
    avatar: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    name: "Startup Founder",
    role: "End User",
    painPoint: "Needs fast, cheap, and easily integratable solutions.",
    budget: "Low-Medium",
    acquisition: "Content / SEO / Twitter",
    avatar: "bg-gradient-to-br from-purple-500 to-pink-500",
  },
];

const competitors = [
  { name: "LegacyCorp", threat: "High", pricing: "Expensive", UX: "Poor", featureParity: "70%" },
  { name: "NimbleStartup", threat: "Medium", pricing: "Cheap", UX: "Excellent", featureParity: "40%" },
  { name: "OpenSource Alt", threat: "Low", pricing: "Free", UX: "Complex", featureParity: "90%" },
];

const investorNotes = [
  { title: "Defensibility", status: "Strong", desc: "Network effects kick in after first 1,000 active nodes." },
  { title: "Team Risk", status: "Low", desc: "Founders have previous domain expertise and exits." },
  { title: "Capital Intensity", status: "Medium", desc: "Requires $2M upfront for R&D, but scales cheaply." },
];

export default function StartupAnalysisPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* ─── Header & Overall Score ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 items-center"
      >
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
              <BrainCircuit className="h-3 w-3" />
              AI Generated Report
            </span>
            <span className="text-xs text-zinc-500">Updated Today</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Microscope className="h-6 w-6 text-cyan-400" />
            VentureAI Labs Analysis
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            A comprehensive breakdown of your startup's viability based on 10,000+ data points, simulated competitor behaviors, and historical VC investment patterns.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center md:border-l border-white/5 md:pl-6">
          <div className="relative flex items-center justify-center h-28 w-28 shrink-0">
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle cx="56" cy="56" r="48" className="stroke-white/5" strokeWidth="8" fill="none" />
              <circle
                cx="56"
                cy="56"
                r="48"
                className="stroke-cyan-500"
                strokeWidth="8"
                fill="none"
                strokeDasharray={301.6}
                strokeDashoffset={301.6 - (301.6 * overallScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <p className="text-3xl font-black text-white tracking-tight">{overallScore}</p>
              <p className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">Overall Score</p>
            </div>
          </div>
          <span className="mt-3 text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1">
            "High Potential"
          </span>
        </div>
      </motion.div>

      {/* ─── AI Scorecards Grid ──────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {scorecards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              key={card.name}
              className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-5 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`h-8 w-8 rounded-xl ${card.bg} border border-white/5 flex items-center justify-center`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
                <span className="text-lg font-black text-white">{card.score}</span>
              </div>
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">{card.name}</p>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${card.bar} rounded-full`} style={{ width: `${card.score}%` }} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Main Sections ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Market Analysis */}
        <div className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="h-5 w-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Market Analysis</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-white/3 border border-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">TAM (Total Addressable)</span>
                <span className="text-sm font-black text-white">$14.2B</span>
              </div>
              <p className="text-[10px] text-zinc-500">Global market for AI Orchestration Tools</p>
            </div>
            <div className="bg-white/3 border border-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">SAM (Serviceable)</span>
                <span className="text-sm font-black text-white">$3.8B</span>
              </div>
              <p className="text-[10px] text-zinc-500">North American tech startups & SME</p>
            </div>
            <div className="bg-white/3 border border-white/5 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5" />
              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">SOM (Obtainable)</span>
                  <span className="text-sm font-black text-blue-400">$120M</span>
                </div>
                <p className="text-[10px] text-zinc-400">Target Year 3 Capture (3.1% of SAM)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Personas */}
        <div className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 space-y-5">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">Customer Personas</h2>
          </div>
          <div className="grid gap-4">
            {personas.map((p, i) => (
              <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 transition-colors">
                <div className={`h-12 w-12 rounded-full ${p.avatar} shadow-lg shrink-0 flex items-center justify-center text-white font-bold text-sm border border-white/10`}>
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-sm font-bold text-white truncate">{p.name}</p>
                    <span className="text-[9px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20 shrink-0">
                      {p.role}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-2">"{p.painPoint}"</p>
                  <div className="flex items-center gap-3 text-[10px] text-zinc-500">
                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" /> Budget: {p.budget}</span>
                    <span className="flex items-center gap-1"><Target className="h-3 w-3" /> Ch: {p.acquisition}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Analysis */}
        <div className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 space-y-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <Swords className="h-5 w-5 text-red-400" />
            <h2 className="text-lg font-bold text-white">Competitor Landscape</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                  <th className="pb-3 pl-2">Competitor</th>
                  <th className="pb-3">Threat Level</th>
                  <th className="pb-3">Pricing</th>
                  <th className="pb-3">UX Quality</th>
                  <th className="pb-3 text-right pr-2">Feature Parity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {competitors.map((comp, i) => (
                  <tr key={i} className="hover:bg-white/3 transition-colors group">
                    <td className="py-4 pl-2 font-semibold text-white flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                      {comp.name}
                    </td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                        comp.threat === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                        comp.threat === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}>
                        {comp.threat}
                      </span>
                    </td>
                    <td className="py-4 text-zinc-300 text-xs">{comp.pricing}</td>
                    <td className="py-4 text-zinc-300 text-xs">{comp.UX}</td>
                    <td className="py-4 pr-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs font-mono text-zinc-400">{comp.featureParity}</span>
                        <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full" style={{ width: comp.featureParity }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Investor Evaluation */}
        <div className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 space-y-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <LineChart className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Investor Evaluation (AI Committee)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {investorNotes.map((note, i) => (
              <div key={i} className="bg-white/3 border border-white/5 rounded-xl p-5 hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-bold text-white">{note.title}</span>
                  {note.status === "Strong" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : note.status === "Medium" ? (
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-blue-400" />
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{note.desc}</p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    note.status === "Strong" ? "text-emerald-400" :
                    note.status === "Medium" ? "text-amber-400" :
                    "text-blue-400"
                  }`}>
                    {note.status} Signal
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-emerald-400 mb-1">Fundability Verdict: Seed Ready</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                The simulated VC committee indicates a high likelihood of successfully raising a $1.5M Seed round at an $8M-$10M post-money valuation, provided the initial MVP metrics hit a 15% MoM growth rate within 90 days.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
