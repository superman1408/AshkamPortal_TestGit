import { AUTH } from "../constants/actionTypes";

import * as API from "../api/index";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // signIn block
    const { data } = await API.signIn(formData);

    dispatch({ type: AUTH, data });
    navigate("/home", { replace: true });

  } catch (error) {
    console.log(error);

    // toast coding for error message
    toast.error("Invalid Credentials, Please try Again Later...!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};




export const signup = (formData, code, navigate) => async (dispatch) => {
  try {
    // signUp block
    const { data } = await API.signUp(formData, code);
    dispatch({ type: AUTH, data });
    navigate("/home", { replace: true });
  } catch (error) {
    console.log(error);
    toast.error("Invalid Credentials, Please try Again Later...!!", {
      position: toast.POSITION.TOP_CENTER,
    });
  }
};
