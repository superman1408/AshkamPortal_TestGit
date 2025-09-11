import {
  DELETE_TIMESHEET,
  FETCH_TIMESHEET,
  TIMESHEET_LIST,
  UPDATE_TIMESHEET,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (timesheetData = [], action) => {
  switch (action.type) {
    case TIMESHEET_LIST:
      return [...timesheetData, action.payload];

    case FETCH_TIMESHEET:
      return action.payload;

    case UPDATE_TIMESHEET:
      return timesheetData.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );

    case DELETE_TIMESHEET:
      return timesheetData.filter((data) => data.id !== action.payload);

    default:
      return timesheetData;
  }
};
