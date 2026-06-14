"use client";

import PlaceholderPage from "@/components/dashboard/PlaceholderPage";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Workspace Settings"
      description="Configure your FounderOS workspace — simulation parameters, AI agent personalities, notification preferences, billing and team management for your operating system."
      icon={Settings}
      accentColor="from-zinc-500 to-slate-600"
      features={["Simulation Config", "Agent Settings", "Billing & Plans", "Notifications", "Team Access"]}
    />
  );
}
