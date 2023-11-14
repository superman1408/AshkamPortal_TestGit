import * as API from "../api";

import { MAIL, SENDMAILDATA } from "../constants/actionTypes";

export const sendMail = (mailData) => async (dispatch) => {
  try {
    const { data } = await API.sendMail(mailData);
    console.log("data", data);
    console.log("link here come");
    dispatch({ type: MAIL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const sendMailData = (id, mailData) => async (dispatch) => {
  try {
    console.log(mailData);
    console.log("Here Link is Working");
    const { data } = await API.sendMailData(id, mailData);

    dispatch({ type: SENDMAILDATA, payload: data });
    console.log("data", data);
  } catch (error) {
    console.log(error);
  }
};
