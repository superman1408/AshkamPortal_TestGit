import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema(
  {
    presentEmployee: {
      type: String,
    },
    absentEmployee: {
      type: String,
    },
    dailyevent: {
      type: String,
    },
    logDate: {
      type: [String],
      default: [],
    },
    logIn: {
      type: [String],
      default: [],
    },

    logOut: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const AttendanceDetail = mongoose.model("AttendanceDetail", attendanceSchema);
export default AttendanceDetail;
