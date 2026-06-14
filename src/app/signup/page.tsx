"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Activity, Github, Chrome, ArrowLeft, Loader2 } from "lucide-react";

export default function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Form validations
    if (name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms of Service.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Success - redirect to dashboard
      router.push("/dashboard");
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
        href="/"
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
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
          <h2 className="text-2xl font-bold text-white text-center">Forge Your Workspace</h2>
          <p className="text-sm text-zinc-400 mt-1">Initialize your FounderOS engine and start building.</p>
        </div>

        {/* Glass Box */}
        <div className="glass-card p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          {error && (
            <div className="mb-4 p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-xs font-medium text-red-400 animate-fade-in-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                required
                disabled={loading}
                placeholder="Alex Mercer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={loading}
                placeholder="alex@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                disabled={loading}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all disabled:opacity-50"
              />
            </div>

            {/* Checkbox */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agree"
                  type="checkbox"
                  disabled={loading}
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="h-4 w-4 rounded border-white/10 bg-white/5 text-brand-purple focus:ring-brand-purple focus:ring-offset-brand-dark cursor-pointer"
                />
              </div>
              <label htmlFor="agree" className="ml-3 text-xs text-zinc-400 leading-normal">
                I agree to the{" "}
                <a href="#" className="text-brand-purple hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-brand-purple hover:underline">
                  Privacy Policy
                </a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 flex items-center justify-center rounded-xl bg-gradient-to-r from-brand-purple to-brand-blue text-sm font-semibold text-white shadow-md shadow-purple-500/20 hover:opacity-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-brand-dark/10 backdrop-blur-sm px-2 text-zinc-500">Or sign up with</span>
            </div>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => { setLoading(false); router.push("/dashboard"); }, 1000);
              }}
              disabled={loading}
              className="h-10 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <Chrome className="h-4 w-4" />
              Google
            </button>
            <button
              onClick={() => {
                setLoading(true);
                setTimeout(() => { setLoading(false); router.push("/"); }, 1000);
              }}
              disabled={loading}
              className="h-10 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-sm text-zinc-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </button>
          </div>
        </div>

        {/* Redirect */}
        <p className="text-center text-sm text-zinc-400 mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-brand-purple hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
