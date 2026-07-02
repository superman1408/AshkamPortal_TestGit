import mongoose from "mongoose";

const attendanceUploadSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, index: true, unique: true },
  dates: [{ type: Date, required: true }],
  inTimes: [{ type: String }],
  outTimes: [{ type: String }],
  statuses: [
    {
      type: String,
      enum: ["Present", "Absent", "Leave", "Half Day"],
      default: "Present",
    },
  ],
  uploadedBy: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

const Attendance = mongoose.model("Attendance", attendanceUploadSchema);
export default Attendance;
