import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import MentorSession from "@/models/MentorSession";
import Startup from "@/models/Startup";
import CompanyState from "@/models/CompanyState";
import Decision from "@/models/Decision";
import Event from "@/models/Event";
import Analysis from "@/models/Analysis";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY || "",
  modelName: "gpt-4o-mini",
  temperature: 0.7,
});

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { sessionId, text } = body;

    if (!sessionId || !text) {
      return NextResponse.json(
        { success: false, error: "sessionId and text are required" },
        { status: 400 }
      );
    }

    // Load Session
    const session = await MentorSession.findById(sessionId);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      );
    }

    const startupId = session.startupId;

    // Fetch related records in parallel for context
    const [startup, companyState, decisions, events, analysis] = await Promise.all([
      Startup.findById(startupId).lean(),
      CompanyState.findOne({ startupId }).lean(),
      Decision.find({ startupId }).sort({ month: 1 }).lean(),
      Event.find({ startupId }).sort({ month: -1 }).limit(10).lean(),
      Analysis.findOne({ startupId }).lean(),
    ]);

    // Build the AI Mentor Prompt
    const systemPrompt = `
You are the CEO's AI Strategic Mentor. Your role is to provide hyper-personalized, actionable, and data-driven strategic advice.
You have access to the startup's current operational state, decisions history, recent events, and investor scorecard.

STARTUP PARAMETERS:
- Name: ${startup?.startupName || "N/A"}
- Industry: ${startup?.industry || "N/A"}
- Target Audience: ${startup?.targetAudience || "N/A"}
- Business Model: ${startup?.businessModel || "N/A"}

CURRENT COMPANY METRICS (Month ${companyState?.month || 1}):
- Cash: $${companyState?.cash?.toLocaleString() || "0"}
- Revenue (MRR): $${companyState?.revenue?.toLocaleString() || "0"}
- Monthly Expenses: $${companyState?.expenses?.toLocaleString() || "0"}
- Active Users: ${companyState?.users?.toLocaleString() || "0"}
- Employees: ${companyState?.employees || "2"}
- Current Valuation: $${companyState?.valuation?.toLocaleString() || "500,000"}
- Retention: ${companyState?.retention || "100"}%
- Churn Rate: ${companyState?.churn || "0"}%
- Market Share: ${companyState?.marketShare || "0"}%

DECISIONS LOGGED:
${JSON.stringify(decisions)}

RECENT EVENTS:
${JSON.stringify(events)}

AI VENTURE ANALYSIS:
${JSON.stringify(analysis)}

USER QUESTION:
"${text}"

Formulate a response answering their question directly.
Format the advice with:
1. "text": The explanation and strategic evaluation. Keep it realistic, direct, and actionable. Refer to specific metrics where appropriate.
2. "recommendations": An array of exactly 3-4 specific tactical recommendations the CEO can take next.

Return strictly in the JSON format:
{
  "text": "Your advice paragraph...",
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
}
`;

    const response = await model.invoke(systemPrompt, {
      response_format: { type: "json_object" },
    });

    let aiOutput;
    try {
      const match = (response.content as string).match(/\{[\s\S]*\}/);
      aiOutput = JSON.parse(match ? match[0] : (response.content as string));
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);
      aiOutput = {
        text: response.content as string,
        recommendations: [
          "Focus on organic user signups and retention metrics.",
          "Keep monitoring expenses to extend operational runway.",
          "Iterate pricing based on feedback from current cohorts.",
        ],
      };
    }

    // Update Session Messages in MongoDB
    session.messages.push({
      sender: "user",
      text,
      createdAt: new Date(),
    });

    session.messages.push({
      sender: "ai",
      text: aiOutput.text,
      recommendations: aiOutput.recommendations,
      createdAt: new Date(),
    });

    // Automatically rename the session if it's the first message and has the default name
    if (session.title === "New Strategic Mentoring Session" && session.messages.length <= 2) {
      // Short title summary
      const titlePrompt = `Based on the user message: "${text}", generate a very short 2-3 word chat session title. Respond strictly with only the title text. No quotes.`;
      const titleRes = await model.invoke(titlePrompt);
      session.title = (titleRes.content as string).trim().replace(/['"]+/g, '');
    }

    await session.save();

    return NextResponse.json({
      success: true,
      session,
    });
  } catch (error: any) {
    console.error("Error in AI mentor chat:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
