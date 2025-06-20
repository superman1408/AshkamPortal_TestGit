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
  recipient2: {
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
    default: [],
  },
  startTime: {
    type: [String],
    require: true,
    default: Date.now,
  },
  endTime: {
    type: [String],
    default: Date.now,
  },
  hoursWorked: { type: [String], default: [] },
  jobCode: { type: [String], default: [] },
  startTime: { type: [String], default: [] },
  endTime: { type: [String], default: [] },

  skill1: {
    type: String,
  },
  skill2: {
    type: String,
  },
  skill3: {
    type: String,
  },
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

  salarySlip: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
});

const AuthDetails = mongoose.model("AuthDetails", authSchema);
export default AuthDetails;
