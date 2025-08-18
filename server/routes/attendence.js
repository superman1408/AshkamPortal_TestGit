import express from "express";
import { getAttendancePosts } from "../controllers/attendance.js";


const router = express.Router();







router.get("/attendanceposts", getAttendancePosts);


export default router;