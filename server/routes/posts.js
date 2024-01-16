import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
  todoList,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.post("/:id/todo", auth, todoList);

export default router;
