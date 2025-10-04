import { LOGLIST } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (event = [], action) => {
  switch (action.type) {
    case LOGLIST:
      return action.payload;

    // case DAILY_EVENT:
    // return [...event, action.payload];

    default:
      return event;
  }
};
