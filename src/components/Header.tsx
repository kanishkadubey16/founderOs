"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Stats", href: "#stats" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-brand-dark/50 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-6 sm:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Founder<span className="text-brand-purple">OS</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/signin"
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue p-[1px] font-medium text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              <span className="inline-flex h-9 items-center justify-center rounded-[11px] bg-brand-dark px-4 text-sm font-semibold transition-all duration-300 group-hover:bg-transparent">
                Start Building
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-white/5 bg-brand-dark/95 px-6 py-6 backdrop-blur-lg md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/5 my-2" />
              <div className="flex flex-col gap-3">
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-base font-semibold text-white hover:opacity-90 transition-opacity"
                >
                  Start Building
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
