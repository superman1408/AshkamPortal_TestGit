import express from "express";
import {
  projectList,
  getProjectLists,
  updateProjectList,
  deleteProject,
} from "../controllers/project.js";

const router = express.Router();

router.post("/project", projectList);

router.get("/project", getProjectLists);

router.patch("/project/updateproject", updateProjectList);

router.delete("/:id/deleteproject/:indexed", deleteProject);

export default router;
