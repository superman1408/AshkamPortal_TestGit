import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
  presentEmployee: {
    type: String,
  },
  absentEmployee: {
    type: String,
  },
  dailyEvent: {
    type: String,
  },
});

const AttendanceDetail = mongoose.model("AttendanceDetail", attendanceSchema);
export default AttendanceDetail;
