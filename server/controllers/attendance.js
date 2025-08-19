import mongoose from "mongoose";
import AttendanceDetail from "../model/attendanceDetail.js";

// -------------------get operation------------------
export const getAttendancePosts = async (req, res) => {
  console.log("this is working Attendence");
  try {
    console.log("inside");

    const postMessage = await AttendanceDetail.find({});

    console.log(postMessage);

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
