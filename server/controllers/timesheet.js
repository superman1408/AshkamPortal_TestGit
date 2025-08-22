import mongoose from "mongoose";
import TimesheetDetail from "../model/timesheetDetail";

// -------------------get operation------------------
export const getTimesheetPosts = async (req, res) => {
  console.log("this is working Timesheet");
  try {
    console.log("inside Timesheet");

    const postMessage = await TimesheetDetail.find({});

    console.log(postMessage);

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
