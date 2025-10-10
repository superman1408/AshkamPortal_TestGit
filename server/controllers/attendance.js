import mongoose from "mongoose";
import AttendanceDetail from "../model/attendanceDetail.js";

// -------------------------For Creation and updation(AttendanceDetail)---------------------------------
// export const logList = async (req, res) => {
//   console.log();

//   const { id } = req.params;
//   const value = req.body;

//   try {
//     const user = await AttendanceDetail.findById(id);

//     user.logDate.push(value.logDate);
//     user.logIn.push(value.logIn);
//     user.logOut.push(value.logOut);

//     const updatedPost = await AttendanceDetail.findByIdAndUpdate(id, user, {
//       new: true,
//     });

//     res.json(updatedPost);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

export const logList = async (req, res) => {
  const { id } = req.params;
  const value = req.body;

  try {
    const updatedPost = await AttendanceDetail.findByIdAndUpdate(
      id,
      {
        $push: {
          logDate: value.logDate,
          logIn: value.logIn,
          logOut: value.logOut,
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
    res.status(409).json({ message: error.message });
  }
};
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
  const id = req.params.id;
  const indexNumber = parseInt(req.params.index);
  const valueToEdit = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("Invalid User ID!");

    const post = await AttendanceDetail.findById(id);
    if (!post) return res.status(404).send("No User Found");

    post.logDate.splice(indexNumber, 1, valueToEdit.logDate);
    post.logIn.splice(indexNumber, 1, valueToEdit.logIn);
    post.logOut.splice(indexNumber, 1, valueToEdit.logOut);

    await post.save();

    res.status(200).json({ message: "Item Edited successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ________________________delete operation___________________________

// export const deleteAttendance = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send("no post with that id found");

//   await UserAttendance.findByIdAndRemove(id);
//   res.json({ message: "Post deleted successfully" });
// };
