import {
  PROJECT_LIST,
  FETCH_PROJECT,
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (projectData = [], action) => {
  switch (action.type) {
    case PROJECT_LIST:
      return [...projectData, action.payload];

    case FETCH_PROJECT:
      return action.payload;

    case UPDATE_PROJECT:
      return [...projectData, action.payload];

    case DELETE_PROJECT:
      return projectData.filter((data) => data.id !== action.payload);

    default:
      return projectData;
  }
};
