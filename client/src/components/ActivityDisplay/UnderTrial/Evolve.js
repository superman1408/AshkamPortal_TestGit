import React, { useState, useEffect, useRef } from "react";
import {
  Divider,
  Grid,
  CircularProgress,
  Box,
  Button,
  ButtonBase,
} from "@mui/material";

import { useDispatch } from "react-redux";

import "./Style1.css"; // Import CSS file for styling
import { tableDelete, tableEdit, todoList } from "../../../action/posts";
import ProjectCodePopUp from "./ProjectCodePopUp";
import ActivityCodePopUp from "./ActivityCodePopUp";
import { getPosts } from "../../../action/posts";

import LOGO from "../../../assets/AshkamLogoTransparentbc.png";
import print from "../../../assets/print.png";

import { useReactToPrint } from "react-to-print";

function Evolve({ currentId, posts }) {
  const dispatch = useDispatch();
  const [entries, setEntries] = useState([]);
  const [projectCode, setProjectCode] = useState("");
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

  const [printingShow, setPrintingShow] = useState(false);

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

  const componentRef = useRef();

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const dateTime = `${currentDate} ${currentTime}`;

  const downloadPdf = useReactToPrint({
    content: () => componentRef.current,
    dateTime,

    documentTitle: "TimeSheet Summary",
    onBeforePrint: () => setPrintingShow(true),
    onAfterPrint: () => {
      setPrintingShow(false);
    },
  });

  const handletrue = () => {
    setPrintingShow(true);
    setTimeout(() => {
      downloadPdf();
    }, 10);
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
      {role === ("admin" || "manager") && (
        <div style={{ float: "right", width: "5px", height: "5px" }}>
          <ButtonBase sx={{ float: "right" }} onClick={handletrue}>
            <img
              style={{ float: "right", width: "30px", height: "30px" }}
              src={print}
              alt="print"
            />
          </ButtonBase>
        </div>
      )}

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
              <div style={{ padding: "30px" }} ref={componentRef}>
                {printingShow && (
                  <>
                    <table
                      table
                      style={{
                        padding: "5px",
                        backgroundColor: "#f2f2f2",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        marginBottom: "10px",
                        maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                      }}
                    >
                      {/* <thead> */}
                      <tr
                        height="50px"
                        style={{
                          // backgroundColor: "lightgray",
                          color: "black",
                          // textAlign: "center",
                          fontSize: "20px",
                          fontWeight: "600",
                          border: "1px solid black",
                        }}
                      >
                        <div
                          style={{
                            padding: "10px",
                          }}
                        >
                          <img src={LOGO} alt="logo" />
                        </div>
                        <td style={{ padding: "5px" }}>TIME SHEET SUMMARY</td>
                      </tr>
                    </table>
                    <table
                      style={{
                        // marginLeft: "100px",
                        padding: "5px",
                        // marginLeft: "100px",
                        borderCollapse: "collapse",
                        border: "1px solid black",
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "100%",
                        marginBottom: "10px",
                        maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
                      }}
                    >
                      <tbody>
                        {posts.map((post, index) => {
                          console.log(post._id);
                          if (post._id === currentId) {
                            console.log("current", post._id);
                            console.log("currentId", currentId);
                            return (
                              <>
                                <tr key={index}>
                                  <th
                                    style={{
                                      border: "1px solid black",
                                      textAlign: "center",
                                      fontFamily: "Roboto",
                                    }}
                                  >
                                    Employee Id
                                  </th>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      textAlign: "center",
                                      fontFamily: "Roboto",
                                    }}
                                  >
                                    {post?.employeeId}
                                  </td>
                                  <th
                                    style={{
                                      border: "1px solid black",
                                      textAlign: "center",
                                      fontFamily: "Roboto",
                                    }}
                                  >
                                    Name
                                  </th>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      textAlign: "center",
                                      fontFamily: "Roboto",
                                    }}
                                  >
                                    {post?.firstName + " " + post?.lastName}
                                  </td>
                                </tr>
                                <tr key={index}>
                                  <th
                                    style={{
                                      border: "1px solid black",
                                      textAlign: "center",
                                      fontFamily: "Roboto",
                                    }}
                                  >
                                    Department
                                  </th>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      textAlign: "center",
                                      fontFamily: "Roboto",
                                    }}
                                  >
                                    {post?.department}
                                  </td>
                                  <th
                                    style={{
                                      border: "1px solid black",
                                      textAlign: "center",
                                      fontFamily: "Roboto",
                                    }}
                                  >
                                    Duration
                                  </th>
                                  <td
                                    style={{
                                      border: "1px solid black",
                                      textAlign: "center",
                                      fontFamily: "Roboto",
                                    }}
                                  >
                                    {post?.date[0] +
                                      " " +
                                      "to" +
                                      " " +
                                      post?.date[post.date.length - 1]}
                                  </td>
                                </tr>
                              </>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </>
                )}
                <table
                  className="time-sheet-table"
                  style={{
                    padding: "10px",
                    borderCollapse: "collapse",
                    // border: "1px solid black",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "100%",
                    maxWidth: "800px",
                  }}
                >
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
                        {printingShow === false && (
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
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {role === ("admin" || "manager") && (
              <Button
                sx={{ backgroundColor: "#047681", color: "white" }}
                onClick={handletrue}
              >
                Download
              </Button>
            )}
          </div>
        </Grid>
      </div>
    </>
  );
}
export default Evolve;
