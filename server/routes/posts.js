import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
  todoList,
  skillData,
  editTable,
  deleteTable,
  dailyAttendance,
  getAttendancePosts,
  logList,
  dailyEvent,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/attendanceposts", getAttendancePosts);

router.get("/:id", getPost);

router.post("/", auth, createPost);

router.patch("/:id/registration", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.post("/:id/todo", auth, todoList);

router.patch("/:id/:indexed/edit", auth, editTable);

router.delete("/:id/deleteTable/:indexed", auth, deleteTable);

// @desc    Get all skills data for autocomplete

router.post("/skill", skillData);

router.post("/dailyAttendance", dailyAttendance);

router.post("/:id/dailyEvent", dailyEvent);

router.post("/:id/loglist", logList);

export default router;
