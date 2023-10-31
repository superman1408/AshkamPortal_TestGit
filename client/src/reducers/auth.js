import { AUTH, LOGOUT } from "../constants/actionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};
export default authReducer;
