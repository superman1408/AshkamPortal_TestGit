import mongoose from "mongoose";

const authSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    maritalStatus: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    activeStatus: {
      type: String,
      required: false,
      enum: ["Active", "Resigned"],
      default: "Active",
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
  },
  {
    timestamps: true,
  },
);

const AuthDetails = mongoose.model("AuthDetails", authSchema);
export default AuthDetails;
