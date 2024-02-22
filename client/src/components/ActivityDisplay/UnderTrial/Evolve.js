import React, { useState } from "react";
import { Divider, Grid } from "@mui/material";

// import { useDispatch } from "react-redux";

import "./Style1.css"; // Import CSS file for styling
// import { todoList } from "../../../api";
// import ProjectCode from "./ProjectCodePopUp";
import ProjectCodePopUp from "./ProjectCodePopUp";
import ActivityCodePopUp from "./ActivityCodePopUp";
const Evolve = ({ currentId }) => {
  // const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const [projectCode, setProjectCode] = useState("");
  const [activityCode, setActivityCode] = useState("");
  const [date, setDate] = useState("");
  const [netTime, setNetTime] = useState("");
  const [overTime, setOverTime] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // useEffect(() => {
  //   calculateAnalytics(); // Call calculateAnalytics whenever entries are updated
  // }, [entries]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEntry = {
      projectCode,
      activityCode,
      date,
      netTime: parseFloat(netTime),
      overTime: parseFloat(overTime),
    };
    if (validateEntry(newEntry)) {
      if (editIndex !== -1) {
        const updatedEntries = [...entries];
        updatedEntries[editIndex] = newEntry;
        setEntries(updatedEntries);
        // await dispatch(todoList(entries, currentId));
        // setEditIndex(-1); // Reset edit index
      } else {
        setEntries([...entries, newEntry]);
        // await dispatch(todoList(entries, currentId));
      }
    } else {
      alert(
        'Invalid entry! Please check your input values and try again. Selected Date must not fall under "SUNDAY" & 2nd-4th "SATURDAY".'
      );
    }
    clearForm();
  };

  const validateEntry = (newEntry) => {
    const today = new Date(date);
    const currentDay = today.getDay();
    if (
      currentDay === 0 ||
      (currentDay === 6 && isSecondOrFourthSaturday(today))
    ) {
      return false;
    }

    const daysUntilNextMonday = 1 - currentDay;
    const mondayOfCurrentWeek = new Date(today);
    mondayOfCurrentWeek.setDate(today.getDate() + daysUntilNextMonday);

    const startOfWeek = new Date(mondayOfCurrentWeek);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 5);

    const entriesForCurrentWeek = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfWeek && entryDate <= endOfWeek;
    });

    const totalNetTime = entriesForCurrentWeek.reduce(
      (total, entry) => total + entry.netTime,
      0
    );

    return totalNetTime + newEntry.netTime <= 48;
  };

  const isSecondOrFourthSaturday = (date) => {
    const dayOfMonth = date.getDate();
    const weekOfMonth = Math.floor((dayOfMonth - 1) / 7) + 1;
    return weekOfMonth === 2 || weekOfMonth === 4;
  };

  const editEntry = (index) => {
    const entryToEdit = entries[index];
    setProjectCode(entryToEdit.projectCode);
    setActivityCode(entryToEdit.activityCode);
    setDate(entryToEdit.date);
    setNetTime(entryToEdit.netTime.toString());
    setOverTime(entryToEdit.overTime.toString());
    setEditIndex(index);
  };

  const clearForm = () => {
    console.log("Clear....!!!");
    setProjectCode("");
    setActivityCode("");
    setDate("");
    setNetTime("");
    setOverTime("");
    setEditIndex(-1);
  };

  const deleteEntry = (index) => {
    const updatedEntries = [...entries];
    updatedEntries.splice(index, 1);
    setEntries(updatedEntries);
  };

  const [projectopen, setProjectOpen] = useState(false);

  const [activityopen, setActivityOpen] = useState(false);

  const togglePopup1 = () => {
    setProjectOpen(!projectopen);
  };

  const togglePopup2 = () => {
    setActivityOpen(!activityopen);
  };

  // const handleInputChange = (event) => {
  //   setProjectCode(event.target.value);
  // };

  const handleAnalysis = () => {
    if (showAnalysis === false) {
      setShowAnalysis(true);
    } else {
      setShowAnalysis(false);
    }

    // if (entries === 0) {
    //   setShowAnalysis(false);
    // }
  };

  return (
    <>
      <h2 style={{ color: "#16355d", marginLeft: "50px" }}>
        Project Time Sheet
      </h2>
      <Divider sx={{ fontSize: "50px", fontWeight: "bold" }} />

      <div className="time-sheet-container" style={{ display: "flex" }}>
        <Grid
          sx={{
            padding: "10px",
            width: "30%",
            backgroundColor: "whitesmoke",
            margin: "0px 20px 0px 20px",
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

        <hr />
        <Grid sx={{ width: "70%" }}>
          <div>
            {/* <h2 style={{ color: "#16355d" }}>Time Sheet Entries</h2> */}
            <table className="time-sheet-table">
              <thead>
                <tr>
                  <th style={{ color: "#16355d" }}>Project Code</th>
                  <th style={{ color: "#16355d" }}>Activity Code</th>
                  <th style={{ color: "#16355d" }}>Date</th>
                  <th style={{ color: "#16355d" }}>Net Time (hrs)</th>
                  <th style={{ color: "#16355d" }}>Over Time (hrs)</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={index}>
                    <td style={{ color: "#e55d17" }}>{entry.projectCode}</td>
                    <td style={{ color: "#e55d17" }}>{entry.activityCode}</td>
                    <td style={{ color: "#e55d17" }}>{entry.date}</td>
                    <td style={{ color: "#e55d17" }}>{entry.netTime}</td>
                    <td style={{ color: "#e55d17" }}>{entry.overTime}</td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <button onClick={() => editEntry(index)}>Edit</button>
                      <button onClick={() => deleteEntry(index)}>Delete</button>
                    </div>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Grid>
      </div>
    </>
  );
};

export default Evolve;
