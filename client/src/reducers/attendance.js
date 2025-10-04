import {
  ATTEND_ALL,
  UPDATE_ATTENDANCE,
  DELETE,
  LOGLIST,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (attendance = [], action) => {
  switch (action.type) {
    case LOGLIST:
      return [...attendance, action.payload];

    case ATTEND_ALL:
      return action.payload;

    case UPDATE_ATTENDANCE:
      return attendance.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );

    default:
      return attendance;
  }
};
