import mongoose from "mongoose";

const timesheetSchema = mongoose.Schema({
  existingUser: {
    type: [String],
    default: [],
  }, // reference to Projects code for Time Sheet
  projectCode: {
    type: [String],
    default: [],
  }, // reference to Projects code for Time Sheet
  activityCode: {
    type: [String],
    default: [],
  }, // reference to Projects code for Time Sheet
  date: {
    type: [String],
    default: [],
  }, // reference to Projects code for Time Sheet
  netTime: {
    type: [Number],
    default: [],
  }, // reference to Projects code for Time Sheet
  overTime: {
    type: [Number],
    default: [],
  }, // reference to Projects code for Time Sheet
  editIndex: {
    type: [String],
    default: [],
  }, // reference to Projects code for Time Sheet
});

const timesheetDetail = mongoose.model("timesheetDetail", timesheetSchema);
export default timesheetDetail;
