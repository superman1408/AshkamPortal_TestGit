import express from "express";
import { getTimesheetPosts } from "../controllers/timesheet";

const router = express.Router();

router.get("/timesheetposts", getTimesheetPosts);

export default router;
