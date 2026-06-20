import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Startup from "@/models/Startup";
import Analysis from "@/models/Analysis";
import { generateStartupAnalysis } from "@/lib/openai";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { startupId, forceRegenerate } = body;

    if (!startupId) {
      return NextResponse.json(
        { success: false, error: "Missing startupId" },
        { status: 400 }
      );
    }

    // Check if startup exists
    const startup = await Startup.findById(startupId);
    if (!startup) {
      return NextResponse.json(
        { success: false, error: "Startup not found" },
        { status: 404 }
      );
    }

    // Check if analysis already exists and we are not forcing regeneration
    if (!forceRegenerate) {
      const existingAnalysis = await Analysis.findOne({ startupId });
      if (existingAnalysis) {
        return NextResponse.json({
          success: true,
          analysis: existingAnalysis,
        });
      }
    }

    // Generate analysis using OpenAI
    const analysisData = await generateStartupAnalysis({
      startupName: startup.startupName,
      industry: startup.industry,
      targetAudience: startup.targetAudience,
      problemStatement: startup.problemStatement,
      businessModel: startup.businessModel,
    });

    // Save to database (upsert)
    const analysis = await Analysis.findOneAndUpdate(
      { startupId },
      {
        startupId,
        overallScore: analysisData.overallScore,
        scorecards: analysisData.scorecards,
        marketAnalysis: analysisData.marketAnalysis,
        personas: analysisData.personas,
        competitors: analysisData.competitors,
        investorNotes: analysisData.investorNotes,
        swot: analysisData.swot,
        fundabilityVerdict: analysisData.fundabilityVerdict,
        fundabilityDescription: analysisData.fundabilityDescription,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error("Error generating startup analysis:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
