import express from "express";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
  todoList,
  skillData,
} from "../controllers/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", auth, createPost);

router.patch("/:id/registration", auth, updatePost);

router.delete("/:id", auth, deletePost);

router.post("/:id/todo", auth, todoList);

router.post("/skill", skillData);

export default router;
