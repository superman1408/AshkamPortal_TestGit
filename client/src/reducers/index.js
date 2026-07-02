import { combineReducers } from "redux";
import posts from "./posts";

import auth from "./auth";

import attend from "./attendance";

import event from "./event";

import salary from "./salary";

import timesheetData from "./timesheet";

import attendance from "./attendanceUpload";

export default combineReducers({
  posts,
  auth,
  attend,
  event,
  salary,
  timesheetData,
  attendance,
});
