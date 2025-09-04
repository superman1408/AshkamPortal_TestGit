import { FETCH_TIMESHEET, TIMESHEET_LIST } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (timesheetData = [], action) => {
  switch (action.type) {
    case TIMESHEET_LIST:
      return action.payload;

    case FETCH_TIMESHEET:
      return action.payload;

    default:
      return timesheetData;
  }
};
