"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, Cpu, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 px-6 sm:px-8">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-brand-purple/20 blur-3xl animate-glow-slow" />
      <div className="absolute top-1/3 right-1/4 -z-10 h-96 w-96 translate-x-1/2 rounded-full bg-brand-blue/20 blur-3xl animate-float-delayed" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 -z-20 bg-grid-pattern opacity-60" />

      <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-brand-purple/30 bg-brand-purple/10 px-4 py-1.5 text-xs font-semibold text-brand-purple mb-6"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Next-Gen AI Operating System</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl max-w-4xl leading-tight"
        >
          Forge the Future of <br className="hidden sm:inline" />
          <span className="text-gradient-purple-blue">Your Startup</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl leading-relaxed"
        >
          FounderOS is an AI-powered startup operating system where founders can create, launch, manage, and grow virtual startups inside a living AI-generated business world.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto"
        >
          <Link
            href="/signup"
            className="w-full sm:w-auto flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue px-8 text-base font-semibold text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-102 cursor-pointer"
          >
            Start Building
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 text-base font-semibold text-zinc-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
          >
            <Play className="h-4 w-4 fill-current" />
            Watch Demo
          </a>
        </motion.div>

        {/* Dashboard Mockup Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 w-full max-w-5xl rounded-2xl p-[1px] bg-gradient-to-b from-white/15 to-transparent shadow-2xl relative"
        >
          <div className="rounded-2xl bg-[#09090c]/90 backdrop-blur-xl border border-white/5 overflow-hidden">
            {/* Header of mockup */}
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-3 bg-white/2">
              <div className="flex gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-zinc-500 font-mono">simulation_world_v1.0.8</span>
              <div className="w-12" />
            </div>

            {/* Inner Dashboard Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 min-h-[350px]">
              {/* Sidebar of mockup */}
              <div className="border-r border-white/5 p-4 flex flex-col gap-4 text-left bg-black/20">
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">ACTIVE AGENTS (3)</span>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-brand-purple">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Agent_Marketing</h4>
                      <p className="text-[10px] text-green-400">Running campaigns...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-brand-blue">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Agent_Financial</h4>
                      <p className="text-[10px] text-blue-400">Optimizing Runway...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-white">Agent_Compliance</h4>
                      <p className="text-[10px] text-zinc-400">Status: Safe</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Panel - Main Simulation Visual */}
              <div className="md:col-span-2 p-6 flex flex-col justify-between text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Live Simulation
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Simulated Startup Valuations</h3>
                  <p className="text-xs text-zinc-400 mb-6">Market responsiveness index over 1000 simulated iterations.</p>
                  
                  {/* Decorative Chart Mockup */}
                  <div className="flex items-end gap-3 h-32 w-full pt-4 border-b border-white/10 pb-1">
                    <div className="w-full bg-gradient-to-t from-brand-purple/20 to-brand-purple h-[30%] rounded-t-sm" />
                    <div className="w-full bg-gradient-to-t from-brand-blue/20 to-brand-blue h-[45%] rounded-t-sm" />
                    <div className="w-full bg-gradient-to-t from-brand-purple/20 to-brand-purple h-[35%] rounded-t-sm" />
                    <div className="w-full bg-gradient-to-t from-brand-blue/20 to-brand-blue h-[60%] rounded-t-sm" />
                    <div className="w-full bg-gradient-to-t from-brand-purple/20 to-brand-purple h-[50%] rounded-t-sm" />
                    <div className="w-full bg-gradient-to-t from-brand-blue/20 to-brand-blue h-[85%] rounded-t-sm" />
                    <div className="w-full bg-gradient-to-t from-brand-purple/20 to-brand-purple h-[75%] rounded-t-sm font-semibold flex items-center justify-center text-[10px] text-white">
                      Peak
                    </div>
                    <div className="w-full bg-gradient-to-t from-brand-blue/20 to-brand-blue h-[95%] rounded-t-sm" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-xs text-zinc-500 mt-4">
                  <span>Valuation: $4.2M (Projected)</span>
                  <span>Exit Probability: 78.4%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
