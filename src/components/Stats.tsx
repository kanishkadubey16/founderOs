"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Building2, Bot, Sliders } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  targetValue: number;
  suffix: string;
  duration?: number;
}

function AnimatedCounter({ icon, label, targetValue, suffix, duration = 2000 }: StatItemProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = targetValue;
    const increment = end / (duration / 16); // ~60fps
    let timer: number;

    const run = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
        cancelAnimationFrame(timer);
      } else {
        setCount(Math.floor(start));
        timer = requestAnimationFrame(run);
      }
    };

    timer = requestAnimationFrame(run);
    return () => cancelAnimationFrame(timer);
  }, [isInView, targetValue, duration]);

  // Format numbers nicely with commas if large
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div
      ref={elementRef}
      className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden group border border-white/5 hover:border-brand-purple/20 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-purple/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-purple mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
        {formatNumber(count)}
        {suffix}
      </span>
      <span className="text-sm font-semibold text-zinc-400 mt-2">{label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section id="stats" className="py-24 px-6 sm:px-8 bg-brand-dark/30 relative border-y border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedCounter
            icon={<Users className="h-5 w-5" />}
            label="Virtual Customers Simulated"
            targetValue={14800000}
            suffix="+"
          />
          <AnimatedCounter
            icon={<Building2 className="h-5 w-5" />}
            label="Simulated Companies Created"
            targetValue={124500}
            suffix="+"
          />
          <AnimatedCounter
            icon={<Bot className="h-5 w-5" />}
            label="Active AI Agents Deployed"
            targetValue={890000}
            suffix="+"
          />
          <AnimatedCounter
            icon={<Sliders className="h-5 w-5" />}
            label="Business Scenarios Tested"
            targetValue={48}
            suffix="B+"
            duration={2500}
          />
        </div>
      </div>
    </section>
  );
}
