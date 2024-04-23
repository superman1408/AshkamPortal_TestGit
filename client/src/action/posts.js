import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  FETCH_POST,
  UPDATE_STATUS,
  TODOLIST,
  SKILLDATA,
  UPDATE_TABLE,
  ATTEND_ALL,
  LOGLIST,
  DAILY_EVENT,
} from "../constants/actionTypes";

import * as API from "../api";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await API.fetchPosts();

    dispatch({ type: FETCH_ALL, payload: data });
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// _________________________________________

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await API.create(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// _________________________________________________________________

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await API.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// _______________________________________________________________________________________

export const deletePost = (id) => async (dispatch) => {
  try {
    await API.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await API.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = (id, activeStatus) => async (dispatch) => {
  try {
    const { data } = await API.updateStatus(id, activeStatus);

    dispatch({ type: UPDATE_STATUS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const todoList = (id, post) => async (dispatch) => {
  console.log("Hello I am working..!!");
  console.log(id);
  console.log(post);

  try {
    const { data } = await API.todoList(id, post);
    //console.log(data);
    dispatch({ type: TODOLIST, payload: data });

    return data.todoList;
    // console.log("Hello");
  } catch (error) {
    console.log(error);
  }
};

export const skillData = (post) => async (dispatch) => {
  // console.log("Hello I am working..!!");
  // console.log(id);
  // console.log(state);

  try {
    const { data } = await API.skillData(post);
    console.log(data);
    dispatch({ type: SKILLDATA, payload: data });

    return data.skillData;
    // console.log("Hello");
  } catch (error) {
    console.log(error);
  }
};

// export const updatePost = (id, post) => async (dispatch) => {
// try {
// const { data } = await API.updatePost(id, post);

// dispatch({ type: UPDATE, payload: data });
// } catch (error) {
// console.log(error);
// }
// };

export const tableEdit = (id, indexed, toEdit) => async (dispatch) => {
  try {
    const { data } = await API.editTable(id, indexed, toEdit);

    dispatch({ type: UPDATE_TABLE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const tableDelete = (id, indexed) => async (dispatch) => {
  try {
    await API.deleteTable(id, indexed);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const dailyAttendance = (formdata) => async (dispatch) => {
  console.log("Hello I am working..!!");
  // console.log(id);
  // console.log(state);

  try {
    const { data } = await API.dailyAttendance(formdata);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAttendancePosts = () => async (dispatch) => {
  try {
    const { data } = await API.fetchAttendancePosts();

    dispatch({ type: ATTEND_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const logList = (post, id) => async (dispatch) => {
  try {
    const { data } = await API.logList(post, id);
    //console.log(data);
    dispatch({ type: LOGLIST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const dailyEvent = (formData) => async (dispatch) => {
  console.log("Hello I am working..!!");
  try {
    const { data } = await API.dailyEvent(formData);
    console.log("data", data);
    console.log("data", data);

    dispatch({ type: DAILY_EVENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
