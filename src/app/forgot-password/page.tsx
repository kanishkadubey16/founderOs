"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-brand-dark overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-80 w-80 rounded-full bg-brand-purple/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-brand-blue/10 blur-3xl" />
      <div className="absolute inset-0 -z-20 bg-grid-pattern opacity-30" />

      {/* Back button */}
      <Link
        href="/signin"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Sign In
      </Link>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2 group mb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-purple to-brand-blue shadow-lg shadow-purple-500/20">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Founder<span className="text-brand-purple">OS</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-white text-center">Reset Password</h2>
          <p className="text-sm text-zinc-400 mt-1">We'll email you instructions to reset your password.</p>
        </div>

        {/* Glass Box */}
        <div className="glass-card p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          {error && (
            <div className="mb-4 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-xs font-medium text-red-400 animate-fade-in-up">
              {error}
            </div>
          )}

          {!submitted ? (
            <form onSubmit={handleReset} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  disabled={loading}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-sm font-semibold text-white shadow-md shadow-purple-500/20 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending instructions...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 animate-fade-in-up">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple mb-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Check Your Inbox</h3>
              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                We have sent secure reset instructions to <span className="text-white font-semibold">{email}</span> if it is registered in our database.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-brand-purple hover:underline"
              >
                Did not receive the email? Try again
              </button>
            </div>
          )}
        </div>

        {/* Redirect */}
        <p className="text-center text-sm text-zinc-400 mt-6">
          Remember your credentials?{" "}
          <Link href="/signin" className="text-brand-purple hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
