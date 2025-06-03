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
} from "@mui/material";

import { getPosts } from "../../action/posts";
import { dailyAttendance, logList } from "../../action/posts";
import HalfDoughnutWithPointer from "../Attendance/AttendanceChart";
import Panel from "../Panel/Panel";

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

  useEffect(() => {
    currentId && setTotalHours(null);
  }, [currentId]);

  useEffect(() => {
    array.length = 0;
    dispatch(getPosts()).then(() => {
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
          setTotalHours(null);
        }
      });
    });
  }, [currentId, dispatch]);

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

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <h2
        style={{ color: "#16355d", marginLeft: "20px", fontFamily: "Roboto" }}
      >
        Employee Attendance
      </h2>
      <div style={{ display: "flex" }}></div>

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
        {verifyTheRole() && (
          <>
            <Grid
              item
              xs={12}
              md={2}
              sx={{
                display: "flex",
                padding: "15px",
                width: "100%",
                minHeight: "400px", // ✅ Add this
                // marginLeft: "5px",
                backgroundColor: "white",
                margin: "0px 3px 2px 10px",
                borderRadius: "15px",
                border: "1px solid lightgray",
              }}
            >
              <form
                className="time-sheet-form"
                onSubmit={handleAttendanceSubmit}
              >
                <div className="form-group">
                  <label
                    style={{ color: "#16355d", fontFamily: "Roboto" }}
                    htmlFor="projectCode"
                  >
                    Present Employee :
                  </label>

                  <input
                    style={{
                      fontSize: "16px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      color: "#e55d17",
                    }}
                    type="text"
                    id="projectCode"
                    value={formData.presentEmployee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        presentEmployee: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label
                    style={{ color: "#16355d", fontFamily: "Roboto" }}
                    htmlFor="activityCode"
                  >
                    Absent Employee :
                  </label>
                  <input
                    style={{
                      // width: "auto",
                      // height: "30px",
                      // padding: "8px",
                      fontSize: "16px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      color: "#e55d17",
                    }}
                    type="text"
                    id="activityCode"
                    value={formData.absentEmployee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        absentEmployee: e.target.value,
                      })
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    float: "right",
                    marginTop: "50px",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: "#16355d" }}
                  >
                    SUBMIT
                  </Button>
                </div>
              </form>
            </Grid>

            <Grid
              item
              xs={12}
              md={3}
              sx={{
                // display: "flex",
                padding: "10px",
                width: "100%",
                backgroundColor: "white",
                borderRadius: "15px",
                border: "1px solid lightgray",
                margin: "0px 5px 2px 5px",
              }}
            >
              <form className="time-sheet-form" onSubmit={handleSubmit}>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label
                    style={{ color: "#16355d", fontFamily: "Roboto" }}
                    htmlFor="logout"
                  >
                    Date :
                  </label>
                  <input
                    style={{ width: "120px" }}
                    width="100"
                    type="date"
                    id="netTime"
                    value={logData.logDate}
                    onChange={(e) =>
                      setLogData({ ...logData, logDate: e.target.value })
                    }
                  />
                </div>

                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label
                    style={{ color: "#16355d", fontFamily: "Roboto" }}
                    htmlFor="login"
                  >
                    Log In Time :
                  </label>
                  <input
                    style={{}}
                    type="time"
                    id="netTime"
                    value={logData.logIn}
                    onChange={(e) =>
                      setLogData({ ...logData, logIn: e.target.value })
                    }
                  />
                </div>
                <div
                  className="form-group"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label
                    style={{ color: "#16355d", fontFamily: "Roboto" }}
                    htmlFor="logout"
                  >
                    Log Out Time :
                  </label>
                  <input
                    width="100"
                    type="time"
                    id="netTime"
                    value={logData.logOut}
                    onChange={(e) =>
                      setLogData({ ...logData, logOut: e.target.value })
                    }
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    float: "right",
                    marginTop: "65px",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: "#16355d" }}
                  >
                    SUBMIT
                  </Button>
                </div>
              </form>
            </Grid>
          </>
        )}
        <Grid
          xs={12}
          md={4}
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
              height: "auto",
              overflow: "auto",
              width: "100%",
              top: "100px",
              pointerEvents: "auto",
            }}
          >
            <Typography
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                margin: "5px",
                color: "#16355d",
              }}
            >
              Employee Name :{" "}
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
            <div>
              <table
                className="time-sheet-table"
                style={{
                  padding: "15px",
                  // backgroundColor: "#f2f2f2",
                  borderCollapse: "collapse",
                  border: "1px solid black",
                  marginLeft: "auto",
                  marginRight: "auto",
                  borderSpacing: "0",
                  width: "100%",
                  marginBottom: "10px",
                  maxWidth: "800px",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        color: "#16355d",
                        fontFamily: "Roboto",
                      }}
                    >
                      Date
                    </th>
                    <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                      Log In
                    </th>
                    <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                      Log Out
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {array.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => handleHoverDate(item.logDate)}
                    >
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          alignContent: "center",
                        }}
                      >
                        {item?.logDate}
                      </td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          alignContent: "center",
                        }}
                      >
                        {item?.logIn}
                      </td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          paddingLeft: "40px",
                          paddingRight: "40px",
                          alignContent: "center",
                        }}
                      >
                        {item?.logOut}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid>

          {(role === "employee" || role === "manager") && (
            <Grid
              item
              sm={12}
              md={8}
              elevation={10}
              sx={{
                padding: "15px",
                width: "auto",
                marginLeft: "5px",
                borderRadius: "15px",
                border: "1px solid lightgray",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",

                alignItems: "center", // Center-align content horizontally
              }}
            >
              <div>
                {hoveredData === false ? (
                  <>
                    {posts.map((post, index) => {
                      if (post._id === currentId) {
                        const totalHours = calculateTotalHours(
                          post.logIn[post.logIn.length - 1],
                          post.logOut[post.logOut.length - 1]
                        );
                        return (
                          <>
                            <div key={index}>
                              <HalfDoughnutWithPointer
                                totalHours={totalHours}
                              />
                            </div>
                            <div style={{ margin: "20px 0px 0px 20px" }}>
                              <Box
                                sx={{
                                  padding: "10px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontFamily: "Roboto",
                                    color: "#16355d",
                                  }}
                                >
                                  Total Worked = {totalHours}
                                </Typography>
                              </Box>
                            </div>
                          </>
                        );
                      }
                      return null;
                    })}
                  </>
                ) : (
                  <>
                    <HalfDoughnutWithPointer totalHours={totalHours} />
                    <div style={{ margin: "20px 0px 0px 20px" }}>
                      <Box
                        sx={{
                          padding: "10px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Roboto",
                            color: "#16355d",
                          }}
                        >
                          Total Worked = {totalHours}
                        </Typography>
                      </Box>
                    </div>
                  </>
                )}
              </div>
              <div style={{ marginTop: "250px" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                  Note : 0.10 hours = 6 minutes ; 0.01 hours = 36 seconds
                </Typography>
              </div>
            </Grid>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendanceDetail;

// align Card of Graph in center
