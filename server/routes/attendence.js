import express from "express";
import {
  logList,
  getAttendancePosts,
  updateAttendance,
  uploadAttendanceFile,
  getAttendanceFile,
} from "../controllers/attendance.js";

import multer from "multer";
const router = express.Router();
const upload1 = multer({ dest: "uploads/" });

router.post("/attendance/upload", upload1.single("file"), uploadAttendanceFile);

router.get("/attendancefile", getAttendanceFile);

router.post("/:id/loglist", logList);

router.get("/attendanceposts", getAttendancePosts);

router.patch("/:id/:index/updateAttendance", updateAttendance);

export default router;
