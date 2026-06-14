"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "CEO at Stealth SaaS",
      valuation: "Simulated exit: $24M VC acquisition",
      quote: "We ran our entire pricing pivot inside FounderOS. The simulator warned us about a cashflow pinch in month 14. We fixed it in the model first, then launched. It saved us from absolute disaster in the real world.",
      initials: "MV",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Sophia Chen",
      role: "Founder at HealthSync",
      valuation: "Simulated exit: $48M IPO on TechEx",
      quote: "Deploying 15 AI agents to act as competitive marketing departments was mindblowing. We identified weak spots in our competitor's product and launched our real-world campaigns in perfect confidence.",
      initials: "SC",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Devon Carter",
      role: "Co-Founder at LedgerFlow",
      valuation: "Simulated exit: $12M Asset sale",
      quote: "The Investor Intelligence module is a cheat code. The mock VC panel grilled us on unit economics for three simulated days. When we walked into our real Series A meeting, we knew every answer instantly.",
      initials: "DC",
      color: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6 sm:px-8 relative overflow-hidden bg-brand-dark/10">
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Validated by <span className="text-gradient-purple-blue">Real Founders</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            See how founders are leveraging simulation loops to secure funding, scale operations, and bypass failure states.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between relative border border-white/5 hover:border-brand-purple/20 transition-all duration-300 group"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-white/5 pointer-events-none" />
              
              <div>
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-sm leading-relaxed text-zinc-300 italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* Author details */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className={`h-10 w-10 rounded-full bg-gradient-to-tr ${t.color} flex items-center justify-center text-xs font-bold text-white shadow-md`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-purple transition-colors">{t.name}</h4>
                  <p className="text-[11px] text-zinc-400">{t.role}</p>
                  <p className="text-[10px] text-brand-purple font-medium mt-0.5">{t.valuation}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
