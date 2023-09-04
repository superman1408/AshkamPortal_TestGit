import { AUTH } from "../constants/actionTypes";

import * as API from "../api/index";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // signIn block
    const { data } = await API.signIn(formData);

    dispatch({ type: AUTH, data });
    navigate("/profile", { replace: true });
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // signUp block
    const { data } = await API.signUp(formData);
    dispatch({ type: AUTH, data });
    navigate("/profile", { replace: true });
  } catch (error) {
    console.log(error);
  }
};
