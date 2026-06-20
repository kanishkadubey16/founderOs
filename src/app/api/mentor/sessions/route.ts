import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import MentorSession from "@/models/MentorSession";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const startupId = searchParams.get("startupId");

    if (!startupId) {
      return NextResponse.json(
        { success: false, error: "startupId is required" },
        { status: 400 }
      );
    }

    const sessions = await MentorSession.find({ startupId })
      .sort({ updatedAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      sessions,
    });
  } catch (error: any) {
    console.error("Error listing mentor sessions:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { startupId, title } = body;

    if (!startupId) {
      return NextResponse.json(
        { success: false, error: "startupId is required" },
        { status: 400 }
      );
    }

    const session = await MentorSession.create({
      startupId,
      title: title || "New Strategic Mentoring Session",
      messages: [],
    });

    return NextResponse.json({
      success: true,
      session,
    });
  } catch (error: any) {
    console.error("Error creating mentor session:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
