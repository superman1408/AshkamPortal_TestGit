import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  employeeName: String,
  employeeId: String,
  department: String,
  designation: String,
  contactNumber: String,
  email: String,
  selectedFile: String,
  logIn: {
    type: Date,
    default: Date.now,
  },
  logOut: {
    type: Date,
    default: Date.now,
  },
  recipient: { type: [String], default: [] },
  requiredMessage: { type: [String], default: [] },
  subject: { type: [String], default: [] },
  status: { type: [String], default: [] },
  toDoList: { type: [String], default: [] },
  skillData: { type: [String], default: [] },
});

const PostMessage = mongoose.model("PostMessage", postSchema);
export default PostMessage;
