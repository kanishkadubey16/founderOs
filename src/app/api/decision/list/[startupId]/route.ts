import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Decision from "@/models/Decision";

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

    const decisions = await Decision.find({ startupId }).lean();

    return NextResponse.json({
      success: true,
      decisions,
    });
  } catch (error: any) {
    console.error("Error fetching decisions list:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
