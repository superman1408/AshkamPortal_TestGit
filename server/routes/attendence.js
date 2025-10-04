import express from "express";
import {
  logList,
  getAttendancePosts,
  updateAttendance,
} from "../controllers/attendance.js";

const router = express.Router();

router.post("/:id/loglist", logList);

router.get("/attendanceposts", getAttendancePosts);

router.patch("/:id/:index/updateAttendance", updateAttendance);

export default router;
