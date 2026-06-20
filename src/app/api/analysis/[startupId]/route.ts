import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Analysis from "@/models/Analysis";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ startupId: string }> }
) {
  try {
    await connectDB();
    const { startupId } = await params;

    if (!startupId) {
      return NextResponse.json(
        { success: false, error: "Missing startupId" },
        { status: 400 }
      );
    }

    const analysis = await Analysis.findOne({ startupId }).lean();

    if (!analysis) {
      return NextResponse.json(
        { success: false, error: "Analysis not found", notFound: true },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error: any) {
    console.error("Error fetching startup analysis:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
