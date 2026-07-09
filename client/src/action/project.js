import * as API from "../api";
import {
  PROJECT_LIST,
  FETCH_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../constants/actionTypes";

export const projectList = (formData) => async (dispatch) => {
  console.log("Hello I am working at ProjectList!!");

  try {
    const { data } = await API.projectList(formData);
    console.log("Inside");

    dispatch({ type: PROJECT_LIST, payload: data });
    // return data.timesheetList;
  } catch (error) {
    console.log(error);

    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
    }

    throw error;
  }
};

// -----------------------------For getting timesheet Data---------------------------

export const getProjectLists = (userId) => async (dispatch) => {
  // console.log("Code is received in getTimesheetPosts!");
  try {
    const { data } = await API.getProjectLists(userId);
    // console.log("inside getTimeSheetPost");

    dispatch({ type: FETCH_PROJECT, payload: data });
    // console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};

// // -----------------------------Update Timesheet --------------------------
export const updateProjectList = (id, indexed, updated) => async (dispatch) => {
  console.log("Code is workinng");
  try {
    const { data } = await API.updateProjectList(id, indexed, updated);
    console.log("data", data);

    dispatch({ type: UPDATE_PROJECT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------------Delete Timesheet------------------------------
export const deleteProject = (id, indexed) => async (dispatch) => {
  try {
    await API.deleteProject(id, indexed);
    dispatch({ type: DELETE_PROJECT, payload: id });
  } catch (error) {
    console.log(error);
  }
};
