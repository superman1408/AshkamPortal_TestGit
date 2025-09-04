import * as API from "../api";
import { TIMESHEET_LIST, FETCH_TIMESHEET } from "../constants/actionTypes";

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

export const getTimesheetPosts = () => async (dispatch) => {
  console.log("Code is received in getTimesheetPosts!");
  try {
    const { data } = await API.getTimesheetPosts();

    dispatch({ type: FETCH_TIMESHEET, payload: data });
    console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};

// // -----------------------------Update Timesheet --------------------------
// export const updateTimesheet = (id, post) => async (dispatch) => {
//   //   console.log("Code is workinng");
//   //   try {
//   //     const { data } = await API.updateTimesheet(id, post);
//   //     dispatch({ type: UPDATE, payload: data });
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
// };

// // -----------------------------Delete Timesheet------------------------------
// export const deleteTimesheet = (id) => async (dispatch) => {
//   console.log("Code is working");

//   try {
//     await API.deleteTimesheet(id);
//     dispatch({ type: DELETE, payload: id });
//   } catch (error) {
//     console.log(error);
//   }
// };
