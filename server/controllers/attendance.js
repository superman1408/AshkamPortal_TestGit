import mongoose from "mongoose";
import AttendanceDetail from "../model/attendanceDetail.js";

import Attendance from "../model/attendance.js";
import XLSX from "xlsx";
import fs from "fs";

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

function excelDateToJSDate(excelDate) {
  // Excel stores dates as days since 1900-01-01
  const jsDate = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
  jsDate.setHours(0, 0, 0, 0);
  return jsDate;
}

function excelTimeToString(excelTime) {
  // Excel stores time as fraction of a day
  if (isNaN(excelTime)) return excelTime;
  const totalSeconds = Math.round(86400 * Number(excelTime));
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}`;
}

// =======================
// 🚀 Upload Attendance File
// =======================

export const uploadAttendanceFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const rows = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: null,
    });

    const attendanceMap = {};

    for (const row of rows) {
      const employeeId =
        row["Employee ID"] ||
        row["Emp ID"] ||
        row["employeeId"] ||
        row["employee_id"];
      const rawDate = row["Date"] || row["date"];
      const rawIn =
        row["In Time"] || row["InTime"] || row["in_time"] || row["In"];
      const rawOut =
        row["Out Time"] || row["OutTime"] || row["Out"] || row["out_time"];
      const rawStatus = row["Status"] || row["status"] || "Present";

      if (!employeeId || !rawDate) continue;

      // ✅ Convert Excel serials properly
      const date =
        typeof rawDate === "number"
          ? excelDateToJSDate(rawDate)
          : new Date(rawDate);
      const inTime = excelTimeToString(rawIn);
      const outTime = excelTimeToString(rawOut);
      const status = String(rawStatus).trim();

      if (!attendanceMap[employeeId]) {
        attendanceMap[employeeId] = {
          dates: [],
          inTimes: [],
          outTimes: [],
          statuses: [],
        };
      }

      attendanceMap[employeeId].dates.push(date);
      attendanceMap[employeeId].inTimes.push(inTime);
      attendanceMap[employeeId].outTimes.push(outTime);
      attendanceMap[employeeId].statuses.push(status);
    }

    // Bulk update employees
    const employeeIds = Object.keys(attendanceMap);
    const operations = employeeIds.map((empId) => {
      const { dates, inTimes, outTimes, statuses } = attendanceMap[empId];
      return Attendance.findOneAndUpdate(
        { employeeId: String(empId).trim() },
        {
          $set: {
            uploadedBy: req.user ? req.user.id : "System",
            uploadedAt: new Date(),
          },
          $push: {
            dates: { $each: dates },
            inTimes: { $each: inTimes },
            outTimes: { $each: outTimes },
            statuses: { $each: statuses },
          },
        },
        { upsert: true, new: true }
      );
    });

    await Promise.all(operations);
    fs.unlinkSync(req.file.path);

    res.json({
      message: `Attendance uploaded for ${employeeIds.length} employees.`,
    });
  } catch (err) {
    if (req.file) fs.unlinkSync(req.file.path);
    console.error("Attendance upload error:", err);
    res
      .status(500)
      .json({ message: "Server error during upload", error: err.message });
  }
};

export const getAttendanceFile = async (req, res) => {
  try {
    const postMessage = await Attendance.find({});
    res.status(200).json(postMessage);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
