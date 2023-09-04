import mongoose from "mongoose";

const authSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  id: { type: String },
});

const AuthDetails = mongoose.model("AuthDetails", authSchema);
export default AuthDetails;
