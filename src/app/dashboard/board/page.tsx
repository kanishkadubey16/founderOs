"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  User,
  Swords,
  DollarSign,
  Users,
  BrainCircuit,
  AlertTriangle,
  Lightbulb,
  Eye,
  ChevronRight,
  TrendingUp,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

/* ─── Interfaces ────────────────────────────────────────────────── */

interface Startup {
  _id: string;
  startupName: string;
  industry: string;
  businessModel: string;
  targetAudience: string;
}

interface AgentFeedback {
  agentId: string;
  name: string;
  role: string;
  observation: string;
  risk: string;
  opportunity: string;
  recommendation: string;
}

interface BoardMeeting {
  _id: string;
  startupId: string;
  month: number;
  agents: AgentFeedback[];
  createdAt: string;
}

const agentsMeta = [
  {
    id: "customer",
    name: "Customer Agent",
    role: "User Sentiment Analysis",
    icon: User,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    id: "competitor",
    name: "Competitor Agent",
    role: "Market Threat Analysis",
    icon: Swords,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
  {
    id: "investor",
    name: "Investor Agent",
    role: "Capital & Growth Logic",
    icon: DollarSign,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    id: "employee",
    name: "Employee Agent",
    role: "Team Health & Culture",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    id: "mentor",
    name: "CEO Mentor",
    role: "Strategic Governance",
    icon: BrainCircuit,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

export default function BoardMeetingsPage() {
  const [startup, setStartup] = useState<Startup | null>(null);
  const [meetings, setMeetings] = useState<BoardMeeting[]>([]);
  const [activeMonthLabel, setActiveMonthLabel] = useState<string>("");
  const [activeAgentId, setActiveAgentId] = useState<string>("mentor");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});

  // Load startup and board meetings
  useEffect(() => {
    async function loadData() {
      try {
        const startupsRes = await fetch("/api/startup/list");
        if (!startupsRes.ok) throw new Error("Failed to load startup list");
        const startupsData = await startupsRes.json();

        if (!startupsData.success || !startupsData.startups?.length) {
          setError("No active startup found. Please create one to view the Board Room.");
          setLoading(false);
          return;
        }

        const activeStartup = startupsData.startups[0];
        setStartup(activeStartup);

        // Fetch board meetings
        const boardRes = await fetch(`/api/board/${activeStartup._id}`);
        if (!boardRes.ok) throw new Error("Failed to load board meetings");
        const boardData = await boardRes.json();

        if (boardData.success) {
          setMeetings(boardData.meetings);
          if (boardData.meetings.length > 0) {
            setActiveMonthLabel(`Month ${boardData.meetings[0].month}`);
          }
        }
      } catch (err: any) {
        console.error("Error loading board room data:", err);
        setError(err.message || "Failed to load board meetings");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activeMeeting = meetings.find((m) => `Month ${m.month}` === activeMonthLabel);

  // Map agents metadata to live database feedback
  const dynamicAgents = agentsMeta.map((agentMeta) => {
    const dbFeedback = activeMeeting?.agents?.find((a) => a.agentId === agentMeta.id);
    return {
      ...agentMeta,
      feedback: {
        observation: dbFeedback?.observation || "Analyzing initial startup launch parameters...",
        risk: dbFeedback?.risk || "Monitoring early operational risk signals...",
        opportunity: dbFeedback?.opportunity || "Identifying high-growth opportunities...",
        recommendation: dbFeedback?.recommendation || "Establish standard KPIs and onboarding flows.",
      },
    };
  });

  const currentAgent = dynamicAgents.find((a) => a.id === activeAgentId) || dynamicAgents[4];
  const CurrentIcon = currentAgent.icon;

  const handleAcknowledge = () => {
    if (!activeMeeting) return;
    const key = `${activeMeeting._id}-${activeAgentId}`;
    setAcknowledged((prev) => ({ ...prev, [key]: true }));
  };

  const isCurrentAcknowledged = activeMeeting
    ? acknowledged[`${activeMeeting._id}-${activeAgentId}`]
    : false;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-zinc-400">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
        <span className="text-sm font-medium">Assembling Board of Directors…</span>
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white">Board Room Connection Error</h2>
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

  const monthsLabels = meetings.map((m) => `Month ${m.month}`);

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
            Simulate and review your monthly board packets. Analyze advice, concerns, and strategic recommendations curated by your specialized AI Board.
          </p>
        </div>

        {/* Month Selector */}
        {monthsLabels.length > 0 && (
          <div className="flex bg-[#0e0e14]/80 backdrop-blur-sm border border-white/10 rounded-xl p-1 overflow-x-auto max-w-full">
            {monthsLabels.map((mLabel) => (
              <button
                key={mLabel}
                onClick={() => setActiveMonthLabel(mLabel)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  activeMonthLabel === mLabel ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {mLabel}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* ─── Presentation Layout ─────────────────────────────────── */}
      {meetings.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center border border-white/5 bg-[#0e0e14]/40 rounded-2xl p-8 min-h-[400px] text-center space-y-4">
          <div className="h-12 w-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <CalendarDays className="h-6 w-6 text-indigo-400" />
          </div>
          <h2 className="text-lg font-bold text-white">No Board Meetings Recorded</h2>
          <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
            Board packets compile automatically when you advance the month in your main simulation dashboard. 
            Go simulate Month 2 to generate your first board packet assessment!
          </p>
        </div>
      ) : (
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
              <p className="text-xs text-zinc-400">Select a board member to review their monthly feedback packet.</p>
            </div>

            {dynamicAgents.map((agent) => {
              const Icon = agent.icon;
              const isActive = activeAgentId === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgentId(agent.id)}
                  className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                    isActive
                      ? `bg-[#0e0e14]/90 border-white/20 shadow-lg`
                      : "bg-[#0e0e14]/40 border-white/5 hover:border-white/10 hover:bg-[#0e0e14]/60"
                  }`}
                >
                  <div
                    className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 border ${
                      isActive ? `${agent.bg} ${agent.border}` : "bg-white/5 border-white/10"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? agent.color : "text-zinc-500"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-bold ${isActive ? "text-white" : "text-zinc-300"}`}>{agent.name}</h3>
                    <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mt-0.5">
                      {agent.role}
                    </p>
                  </div>
                  {isActive && <ChevronRight className="h-4 w-4 text-white opacity-50" />}
                </button>
              );
            })}
          </motion.div>

          {/* Right Main Area: Active Agent Presentation */}
          <motion.div
            key={activeAgentId}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-8 xl:col-span-9 rounded-2xl border border-white/10 bg-[#0e0e14]/80 backdrop-blur-md overflow-hidden flex flex-col relative"
          >
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-${currentAgent.color
                .replace("text-", "")
                .split("-")[0]} to-transparent opacity-50`}
            />

            <div className="p-8 border-b border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`h-16 w-16 rounded-2xl border ${currentAgent.bg} ${currentAgent.border} flex items-center justify-center shadow-lg`}
                >
                  <CurrentIcon className={`h-8 w-8 ${currentAgent.color}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">{currentAgent.name} Assessment</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${currentAgent.bg} ${currentAgent.color} ${currentAgent.border}`}
                    >
                      {currentAgent.role}
                    </span>
                    <span className="text-xs font-semibold text-zinc-500">• {activeMonthLabel}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-zinc-400">
                "Here is my professional assessment of {startup.startupName}'s month-over-month milestones. 
                Please act on recommendations before the next simulation advance."
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
                  <p className="text-zinc-300 leading-relaxed text-sm">{currentAgent.feedback.observation}</p>
                </div>

                {/* Risk / Concern */}
                <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-500/50" />
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Primary Risk & Concern</h3>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-sm">{currentAgent.feedback.risk}</p>
                </div>

                {/* Opportunity */}
                <div className="bg-[#0a0a0f] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-white/10 transition-colors">
                  <div className="absolute top-0 left-0 bottom-0 w-1 bg-cyan-500/50" />
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Market Opportunity</h3>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-sm">{currentAgent.feedback.opportunity}</p>
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
              <span className="text-xs text-zinc-500 font-mono">
                {isCurrentAcknowledged ? "✓ Acknowledged & Saved to cap logs" : "Pending CEO acknowledgment"}
              </span>
              <button
                disabled={isCurrentAcknowledged}
                onClick={handleAcknowledge}
                className={`h-10 px-6 rounded-xl border text-xs font-bold text-white transition-all ${
                  isCurrentAcknowledged
                    ? "bg-white/5 border-white/5 text-zinc-500 cursor-default"
                    : `${currentAgent.bg} ${currentAgent.border} hover:opacity-80 active:scale-95`
                }`}
              >
                {isCurrentAcknowledged ? "Acknowledged" : "Acknowledge & Save"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
