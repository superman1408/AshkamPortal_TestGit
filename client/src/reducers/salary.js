import { SALARY_ALL, SALARY_SLIP_DELETE } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (salary = [], action) => {
  switch (action.type) {
    case SALARY_ALL:
      return action.payload;

    case SALARY_SLIP_DELETE:
      return salary.filter((data) => data.id !== action.payload);

    default:
      return salary;
  }
};
