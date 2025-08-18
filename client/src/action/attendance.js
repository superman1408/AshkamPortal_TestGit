import * as API from "../api";
import { LOGLIST, FETCHLOGLIST, ATTEND_ALL } from "../constants/actionTypes";

export const logList = (formData, id) => async (dispatch) => {
  console.log("Hello I am working at loglist!!");

  try {
    const { data } = await API.logList(formData, id);

    dispatch({ type: LOGLIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const getAttendancePosts = () => async (dispatch) => {
  try {
    const { data } = await API.getAttendancePosts();

    dispatch({ type: ATTEND_ALL, payload: data });

    
  } catch (error) {
    console.log(error);
  }
};


// // -----------------------------Update Attendance --------------------------
// export const updateAttendance = (id, post) => async (dispatch) => {
//   console.log("Code is workinng");

//   try {
//     const { data } = await API.updateAttendance(id, post);

//     dispatch({ type: UPDATE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// // -----------------------------Delete Attendance------------------------------
// export const deleteAttendance = (id) => async (dispatch) => {
//   console.log("Code is working");

//   try {
//     await API.deleteAttendance(id);
//     dispatch({ type: DELETE, payload: id });
//   } catch (error) {
//     console.log(error);
//   }
// };