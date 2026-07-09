import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    // ==========================
    // Basic Information
    // ==========================

    projectNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    clientName: {
      type: String,
      trim: true,
    },

    startDate: Date,

    endDate: Date,

    projectType: {
      type: String,
      enum: ["Engineering", "Pipeline", "Offshore", "FEED", "PMC", "EPC"],
      default: "Engineering",
    },

    description: {
      type: String,
      default: "",
    },

    // ==========================
    // Engineering Disciplines
    // ==========================

    disciplines: [
      {
        type: String,
      },
    ],

    // ==========================
    // Team
    // ==========================

    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    projectMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],

    // ==========================
    // Status
    // ==========================

    // status: {
    //   type: String,
    //   enum: ["Planning", "Active", "On Hold", "Completed", "Cancelled"],
    //   default: "Planning",
    // },

    // progress: {
    //   type: Number,
    //   default: 0,
    //   min: 0,
    //   max: 100,
    // },

    // ==========================
    // Metadata
    // ==========================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  {
    timestamps: true,
  },
);

const projectDetail = mongoose.model("projectDetail", ProjectSchema);
export default projectDetail;
