"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Bootstrap",
      desc: "Perfect for testing individual concepts and prototypes.",
      price: { monthly: 0, yearly: 0 },
      features: [
        "1 Active Virtual Startup",
        "3 Concurrent AI Agents",
        "Standard Market Simulation",
        "Standard Analytics Dashboard",
        "Community Support",
      ],
      cta: "Start for Free",
      popular: false,
      href: "/signup?plan=bootstrap",
    },
    {
      name: "Founder OS Pro",
      desc: "For serious founders running extensive simulations.",
      price: { monthly: 49, yearly: 39 },
      features: [
        "5 Active Virtual Startups",
        "15 Concurrent AI Agents",
        "Advanced Market Simulation Engine",
        "Investor Intelligence Module",
        "Custom Scenario Event Generator",
        "Priority Support",
      ],
      cta: "Upgrade to Pro",
      popular: true,
      href: "/signup?plan=pro",
    },
    {
      name: "Unicorn Scale",
      desc: "For incubators, studios and high-growth ventures.",
      price: { monthly: 149, yearly: 119 },
      features: [
        "Unlimited Virtual Startups",
        "Unlimited AI Agents",
        "Custom Sandbox Configurations",
        "Dedicated Server Speed Allocations",
        "1-on-1 Strategy Setup",
        "24/7 Priority Hotline",
      ],
      cta: "Talk to Sales",
      popular: false,
      href: "/signup?plan=unicorn",
    },
  ];

  return (
    <section id="pricing" className="py-24 px-6 sm:px-8 relative bg-brand-dark/20 border-t border-white/5">
      {/* Glow background decoration */}
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-80 w-80 rounded-full bg-brand-purple/5 blur-3xl" />
      <div className="absolute top-1/4 left-1/4 -z-10 h-80 w-80 rounded-full bg-brand-blue/5 blur-3xl" />

      <div className="mx-auto max-w-7xl text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Flexible Plans for <span className="text-gradient-purple-blue">Every Stage</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            Pay as you scale. Upgrade, downgrade, or cancel your simulation workspace at any time.
          </p>

          {/* Toggle */}
          <div className="mt-8 flex justify-center">
            <div className="relative flex rounded-full bg-white/5 p-1 border border-white/10">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-all cursor-pointer ${
                  billingCycle === "monthly" ? "bg-gradient-to-r from-brand-purple to-brand-blue" : "hover:text-zinc-300"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`relative rounded-full px-4 py-1.5 text-xs font-semibold text-white transition-all cursor-pointer ${
                  billingCycle === "yearly" ? "bg-gradient-to-r from-brand-purple to-brand-blue" : "hover:text-zinc-300"
                }`}
              >
                Yearly
                <span className="absolute -top-3 -right-6 inline-flex items-center rounded-full bg-brand-blue/20 border border-brand-blue/30 px-1.5 py-0.5 text-[8px] font-bold text-brand-blue">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`glass-card p-8 rounded-2xl flex flex-col justify-between border relative text-left transition-all duration-300 hover:scale-102 ${
                plan.popular
                  ? "border-brand-purple shadow-[0_0_40px_rgba(168,85,247,0.15)] bg-brand-dark/60 md:scale-105"
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-gradient-to-r from-brand-purple to-brand-blue px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider shadow-md shadow-purple-500/20">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6 min-h-[40px]">{plan.desc}</p>
                
                {/* Price Display */}
                <div className="flex items-baseline text-white gap-1 mb-8 border-b border-white/5 pb-6">
                  <span className="text-4xl font-extrabold tracking-tight">
                    ${billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                  </span>
                  <span className="text-sm text-zinc-500 font-semibold">/month</span>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5 text-brand-purple" />
                      </div>
                      <span className="text-sm text-zinc-300 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <Link
                href={plan.href}
                className={`w-full h-11 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-r from-brand-purple to-brand-blue text-white shadow-md shadow-purple-500/20 hover:opacity-95 cursor-pointer"
                    : "bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 cursor-pointer"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
