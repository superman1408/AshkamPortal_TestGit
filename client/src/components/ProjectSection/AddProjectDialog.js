import { React, useState } from "react";
import { useDispatch } from "react-redux";
import "./AddProjectDialog.css";
import { projectList } from "../../action/project";
// import { deletePost } from "../../api";

const AddProjectDialog = ({ open, onClose, posts }) => {
  const [step, setStep] = useState(1);

  const [selectedDisciplines, setSelectedDisciplines] = useState([]);

  const dispatch = useDispatch();

  const disciplines = [
    "Process",
    "Mechanical",
    "Piping",
    "Pipeline",
    "Civil",
    "Structural",
    "Electrical",
    "Instrumentation",
    "Telecom",
    "HVAC",
    "Safety",
    "Project Management",
  ];

  const [newProject, setNewProject] = useState({
    projectNumber: "",
    projectName: "",
    clientName: "",
    startDate: "",
    endDate: "",
    description: "",
    projectType: "Engineering",
    disciplines: [],
    projectManager: [""],
    projectMembers: [],
  });

  const toggleDiscipline = (discipline) => {
    const updatedDisciplines = selectedDisciplines.includes(discipline)
      ? selectedDisciplines.filter((item) => item !== discipline)
      : [...selectedDisciplines, discipline];

    setSelectedDisciplines(updatedDisciplines);

    setNewProject((prev) => ({
      ...prev,
      disciplines: updatedDisciplines,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(projectList(newProject));

      // alert("Project Created Successfully");

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMembersChange = (e) => {
    const selectedMembers = Array.from(
      e.target.selectedOptions,
      (option) => option.value,
    );

    setNewProject((prev) => ({
      ...prev,
      projectMembers: selectedMembers,
    }));
  };

  if (!open) return null;

  console.log(posts);

  const handleManagerChange = (index, value) => {
    const updatedManagers = [...newProject.projectManagers];
    updatedManagers[index] = value;

    setNewProject({
      ...newProject,
      projectManagers: updatedManagers,
    });
  };

  const addManager = () => {
    setNewProject({
      ...newProject,
      projectManagers: [...newProject.projectManagers, ""],
    });
  };

  const removeManager = (index) => {
    const updatedManagers = newProject.projectManagers.filter(
      (_, i) => i !== index,
    );

    setNewProject({
      ...newProject,
      projectManagers: updatedManagers,
    });
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <form onSubmit={handleSubmit}>
          <div className="dialog-header">
            <h2>Create New Project</h2>

            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>

          <div className="dialog-body">
            <h5>
              {step === 1 && "Basic Information"}
              {step === 2 && "Engineering Team"}
              {step === 3 && "Review & Create"}
            </h5>

            {step === 1 && (
              <div className="form-grid">
                <div className="form-group">
                  <label>Project Number *</label>
                  <input
                    type="text"
                    name="projectNumber"
                    value={newProject.projectNumber}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        projectNumber: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Project Name *</label>
                  <input
                    type="text"
                    name="projectName"
                    value={newProject.projectName}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        projectName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    name="clientName"
                    value={newProject.clientName}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        clientName: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={newProject.startDate}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        startDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={newProject.endDate}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        endDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Project Type</label>

                  <select
                    name="projectType"
                    value={newProject.projectType}
                    onChange={handleChange}
                  >
                    <option>Engineering</option>
                    <option>Pipeline</option>
                    <option>Offshore</option>
                    <option>FEED</option>
                    <option>PMC</option>
                    <option>EPC</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Scope of the Project</label>

                  <textarea
                    rows="4"
                    name="description"
                    value={newProject.description}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        description: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </div>
            )}

            {/* {step === 2 && (
            <div className="form-grid">
              <div className="form-group">
                <label>Client Name *</label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label>Contact Person</label>
                <input type="text" />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="email" />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" />
              </div>

              <div className="form-group full-width">
                <label>Address</label>
                <textarea rows="3"></textarea>
              </div>
            </div>
          )} */}

            {step === 2 && (
              <>
                <div className="section-title">
                  <h5>Engineering Disciplines</h5>
                </div>

                <div className="discipline-container">
                  {disciplines.map((discipline) => (
                    <button
                      key={discipline}
                      type="button"
                      className={`discipline-chip ${
                        selectedDisciplines.includes(discipline) ? "active" : ""
                      }`}
                      onClick={() => toggleDiscipline(discipline)}
                    >
                      {discipline}
                    </button>
                  ))}
                </div>

                <hr />

                <div className="section-title">
                  <h4>Assign Team Members</h4>
                </div>

                <div className="form-group">
                  <label>Project Manager</label>

                  {newProject.projectManagers.map((manager, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <select
                        value={manager}
                        onChange={(e) =>
                          handleManagerChange(index, e.target.value)
                        }
                      >
                        <option value="">Select Project Manager</option>

                        {posts.map((post) => (
                          <option
                            key={post._id}
                            value={`${post.firstName} ${post.lastName}`}
                          >
                            {post.firstName} {post.lastName}
                          </option>
                        ))}
                      </select>

                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeManager(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <button type="button" onClick={addManager}>
                    + Add Manager
                  </button>

                  {/* <div className="form-group">
                  <label>Project Coordinator</label>

                  <select>
                    <option>Select Coordinator</option>
                  </select>
                </div> */}

                  <div className="form-group full-width">
                    <label>Project Members</label>

                    <select
                      multiple
                      style={{ height: 160 }}
                      name="projectMembers"
                      value={newProject.projectMembers}
                      onChange={handleMembersChange}
                    >
                      {posts.map((post) => (
                        <option key={post._id} value={post._id}>
                          {post.firstName} - {post.lastName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <div className="review-box">
                <h4>Review Project Details</h4>

                <table className="review-table">
                  <tbody>
                    <tr>
                      <td>Project Number</td>
                      <td>{newProject.projectNumber}</td>
                    </tr>

                    <tr>
                      <td>Project Name</td>
                      <td>{newProject.projectName}</td>
                    </tr>

                    <tr>
                      <td>Client</td>
                      <td>{newProject.clientName}</td>
                    </tr>

                    <tr>
                      <td>Project Type</td>
                      <td>{newProject.projectType}</td>
                    </tr>

                    <tr>
                      <td>Project Manager</td>
                      <td>{newProject.projectManager}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="review-note">
                  Please verify all project information before creating the
                  project.
                </div>
              </div>
            )}
          </div>

          <div className="dialog-footer">
            {step > 1 && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setStep(step - 1)}
              >
                Previous
              </button>
            )}

            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            {step < 3 ? (
              <button
                type="button"
                className="create-btn"
                onClick={() => setStep(step + 1)}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="create-btn">
                Create Project
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectDialog;
