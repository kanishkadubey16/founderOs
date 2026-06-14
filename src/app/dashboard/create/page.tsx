"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Users, 
  Briefcase, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Rocket
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, title: "Basics", icon: Building2 },
  { id: 2, title: "Audience & Problem", icon: Users },
  { id: 3, title: "Model & Pricing", icon: Briefcase },
  { id: 4, title: "Review", icon: CheckCircle2 },
];

export default function CreateStartupPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    startupName: "",
    industry: "",
    targetAudience: "",
    problemStatement: "",
    businessModel: "SaaS",
    pricingStrategy: "Freemium",
  });

  const updateForm = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/startup/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startupName: formData.startupName,
          industry: formData.industry,
          targetAudience: formData.targetAudience,
          problemStatement: formData.problemStatement,
          businessModel: formData.businessModel,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push("/dashboard/analysis");
        }, 2000);
      } else {
        alert(data.error || "Failed to generate startup. Please try again.");
      }
    } catch (err) {
      console.error("Error generating startup:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const slideVariants: any = {
    hidden: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    }),
  };

  // Direction for animation based on navigating forward or backward
  // For simplicity, we just use a default forward direction for enter
  const direction = 1;

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full rounded-2xl border border-white/10 bg-[#0e0e14]/80 backdrop-blur-sm p-8 shadow-2xl"
        >
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
            <Rocket className="h-10 w-10 text-green-400" />
          </div>
          <h2 className="text-2xl font-black text-white mb-3 tracking-tight">Startup Generated!</h2>
          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            <strong className="text-white">{formData.startupName}</strong> has been successfully instantiated in the FounderOS simulation environment. Your agents are ready.
          </p>
          <Link
            href="/dashboard/analysis"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/25"
          >
            Go to Analysis Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center justify-center gap-3 mb-2">
          <Sparkles className="h-6 w-6 text-purple-400" />
          Startup Creation Wizard
        </h1>
        <p className="text-zinc-400 text-sm">
          Define the core parameters of your new venture.
        </p>
      </div>

      {/* Progress Indicators */}
      <div className="mb-10 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 -translate-y-1/2 z-0 transition-all duration-500 ease-in-out"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        />
        
        <div className="relative z-10 flex justify-between">
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div 
                  className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted || isCurrent 
                      ? "border-purple-500 bg-[#0e0e14] text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]" 
                      : "border-white/10 bg-[#0a0a0f] text-zinc-600"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className={`text-xs font-semibold ${isCurrent ? "text-purple-400" : "text-zinc-500"}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form Area */}
      <div className="rounded-2xl border border-white/5 bg-[#0e0e14]/80 backdrop-blur-sm p-8 shadow-xl min-h-[400px] flex flex-col relative overflow-hidden">
        <div className="flex-1">
          <AnimatePresence mode="wait" custom={direction}>
            {currentStep === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">1. Startup Basics</h2>
                  <p className="text-sm text-zinc-400">Let's start with the name and industry.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Startup Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={formData.startupName}
                      onChange={(e) => updateForm("startupName", e.target.value)}
                      className="w-full h-12 rounded-xl border border-white/10 bg-white/3 px-4 text-sm text-white placeholder-zinc-600 focus:border-purple-500/50 focus:bg-white/5 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Industry</label>
                    <input
                      type="text"
                      placeholder="e.g. Artificial Intelligence, FinTech, E-commerce"
                      value={formData.industry}
                      onChange={(e) => updateForm("industry", e.target.value)}
                      className="w-full h-12 rounded-xl border border-white/10 bg-white/3 px-4 text-sm text-white placeholder-zinc-600 focus:border-purple-500/50 focus:bg-white/5 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">2. Target Audience & Problem</h2>
                  <p className="text-sm text-zinc-400">Who are you building for and what pain do you solve?</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Target Audience</label>
                    <input
                      type="text"
                      placeholder="e.g. Remote software engineering teams"
                      value={formData.targetAudience}
                      onChange={(e) => updateForm("targetAudience", e.target.value)}
                      className="w-full h-12 rounded-xl border border-white/10 bg-white/3 px-4 text-sm text-white placeholder-zinc-600 focus:border-purple-500/50 focus:bg-white/5 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Problem Statement</label>
                    <textarea
                      rows={3}
                      placeholder="Describe the core problem your audience faces..."
                      value={formData.problemStatement}
                      onChange={(e) => updateForm("problemStatement", e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/3 p-4 text-sm text-white placeholder-zinc-600 focus:border-purple-500/50 focus:bg-white/5 focus:outline-none transition-all resize-none"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">3. Business Model & Pricing</h2>
                  <p className="text-sm text-zinc-400">How will your startup generate revenue?</p>
                </div>
                
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Business Model</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["SaaS", "Marketplace", "E-commerce", "API / Usage-based"].map((model) => (
                        <button
                          key={model}
                          onClick={() => updateForm("businessModel", model)}
                          className={`h-12 rounded-xl border flex items-center justify-center text-sm font-semibold transition-all ${
                            formData.businessModel === model 
                              ? "bg-purple-500/10 border-purple-500/50 text-purple-400" 
                              : "bg-white/3 border-white/10 text-zinc-400 hover:bg-white/5"
                          }`}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Pricing Strategy</label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Freemium", "Premium", "Enterprise"].map((pricing) => (
                        <button
                          key={pricing}
                          onClick={() => updateForm("pricingStrategy", pricing)}
                          className={`h-12 rounded-xl border flex items-center justify-center text-sm font-semibold transition-all ${
                            formData.pricingStrategy === pricing 
                              ? "bg-blue-500/10 border-blue-500/50 text-blue-400" 
                              : "bg-white/3 border-white/10 text-zinc-400 hover:bg-white/5"
                          }`}
                        >
                          {pricing}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 4 && (
              <motion.div
                key="step4"
                custom={direction}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">4. Review Summary</h2>
                  <p className="text-sm text-zinc-400">Confirm your parameters before simulation initialization.</p>
                </div>
                
                <div className="bg-white/3 border border-white/5 rounded-xl p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4 border-b border-white/5 pb-4">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Startup Name</span>
                      <span className="text-sm font-semibold text-white">{formData.startupName || "—"}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Industry</span>
                      <span className="text-sm font-semibold text-white">{formData.industry || "—"}</span>
                    </div>
                  </div>
                  
                  <div className="border-b border-white/5 pb-4">
                    <span className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Target Audience</span>
                    <span className="text-sm font-medium text-zinc-300">{formData.targetAudience || "—"}</span>
                  </div>
                  
                  <div className="border-b border-white/5 pb-4">
                    <span className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Problem Statement</span>
                    <span className="text-sm font-medium text-zinc-300 leading-relaxed">{formData.problemStatement || "—"}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Business Model</span>
                      <span className="inline-flex items-center rounded-full bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 text-xs font-bold text-purple-400">
                        {formData.businessModel}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Pricing Strategy</span>
                      <span className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-bold text-blue-400">
                        {formData.pricingStrategy}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1 || isGenerating}
            className={`flex h-11 items-center justify-center gap-2 rounded-xl px-5 font-semibold transition-all ${
              currentStep === 1 
                ? "text-zinc-600 cursor-not-allowed opacity-50" 
                : "text-zinc-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>

          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white text-[#09090c] px-6 font-bold hover:bg-zinc-200 transition-all"
            >
              Next Step <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-8 font-bold text-white hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate Startup
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
