import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// export const fetchPosts = () => API.get("/posts");

// inside your action/posts.js
export const fetchPosts = (page = 1) =>
  axios.get(`/posts?page=${page}&limit=10`);

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const create = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}/registration`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData, code) =>
  API.post(`/user/signup/${code}`, formData);

export const passwordReset = (passwordForm, code) =>
  API.patch(`/user/reset/${code}`, passwordForm);

export const sendMail = (formData) => API.post("/mail/sendmail", formData);

export const todoList = (formData, id) =>
  API.post(`/posts/${id}/todo`, formData);

export const deleteActivity = (id) => API.delete(`/posts/${id}/todo`);

export const skillData = (formData) => API.post(`/posts/skill`, formData);

export const sendMailData = (id, formData) =>
  API.post(`/mail/${id}/mailData`, formData);

export const updateStatus = (id, formData) =>
  API.post(`/mail/${id}/status`, formData);

export const editTable = (id, indexed, toEdit) =>
  API.patch(`/posts/${id}/${indexed}/edit`, toEdit);

export const deleteTable = (id, indexed) =>
  API.delete(`/posts/${id}/deleteTable/${indexed}`);

export const dailyAttendance = (formData) =>
  API.post(`/posts/dailyAttendance`, formData);

export const dailyEvent = (formData) => API.post(`/posts/dailyEvent`, formData);

export const getAllEvents = () => API.get(`/posts/events/display`);

export const fetchAttendancePosts = () => API.get("/posts/attendanceposts");

export const logList = (formData, id) =>
  API.post(`/posts/${id}/loglist`, formData);

export const salarySlipData = (id, formData) =>
  API.post(`/posts/${id}/salarySlipData`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const fetchSalarySlipData = () => API.get("/posts/salary/slip");

export const leaveList = (formData, id) =>
  API.patch(`/posts/${id}/leavelist`, formData);

export const presentList = (formData, id) =>
  API.patch(`/posts/${id}/presentList`, formData);
// SERVER ADDRESS : https://ashkam-server-b9bc1f76ae2f.herokuapp.com/
