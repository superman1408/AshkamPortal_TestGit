import { combineReducers } from "redux";
import posts from "./posts";

import auth from "./auth";

import attend from "./attendance";

import event from "./event";

import salary from "./salary";

import timesheetData from "./timesheet";

export default combineReducers({
  posts,
  auth,
  attend,
  event,
  salary,
  timesheetData,
});
