import axios from "axios";

// const URL = "http://localhost:5000/posts";

// const URLL = "http://localhost:5000/auth";

const API = axios.create({ baseURL: "http://localhost:8080" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");

export const fetchPost = (id) => API.get(`/posts/${id}`);

export const create = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}/registration`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);

export const signUp = (formData) => API.post("/user/signup", formData);

export const sendMail = (formData) => API.post("/mail/sendmail", formData);

export const todoList = (formData, id) =>
  API.post(`/posts/${id}/todo`, formData);

export const deleteActivity = (id) => API.delete(`/posts/${id}/todo`);

export const skillData = (formData) => API.post(`/posts/skill`, formData);

export const sendMailData = (id, formData) =>
  API.post(`/mail/${id}/mailData`, formData);

export const updateStatus = (id, formData) =>
  API.post(`/mail/${id}/status`, formData);

export const editTable = (id, toEdit) => API.patch(`/posts/${id}/edit`, toEdit);

export const deleteTable = (id, indexed) => API.delete(`/posts/${id}/deleteTable/${indexed}`);
