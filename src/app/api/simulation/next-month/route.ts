import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import CompanyState from "@/models/CompanyState";
import Event from "@/models/Event";

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { startupId } = body;

    if (!startupId) {
      return NextResponse.json(
        { success: false, error: "startupId is required" },
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

    const previousMonth = companyState.month;
    const nextMonth = previousMonth + 1;

    // Advance month
    companyState.month = nextMonth;

    // Calculate:
    // Revenue: users * 10
    const newRevenue = companyState.users * 10;
    // Expenses: employees * 4000
    const newExpenses = companyState.employees * 4000;
    // Profit: revenue - expenses
    const profit = newRevenue - newExpenses;

    // Save previous cash and users for event logic
    const oldUsers = companyState.users;
    const oldRevenue = companyState.revenue;

    // Update state fields
    companyState.revenue = newRevenue;
    companyState.expenses = newExpenses;
    companyState.cash += profit;

    // Simple default users growth if no decisions were executed, just to simulate active growth:
    // E.g. let's increase users by 10% or at least 100 users, to make the simulation feel alive.
    // If they have 0 users (like in month 1), let's set it to 150.
    if (companyState.users === 0) {
      companyState.users = 150;
    } else {
      companyState.users = Math.floor(companyState.users * 1.15) + 50;
    }

    // Also slowly increase market share and valuation if they make a profit
    if (profit > 0) {
      companyState.marketShare = Math.min(100, Number((companyState.marketShare + 0.2).toFixed(1)));
      companyState.valuation += Math.floor(profit * 2);
    }

    // Save company state changes
    await companyState.save();

    // Generate simple events
    const generatedEvents = [];

    // Event 1: New users joined
    if (companyState.users > oldUsers) {
      const addedUsers = companyState.users - oldUsers;
      generatedEvents.push({
        startupId,
        month: nextMonth,
        title: "New users joined",
        description: `Your active user base grew by ${addedUsers} new sign-ups this month. User sentiment remains high.`,
        severity: "low",
      });
    }

    // Event 2: Revenue increased
    if (companyState.revenue > oldRevenue) {
      const addedRevenue = companyState.revenue - oldRevenue;
      generatedEvents.push({
        startupId,
        month: nextMonth,
        title: "Revenue increased",
        description: `Monthly Recurring Revenue expanded by +$${addedRevenue.toLocaleString()}, driven by active user base growth.`,
        severity: "low",
      });
    }

    // Event 3: Growth slowed / Burn alert
    if (profit < 0) {
      generatedEvents.push({
        startupId,
        month: nextMonth,
        title: "Growth slowed & Cash Burn",
        description: `Operation expenses exceed revenue, resulting in a monthly cash burn of -$${Math.abs(profit).toLocaleString()}. Plan capital injection.`,
        severity: "high",
      });
    } else {
      generatedEvents.push({
        startupId,
        month: nextMonth,
        title: "Profitable Operations",
        description: `Operational profit reached +$${profit.toLocaleString()} for Month ${nextMonth}, extending your capital runway.`,
        severity: "low",
      });
    }

    // Save generated events to MongoDB
    if (generatedEvents.length > 0) {
      await Event.insertMany(generatedEvents);
    }

    // Query events for this month again to get them from database
    const eventsList = await Event.find({ startupId, month: nextMonth }).lean();

    return NextResponse.json({
      success: true,
      companyState,
      events: eventsList,
    });
  } catch (error: any) {
    console.error("Error in simulation next-month:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
