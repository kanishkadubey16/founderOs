import mongoose from "mongoose";

const CompanyStateSchema = new mongoose.Schema(
  {
    startupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Startup",
      required: true,
    },
    month: {
      type: Number,
      default: 1,
    },
    cash: {
      type: Number,
      default: 100000,
    },
    revenue: {
      type: Number,
      default: 0,
    },
    expenses: {
      type: Number,
      default: 0,
    },
    users: {
      type: Number,
      default: 0,
    },
    employees: {
      type: Number,
      default: 2,
    },
    valuation: {
      type: Number,
      default: 500000,
    },
    retention: {
      type: Number,
      default: 100,
    },
    churn: {
      type: Number,
      default: 0,
    },
    marketShare: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CompanyState ||
  mongoose.model("CompanyState", CompanyStateSchema);
