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
  updateAttendance,
  deleteAttendance,
  logList,
  dailyEvent,
  getAllevents,
  salarySlipData,
  getSalary,
  leaveList,
  presentList,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";
import upload from "../middleware/storage.js";

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

router.patch("/updateAttendance", auth, updateAttendance);

router.delete("/deleteAttendance", auth, deleteAttendance);

// @desc    Get all skills data for autocomplete

router.post("/skill", skillData);

router.post("/dailyAttendance", dailyAttendance);

router.post("/dailyEvent", dailyEvent);

router.get("/events/display", getAllevents);

router.post("/:id/loglist", logList);

router.patch("/:id/leaveList", leaveList);

router.post("/:id/salarySlipData", upload.single("pdf"), salarySlipData);

router.get("/salary/slip", getSalary);

router.patch("/:id/presentList", presentList);

export default router;
