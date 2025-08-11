import mongoose from "mongoose";
import multer from "multer";
import fs from "fs";

import AuthenticateUser from "../model/authDetails.js";

import UserAttendance from "../model/attendanceDetail.js";

import EventDetail from "../model/eventDetail.js";

import PaySlipModel from "../model/payslip.js";

// ....................Multer Storage.apply.......................
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// ________________________get operation___________________________

export const getPosts = async (req, res) => {
  try {
    const postMessage = await AuthenticateUser.find({});
    // console.log(postMessage);
    res.status(200).json(postMessage);
    // console.log("postMessage", postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// export const getPosts = async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;

//   try {
//     const startIndex = (Number(page) - 1) * Number(limit);

//     const postMessage = await AuthenticateUser.find()
//       .limit(Number(limit))
//       .skip(startIndex);

//     res.status(200).json(postMessage); // 👈 returning array only!
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const postMessage = await AuthenticateUser.findById(id);
    res.status(200).json(postMessage);
  } catch (error) {
    console.log(error);
  }
};

// ________________________create operation___________________________

export const createPost = async (req, res) => {
  const Post = req.body;
  const newPost = new AuthenticateUser(Post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// ________________________update operation___________________________

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("no post with that id found");

  const updatedPost = await AuthenticateUser.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

// ________________________delete operation___________________________

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id found");

  await AuthenticateUser.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

// __________________________________________________________________________________

export const sendData = async (req, res) => {
  const { id } = req.params;
  const value = req.body;
  // console.log("value", value);
  // console.log(id);

  const post = await AuthenticateUser.findById(id);
  post.recipient.push(value.recipient);
  post.recipient2.push(value.recipient2);
  post.requiredMessage.push(value.requiredMessage);
  post.subject.push(value.subject);
  // console.log(value.recipient);

  const updatePost = await AuthenticateUser.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatePost);
};

export const updatedStatus = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const value = req.body;
  // console.log(value);

  const post = await AuthenticateUser.findById(id);

  post.status.push(value.status);

  const statusUpdate = await AuthenticateUser.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(statusUpdate);
};

// _________________________To Do List Status_____________________________
export const todoList = async (req, res) => {
  const { id } = req.params;
  const value = req.body;

  const user = await AuthenticateUser.findById(id);

  try {
    user.projectCode.push(value.projectCode);
    user.activityCode.push(value.activityCode);
    user.date.push(value.date);
    user.netTime.push(value.netTime);
    user.overTime.push(value.overTime);

    const updatedPost = await AuthenticateUser.findByIdAndUpdate(id, user, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// _________________________Skill Data Status_____________________________
export const skillData = async (req, res) => {
  const { id } = req.params;
  const value = req.body;
  console.log(value);

  const user = await AuthenticateUser.findById(id);
  console.log("user");

  try {
    user.skill1.push(value.formData.skill1);
    user.skill2.push(value.formData.skill2);
    user.skill3.push(value.formData.skill3);

    const updatedPost = await AuthenticateUser.findByIdAndUpdate(id, user, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editTable = async (req, res) => {
  const id = req.params.id;
  const indexNumber = parseInt(req.params.indexed);
  const valueToEdit = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Invalid User ID!");

    const post = await AuthenticateUser.findById(id);
    if (!post) return res.status(404).send("No User Found");

    post.projectCode.splice(indexNumber, 1, valueToEdit.projectCode);
    post.activityCode.splice(indexNumber, 1, valueToEdit.activityCode);
    post.date.splice(indexNumber, 1, valueToEdit.date);
    post.netTime.splice(indexNumber, 1, valueToEdit.netTime);
    post.overTime.splice(indexNumber, 1, valueToEdit.overTime);

    await post.save();

    res.status(200).json({ message: "Item Edited successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTable = async (req, res) => {
  const indexNumber = parseInt(req.params.indexed);
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("no post with that id found");

    const post = await AuthenticateUser.findById(id);

    if (!post) return res.status(404).send("No User Found");

    post.projectCode.splice(indexNumber, 1);
    post.activityCode.splice(indexNumber, 1);
    post.date.splice(indexNumber, 1);
    post.netTime.splice(indexNumber, 1);
    post.overTime.splice(indexNumber, 1);

    await post.save();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// _________________________Attendancev Data Status_____________________________
export const dailyAttendance = async (req, res) => {
  const Post = req.body;
  const newPost = new UserAttendance(Post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const dailyEvent = async (req, res) => {
  const Post = req.body;
  const newPost = new EventDetail(Post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getAllevents = async (req, res) => {
  // console.log("getting all");
  try {
    const event = await EventDetail.find({});
    if (!event) return res.status(404).json({ message: "No events found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// -------------------get operation------------------
export const getAttendancePosts = async (req, res) => {
  try {
    const postMessage = await UserAttendance.find({});
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//------------------Update Operation --------------------------
export const updateAttendance = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("no post with that id found");

  const updateAttendance = await UserAttendance.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updateAttendance);
};

// ________________________delete operation___________________________

export const deleteAttendance = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with that id found");

  await UserAttendance.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

// _________________________log List Status_____________________________
export const logList = async (req, res) => {
  const { id } = req.params;
  const value = req.body;

  try {
    const user = await AuthenticateUser.findById(id);

    user.logDate.push(value.logDate);
    user.logIn.push(value.logIn);
    user.logOut.push(value.logOut);

    const updatedPost = await AuthenticateUser.findByIdAndUpdate(id, user, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const salarySlipData = async (req, res) => {
  try {
    const { title } = req.body; // Extract the title from the request body
    const pdfFile = req.file; // Extract the uploaded PDF file
    const identify = req.params.id;

    if (!pdfFile) {
      return res.status(400).json({ message: "No PDF file uploaded" });
    }

    // Read the PDF file from disk
    const pdfBuffer = fs.readFileSync(pdfFile.path);

    // Create a new PaySlip document with the title, PDF file buffer, and identify
    const newPaySlip = new PaySlipModel({
      title: title,
      pdf: pdfBuffer, // Store the PDF file buffer
      identify: identify,
    });

    // Save the document to MongoDB
    await newPaySlip.save();

    // Delete the temporary file
    fs.unlinkSync(pdfFile.path);

    res.status(200).json({ message: "All running" });
  } catch (error) {
    // Delete the temporary file
    fs.unlinkSync(pdfFile.path);
    res.status(500).json({ message: error });
  }
};

export const getSalary = async (req, res) => {
  try {
    const slipData = await PaySlipModel.find({});

    res.status(200).json(slipData);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const leaveList = async (req, res) => {
  const { id } = req.params;
  const value = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Invalid User ID!");

    const user = await AuthenticateUser.findById(id);

    user.CL = value.CL;
    user.SL = value.SL;
    user.PL = value.PL;
    user.FL = value.FL;
    user.Coff = value.Coff;

    const updatedPost = await AuthenticateUser.findByIdAndUpdate(id, user, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const presentList = async (req, res) => {
  const { id } = req.params;
  const value = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Invalid User ID!");

    const user = await AuthenticateUser.findById(id);

    user.presentStatus = value.presentStatus;
    const updatedPost = await AuthenticateUser.findByIdAndUpdate(id, user, {
      new: true,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
