import { EVENT_ALL } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (event = [], action) => {
  switch (action.type) {
    case EVENT_ALL:
      return action.payload;
    default:
      return event;
  }
};
