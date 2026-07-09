import React from "react";

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <div className="status">
        <span className="dot"></span>

        {project.status}
      </div>

      <h2>{project.projectNo}</h2>

      <h4>{project.projectName}</h4>

      <p>
        <strong>Client:</strong> {project.client}
      </p>

      <p>
        <strong>Employees:</strong> {project.employees}
      </p>

      <div className="progress">
        <div
          className="progress-fill"
          style={{ width: `${project.progress}%` }}
        ></div>
      </div>

      <span>{project.progress}% Complete</span>
    </div>
  );
}
