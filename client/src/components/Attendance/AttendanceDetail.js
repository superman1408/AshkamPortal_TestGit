import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Divider,
  Card,
  Box,
  Checkbox,
  Button,
  Avatar,
  Stack,
} from "@mui/material";

import { getPosts } from "../../action/posts";
import { dailyAttendance, logList } from "../../action/posts";
// import HalfDoughnutWithPointer from "../Attendance/AttendanceChart";
import PunctualityRadarChart from "./AttendanceChart";
import Panel from "../Panel/Panel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AttendanceDetail = ({ currentId, posts }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const navigate = useNavigate();

  const [totalHours, setTotalHours] = useState(null);

  const [hoveredData, setHoveredData] = useState(false);

  const [formData, setFormData] = useState({
    presentEmployee: "",
    absentEmployee: "",
  });

  const [logData, setLogData] = useState({
    logDate: "",
    logIn: "",
    logOut: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const array = [];

  // useEffect(() => {
  //   currentId && setTotalHours(null);
  // }, [currentId]);

  useEffect(() => {
    array.length = 0;
    dispatch(getPosts()).then(() => {
      posts.map((post) => {
        if (post._id === currentId) {
          // console.log(post.logIn);
          for (let i = 0; i < post.logIn.length; i++) {
            array.push({
              logIn: post.logIn[i],
            });
          }
        }
      });
    });
  }, [currentId, dispatch, posts, array]);

  // console.log("logData", logData);

  //  changes the "handle submit" code as window.location.relaod() is not good practice for sending response to server side

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    await dispatch(logList(logData, currentId))
      .then(() => {
        alert("Successfully Logged!");

        // Update the state or perform any necessary updates instead of reloading
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false); // Reset the form submission state
      });

    window.location.reload();
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    dispatch(dailyAttendance(formData));
    navigate("/home");
  };

  // eslint-disable-next-line array-callback-return
  posts.forEach((post) => {
    if (post._id === currentId) {
      for (let i = 0; i < post.logDate.length; i++) {
        array.push({
          logDate: post.logDate[i],
          logIn: post.logIn[i],
          logOut: post.logOut[i],
        });
      }
    }
  });

  const role = user.result.role;

  const verifyTheRole = () => {
    if (user.result.role === "admin") {
      return true;
    } else {
      return false;
    }
  };

  const calculateTotalHours = (logIn, logOut) => {
    if (logIn && logOut) {
      const loginTime = new Date(`01/01/2022 ${logIn}`);
      const logoutTime = new Date(`01/01/2022 ${logOut}`);
      const diffInMilliseconds = logoutTime - loginTime;
      const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
      return diffInHours.toFixed(2);
    }
    return null;
  };

  const handleHoverDate = (logDate) => {
    setHoveredData(true);
    const hoveredLog = array.find((item) => item.logDate === logDate);
    if (hoveredLog) {
      // Calculate total hours for the hovered log date
      const totalHours = calculateTotalHours(
        hoveredLog.logIn,
        hoveredLog.logOut
      );

      // Update state with the total hours
      setTotalHours(totalHours);
    } else {
      // If no matching log is found, reset total hours to null
      setTotalHours(null);
    }
  };

  const [checked, setChecked] = React.useState(false);

  const headerCellStyle = {
    padding: "12px",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#16355d",
  };

  const cellStyle = {
    padding: "16px",
    fontFamily: "Roboto",
    fontSize: "14px",
    textAlign: "center",
    verticalAlign: "middle",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
  };

  const loginStyle = {
    backgroundColor: "#d4f6dd",
    color: "#1a8f46",
    padding: "8px 16px",
    borderRadius: "12px",
    fontWeight: "500",
    display: "inline-block",
    fontFamily: "Roboto",
  };

  const logoutStyle = {
    backgroundColor: "#ffe6d9",
    color: "#e55d17",
    padding: "8px 16px",
    borderRadius: "12px",
    fontWeight: "500",
    display: "inline-block",
    fontFamily: "Roboto",
  };

  const handleGoBack = () => {
    navigate(-1); // this means "go back one step in history"
  };

  return (
    <div style={{ height: "auto" }}>
      <div style={{ display: "flex" }}>
        <div style={{ display: "inline" }}>
          <Button
            onClick={handleGoBack}
            sx={{
              padding: "8px 16px",
              color: "#16355d",
              display: {
                xs: "none",
                sm: "inline-block",
              },
            }}
          >
            <ArrowBackIcon />
          </Button>
        </div>
        <h2
          style={{ color: "#16355d", marginLeft: "20px", fontFamily: "Roboto" }}
        >
          Employee Attendance
        </h2>
      </div>

      <Divider sx={{ fontSize: "50px", fontWeight: "bold" }} />

      <Grid
        container
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "stretch",

          "@media (max-width: 600px)": {
            flexDirection: "column",
            // width: "50%",
          },
        }}
      >
        <Grid item xs={12} md={2}>
          <Panel />
        </Grid>

        <Grid
          item
          xs={12}
          md={3.5}
          sx={{
            // display: "flex",
            padding: "20px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "15px",
            margin: "0px 5px 2px 10px",
          }}
        >
          {verifyTheRole() && (
            <>
              <form className="time-sheet-form" onSubmit={handleSubmit}>
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "16px",
                    padding: "24px",
                    maxWidth: "400px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    marginBottom: "auto",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        // marginLeft: "10px",
                        justifyContent: "center",
                        bgcolor: "orange",
                        userSelect: "none", // Prevent selection
                        pointerEvents: "none", // Prevent interaction
                      }}
                      src={user.result.selectedFile}
                    />
                  </Stack>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                      margin: "5px",
                      textAlign: "center",
                      color: "#16355d",
                    }}
                  >
                    {posts.map((post) => {
                      if (post._id === currentId) {
                        return (
                          post?.firstName.charAt(0).toUpperCase() +
                          post?.firstName.slice(1).toLowerCase() +
                          " " +
                          post?.lastName.charAt(0).toUpperCase() +
                          post?.lastName.slice(1).toLowerCase()
                        );
                      }
                      return null;
                    })}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {(() => {
                      const matchedPost = posts.find(
                        (post) => post._id === currentId
                      );

                      let statusText = "Not found";
                      let statusColor = "grey";

                      if (matchedPost) {
                        if (matchedPost.presentStatus === "true") {
                          statusText = "Present";
                          statusColor = "green";
                        } else if (matchedPost.presentStatus === "false") {
                          statusText = "Absent";
                          statusColor = "red";
                        } else {
                          statusText = "Unknown";
                          statusColor = "orange";
                        }
                      }

                      return (
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            fontSize: 12,
                            color: "white",
                            bgcolor: statusColor,
                            borderRadius: "12px",
                            padding: "5px",
                            width: "50%",
                            textAlign: "center",
                          }}
                        >
                          {statusText}
                        </Typography>
                      );
                    })()}
                  </Box>
                </div>

                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "16px",
                    padding: "24px",
                    maxWidth: "400px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    marginTop: "10px",
                    marginBottom: "auto",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {/* DATE */}

                  <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="logDate"
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        color: "#16355d",
                        fontFamily: "Roboto",
                        fontWeight: "bold",
                      }}
                    >
                      Date:
                    </label>
                    <input
                      type="date"
                      id="logDate"
                      value={logData.logDate}
                      onChange={(e) =>
                        setLogData({ ...logData, logDate: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        outlineColor: "#16355d",
                      }}
                    />
                  </div>
                  {/* LOG IN */}
                  <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="logIn"
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        color: "#16355d",
                        fontFamily: "Roboto",
                        fontWeight: "bold",
                      }}
                    >
                      Log In Time:
                    </label>
                    <input
                      type="time"
                      id="logIn"
                      value={logData.logIn}
                      onChange={(e) =>
                        setLogData({ ...logData, logIn: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        outlineColor: "#16355d",
                      }}
                    />
                  </div>
                  {/* LOG OUT */}
                  <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label
                      htmlFor="logOut"
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        color: "#16355d",
                        fontFamily: "Roboto",
                        fontWeight: "bold",
                      }}
                    >
                      Log Out Time:
                    </label>
                    <input
                      type="time"
                      id="logOut"
                      value={logData.logOut}
                      onChange={(e) =>
                        setLogData({ ...logData, logOut: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        outlineColor: "#16355d",
                      }}
                    />
                  </div>
                  {/* SUBMIT BUTTON */}
                  <div style={{ textAlign: "right" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: "#16355d",
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: "bold",
                        px: 3,
                        py: 1,
                        "&:hover": { bgcolor: "#122a4a" },
                      }}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </>
          )}
          {(role === "employee" || role === "manager") && (
            <>
              <PunctualityRadarChart data={array} />
            </>
          )}{" "}
        </Grid>

        <Grid
          xs={12}
          md={6}
          item
          sx={{
            display: "flex",
            width: "100%",
            padding: "2px",
            marginLeft: "5px",
            "@media (max-width: 600px)": {
              flexDirection: "column",
            },
          }}
        >
          <Grid
            item
            sx={{
              borderRadius: "15px",
              backgroundColor: "white",
              border: "1px solid lightgray",
              padding: "10px",
              overflow: "auto",
              width: "100%",
              top: "100px",
              height: "950px",
              minHeight: "300px",
              pointerEvents: "auto",
            }}
          >
            <Typography
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                margin: "5px",
                color: "#16355d",
                textAlign: "center",
              }}
            >
              Daily Time Records
            </Typography>
            <Divider sx={{ borderWidth: "3px", margin: "5px" }} />
            <div>
              <table
                style={{
                  width: "100%",
                  maxWidth: "800px",
                  margin: "10px auto",
                  borderCollapse: "separate",
                  borderSpacing: "0 10px", // spacing between rows
                }}
              >
                <thead style={{ borderRadius: "12px" }}>
                  <tr style={{ borderRadius: "12px" }}>
                    <th style={headerCellStyle}>Date</th>
                    <th style={headerCellStyle}>Log In</th>
                    <th style={headerCellStyle}>Log Out</th>
                  </tr>
                </thead>

                <tbody>
                  {array.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => handleHoverDate(item.logDate)}
                      style={{
                        backgroundColor: "#fff",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                        borderRadius: "12px",
                        // cursor: "pointer",
                        textAlign: "center",
                      }}
                    >
                      <td
                        style={{ ...cellStyle, borderRadius: "12px 0 0 12px" }}
                      >
                        {item?.logDate}
                      </td>
                      <td>
                        <span style={loginStyle}>{item?.logIn}</span>
                      </td>
                      <td>
                        <span style={logoutStyle}>{item?.logOut}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendanceDetail;

//
