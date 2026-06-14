"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LucideIcon, Sparkles } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  accentColor?: string;
  features?: string[];
}

export default function PlaceholderPage({
  title,
  description,
  icon: Icon,
  accentColor = "from-purple-500 to-blue-500",
  features = [],
}: PlaceholderPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full"
      >
        {/* Icon */}
        <div className={`mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br ${accentColor} flex items-center justify-center shadow-2xl`}>
          <Icon className="h-8 w-8 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-black text-white mb-3">{title}</h1>
        <p className="text-sm text-zinc-400 leading-relaxed mb-6">{description}</p>

        {/* Feature Pills */}
        {features.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {features.map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-300"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-zinc-200 hover:bg-white/8 transition-all"
          >
            ← Back to Dashboard
          </Link>
          <button className={`inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${accentColor} px-5 text-sm font-semibold text-white hover:opacity-90 transition-all shadow-md`}>
            <Sparkles className="h-4 w-4" />
            Coming Soon
          </button>
        </div>
      </motion.div>
    </div>
  );
}
