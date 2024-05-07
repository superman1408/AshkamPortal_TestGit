import { SALARY_ALL } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (salary = [], action) => {
  switch (action.type) {
    case SALARY_ALL:
      return action.payload;

    default:
      return salary;
  }
};
