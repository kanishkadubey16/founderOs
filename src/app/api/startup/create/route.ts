import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Startup from "@/models/Startup";
import CompanyState from "@/models/CompanyState";

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

    // Step 1: Create the Startup document
    const startup = await Startup.create({
      startupName,
      industry,
      targetAudience,
      problemStatement,
      businessModel,
    });

    // Step 2: Auto-create a linked CompanyState with default values
    const companyState = await CompanyState.create({
      startupId: startup._id,
      month: 1,
      cash: 100000,
      revenue: 0,
      expenses: 0,
      users: 0,
      employees: 2,
      valuation: 500000,
      retention: 100,
      churn: 0,
      marketShare: 0,
    });

    return NextResponse.json({
      success: true,
      startup,
      companyState,
    });
  } catch (error: any) {
    console.error("Error creating startup:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
