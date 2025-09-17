import express from "express";
import {
  timesheetList,
  getTimesheetPosts,
  updateTimesheet,
  deleteTimesheet,
} from "../controllers/timesheet.js";

const router = express.Router();

router.post("/:id/timesheet", timesheetList);

router.get("/timesheetposts", getTimesheetPosts);

router.patch("/:id/:indexed/updateTimesheet", updateTimesheet);

router.delete("/:id/deleteTimesheet/:indexed", deleteTimesheet);

export default router;
// /timesheet/timesheetposts
