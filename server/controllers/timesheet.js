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
          remarks: value.remarks,
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
    // console.error("Error in timesheetList:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------------------get operation--------------------------------
export const getTimesheetPosts = async (req, res) => {
  try {
    const postMessage = await TimesheetDetail.find({});
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//------------------Update Operation --------------------------
export const updateTimesheet = async (req, res) => {
  console.log("You reached me");

  const id = req.params.id;
  const indexNumber = parseInt(req.params.index);
  const valueToEdit = req.body;

  console.log(id, indexNumber, valueToEdit);

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Invalid User ID!");

    const post = await AttendanceDetail.findById(id);
    if (!post) return res.status(404).send("No User Found");

    post.projectCode.splice(indexNumber, 1, valueToEdit.projectCode);
    post.activityCode.splice(indexNumber, 1, valueToEdit.activityCode);
    post.date.splice(indexNumber, 1, valueToEdit.date);
    post.netTime.splice(indexNumber, 1, valueToEdit.netTime);
    post.overTime.splice(indexNumber, 1, valueToEdit.overTime);
    post.remarks.splice(indexNumber, 1, valueToEdit.remarks);

    await post.save();

    res.status(200).json({ message: "Item Edited successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete operation

export const deleteTimesheet = async (req, res) => {
  console.log("yhan aa rha hai");

  const indexNumber = parseInt(req.params.indexed);
  const id = req.params.id;

  console.log("id", id);

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
    post.remarks.splice(indexNumber, 1);

    await post.save();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
