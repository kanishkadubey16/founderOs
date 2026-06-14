"use client";

import { motion } from "framer-motion";
import { PlusCircle, Search, Rocket, MessageSquare, Award } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Create Startup",
      desc: "Input your core idea. FounderOS generates your initial tech stack proposal, legal entity form, and initial team roles.",
      icon: <PlusCircle className="h-6 w-6 text-brand-purple" />,
    },
    {
      num: "02",
      title: "Analyze Market",
      desc: "Release research bots into the simulated customer database. Map out competitors, pricing tables, and ideal client personas.",
      icon: <Search className="h-6 w-6 text-brand-blue" />,
    },
    {
      num: "03",
      title: "Launch Company",
      desc: "Open your digital doors. Watch AI agents spin up landing pages, target key segments, and initiate primary outreach loops.",
      icon: <Rocket className="h-6 w-6 text-brand-purple" />,
    },
    {
      num: "04",
      title: "Make Decisions",
      desc: "Receive random economic events, customer feedback issues, or funding offers. Direct your agents to pivot or expand.",
      icon: <MessageSquare className="h-6 w-6 text-brand-blue" />,
    },
    {
      num: "05",
      title: "Scale, Pivot, or Exit",
      desc: "Expand your market share. Prepare your virtual records and financial boards for an acquisition, public merger, or IPO.",
      icon: <Award className="h-6 w-6 text-brand-purple" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-6 sm:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-blue/5 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            From Blueprint to <span className="text-gradient-purple-blue">Exit Simulation</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            A step-by-step operating system designed to run scenarios before you deploy real capital.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical/Horizontal connection line */}
          <div className="absolute left-[35px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-brand-purple/50 via-brand-blue/50 to-brand-purple/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-12 relative">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7 }}
                  className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-8 ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Panel */}
                  <div className="w-full md:w-[45%] text-left">
                    <div className="glass-card p-6 rounded-2xl border border-white/5 hover:border-brand-purple/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-black text-brand-purple/40">{step.num}</span>
                        <h3 className="text-lg font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center Node icon */}
                  <div className="hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark border-2 border-brand-purple/50 shadow-[0_0_15px_rgba(168,85,247,0.2)] z-10">
                    {step.icon}
                  </div>

                  {/* Empty Spacer */}
                  <div className="hidden md:block w-[45%]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
