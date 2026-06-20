import mongoose from "mongoose";

const DecisionSchema = new mongoose.Schema(
  {
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    impact: {
      type: String,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Decision || mongoose.model("Decision", DecisionSchema);
