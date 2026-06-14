"use client";

import { motion } from "framer-motion";
import {
  Swords,
  Crosshair,
  TrendingUp,
  ShieldAlert,
  BarChart4,
  Target,
  DollarSign,
  Activity,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

/* ─── Mock Data ────────────────────────────────────────────────── */

const competitors = [
  { name: "AlphaStack", marketShare: 35, funding: "$50M Series B", growth: "+4.2%", pricing: "$99/mo", threat: "High", color: "text-red-400", bg: "bg-red-500/10" },
  { name: "BetaFlow", marketShare: 22, funding: "$15M Series A", growth: "+8.1%", pricing: "$49/mo", threat: "Medium", color: "text-amber-400", bg: "bg-amber-500/10" },
  { name: "VentureAI (You)", marketShare: 12, funding: "$1.5M Seed", growth: "+15.4%", pricing: "$79/mo", threat: "N/A", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { name: "LegacyCorp", marketShare: 18, funding: "Public ($1.2B)", growth: "-2.1%", pricing: "$250/mo", threat: "Low", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { name: "NimbleTech", marketShare: 13, funding: "Bootstrapped", growth: "+12.0%", pricing: "$29/mo", threat: "Medium", color: "text-amber-400", bg: "bg-amber-500/10" },
];

const featureComparison = [
  { feature: "AI Workflows", alpha: 80, beta: 40, you: 100, legacy: 20 },
  { feature: "Custom Analytics", alpha: 90, beta: 60, you: 85, legacy: 100 },
  { feature: "API Access", alpha: 100, beta: 100, you: 100, legacy: 50 },
  { feature: "SSO/SAML", alpha: 100, beta: 0, you: 50, legacy: 100 },
];

const pricingComparison = [
  { name: "AlphaStack", starter: 99, pro: 249, ent: 999 },
  { name: "BetaFlow", starter: 49, pro: 149, ent: 499 },
  { name: "VentureAI", starter: 79, pro: 199, ent: 799 },
  { name: "LegacyCorp", starter: 250, pro: 500, ent: 2500 },
];

/* ─── Custom Market Position Chart (Scatter) ───────────────────── */
function MarketPositionChart() {
  // Mapping: x = Feature Quality (0-100), y = Price (0-300)
  const data = [
    { name: "AlphaStack", x: 85, y: 180, color: "#f87171" },
    { name: "BetaFlow", x: 50, y: 90, color: "#fbbf24" },
    { name: "VentureAI", x: 80, y: 120, color: "#22d3ee", pulse: true },
    { name: "LegacyCorp", x: 60, y: 250, color: "#10b981" },
    { name: "NimbleTech", x: 40, y: 50, color: "#fbbf24" },
  ];

  return (
    <div className="relative w-full h-[250px] border-l border-b border-white/10 mt-4 mb-6">
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
        {[...Array(16)].map((_, i) => (
          <div key={i} className="border-t border-r border-white/20" />
        ))}
      </div>
      
      {/* Axes Labels */}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Feature Quality ➔</span>
      <span className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap">Price (Monthly) ➔</span>

      {/* Points */}
      {data.map((point, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${point.x}%`, bottom: `${(point.y / 300) * 100}%` }}
        >
          {point.pulse && (
            <div className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: point.color }} />
          )}
          <div className="h-4 w-4 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] border-2 border-[#0e0e14] z-10" style={{ backgroundColor: point.color }} />
          <span className="absolute top-5 text-[9px] font-bold text-white whitespace-nowrap bg-[#0e0e14]/80 px-1.5 py-0.5 rounded border border-white/10">
            {point.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function CompetitorIntelligencePage() {
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-wider">
              <Swords className="h-3 w-3" />
              Market Landscape
            </span>
            <span className="text-xs font-semibold text-zinc-500">Real-time Analysis</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Competitor Intelligence</h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Monitor market share, track feature parity, and map your strategic positioning against industry rivals.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 rounded-xl border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-colors">
            Generate Report
          </button>
          <button className="h-10 px-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-xs font-bold text-white shadow-lg shadow-red-500/20 hover:opacity-90 transition-opacity flex items-center gap-2">
            <Target className="h-4 w-4" /> Add Competitor
          </button>
        </div>
      </motion.div>

      {/* ─── Competitor Leaderboard ──────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm overflow-hidden"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Crosshair className="h-5 w-5 text-red-400" /> Market Leaderboard
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="py-4 pl-6 font-medium">Company</th>
                <th className="py-4 font-medium">Market Share</th>
                <th className="py-4 font-medium">Monthly Growth</th>
                <th className="py-4 font-medium">Funding</th>
                <th className="py-4 font-medium">Pricing</th>
                <th className="py-4 pr-6 font-medium text-right">Threat Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {competitors.map((comp, i) => (
                <tr key={i} className={`transition-colors ${comp.name.includes("You") ? "bg-cyan-500/5 hover:bg-cyan-500/10" : "hover:bg-white/5"}`}>
                  <td className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg ${comp.bg} border border-white/5 flex items-center justify-center font-bold ${comp.color}`}>
                        {comp.name.charAt(0)}
                      </div>
                      <span className="font-bold text-white">{comp.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3 w-40">
                      <span className="text-xs font-bold text-white w-8">{comp.marketShare}%</span>
                      <div className="h-1.5 flex-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${comp.name.includes("You") ? "bg-cyan-400" : "bg-white/20"}`} style={{ width: `${comp.marketShare}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-md bg-[#08080c] border border-white/5 ${comp.growth.includes("+") ? "text-emerald-400" : "text-red-400"}`}>
                      {comp.growth}
                    </span>
                  </td>
                  <td className="py-4 text-xs text-zinc-300 font-medium">{comp.funding}</td>
                  <td className="py-4 text-xs font-mono text-zinc-400">{comp.pricing}</td>
                  <td className="py-4 pr-6 text-right">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                      comp.threat === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      comp.threat === 'Medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      comp.threat === 'Low' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                    }`}>
                      {comp.threat === 'High' && <ShieldAlert className="h-3 w-3" />}
                      {comp.threat === 'Low' && <ShieldCheck className="h-3 w-3" />}
                      {comp.threat}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ─── Comparison Charts Grid ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Market Position Scatter Plot */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 flex flex-col"
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white">Market Position</h2>
          </div>
          <p className="text-xs text-zinc-400 mb-4">Value mapping based on pricing versus feature depth.</p>
          
          <div className="flex-1 flex flex-col justify-center pb-4">
            <MarketPositionChart />
          </div>
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <Layers className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Feature Parity (Top Rivals)</h2>
          </div>
          <p className="text-xs text-zinc-400 mb-6">Percentage completion of core feature sets.</p>

          <div className="space-y-5">
            {featureComparison.map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-white">{item.feature}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 h-2">
                  <div className="relative w-full h-full bg-white/5 rounded-full overflow-hidden" title="You">
                    <div className="absolute top-0 left-0 h-full bg-cyan-400 rounded-full" style={{ width: `${item.you}%` }} />
                  </div>
                  <div className="relative w-full h-full bg-white/5 rounded-full overflow-hidden" title="AlphaStack">
                    <div className="absolute top-0 left-0 h-full bg-red-400 rounded-full" style={{ width: `${item.alpha}%` }} />
                  </div>
                  <div className="relative w-full h-full bg-white/5 rounded-full overflow-hidden" title="BetaFlow">
                    <div className="absolute top-0 left-0 h-full bg-amber-400 rounded-full" style={{ width: `${item.beta}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[9px] font-bold text-zinc-500 uppercase tracking-wider text-center">
                  <span>You</span>
                  <span>Alpha</span>
                  <span>Beta</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Pricing Model Comparison</h2>
          </div>
          <p className="text-xs text-zinc-400 mb-6">Monthly tier breakdowns across the landscape.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {pricingComparison.map((price, i) => (
              <div key={i} className={`p-4 rounded-xl border transition-colors ${price.name === "VentureAI" ? "bg-cyan-500/5 border-cyan-500/30" : "bg-white/3 border-white/5 hover:border-white/10"}`}>
                <h3 className="text-sm font-bold text-white flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                  {price.name}
                  {price.name === "VentureAI" && <span className="text-[9px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">Us</span>}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Starter</span>
                    <span className="font-mono font-bold text-white">${price.starter}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Pro</span>
                    <span className="font-mono font-bold text-white">${price.pro}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500">Enterprise</span>
                    <span className="font-mono font-bold text-emerald-400">${price.ent}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
