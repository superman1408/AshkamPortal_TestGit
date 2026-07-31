import express from "express";
import {
  timesheetList,
  getTimesheetPosts,
  updateTimesheet,
  deleteTimesheet,
  updateRefDoc,
} from "../controllers/timesheet.js";

const router = express.Router();

router.post("/:id/timesheet", timesheetList);

router.get("/timesheetposts", getTimesheetPosts);

router.patch("/:id/:indexed/updateTimesheet", updateTimesheet);

router.delete("/:id/deleteTimesheet/:indexed", deleteTimesheet);

router.patch("/:id/updateRefDoc", updateRefDoc);

export default router;
// /timesheet/timesheetposts
