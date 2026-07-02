import {
  ATTENDANCE_UPLOAD_START,
  ATTENDANCE_UPLOAD_SUCCESS,
  ATTENDANCE_UPLOAD_FAIL,
  FETCH_ATTENDANCEFILE,
} from "../constants/actionTypes";

const initialState = {
  uploading: false,
  uploadResult: null,
  error: null,
  attendanceFiles: [], // array to hold fetched attendance posts
};

const attendanceUpload = (state = initialState, action) => {
  switch (action.type) {
    case ATTENDANCE_UPLOAD_START:
      return { ...state, uploading: true, error: null };
    case ATTENDANCE_UPLOAD_SUCCESS:
      return { ...state, uploading: false, uploadResult: action.payload };
    case ATTENDANCE_UPLOAD_FAIL:
      return { ...state, uploading: false, error: action.payload };

    case FETCH_ATTENDANCEFILE:
      // return { ...state, attendanceFiles: action.payload };
      return { ...state, attendanceFiles: action.payload };
    default:
      return state;
  }
};

export default attendanceUpload;
