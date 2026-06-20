"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  AlertCircle,
  Loader2,
  RefreshCw,
  Award,
  Flame,
} from "lucide-react";

/* ─── Interfaces ────────────────────────────────────────────────── */

interface Startup {
  _id: string;
  startupName: string;
  industry: string;
  businessModel: string;
  targetAudience: string;
  problemStatement: string;
}

interface Scorecard {
  name: string;
  score: number;
}

interface Persona {
  name: string;
  role: string;
  painPoint: string;
  budget: string;
  acquisition: string;
}

interface Competitor {
  name: string;
  threat: string;
  pricing: string;
  UX: string;
  featureParity: string;
}

interface InvestorNote {
  title: string;
  status: string;
  desc: string;
}

interface Swot {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
}

interface AnalysisData {
  _id: string;
  startupId: string;
  overallScore: number;
  scorecards: Scorecard[];
  marketAnalysis: {
    tam: string;
    sam: string;
    som: string;
  };
  personas: Persona[];
  competitors: Competitor[];
  investorNotes: InvestorNote[];
  swot: Swot;
  fundabilityVerdict: string;
  fundabilityDescription: string;
  updatedAt: string;
}

const scorecardMeta = [
  { name: "Market Demand", icon: Target, color: "text-blue-400", bg: "bg-blue-500/10", bar: "bg-blue-400" },
  { name: "Competition", icon: Swords, color: "text-red-400", bg: "bg-red-500/10", bar: "bg-red-400" },
  { name: "Profitability", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-500/10", bar: "bg-emerald-400" },
  { name: "Feasibility", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", bar: "bg-amber-400" },
  { name: "Growth Potential", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10", bar: "bg-purple-400" },
];

const avatars = [
  "bg-gradient-to-br from-blue-500 to-cyan-500",
  "bg-gradient-to-br from-purple-500 to-pink-500",
  "bg-gradient-to-br from-amber-500 to-orange-500",
  "bg-gradient-to-br from-emerald-500 to-teal-500",
];

const loadingThoughts = [
  "Connecting to VentureAI Labs...",
  "Retrieving industry benchmarks and market databases...",
  "Analyzing problem statement & business model viability...",
  "Calculating TAM, SAM, and SOM addressable market sizes...",
  "Drafting typical customer personas & pain points...",
  "Simulating competitor pricing, UX, and feature parity...",
  "Assembling VC mock committee for investor notes...",
  "Synthesizing SWOT matrix (Strengths, Weaknesses, Opportunities, Threats)...",
  "Calculating overall score and fundability verdict...",
];

export default function StartupAnalysisPage() {
  const [startup, setStartup] = useState<Startup | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [thoughtIndex, setThoughtIndex] = useState(0);

  // Rotate loading thoughts
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (generating) {
      interval = setInterval(() => {
        setThoughtIndex((prev) => (prev + 1) % loadingThoughts.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [generating]);

  // Load startup list and initial analysis
  useEffect(() => {
    async function loadData() {
      try {
        const startupsRes = await fetch("/api/startup/list");
        if (!startupsRes.ok) throw new Error("Failed to load startup list");
        const startupsData = await startupsRes.json();

        if (!startupsData.success || !startupsData.startups?.length) {
          setError("No active startup found. Please create one to view the analysis.");
          setLoading(false);
          return;
        }

        const activeStartup = startupsData.startups[0];
        setStartup(activeStartup);

        // Fetch existing analysis
        const analysisRes = await fetch(`/api/analysis/${activeStartup._id}`);
        if (analysisRes.ok) {
          const analysisData = await analysisRes.json();
          if (analysisData.success) {
            setAnalysis(analysisData.analysis);
          }
        }
      } catch (err: any) {
        console.error("Error loading analysis page data:", err);
        setError(err.message || "Failed to load analysis page data");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Request OpenAI generation
  const handleGenerate = async (force = false) => {
    if (!startup) return;
    setGenerating(true);
    setError(null);
    setThoughtIndex(0);

    try {
      const res = await fetch("/api/analysis/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startupId: startup._id, forceRegenerate: force }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate report");
      }

      const data = await res.json();
      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        throw new Error(data.error || "Failed to generate report");
      }
    } catch (err: any) {
      console.error("Error generating analysis:", err);
      setError(err.message || "Failed to analyze startup");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-zinc-400">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
        <span className="text-sm font-medium">Loading analysis engine…</span>
      </div>
    );
  }

  if (error && !generating && !analysis) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Startup Analysis Error</h2>
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

  // Generative Loading Overlay
  if (generating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 space-y-6 text-center">
        <div className="relative flex items-center justify-center h-24 w-24">
          <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400/10 animate-ping" />
          <div className="relative h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <BrainCircuit className="h-8 w-8 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-lg font-bold text-white">Synthesizing Venture Report</h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={thoughtIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-xs text-cyan-400/80 font-mono h-8"
            >
              {loadingThoughts[thoughtIndex]}
            </motion.p>
          </AnimatePresence>
          <p className="text-[11px] text-zinc-500">
            This can take up to 20-30 seconds as GPT compiles industry statistics and simulates market positioning.
          </p>
        </div>
      </div>
    );
  }

  // Empty / Prompt state
  if (!analysis && startup) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] max-w-xl mx-auto text-center px-4 space-y-6">
        <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <BrainCircuit className="h-8 w-8 text-cyan-400" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white tracking-tight">Run AI Venture Analysis</h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Generate an in-depth, AI-powered evaluation for <span className="text-cyan-400 font-semibold">{startup.startupName}</span>. 
            We will analyze your business model, SWOT metrics, competitor landscape, target customer profiles, and fundability signals.
          </p>
        </div>
        <button
          onClick={() => handleGenerate(false)}
          className="h-11 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
        >
          <BrainCircuit className="h-4 w-4" />
          Generate Report with GPT
        </button>
      </div>
    );
  }

  if (!analysis) return null;

  const scorecards = scorecardMeta.map((meta) => {
    const matchingScore = analysis.scorecards?.find((s) => s.name === meta.name);
    return {
      ...meta,
      score: matchingScore ? matchingScore.score : 50,
    };
  });

  const formattedDate = new Date(analysis.updatedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
            <span className="text-xs text-zinc-500">Updated {formattedDate}</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Microscope className="h-6 w-6 text-cyan-400" />
            VentureAI Labs Analysis
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
            A comprehensive breakdown of <span className="text-white font-semibold">{startup?.startupName}</span>'s viability based on curated data points, simulated competitor behaviors, and historical VC investment patterns.
          </p>
          <div className="pt-2 flex gap-2">
            <button
              onClick={() => handleGenerate(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 text-xs font-bold text-zinc-300 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              Regenerate Report
            </button>
          </div>
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
                strokeDashoffset={301.6 - (301.6 * analysis.overallScore) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <p className="text-3xl font-black text-white tracking-tight">{analysis.overallScore}</p>
              <p className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">Overall Score</p>
            </div>
          </div>
          <span className="mt-3 text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1">
            {analysis.overallScore >= 80
              ? "High Potential"
              : analysis.overallScore >= 60
              ? "Moderate Potential"
              : "Early Stage / Pivot Required"}
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
                <span className="text-sm font-black text-white">{analysis.marketAnalysis.tam}</span>
              </div>
              <p className="text-[10px] text-zinc-500">Global market size estimation</p>
            </div>
            <div className="bg-white/3 border border-white/5 rounded-xl p-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">SAM (Serviceable Addressable)</span>
                <span className="text-sm font-black text-white">{analysis.marketAnalysis.sam}</span>
              </div>
              <p className="text-[10px] text-zinc-500">Serviceable segments within reach</p>
            </div>
            <div className="bg-white/3 border border-white/5 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-500/5" />
              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">SOM (Obtainable)</span>
                  <span className="text-sm font-black text-blue-400">{analysis.marketAnalysis.som}</span>
                </div>
                <p className="text-[10px] text-zinc-400">Target capture in Year 3-5</p>
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
            {analysis.personas?.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/3 hover:bg-white/5 transition-colors"
              >
                <div
                  className={`h-12 w-12 rounded-full ${
                    avatars[i % avatars.length]
                  } shadow-lg shrink-0 flex items-center justify-center text-white font-bold text-sm border border-white/10`}
                >
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
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-3 w-3" /> Budget: {p.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-3 w-3" /> Channel: {p.acquisition}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SWOT Analysis */}
        <div className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-6 space-y-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-2">
            <BrainCircuit className="h-5 w-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">SWOT Analysis Matrix</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-emerald-500/10 flex items-center justify-center">
                  <Award className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">Strengths</h3>
              </div>
              <ul className="space-y-1.5 list-disc pl-4 text-xs text-zinc-300">
                {analysis.swot?.strengths?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="rounded-xl border border-amber-500/10 bg-amber-500/[0.02] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-amber-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Weaknesses</h3>
              </div>
              <ul className="space-y-1.5 list-disc pl-4 text-xs text-zinc-300">
                {analysis.swot?.weaknesses?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Opportunities */}
            <div className="rounded-xl border border-blue-500/10 bg-blue-500/[0.02] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <TrendingUp className="h-3.5 w-3.5 text-blue-400" />
                </div>
                <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Opportunities</h3>
              </div>
              <ul className="space-y-1.5 list-disc pl-4 text-xs text-zinc-300">
                {analysis.swot?.opportunities?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Threats */}
            <div className="rounded-xl border border-red-500/10 bg-red-500/[0.02] p-5 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-red-500/10 flex items-center justify-center">
                  <Flame className="h-3.5 w-3.5 text-red-400" />
                </div>
                <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider">Threats</h3>
              </div>
              <ul className="space-y-1.5 list-disc pl-4 text-xs text-zinc-300">
                {analysis.swot?.threats?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
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
                {analysis.competitors?.map((comp, i) => (
                  <tr key={i} className="hover:bg-white/3 transition-colors group">
                    <td className="py-4 pl-2 font-semibold text-white flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-zinc-600 group-hover:text-cyan-400 transition-colors" />
                      {comp.name}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold ${
                          comp.threat === "High"
                            ? "bg-red-500/10 text-red-400 border border-red-500/20"
                            : comp.threat === "Medium"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {comp.threat}
                      </span>
                    </td>
                    <td className="py-4 text-zinc-300 text-xs">{comp.pricing}</td>
                    <td className="py-4 text-zinc-300 text-xs">{comp.UX}</td>
                    <td className="py-4 pr-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs font-mono text-zinc-400">{comp.featureParity}</span>
                        <div className="h-1.5 w-16 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-500 rounded-full"
                            style={{ width: comp.featureParity }}
                          />
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
            {analysis.investorNotes?.map((note, i) => (
              <div
                key={i}
                className="bg-white/3 border border-white/5 rounded-xl p-5 hover:bg-white/5 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-bold text-white">{note.title}</span>
                  {note.status === "Strong" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : note.status === "Medium" ? (
                    <Lightbulb className="h-4 w-4 text-amber-400" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{note.desc}</p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      note.status === "Strong"
                        ? "text-emerald-400"
                        : note.status === "Medium"
                        ? "text-amber-400"
                        : "text-red-400"
                    }`}
                  >
                    {note.status} Signal
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-emerald-400 mb-1">
                Fundability Verdict: {analysis.fundabilityVerdict}
              </h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                {analysis.fundabilityDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
