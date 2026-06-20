"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  MessageSquare,
  Send,
  Sparkles,
  ChevronRight,
  Lightbulb,
  User,
  History,
  Bot,
  AlertCircle,
  Loader2,
} from "lucide-react";

/* ─── Interfaces ────────────────────────────────────────────────── */

interface Startup {
  _id: string;
  startupName: string;
  industry: string;
  businessModel: string;
  targetAudience: string;
}

interface Message {
  _id?: string;
  sender: "user" | "ai";
  text: string;
  recommendations?: string[];
  createdAt: string;
}

interface MentorSession {
  _id: string;
  startupId: string;
  title: string;
  messages: Message[];
  updatedAt: string;
}

const suggestedQuestions = [
  "Why are users leaving?",
  "How can I increase revenue?",
  "Should I raise funding?",
  "What feature should I build next?",
  "How do I improve retention?",
];

export default function AIMentorPage() {
  const [startup, setStartup] = useState<Startup | null>(null);
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, isTyping, activeSessionId]);

  // Load startups and sessions
  useEffect(() => {
    async function loadData() {
      try {
        const startupsRes = await fetch("/api/startup/list");
        if (!startupsRes.ok) throw new Error("Failed to load startup list");
        const startupsData = await startupsRes.json();

        if (!startupsData.success || !startupsData.startups?.length) {
          setError("No active startup found. Please create one to use the AI Mentor.");
          setLoading(false);
          return;
        }

        const activeStartup = startupsData.startups[0];
        setStartup(activeStartup);

        // Load sessions
        await fetchSessions(activeStartup._id);
      } catch (err: any) {
        console.error("Error loading AI Mentor:", err);
        setError(err.message || "Failed to load mentor dashboard");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const fetchSessions = async (startupId: string, selectNewest = true) => {
    const sessionsRes = await fetch(`/api/mentor/sessions?startupId=${startupId}`);
    if (!sessionsRes.ok) throw new Error("Failed to load mentoring sessions");
    const sessionsData = await sessionsRes.json();

    if (sessionsData.success) {
      setSessions(sessionsData.sessions);
      
      if (sessionsData.sessions.length > 0) {
        if (selectNewest) {
          setActiveSessionId(sessionsData.sessions[0]._id);
        }
      } else {
        // Auto-create a session if none exists
        await handleNewSession(startupId);
      }
    }
  };

  const handleNewSession = async (sId = startup?._id) => {
    if (!sId) return;
    setLoading(true);
    try {
      const res = await fetch("/api/mentor/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startupId: sId }),
      });
      const data = await res.json();
      if (data.success) {
        setSessions((prev) => [data.session, ...prev]);
        setActiveSessionId(data.session._id);
      }
    } catch (err: any) {
      console.error("Error creating new session:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim() || !activeSessionId) return;

    // optimistic user message update
    const userMsg: Message = {
      sender: "user",
      text,
      createdAt: new Date().toISOString(),
    };

    setSessions((prev) =>
      prev.map((s) => {
        if (s._id === activeSessionId) {
          return { ...s, messages: [...s.messages, userMsg] };
        }
        return s;
      })
    );

    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/mentor/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: activeSessionId, text }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      const data = await res.json();

      if (data.success && startup) {
        // Refetch sessions to get updated titles & order
        await fetchSessions(startup._id, false);
        // Explicitly set the updated active session
        setActiveSessionId(data.session._id);
      }
    } catch (err) {
      console.error("Error messaging AI Mentor:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const activeSession = sessions.find((s) => s._id === activeSessionId);

  if (loading && sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-zinc-400">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <span className="text-sm font-medium">Loading mentor workspace…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        <div className="h-16 w-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
          <AlertCircle className="h-8 w-8 text-red-400" />
        </div>
        <h2 className="text-xl font-bold text-white">AI Mentor Workspace Error</h2>
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

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 pb-6">
      {/* ─── Left Sidebar: Chat History ──────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="w-64 hidden lg:flex flex-col bg-[#0e0e14]/80 border border-white/5 rounded-2xl backdrop-blur-sm overflow-hidden"
      >
        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <History className="h-4 w-4 text-amber-400" /> Chat Sessions
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
          {sessions.map((chat) => (
            <button
              key={chat._id}
              onClick={() => setActiveSessionId(chat._id)}
              className={`w-full text-left p-3 rounded-xl transition-all border ${
                activeSessionId === chat._id
                  ? "bg-white/10 border-white/15"
                  : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/5"
              } group`}
            >
              <p
                className={`text-xs font-bold truncate ${
                  activeSessionId === chat._id ? "text-white" : "text-zinc-300 group-hover:text-white"
                }`}
              >
                {chat.title}
              </p>
              <p className="text-[10px] text-zinc-500 mt-1">
                {new Date(chat.updatedAt).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => handleNewSession()}
            className="w-full h-10 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare className="h-4 w-4" /> New Session
          </button>
        </div>
      </motion.div>

      {/* ─── Main Chat Area ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex-1 flex flex-col bg-[#0e0e14]/80 border border-white/5 rounded-2xl backdrop-blur-sm overflow-hidden relative"
      >
        {/* Header */}
        <div className="p-5 border-b border-white/5 bg-white/[0.02] flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg border border-white/20">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tight">CEO Strategic Mentor</h1>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Analyzing Live OS Metrics
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleNewSession()}
            className="lg:hidden h-9 px-4 rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-zinc-300 hover:text-white"
          >
            New Session
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar relative">
          {!activeSession || activeSession.messages.length === 0 ? (
            /* Empty State / Suggestions */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-amber-400" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">How can I assist you today?</h2>
              <p className="text-sm text-zinc-400 max-w-md mb-8">
                I am your virtual CEO advisor. I have full access to {startup?.startupName}'s operational metrics, financials, and competitor intelligence.
              </p>

              <div className="w-full max-w-2xl text-left">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">
                  Suggested Strategic Inquiries
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-left p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-amber-500/50 transition-all group flex items-center justify-between"
                    >
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{q}</span>
                      <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-amber-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Message Bubbles */
            <>
              {activeSession.messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.sender === "ai" && (
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}

                  <div className={`max-w-[80%] flex flex-col gap-3 ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white rounded-tr-sm shadow-md"
                          : "bg-white/5 border border-white/10 text-zinc-200 rounded-tl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 w-full mt-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            Strategic Recommendations
                          </span>
                        </div>
                        <ul className="space-y-3">
                          {msg.recommendations.map((rec, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-3">
                              <span className="flex items-center justify-center shrink-0 h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                                {rIdx + 1}
                              </span>
                              <span className="text-sm text-zinc-300 mt-0.5">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {msg.sender === "user" && (
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-zinc-300" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 justify-start">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2 h-12">
                    <div className="h-2 w-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="h-2 w-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="h-2 w-2 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}
            </>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-5 border-t border-white/5 bg-[#0a0a0f] z-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            className="flex items-end gap-3"
          >
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-amber-500/50 focus-within:bg-white/10 transition-colors">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about strategy, metrics, or market position..."
                className="w-full bg-transparent p-4 text-sm text-white placeholder-zinc-500 resize-none outline-none min-h-[56px] max-h-32"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(inputValue);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping || !activeSessionId}
              className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg disabled:opacity-50 transition-opacity hover:opacity-90"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          <div className="mt-3 text-center">
            <span className="text-[10px] text-zinc-500">
              AI Mentor can make mistakes. Verify critical strategic decisions with your board.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
