"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrainCircuit,
  MessageSquare,
  Send,
  Sparkles,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  User,
  History,
  Bot
} from "lucide-react";

/* ─── Mock Data ────────────────────────────────────────────────── */

const suggestedQuestions = [
  "Why are users leaving?",
  "How can I increase revenue?",
  "Should I raise funding?",
  "What feature should I build next?",
  "How do I improve retention?",
];

const chatHistory = [
  { id: 1, title: "Pricing Optimization", date: "Today" },
  { id: 2, title: "Q3 Hiring Plan", date: "Yesterday" },
  { id: 3, title: "Churn Analysis", date: "Aug 12" },
  { id: 4, title: "Series A Deck Review", date: "Aug 05" },
];

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  recommendations?: string[];
};

export default function AIMentorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let aiResponseText = "Based on your current metrics, here is my strategic analysis of the situation. Your burn rate is currently optimized, but top-of-funnel growth needs attention.";
      let recs: string[] | undefined = undefined;

      if (text.toLowerCase().includes("users leaving") || text.toLowerCase().includes("retention")) {
        aiResponseText = "I've analyzed your user churn data. The primary drop-off occurs 14 days after onboarding. Your 'Enterprise Emma' cohort is churning due to complex SSO setup.";
        recs = [
          "Implement a guided, step-by-step SSO onboarding wizard.",
          "Trigger an automated check-in email on day 10 of the trial.",
          "Offer a 1-on-1 concierge setup call for high-value enterprise leads."
        ];
      } else if (text.toLowerCase().includes("revenue")) {
        aiResponseText = "To increase revenue immediately without building new features, we should optimize your pricing tiers. Your current Pro tier ($199) is highly elastic.";
        recs = [
          "Increase the Pro tier to $249 and observe conversion rates.",
          "Introduce an annual billing option with a 20% discount to secure upfront cash.",
          "Upsell current heavy users to the Enterprise tier based on API usage limits."
        ];
      } else if (text.toLowerCase().includes("funding")) {
        aiResponseText = "Looking at your financials: You have 32 months of runway. You don't *need* to raise immediately, which puts you in a strong negotiating position.";
        recs = [
          "Wait 3 months until you hit $1M ARR to command a higher valuation.",
          "If raising now, optimize for strategic partners rather than just cash.",
          "Prepare your Series A data room now while operations are smooth."
        ];
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiResponseText,
        recommendations: recs,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

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
            <History className="h-4 w-4 text-amber-400" /> Chat History
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
          {chatHistory.map((chat) => (
            <button key={chat.id} className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5 group">
              <p className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors truncate">{chat.title}</p>
              <p className="text-[10px] text-zinc-500 mt-1">{chat.date}</p>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-white/5">
          <button className="w-full h-10 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
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
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Online & Analyzing Data</span>
              </div>
            </div>
          </div>
          <button className="h-9 px-4 rounded-lg border border-white/10 bg-white/5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors">
            Export Transcript
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar relative">
          
          {messages.length === 0 ? (
            /* Empty State / Suggestions */
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="h-16 w-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-amber-400" />
              </div>
              <h2 className="text-2xl font-black text-white mb-2">How can I assist you today?</h2>
              <p className="text-sm text-zinc-400 max-w-md mb-8">
                I am your virtual CEO advisor. I have full access to your FounderOS metrics, cap table, and competitor intelligence.
              </p>
              
              <div className="w-full max-w-2xl text-left">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3">Suggested Strategic Inquiries</p>
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
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] flex flex-col gap-3 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-sm shadow-md' 
                        : 'bg-white/5 border border-white/10 text-zinc-200 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>

                    {msg.recommendations && (
                      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5 w-full mt-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="h-4 w-4 text-emerald-400" />
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Strategic Recommendations</span>
                        </div>
                        <ul className="space-y-3">
                          {msg.recommendations.map((rec, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="flex items-center justify-center shrink-0 h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                                {idx + 1}
                              </span>
                              <span className="text-sm text-zinc-300 mt-0.5">{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="h-10 w-10 shrink-0 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-zinc-300" />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-4 justify-start"
                >
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
            onSubmit={(e) => { e.preventDefault(); handleSend(inputValue); }}
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
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(inputValue);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-lg disabled:opacity-50 transition-opacity hover:opacity-90"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          <div className="mt-3 text-center">
            <span className="text-[10px] text-zinc-500">AI Mentor can make mistakes. Verify critical strategic decisions with your board.</span>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
