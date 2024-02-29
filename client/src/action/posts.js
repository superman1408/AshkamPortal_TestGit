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



export const tableEdit = (id, toEdit) => async (dispatch) => {
  console.log(`we have our current id : ${id}`);
  console.log(`We have index for finding the required content to edit : ${toEdit}`);
  try {
    const { data } = await API.editTable(id, toEdit);

    dispatch({ type: UPDATE_TABLE, payload: data });
  } catch (error) {
    console.log(error);
  }
};


export const tableDelete = (id, indexed) => async (dispatch) => {
  console.log(indexed);
  try {
    await API.deleteTable(id, indexed);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
