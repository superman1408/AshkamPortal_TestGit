import * as API from "../api";
import {
  TIMESHEET_LIST,
  FETCH_TIMESHEET,
  UPDATE_TIMESHEET,
  DELETE_TIMESHEET,
} from "../constants/actionTypes";

export const timesheetList = (formData, id) => async (dispatch) => {
  console.log("Hello I am working at TimesheetList!!");

  try {
    const { data } = await API.timesheetList(formData, id);
    console.log("Inside");

    dispatch({ type: TIMESHEET_LIST, payload: data });
    // return data.timesheetList;
  } catch (error) {
    console.log(error);
  }
};

// -----------------------------For getting timesheet Data---------------------------

export const getTimesheetPosts = (userId) => async (dispatch) => {
  // console.log("Code is received in getTimesheetPosts!");
  try {
    const { data } = await API.getTimesheetPosts(userId);
    // console.log("inside getTimeSheetPost");

    dispatch({ type: FETCH_TIMESHEET, payload: data });
    // console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};

// // -----------------------------Update Timesheet --------------------------
export const updateTimesheet = (id, indexed, updatedTimesheet) => async (dispatch) => {
  console.log("Code is workinng");
  try {
    const { data } = await API.updateTimesheet(id, indexed, updatedTimesheet);
    console.log("data", data);

    dispatch({ type: UPDATE_TIMESHEET, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// // -----------------------------Delete Timesheet------------------------------
export const deleteTimesheet = (id, indexed) => async (dispatch) => {
  try {
    await API.deleteTimesheet(id, indexed);
    dispatch({ type: DELETE_TIMESHEET, payload: id });
  } catch (error) {
    console.log(error);
  }
};
