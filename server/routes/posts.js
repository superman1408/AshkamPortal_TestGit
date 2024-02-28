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
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", auth, createPost);

router.patch("/:id/registration", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.post("/:id/todo", auth, todoList);

router.patch("/:id/edit", auth, editTable);

router.delete("/:id/deleteTable", auth, deleteTable);

// @desc    Get all skills data for autocomplete

router.post("/skill", skillData);

export default router;
