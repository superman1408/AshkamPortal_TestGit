import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";



import ProjectCodePopUp from '../UnderTrial/ProjectCodePopUp';
import ActivityCodePopUp from '../UnderTrial/ActivityCodePopUp';

import "./Style.css";




const Form = ({ currentId }) => {
  const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const [projectCode, setProjectCode] = useState("");
  const [activityCode, setActivityCode] = useState("");
  const [date, setDate] = useState("");
  const [netTime, setNetTime] = useState("");
  const [overTime, setOverTime] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const [projectopen, setProjectOpen] = useState(false);
  const [activityopen, setActivityOpen] = useState(false);




  const handleSubmit = () => {};



  const clearForm = () => {
    console.log("Clear....!!!");
    setProjectCode("");
    setActivityCode("");
    setDate("");
    setNetTime("");
    setOverTime("");
    setEditIndex(-1);
  };



  const togglePopup1 = () => {
    setProjectOpen(!projectopen);
  };

  const togglePopup2 = () => {
    setActivityOpen(!activityopen);
  };



  return (
    <div className="time-sheet-container" style={{ display: "flex" }}>
      <Grid
        sx={{
          padding: "10px",
          width: "100%",
          backgroundColor: "whitesmoke",
          margin: "0px 5px 0px 5px",
        }}
      >
        <form onSubmit={handleSubmit} className="time-sheet-form">
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}> */}
          <div className="form-group">
            <label style={{ color: "#16355d" }} htmlFor="projectCode">
              Project Code:
            </label>

            <input
              style={{
                width: "100%",
                height: "30px",
                padding: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                color: "#e55d17",
              }}
              type="text"
              id="projectCode"
              defaultValue={projectCode}
              onFocus={togglePopup1} // Using onFocus event to trigger the popup
              // onChange={handleInputChange} // Handle input change
              autoComplete="off"
            />
            {/* ______________________________________pop window contents_____________________________________________ */}

            {projectopen && (
              <ProjectCodePopUp
                setProjectCode={setProjectCode}
                setProjectOpen={setProjectOpen}
              />
            )}
          </div>

          <div className="form-group">
            {/* <div style={{ marginLeft: "10px" }}> */}
            <label style={{ color: "#16355d" }} htmlFor="activityCode">
              Activity Code:
            </label>
            <input
              style={{
                width: "100%",
                height: "30px",
                padding: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                color: "#e55d17",
              }}
              type="text"
              id="activityCode"
              defaultValue={activityCode}
              // onChange={(e) => setActivityCode(e.target.value)}
              onFocus={togglePopup2}
              autoComplete="off"
            />
            {activityopen && (
              <ActivityCodePopUp
                setActivityCode={setActivityCode}
                setActivityOpen={setActivityOpen}
              />
            )}
          </div>
          {/* </div> */}
          {/* </div> */}

          <div className="form-group">
            <label style={{ color: "#16355d" }} htmlFor="date">
              Date:
            </label>
            <input
              type="date"
              id="date"
              defaultValue={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label style={{ color: "#16355d" }} htmlFor="netTime">
              Net Time (hrs):
            </label>
            <input
              type="number"
              id="netTime"
              defaultValue={netTime}
              onChange={(e) => setNetTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            {/* <div style={{ marginLeft: "10px" }}> */}
            <label style={{ color: "#16355d" }} htmlFor="overTime">
              Over Time (hrs):
            </label>
            <input
              type="number"
              id="overTime"
              defaultValue={overTime}
              onChange={(e) => setOverTime(e.target.value)}
            />
          </div>
          {/* </div> */}
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <button type="submit">
              {editIndex !== -1 ? "Update" : "Submit"}
            </button>
            <button type="button" onClick={clearForm}>
              Clear
            </button>
          </div>
        </form>
      </Grid>
    </div>
  )
}

export default Form;
