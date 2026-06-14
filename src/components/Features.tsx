"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Map, 
  Network, 
  Cpu, 
  Users, 
  BarChart3 
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className="glass-card-interactive p-6 rounded-2xl flex flex-col gap-4 text-left"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-purple group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const features = [
    {
      icon: <CheckCircle2 className="h-6 w-6 text-brand-purple" />,
      title: "Startup Validation",
      description: "Instantly stress-test your business concept against millions of historical market points and consumer profiles generated dynamically by our AI engines.",
      delay: 0.1,
    },
    {
      icon: <Map className="h-6 w-6 text-brand-blue" />,
      title: "Business Blueprint Generation",
      description: "Receive complete strategic execution maps, architectural blueprints, standard operating procedures, and product roadmaps initialized in seconds.",
      delay: 0.2,
    },
    {
      icon: <Network className="h-6 w-6 text-brand-purple" />,
      title: "AI Multi-Agent System",
      description: "Deploy dedicated virtual workers (Marketing, Devs, Finance, Legal) who coordinate seamlessly inside a private channel to solve business challenges.",
      delay: 0.3,
    },
    {
      icon: <Cpu className="h-6 w-6 text-brand-blue" />,
      title: "Startup Simulation Engine",
      description: "Run your virtual startup through years of simulated business environments. Experience competitive pivots, market crashes, and growth phases.",
      delay: 0.4,
    },
    {
      icon: <Users className="h-6 w-6 text-brand-purple" />,
      title: "Investor Intelligence",
      description: "Simulate pitch meetings with mock AI VC panels. Refine your narrative, slide deck arguments, and valuation formulas with real-time feedback.",
      delay: 0.5,
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-brand-blue" />,
      title: "Analytics Dashboard",
      description: "Track simulated churn rates, customer acquisition costs, net revenue runway, and brand sentiment in a unified premium command center.",
      delay: 0.6,
    },
  ];

  return (
    <section id="features" className="py-24 px-6 sm:px-8 relative bg-brand-dark/20">
      <div className="mx-auto max-w-7xl text-center">
        {/* Section header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Engineered for <span className="text-gradient-purple-blue">Exponential Growth</span>
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            Stop guessing your product-market fit. Use a highly analytical AI-generated economy to prototype decisions, structure processes, and stress-test your roadmap.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
