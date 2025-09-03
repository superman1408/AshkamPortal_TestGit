import express from "express";
import { timesheetList, getTimesheetPosts } from "../controllers/timesheet.js";

const router = express.Router();

router.post("/:id/timesheet", timesheetList);

router.get("/timesheetposts", getTimesheetPosts);

export default router;
