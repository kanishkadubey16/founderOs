"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lightbulb,
  TrendingUp,
  Users,
  Briefcase,
  Megaphone,
  Box,
  Globe,
  Zap,
  Flame,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Wallet,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface Startup {
  _id: string;
  startupName: string;
  industry: string;
  businessModel: string;
}

interface CompanyState {
  _id: string;
  startupId: string;
  month: number;
  cash: number;
  revenue: number;
  expenses: number;
  users: number;
  employees: number;
  valuation: number;
  retention: number;
  churn: number;
  marketShare: number;
}

interface DecisionType {
  _id: string;
  startupId: string;
  title: string;
  category: string;
  cost: number;
  impact: string;
  month: number;
}

function fmt(n: number, prefix = "$") {
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(1)}k`;
  return `${prefix}${n.toLocaleString()}`;
}


/* ─── Mock Data ────────────────────────────────────────────────── */

const categories = [
  { id: "Hiring", icon: Briefcase },
  { id: "Marketing", icon: Megaphone },
  { id: "Product", icon: Box },
  { id: "Funding", icon: Wallet },
  { id: "Expansion", icon: Globe },
];

const decisionData = [
  // Hiring
  {
    id: "hire-eng",
    category: "Hiring",
    title: "Hire Senior Engineer",
    description: "Accelerate product development and reduce technical debt.",
    cost: "$14,000/mo",
    risk: "Low",
    impact: "+35% Development Velocity",
    metrics: { revenue: "+$0", users: "+0", burnRate: "+$14k", retention: "+2%" }
  },
  {
    id: "hire-pm",
    category: "Hiring",
    title: "Hire Product Manager",
    description: "Streamline roadmap execution and improve user research cycles.",
    cost: "$11,500/mo",
    risk: "Low",
    impact: "+20% Feature Adoption",
    metrics: { revenue: "+$1.5k", users: "+250", burnRate: "+$11.5k", retention: "+5%" }
  },
  {
    id: "hire-mktg",
    category: "Hiring",
    title: "Hire Marketing Specialist",
    description: "Build an organic content engine and manage paid campaigns.",
    cost: "$8,000/mo",
    risk: "Medium",
    impact: "-15% CAC, +40% Top-of-Funnel",
    metrics: { revenue: "+$4.2k", users: "+850", burnRate: "+$8k", retention: "+0%" }
  },
  // Marketing
  {
    id: "mktg-social",
    category: "Marketing",
    title: "Launch Social Media Campaign",
    description: "Targeted ad spend across LinkedIn and Twitter for 30 days.",
    cost: "$15,000",
    risk: "Medium",
    impact: "Expected 1.2M Impressions",
    metrics: { revenue: "+$8.5k", users: "+1,200", burnRate: "+$15k (One-time)", retention: "-1%" }
  },
  {
    id: "mktg-influencer",
    category: "Marketing",
    title: "Influencer Partnership",
    description: "Sponsor 3 major tech YouTubers for dedicated product segments.",
    cost: "$25,000",
    risk: "High",
    impact: "Viral Brand Awareness Spike",
    metrics: { revenue: "+$18k", users: "+4,500", burnRate: "+$25k (One-time)", retention: "-3%" }
  },
  {
    id: "mktg-referral",
    category: "Marketing",
    title: "Launch Referral Program",
    description: "Give users one month free for every successful invite.",
    cost: "$0 Upfront",
    risk: "Low",
    impact: "Compound Viral Growth",
    metrics: { revenue: "-$2k (Short-term)", users: "+800", burnRate: "+$0", retention: "+8%" }
  },
  // Product
  {
    id: "prod-feature",
    category: "Product",
    title: "Launch Analytics Dashboard",
    description: "Release the highly requested user analytics module.",
    cost: "$0 (Dev Time)",
    risk: "Low",
    impact: "Unlocks Enterprise Tier",
    metrics: { revenue: "+$12k", users: "+150", burnRate: "+$0", retention: "+12%" }
  },
  {
    id: "prod-ui",
    category: "Product",
    title: "Major UI/UX Overhaul",
    description: "Completely redesign the app based on latest user feedback.",
    cost: "$5,000",
    risk: "High",
    impact: "Higher conversion, risk of user backlash",
    metrics: { revenue: "+$3k", users: "+400", burnRate: "+$5k", retention: "+15%" }
  },
  {
    id: "prod-ai",
    category: "Product",
    title: "Build AI Co-pilot Assistant",
    description: "Integrate LLMs directly into the core user workflow.",
    cost: "$20,000/mo (API Costs)",
    risk: "Medium",
    impact: "Massive PR boost, higher margins",
    metrics: { revenue: "+$28k", users: "+2,200", burnRate: "+$20k", retention: "+4%" }
  },
  // Funding
  {
    id: "fund-angel",
    category: "Funding",
    title: "Raise Angel Round",
    description: "Pitch local angel syndicates for 12-month runway extension.",
    cost: "10% Equity",
    risk: "Medium",
    impact: "+$500k Cash Balance",
    metrics: { revenue: "+$0", users: "+0", burnRate: "+$0", retention: "+0%" }
  },
  {
    id: "fund-seed",
    category: "Funding",
    title: "Raise Seed Round",
    description: "Full institutional roadshow targeting top-tier VC firms.",
    cost: "20% Equity",
    risk: "High",
    impact: "+$2.5M Cash Balance",
    metrics: { revenue: "+$0", users: "+0", burnRate: "+$0", retention: "+0%" }
  },
  {
    id: "fund-bootstrap",
    category: "Funding",
    title: "Commit to Bootstrapping",
    description: "Cut non-essential spend and push heavily for profitability.",
    cost: "$0 Equity",
    risk: "High",
    impact: "Extends runway organically",
    metrics: { revenue: "+$2k", users: "-200", burnRate: "-$15k", retention: "-5%" }
  },
  // Expansion
  {
    id: "exp-market",
    category: "Expansion",
    title: "Expand to European Market",
    description: "Localize app and launch compliance infrastructure for GDPR.",
    cost: "$45,000",
    risk: "High",
    impact: "+40% Total Addressable Market",
    metrics: { revenue: "+$35k", users: "+3,500", burnRate: "+$8k", retention: "+0%" }
  },
  {
    id: "exp-segment",
    category: "Expansion",
    title: "Target Enterprise Segment",
    description: "Build out SAML/SSO, audit logs, and hire enterprise AE.",
    cost: "$30,000",
    risk: "Medium",
    impact: "Unlocks $50k+ ACV Deals",
    metrics: { revenue: "+$85k", users: "+50", burnRate: "+$12k", retention: "+20%" }
  },
];

export default function DecisionCenterPage() {
  const [activeTab, setActiveTab] = useState("Hiring");
  const [startup, setStartup] = useState<Startup | null>(null);
  const [companyState, setCompanyState] = useState<CompanyState | null>(null);
  const [executedDecisions, setExecutedDecisions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const startupsRes = await fetch("/api/startup/list");
        if (!startupsRes.ok) throw new Error("Could not load startup list");
        const startupsData = await startupsRes.json();

        if (!startupsData.success || !startupsData.startups?.length) {
          setError("No startup found. Create one first in the wizard.");
          return;
        }

        const latestStartup = startupsData.startups[0];
        setStartup(latestStartup);

        // Fetch company state
        const stateRes = await fetch(`/api/company-state/${latestStartup._id}`);
        const stateData = await stateRes.json();
        if (stateData.success) {
          setCompanyState(stateData.companyState);
        }

        // Fetch executed decisions
        const decisionsRes = await fetch(`/api/decision/list/${latestStartup._id}`);
        const decisionsData = await decisionsRes.json();
        if (decisionsData.success) {
          // Map title/types back to IDs to display execution checkmark overlay
          const titleToIdMap: Record<string, string> = {
            "Hire Engineer": "hire-eng",
            "Hire Product Manager": "hire-pm",
            "Hire Marketing Specialist": "hire-mktg",
            "Marketing Campaign": "mktg-social",
            "Influencer Partnership": "mktg-influencer",
            "Launch Referral Program": "mktg-referral",
            "Launch Analytics Dashboard": "prod-feature",
            "Major UI/UX Overhaul": "prod-ui",
            "Build AI Co-pilot Assistant": "prod-ai",
            "Raise Seed Funding": "fund-seed",
            "Raise Angel Round": "fund-angel",
            "Commit to Bootstrapping": "fund-bootstrap",
            "Expand to European Market": "exp-market",
            "Target Enterprise Segment": "exp-segment"
          };
          const ids = decisionsData.decisions.map((d: any) => titleToIdMap[d.title] || d.title);
          setExecutedDecisions(ids);
        }
      } catch (err: any) {
        console.error("Error loading decisions data:", err);
        setError(err.message || "Failed to load strategic data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleExecute = async (id: string) => {
    if (executedDecisions.includes(id) || !startup) return;

    try {
      const res = await fetch("/api/decision/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupId: startup._id,
          decisionId: id,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Execution failed");
      }

      setExecutedDecisions((prev) => [...prev, id]);
      setCompanyState(data.companyState);
    } catch (err: any) {
      alert(err.message || "Error executing decision");
    }
  };

  const filteredDecisions = decisionData.filter(d => d.category === activeTab);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-zinc-400 bg-[#050508]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-400" />
        <span className="text-sm font-medium">Loading Decision Center…</span>
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4 bg-[#050508]">
        <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Failed to load decisions</h2>
        <p className="text-sm text-zinc-400 max-w-md">{error || "No active startup found."}</p>
        <button
          onClick={() => window.location.reload()}
          className="h-10 px-5 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* ─── Header ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">
            <Zap className="h-3 w-3" />
            Strategic Hub
          </span>
          <span className="text-xs text-zinc-500">Month {companyState?.month || 1} Planning</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-amber-400" />
          Decision Center
        </h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
          Evaluate tradeoffs and execute critical strategic initiatives for {startup.startupName}. Actions taken here instantly update your startup's core simulation metrics.
        </p>
      </motion.div>

      {/* ─── Projected Impact Metrics ────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Projected MRR", value: companyState ? fmt(companyState.revenue) : "$48.7K", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/10" },
          { label: "Projected Users", value: companyState ? companyState.users.toLocaleString() : "3,240", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Projected Burn", value: companyState ? `${fmt(companyState.expenses)}/mo` : "$34.2K", icon: Flame, color: "text-red-400", bg: "bg-red-500/10" },
          { label: "Expected Retention", value: companyState ? `${companyState.retention}%` : "95%", icon: CheckCircle2, color: "text-purple-400", bg: "bg-purple-500/10" },
        ].map((metric, i) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-5 flex items-center gap-4"
            >
              <div className={`h-10 w-10 rounded-xl ${metric.bg} border border-white/5 flex items-center justify-center shrink-0`}>
                <Icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{metric.label}</p>
                <p className="text-xl font-black text-white">{metric.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Category Tabs ───────────────────────────────────────── */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 border-b border-white/10 pb-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 ${
                isActive ? "text-white bg-white/5 border border-white/10 shadow-lg" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/3"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-amber-400" : "text-zinc-500"}`} />
              {cat.id}
              {isActive && (
                <motion.div
                  layoutId="decision-tab-indicator"
                  className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 h-0.5 w-1/2 bg-gradient-to-r from-amber-500 to-amber-300 rounded-t-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ─── Decisions Grid ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filteredDecisions.map((decision) => {
            const isExecuted = executedDecisions.includes(decision.id);
            const riskColors = {
              "Low": "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
              "Medium": "text-amber-400 bg-amber-500/10 border-amber-500/20",
              "High": "text-red-400 bg-red-500/10 border-red-500/20"
            };
            const rc = riskColors[decision.risk as keyof typeof riskColors];

            return (
              <motion.div
                key={decision.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-2xl border backdrop-blur-sm flex flex-col overflow-hidden transition-all duration-500 ${
                  isExecuted 
                    ? "bg-[#0a0a0f]/50 border-emerald-500/20" 
                    : "bg-[#0e0e14]/80 border-white/5 hover:border-white/10"
                }`}
              >
                {/* Executed Overlay */}
                <AnimatePresence>
                  {isExecuted && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 z-10 bg-[#050508]/60 backdrop-blur-[2px] flex items-center justify-center border border-emerald-500/30 rounded-2xl"
                    >
                      <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-full px-4 py-2 flex items-center gap-2 text-emerald-400 font-bold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <CheckCircle2 className="h-5 w-5" />
                        Decision Executed
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-white/5 border border-white/10 px-2 py-1 rounded-md">
                      {decision.cost}
                    </span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md border flex items-center gap-1 ${rc}`}>
                      {decision.risk === 'High' && <ShieldAlert className="h-3 w-3" />}
                      Risk: {decision.risk}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white mb-2 leading-tight">{decision.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6 flex-1">
                    {decision.description}
                  </p>

                  {/* Impact & Metrics Block */}
                  <div className="bg-white/3 border border-white/5 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-1.5 mb-3 border-b border-white/5 pb-2">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      <span className="text-xs font-bold text-white">Expected Impact</span>
                    </div>
                    <p className="text-xs font-medium text-zinc-300 mb-3">{decision.impact}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="flex items-center justify-between bg-[#08080c] p-1.5 rounded border border-white/5">
                        <span className="text-zinc-500">Rev:</span>
                        <span className="font-bold text-emerald-400">{decision.metrics.revenue}</span>
                      </div>
                      <div className="flex items-center justify-between bg-[#08080c] p-1.5 rounded border border-white/5">
                        <span className="text-zinc-500">Users:</span>
                        <span className="font-bold text-blue-400">{decision.metrics.users}</span>
                      </div>
                      <div className="flex items-center justify-between bg-[#08080c] p-1.5 rounded border border-white/5">
                        <span className="text-zinc-500">Burn:</span>
                        <span className="font-bold text-red-400">{decision.metrics.burnRate}</span>
                      </div>
                      <div className="flex items-center justify-between bg-[#08080c] p-1.5 rounded border border-white/5">
                        <span className="text-zinc-500">Ret:</span>
                        <span className="font-bold text-purple-400">{decision.metrics.retention}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleExecute(decision.id)}
                    className="w-full group flex items-center justify-center gap-2 h-11 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 hover:border-amber-500/50 hover:text-amber-400 transition-all"
                  >
                    Execute Decision
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
