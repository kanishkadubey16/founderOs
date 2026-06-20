import mongoose from "mongoose";

const MentorSessionSchema = new mongoose.Schema(
  {
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "New Strategic Mentoring Session",
    },
    messages: [
      {
        sender: {
          type: String,
          enum: ["user", "ai"],
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        recommendations: [
          {
            type: String,
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.MentorSession ||
  mongoose.model("MentorSession", MentorSessionSchema);
