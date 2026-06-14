import type { Metadata } from "next";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopNav from "@/components/dashboard/DashboardTopNav";

export const metadata: Metadata = {
  title: "FounderOS - Dashboard",
  description: "Your AI-powered startup operating system dashboard.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050508]">
      {/* Left Sidebar */}
      <DashboardSidebar />

      {/* Main Panel */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        {/* Top Navigation */}
        <DashboardTopNav />

        {/* Scrollable Content Area */}
        <main className="relative flex-1 overflow-y-auto px-6 py-6 lg:px-8 styled-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
