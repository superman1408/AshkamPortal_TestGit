import mongoose from "mongoose";
import AttendanceDetail from "../model/attendanceDetail.js";

// -------------------get operation------------------
export const getAttendancePosts = async (req, res) => {
  // console.log("this is working Attendence");
  try {
    // console.log("inside");

    const postMessage = await AttendanceDetail.find({});

    // console.log(postMessage);

    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//------------------Update Operation --------------------------
export const updateAttendance = async (req, res) => {
  console.log("You reached me");
  
  // const { id: _id } = req.params;
  // const post = req.body;

  // if (!mongoose.Types.ObjectId.isValid(_id))
  //   return res.status(404).send("no post with that id found");

  // const updateAttendance = await AttendanceDetail.findByIdAndUpdate(
  //   _id,
  //   { ...post, _id },
  //   {
  //     new: true,
  //   }
  // );
  // res.json(updateAttendance);
};

// ________________________delete operation___________________________

// export const deleteAttendance = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send("no post with that id found");

//   await UserAttendance.findByIdAndRemove(id);
//   res.json({ message: "Post deleted successfully" });
// };
