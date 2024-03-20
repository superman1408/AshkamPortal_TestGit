import { TextField, Typography, Grid, Divider, Card } from "@mui/material";
import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../action/posts";
import { dailyAttendance, logList } from "../../action/posts";

const AttendanceDetail = ({ currentId, posts }) => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("profile"));

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    presentEmployee: "",
    absentEmployee: "",
  });

  const [logData, setLogData] = useState({
    logDate: "",
    logIn: "",
    logOut: "",
  });

  console.log(logData);

  const array = [];

  useEffect(() => {
    array.length = 0;
    dispatch(getPosts()).then(() => {
      console.log("Activity Display is recieving the posts..!!!@@@@@@");

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
    });
    // }
  }, [currentId]);

  console.log(array);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(logList(logData, currentId));
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    dispatch(dailyAttendance(formData));
    navigate("/home");
  };
  // _______________________Code for current Date ________________________________

  // useEffect(() => {
  //   const today = new Date();
  //   const month = today.getMonth() + 1;
  //   const year = today.getFullYear();
  //   const date = today.getDate();
  //   const currentDate = `${month}/${date}/${year}`;
  //   setLogData({ ...logData, currentDate });
  // }, []);

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

  const verifyTheRole = () => {
    if (user.result.role === "admin") {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div style={{ marginBottom: "180px" }}>
      <h2
        style={{ color: "#16355d", marginLeft: "20px", fontFamily: "Roboto" }}
      >
        Employee Attendance
      </h2>
      <Divider sx={{ fontSize: "50px", fontWeight: "bold" }} />

      <Grid sx={{ display: "flex", flexDirection: "row" }}>
        {verifyTheRole() && (
          <>
            <Grid
              sx={{
                padding: "10px",
                width: "20%",
                backgroundColor: "whitesmoke",
                margin: "0px 20px 0px 20px",
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
                    value={formData.absentEmployee}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        absentEmployee: e.target.value,
                      })
                    }
                  />
                </div>
                <div style={{ display: "flex", float: "right" }}>
                  <button style={{ fontFamily: "Roboto" }} type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </Grid>

            <Grid
              sx={{
                padding: "10px",
                width: "30%",
                backgroundColor: "whitesmoke",
                margin: "0px 20px 0px 20px",
              }}
            >
              <form className="time-sheet-form" onSubmit={handleSubmit}>
                <div
                  className="form-group"
                  style={{ display: "flex", justifyContent: "space-between" }}
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
                  style={{ display: "flex", justifyContent: "space-between" }}
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
                  style={{ display: "flex", justifyContent: "space-between" }}
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

                {/* </div> */}
                <div
                  style={{ display: "flex", float: "right", marginTop: "50px" }}
                >
                  <button style={{ fontFamily: "Roboto" }} type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </Grid>
          </>
        )}
        <Grid>
          <Card>
            {/* {post && ( */}
            <Typography
              style={{
                fontFamily: "robota",
                fontWeight: "bold",
                margin: "10px",
              }}
            >
              Employee Name :{" "}
              {posts.map((post) => {
                if (post._id === currentId) {
                  return post?.firstName + " " + post?.lastName;
                }
                return null;
              })}
            </Typography>

            {/* )} */}
            <div>
              <table
                className="time-sheet-table"
                style={{
                  padding: "10px",
                  borderCollapse: "collapse",
                  marginLeft: "auto",
                  marginRight: "auto",
                  width: "100%",
                  // width: "100%",
                  minWidth: "100vh",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
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
                  {/* {posts
                    .filter((post) => post._id === currentId)
                    .map((post, index) => ( */}
                  {array.map((item, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                          whiteSpace: "pre-wrap", // Add this CSS property
                        }}
                      >
                        {item?.logDate}
                      </td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                          whiteSpace: "pre-wrap", // Add this CSS property
                        }}
                      >
                        {item?.logIn}
                      </td>
                      <td
                        style={{
                          color: "#e55d17",
                          fontFamily: "Roboto",
                          padding: "10px",
                          alignContent: "center",
                          whiteSpace: "pre-wrap", // Add this CSS property
                        }}
                      >
                        {item?.logOut}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendanceDetail;
