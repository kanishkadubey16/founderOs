import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Event from "@/models/Event";
import CompanyState from "@/models/CompanyState";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ startupId: string }> }
) {
  try {
    await connectDB();

    const { startupId } = await params;

    if (!startupId) {
      return NextResponse.json(
        { success: false, error: "startupId is required" },
        { status: 400 }
      );
    }

    // Query events from DB
    let events = await Event.find({ startupId })
      .sort({ month: -1, createdAt: -1 })
      .lean();

    // If no events exist, automatically seed some standard simulation events
    if (events.length === 0) {
      // Find the current month from CompanyState, default to 3 if not found
      const companyState = await CompanyState.findOne({ startupId }).lean();
      const currentMonth = companyState ? companyState.month : 3;

      const seedEvents = [
        {
          startupId,
          month: 1,
          title: "Product Launch in Closed Beta",
          description: "Launched Version 1.0 of the platform to selected beta testers. Feedback is highly positive, highlighting excellent user onboarding.",
          severity: "high",
        },
        {
          startupId,
          month: 2,
          title: "First 100 Active Users Milestone",
          description: "Reached our first 100 active user milestone purely via word-of-mouth referral and community outreach programs.",
          severity: "medium",
        },
        {
          startupId,
          month: 3,
          title: "TechCrunch Mention & Traffic Surge",
          description: "Featured on TechCrunch. User registration increased by 25% within 24 hours, testing server reliability and capacity.",
          severity: "low",
        },
        {
          startupId,
          month: 3,
          title: "Seed Round Closure",
          description: "Successfully secured $1.5M in Seed funding led by Nexus Venture Partners to expand product development and accelerate hiring.",
          severity: "medium",
        },
      ];

      // Filter events to only seed those up to currentMonth
      const filteredSeeds = seedEvents.filter(e => e.month <= currentMonth);

      if (filteredSeeds.length > 0) {
        await Event.insertMany(filteredSeeds);
        // Fetch again after seeding
        events = await Event.find({ startupId })
          .sort({ month: -1, createdAt: -1 })
          .lean();
      }
    }

    return NextResponse.json({
      success: true,
      events,
    });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
