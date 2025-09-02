import express from "express";
import {
  getAttendancePosts,
  updateAttendance,
} from "../controllers/attendance.js";

const router = express.Router();

router.get("/attendanceposts", getAttendancePosts);

router.patch("/:id/:index/updateAttendance", updateAttendance);

export default router;
