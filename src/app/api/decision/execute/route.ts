import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CompanyState from "@/models/CompanyState";
import Decision from "@/models/Decision";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { startupId, decisionId } = body;

    if (!startupId || !decisionId) {
      return NextResponse.json(
        { success: false, error: "startupId and decisionId are required" },
        { status: 400 }
      );
    }

    // Read current CompanyState
    const companyState = await CompanyState.findOne({ startupId });
    if (!companyState) {
      return NextResponse.json(
        { success: false, error: "CompanyState not found for this startup" },
        { status: 404 }
      );
    }

    // Check if the decision was already executed to prevent double execution if needed
    // However, the dashboard decisions are categorized by id. Let's see if we should prevent executing the same decision twice.
    const alreadyExecuted = await Decision.findOne({ startupId, title: decisionId, month: companyState.month });
    if (alreadyExecuted) {
      return NextResponse.json(
        { success: false, error: "This decision has already been executed in the current month." },
        { status: 400 }
      );
    }

    let title = "";
    let category = "";
    let cost = 0;
    let impact = "";

    // Apply decision logic
    switch (decisionId) {
      case "hire-eng":
      case "Hire Engineer":
        title = "Hire Engineer";
        category = "Hiring";
        cost = 7000;
        impact = "cash -= 7000, employees += 1";
        companyState.cash -= 7000;
        companyState.employees += 1;
        break;

      case "hire-pm":
        title = "Hire Product Manager";
        category = "Hiring";
        cost = 11500;
        impact = "cash -= 11500, employees += 1, users += 250";
        companyState.cash -= 11500;
        companyState.employees += 1;
        companyState.users += 250;
        break;

      case "hire-mktg":
        title = "Hire Marketing Specialist";
        category = "Hiring";
        cost = 8000;
        impact = "cash -= 8000, employees += 1, users += 850";
        companyState.cash -= 8000;
        companyState.employees += 1;
        companyState.users += 850;
        break;

      case "mktg-social":
      case "Marketing Campaign":
        title = "Marketing Campaign";
        category = "Marketing";
        cost = 3000;
        impact = "cash -= 3000, users += 500";
        companyState.cash -= 3000;
        companyState.users += 500;
        break;

      case "mktg-influencer":
        title = "Influencer Partnership";
        category = "Marketing";
        cost = 25000;
        impact = "cash -= 25000, users += 4500";
        companyState.cash -= 25000;
        companyState.users += 4500;
        break;

      case "mktg-referral":
        title = "Launch Referral Program";
        category = "Marketing";
        cost = 0;
        impact = "users += 800";
        companyState.users += 800;
        break;

      case "prod-feature":
        title = "Launch Analytics Dashboard";
        category = "Product";
        cost = 0;
        impact = "users += 150";
        companyState.users += 150;
        break;

      case "prod-ui":
        title = "Major UI/UX Overhaul";
        category = "Product";
        cost = 5000;
        impact = "cash -= 5000, users += 400";
        companyState.cash -= 5000;
        companyState.users += 400;
        break;

      case "prod-ai":
        title = "Build AI Co-pilot Assistant";
        category = "Product";
        cost = 20000;
        impact = "cash -= 20000, users += 2200";
        companyState.cash -= 20000;
        companyState.users += 2200;
        break;

      case "fund-seed":
      case "Raise Seed Funding":
        title = "Raise Seed Funding";
        category = "Funding";
        cost = 0;
        impact = "cash += 250000, valuation += 500000";
        companyState.cash += 250000;
        companyState.valuation += 500000;
        break;

      case "fund-angel":
        title = "Raise Angel Round";
        category = "Funding";
        cost = 0;
        impact = "cash += 500000, valuation += 1000000";
        companyState.cash += 500000;
        companyState.valuation += 1000000;
        break;

      case "fund-bootstrap":
        title = "Commit to Bootstrapping";
        category = "Funding";
        cost = 0;
        impact = "users -= 200";
        companyState.users = Math.max(0, companyState.users - 200);
        break;

      case "exp-market":
        title = "Expand to European Market";
        category = "Expansion";
        cost = 45000;
        impact = "cash -= 45000, users += 3500";
        companyState.cash -= 45000;
        companyState.users += 3500;
        break;

      case "exp-segment":
        title = "Target Enterprise Segment";
        category = "Expansion";
        cost = 30000;
        impact = "cash -= 30000, users += 50";
        companyState.cash -= 30000;
        companyState.users += 50;
        break;

      default:
        return NextResponse.json(
          { success: false, error: `Invalid or unsupported decisionId: ${decisionId}` },
          { status: 400 }
        );
    }

    // Save decision history log
    await Decision.create({
      startupId,
      title,
      category,
      cost,
      impact,
      month: companyState.month,
    });

    // Save updated CompanyState
    await companyState.save();

    return NextResponse.json({
      success: true,
      companyState,
    });
  } catch (error: any) {
    console.error("Error executing decision:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
