import mongoose from "mongoose";

const BoardMeetingSchema = new mongoose.Schema(
  {
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    agents: [
      {
        agentId: {
          type: String, // "customer" | "investor" | "competitor" | "employee" | "mentor"
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        observation: {
          type: String,
          required: true,
        },
        risk: {
          type: String,
          required: true,
        },
        opportunity: {
          type: String,
          required: true,
        },
        recommendation: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Unique board meeting per startup per month
BoardMeetingSchema.index({ startupId: 1, month: 1 }, { unique: true });

export default mongoose.models.BoardMeeting ||
  mongoose.model("BoardMeeting", BoardMeetingSchema);
