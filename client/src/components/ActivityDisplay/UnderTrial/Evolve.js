import React, { useState, useEffect } from "react";
import { Divider, Grid, CircularProgress, Box, Button } from "@mui/material";

import { useDispatch } from "react-redux";

import "./Style1.css"; // Import CSS file for styling
import { tableDelete, tableEdit, todoList } from "../../../action/posts";
import ProjectCodePopUp from "./ProjectCodePopUp";
import ActivityCodePopUp from "./ActivityCodePopUp";
import { getPosts } from "../../../action/posts";
import { useNavigate } from "react-router-dom";

const Evolve = ({ currentId, posts }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const [projectCode, setProjectCode] = useState();
  const [activityCode, setActivityCode] = useState("");
  const [date, setDate] = useState("");
  const [netTime, setNetTime] = useState("");
  const [overTime, setOverTime] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);

  const [projectopen, setProjectOpen] = useState(false);

  const [activityopen, setActivityOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("profile"));
  const [role, setRole] = useState(user?.result?.role);

  const array = [];

  useEffect(() => {
    array.length = 0;
    dispatch(getPosts()).then(() => {
      console.log("Data recieved in Evolve page...!!!@@$$");
      // eslint-disable-next-line array-callback-return
      posts.map((post) => {
        for (let i = 0; i < post.projectCode.length; i++) {
          if (post._id === currentId) {
            array.push({
              projectCode: post.projectCode[i],
              activityCode: post.activityCode[i],
              date: post.date[i],
              netTime: post.netTime[i],
              overTime: post.overTime[i],
              editIndex: post.editIndex[i],
            });
            // setRole(post?.role);
          }
        }
      });
    });
  }, [isLoading, currentId]);

  const handleSubmit = async (e) => {
    const newEntry = {
      projectCode,
      activityCode,
      date,
      netTime: parseFloat(netTime),
      overTime: parseFloat(overTime),
      editIndex: parseFloat(editIndex),
    };

    if (validateEntry(newEntry)) {
      if (editIndex !== -1) {
        const indexed = [editIndex];
        const updatedEntries = [...entries];
        updatedEntries[editIndex] = newEntry;
        setEntries(updatedEntries);
        await dispatch(tableEdit(currentId, indexed, newEntry)).then((res) => {
          console.log("Data is recieved in the Data Base for Editing....");
          setEditIndex(-1); // Reset edit index
        });
      } else {
        setEntries([...entries, newEntry]);
        await dispatch(todoList(newEntry, currentId)).then((res) => {
          console.log("Data is recieved in the Data Base");
          clearForm();
        });
      }
    } else {
      alert(
        'Invalid entry! Please check your input values and try again. Selected Date must not fall under "SUNDAY" & 2nd-4th "SATURDAY".'
      );
    }
    clearForm();
  };

  //checking for the valid entry in the form and return result in "True" or "False".....!!!
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

  //Logic for Second and Fourth Saturday....!!!!!
  const isSecondOrFourthSaturday = (date) => {
    const dayOfMonth = date.getDate();
    const weekOfMonth = Math.floor((dayOfMonth - 1) / 7) + 1;
    return weekOfMonth === 2 || weekOfMonth === 4;
  };

  //Logic for clearing the form.........
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

  // Here the array is being loaded....!!!
  // eslint-disable-next-line array-callback-return
  posts.map((post) => {
    for (let i = 0; i < post.projectCode.length; i++) {
      if (post._id === currentId) {
        array.push({
          projectCode: post.projectCode[i],
          activityCode: post.activityCode[i],
          date: post.date[i],
          netTime: post.netTime[i],
          overTime: post.overTime[i],
          editIndex: post.editIndex[i],
        });
      }
    }
  });

  //This logic is creating a delay time for loading the array....!!
  useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  //Logic for deleting the entry......!!!
  const deleteEntry = (index) => {
    dispatch(tableDelete(currentId, index))
      .then(() => {
        setIsLoading(true);
        window.location.reload();
      })
      .catch((err) => {
        return console.log("Error in deleting the file..!!");
      });
    let updatedArray = updateArray();
    console.log(updatedArray[index]);
  };

  //To Edit the entry....!!!!
  const editEntry = (index) => {
    let updatedArray = updateArray();
    setEditIndex(index);
    setProjectCode(updatedArray[index].projectCode);
    setActivityCode(updatedArray[index].activityCode);
    setDate(updatedArray[index].date);
    setNetTime(updatedArray[index].netTime);
    setOverTime(updatedArray[index].overTime);
  };

  const updateArray = () => {
    // eslint-disable-next-line array-callback-return
    posts.map((post) => {
      for (let i = 0; i < post.projectCode.length; i++) {
        if (post._id === currentId) {
          array.push({
            projectCode: post.projectCode[i],
            activityCode: post.activityCode[i],
            date: post.date[i],
            netTime: post.netTime[i],
            overTime: post.overTime[i],
          });
        }
      }
    });
    return array;
  };

  // console.log(isLoading);
  // console.log(role);

  const handleTSPrint = () => {
    // navigate("/evolveprintlayout", {
    //   state: {
    //     projectCode,
    //     activityCode,
    //     date,
    //     netTime,
    //     overTime,
    //   },
    // });
  };
  return (
    <>
      <h2
        style={{ color: "#16355d", marginLeft: "50px", fontFamily: "Roboto" }}
      >
        Project Time Sheet
      </h2>
      <Divider sx={{ fontSize: "50px", fontWeight: "bold" }} />

      {/* form Body start from here....!! */}

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
            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="projectCode"
              >
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
                // value={projectCode}
                defaultValue={projectCode}
                onFocus={togglePopup1} // Using onFocus event to trigger the popup
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
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="activityCode"
              >
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
                // value={activityCode}
                defaultValue={activityCode}
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

            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="date"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                // value={date}
                defaultValue={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="netTime"
              >
                Net Time (hrs):
              </label>
              <input
                type="number"
                id="netTime"
                // value={netTime}
                defaultValue={netTime}
                onChange={(e) => setNetTime(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label
                style={{ color: "#16355d", fontFamily: "Roboto" }}
                htmlFor="overTime"
              >
                Over Time (hrs):
              </label>
              <input
                type="number"
                id="overTime"
                // value={overTime}
                defaultValue={overTime}
                onChange={(e) => setOverTime(e.target.value)}
              />
            </div>
            {/* </div> */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button style={{ fontFamily: "Roboto" }} type="submit">
                {editIndex !== -1 ? "Update The Entry" : "Submit The Entry"}
              </button>
              <button
                style={{ fontFamily: "Roboto" }}
                type="button"
                onClick={clearForm}
              >
                Clear
              </button>
            </div>
          </form>
        </Grid>

        {/* Body for displaing the table star from here.....!!! */}
        <hr />
        <Grid sx={{ width: "70%" }}>
          <div>
            {isLoading ? (
              <Box sx={{ marginLeft: "400px", marginTop: "100px" }}>
                <CircularProgress />
              </Box>
            ) : (
              <table className="time-sheet-table">
                <thead>
                  <tr>
                    <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                      Project Code
                    </th>
                    <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                      Activity Code
                    </th>
                    <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                      Date
                    </th>
                    <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                      Net Time (hrs)
                    </th>
                    <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                      Over Time (hrs)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {array.map((post, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      >
                        {post.projectCode}
                      </td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      >
                        {post.activityCode}
                      </td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      >
                        {post.date}
                      </td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      >
                        {post.netTime}
                      </td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      >
                        {post.overTime}
                      </td>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          padding: "10px",
                          alignContent: "center",
                        }}
                      >
                        {role === "admin" && (
                          <>
                            <button
                              id="editButton"
                              style={{ fontFamily: "Roboto" }}
                              onClick={() => editEntry(index)}
                            >
                              Edit
                            </button>
                            <button
                              id="deleteButton"
                              style={{ fontFamily: "Roboto" }}
                              onClick={() => deleteEntry(index)}
                            >
                              Delete The Entry
                            </button>
                          </>
                        )}
                        {role === "manager" && (
                          <>
                            <button
                              id="editButton"
                              style={{ fontFamily: "Roboto" }}
                              onClick={() => editEntry(index)}
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Grid>
        <div>
          <Button onClick={handleTSPrint}>Download</Button>
        </div>
      </div>
    </>
  );
};
export default Evolve;
