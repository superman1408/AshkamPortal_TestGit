import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Project.css";
import ProjectCard from "./ProjectCard";
import AddProjectCard from "./AddProjectCard";
import AddProjectDialog from "./AddProjectDialog.js";
import { getPosts } from "../../action/posts.js";

// const projects = [
//   {
//     id: 1,
//     projectNo: "P-24015",
//     projectName: "Offshore Pipeline",
//     client: "ONGC",
//     employees: 12,
//     progress: 80,
//     status: "Active",
//   },
//   {
//     id: 2,
//     projectNo: "P-24016",
//     projectName: "Refinery Upgrade",
//     client: "IOCL",
//     employees: 8,
//     progress: 45,
//     status: "On Hold",
//   },
// ];

const Projects = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="projects-page">
      <div className="projects-header">
        <div>
          <h1>Projects</h1>
          <p>Manage all organization projects</p>
        </div>

        <input
          type="text"
          placeholder="Search Project..."
          className="search-box"
        />
      </div>

      <div className="project-grid">
        <AddProjectCard onClick={() => setOpenDialog(true)} />

        {/* {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))} */}
      </div>

      <AddProjectDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        posts={posts}
      />
    </div>
  );
};

export default Projects;
