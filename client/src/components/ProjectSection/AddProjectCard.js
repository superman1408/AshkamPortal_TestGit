import React from "react";

const AddProjectCard = ({ onClick }) => {
  return (
    <div className="add-project-card" onClick={onClick}>
      <div className="plus">+</div>

      <h3>Add New Project</h3>

      <p>Click to create project</p>
    </div>
  );
};

export default AddProjectCard;
