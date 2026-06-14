"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, Github, Twitter, Linkedin, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="border-t border-white/5 bg-brand-dark px-6 py-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue shadow-lg shadow-purple-500/20">
                <Activity className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Founder<span className="text-brand-purple">OS</span>
              </span>
            </Link>
            <p className="text-sm leading-6 text-zinc-400 max-w-sm mb-6">
              The AI-powered startup operating system where founders design, simulate, launch, and grow virtual companies in a living business world.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-brand-purple transition-all duration-300">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-brand-purple transition-all duration-300">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-brand-purple transition-all duration-300">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Simulation Engine</a></li>
              <li><a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">AI Multi-Agents</a></li>
              <li><a href="#pricing" className="text-sm text-zinc-400 hover:text-white transition-colors">Pricing Plans</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">AI Best Practices</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Guides & Tutorials</a></li>
              <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Platform Status</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-sm text-zinc-400 mb-4">
              Get simulated growth tactics and platform updates weekly.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 relative">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
              />
              <button
                type="submit"
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-md shadow-purple-500/20 hover:opacity-95 transition-all shrink-0 cursor-pointer"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-brand-purple mt-2 animate-fade-in-up">
                Successfully subscribed! Keep an eye on your inbox.
              </p>
            )}
          </div>
        </div>

        <hr className="border-white/5 my-12" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} FounderOS Inc. All rights reserved. Forge your future.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Security Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
