import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Startup from "@/models/Startup";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { startupName, industry, targetAudience, problemStatement, businessModel } = body;

    // Validate required fields
    if (!startupName || !industry || !targetAudience || !problemStatement || !businessModel) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const startup = await Startup.create({
      startupName,
      industry,
      targetAudience,
      problemStatement,
      businessModel,
    });

    return NextResponse.json({
      success: true,
      startup,
    });
  } catch (error: any) {
    console.error("Error creating startup:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
