import mongoose from "mongoose";
import TimesheetDetail from "../model/timesheetDetail.js";
// ----------------------------------------------Timesheet  List Status-----------------------------------------
// export const timesheetList = async (req, res) => {
//   console.log("This side is working");

//   const { id } = req.params;
//   const value = req.body;

//   console.log(id);
//   console.log(value);
//   try {
//     const user = await TimesheetDetail.findById(id);

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }
//     user.existingUser.push(value.id);
//     user.projectCode.push(value.projectCode);
//     user.activityCode.push(value.activityCode);
//     user.date.push(value.date);
//     user.netTime.push(value.netTime);
//     user.overTime.push(value.overTime);

//     const updatedPost = await TimesheetDetail.findByIdAndUpdate(id, user, {
//       new: true,
//     });

//     res.json(updatedPost);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//     console.log("Here is error");
//   }
// };

export const timesheetList = async (req, res) => {
  console.log("This side is working");

  const { id } = req.params;
  const value = req.body;

  try {
    const updatedPost = await TimesheetDetail.findByIdAndUpdate(
      id,
      {
        $push: {
          existingUser: id,
          projectCode: value.projectCode,
          activityCode: value.activityCode,
          date: value.date,
          netTime: value.netTime,
          overTime: value.overTime,
        },
      },
      {
        new: true,
        upsert: true, // ✅ create document if it doesn’t exist
        setDefaultsOnInsert: true, // ✅ apply default [] from schema
      }
    );

    res.json(updatedPost);
  } catch (error) {
    console.error("Error in timesheetList:", error);
    res.status(500).json({ message: error.message });
  }
};

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
