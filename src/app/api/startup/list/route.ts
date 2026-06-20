import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Startup from "@/models/Startup";

export async function GET() {
  try {
    await connectDB();

    // Return all startups sorted newest first
    const startups = await Startup.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({
      success: true,
      startups,
    });
  } catch (error: any) {
    console.error("Error fetching startups:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
