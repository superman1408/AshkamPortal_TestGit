import mongoose from "mongoose";

const authSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  dob: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  maritalStatus: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  contactNumber: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  confirmPassword: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  employeeId: {
    type: String,
  },
  department: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  jobSkills: {
    type: String,
  },
  reportingManager: {
    type: String,
  },
  streetAddress: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  selectedFile: {
    type: String,
  },
  emergencyName: {
    type: String,
  },
  emergencyContact: {
    type: String,
  },
  relationship: {
    type: String,
  },
  emergencyAddress: {
    type: String,
  },
  recipient: {
    type: [String],
  },
  requiredMessage: {
    type: [String],
  },
  subject: {
    type: [String],
  },
  status: {
    type: [String],
    default: [],
  },
  toDoList: {
    type: [String],
    default: [],
  },
  jobCode: {
    type: [String],
    require: true,
    default: []
  },
  startTime: {
    type: [String],
    require: true,
    default: Date.now
  },
  endTime: {
    type: [String],
    default: Date.now
  },
  hoursWorked: { type: [String], default: [] },
  jobCode: { type: [String], default: [] },
  startTime: { type: [String], default: [] },
  endTime: { type: [String], default: [] },
});

const AuthDetails = mongoose.model("AuthDetails", authSchema);
export default AuthDetails;
