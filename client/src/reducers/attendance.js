import {
  ATTEND_ALL,
  UPDATE,
  DELETE,
  FETCHLOGLIST,
  LOGLIST,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (attendance = [], action) => {
  switch (action.type) {
    case ATTEND_ALL:
      return action.payload;
      
    default:
      return attendance;
  }
};
