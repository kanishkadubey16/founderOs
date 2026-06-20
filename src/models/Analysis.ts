import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema(
  {
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
      unique: true,
    },
    overallScore: {
      type: Number,
      required: true,
    },
    scorecards: [
      {
        name: { type: String, required: true },
        score: { type: Number, required: true },
      },
    ],
    marketAnalysis: {
      tam: { type: String, required: true },
      sam: { type: String, required: true },
      som: { type: String, required: true },
    },
    personas: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        painPoint: { type: String, required: true },
        budget: { type: String, required: true },
        acquisition: { type: String, required: true },
      },
    ],
    competitors: [
      {
        name: { type: String, required: true },
        threat: { type: String, required: true },
        pricing: { type: String, required: true },
        UX: { type: String, required: true },
        featureParity: { type: String, required: true },
      },
    ],
    investorNotes: [
      {
        title: { type: String, required: true },
        status: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
    swot: {
      strengths: [{ type: String, required: true }],
      weaknesses: [{ type: String, required: true }],
      opportunities: [{ type: String, required: true }],
      threats: [{ type: String, required: true }],
    },
    fundabilityVerdict: {
      type: String,
      required: true,
    },
    fundabilityDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Analysis ||
  mongoose.model("Analysis", AnalysisSchema);
