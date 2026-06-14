import mongoose from "mongoose";

const StartupSchema = new mongoose.Schema(
  {
    startupName: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    targetAudience: {
      type: String,
      required: true,
    },

    problemStatement: {
      type: String,
      required: true,
    },

    businessModel: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Startup ||
  mongoose.model("Startup", StartupSchema);
