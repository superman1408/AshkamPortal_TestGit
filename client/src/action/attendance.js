import * as API from "../api";
import {
  LOGLIST,
  ATTEND_ALL,
  UPDATE_ATTENDANCE,
  ATTENDANCE_UPLOAD_FAIL,
  ATTENDANCE_UPLOAD_START,
  ATTENDANCE_UPLOAD_SUCCESS,
  FETCH_ATTENDANCEFILE,
} from "../constants/actionTypes";

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

// // -------------------------------------------Update Attendance -----------------------------------------------------
export const updateAttendance =
  (id, index, updateAttendance) => async (dispatch) => {
    try {
      const { data } = await API.updateAttendance(id, index, updateAttendance);

      dispatch({ type: UPDATE_ATTENDANCE, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

// // ----------------------------------------------Delete Attendance---------------------------------------------------
// export const deleteAttendance = (id) => async (dispatch) => {
//   console.log("Code is working");

//   try {
//     await API.deleteAttendance(id);
//     dispatch({ type: DELETE, payload: id });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const uploadAttendanceFile = (formData) => async (dispatch) => {
  try {
    dispatch({ type: ATTENDANCE_UPLOAD_START });

    // Do NOT redeclare formData, just create a new FormData object
    const dataToSend = new FormData();
    dataToSend.append("file", formData); // append the file passed from frontend

    const res = await API.uploadAttendanceFile(dataToSend);

    dispatch({ type: ATTENDANCE_UPLOAD_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: ATTENDANCE_UPLOAD_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const getAttendanceFile = () => async (dispatch) => {
  try {
    const { data } = await API.fetchAttendanceFile();

    dispatch({ type: FETCH_ATTENDANCEFILE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
