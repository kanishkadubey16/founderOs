import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
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

    const companyState = await CompanyState.findOne({ startupId })
      .populate("startupId")
      .lean();

    if (!companyState) {
      return NextResponse.json(
        { success: false, error: "Company state not found for this startup" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      companyState,
    });
  } catch (error: any) {
    console.error("Error fetching company state:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
