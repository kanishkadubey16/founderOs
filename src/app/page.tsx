import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-dark text-foreground selection:bg-brand-purple selection:text-white">
      {/* Header Sticky Navigation */}
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Features Showcase Section */}
        <Features />

        {/* How It Works (Roadmap timeline) */}
        <HowItWorks />

        {/* Counter Statistics Section */}
        <Stats />

        {/* Founders testimonials grid */}
        <Testimonials />

        {/* Pricing structure card tier grid */}
        <Pricing />
      </main>

      {/* Footer Navigation & newsletter */}
      <Footer />
    </div>
  );
}
