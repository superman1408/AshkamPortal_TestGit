import mongoose from "mongoose";

const leaveSchema = mongoose.Schema({
  recipient: {
    type: [String],
  },

  recipient2: {
    type: [String],
  },

  requiredMessage: {
    type: [String],
  },

  subject: {
    type: [String],
  },

  CL: {
    type: String,
  },

  SL: {
    type: String,
  },

  PL: {
    type: String,
  },

  FL: {
    type: String,
  },

  Coff: {
    type: String,
  },

  Coff: {
    type: String,
  },

  presentStatus: {
    type: String,
  },
});

const LeaveDetail = mongoose.model("LeaveDetail", leaveSchema);
export default AttendanceDetail;
