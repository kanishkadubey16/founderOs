import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import BoardMeeting from "@/models/BoardMeeting";
import CompanyState from "@/models/CompanyState";
import Event from "@/models/Event";
import Decision from "@/models/Decision";
import Analysis from "@/models/Analysis";
import { runAgentsWorkflow } from "@/lib/agents";

export async function GET(
  request: Request,
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

    let meetings = await BoardMeeting.find({ startupId })
      .sort({ month: -1 })
      .lean();

    // If no board meetings exist yet, let's auto-generate one for the current month
    // (specifically useful for Month 1 right after startup creation)
    if (meetings.length === 0) {
      const companyState = await CompanyState.findOne({ startupId }).lean();
      if (companyState) {
        const currentMonth = companyState.month;
        
        const [analysis, decisions, eventsList] = await Promise.all([
          Analysis.findOne({ startupId }).lean(),
          Decision.find({ startupId }).lean(),
          Event.find({ startupId, month: currentMonth }).lean(),
        ]);

        try {
          const boardAgentsFeedback = await runAgentsWorkflow({
            companyState,
            events: eventsList,
            decisions,
            analysis,
          });

          const newMeeting = await BoardMeeting.create({
            startupId,
            month: currentMonth,
            agents: boardAgentsFeedback,
          });

          meetings = [newMeeting.toObject()];
        } catch (agentError) {
          console.error("Failed to auto-generate Month 1 board meeting:", agentError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      meetings,
    });
  } catch (error: any) {
    console.error("Error fetching board meetings:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
