import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Divider, Card } from "@mui/material";

import { getPosts } from "../../action/posts";
import { dailyAttendance, logList } from "../../action/posts";
import HalfDoughnutWithPointer from "../Attendance/AttendanceChart";

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

  const [totalHours, setTotalHours] = useState(null); // State to hold total hours

  const array = [];

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
        }
      });
    });
  }, [currentId]);

  const handleHoverDate = (logDate) => {
    // Calculate total hours for the hovered log date
    const hoveredLog = array.find(item => item.logDate === logDate);
    const totalHours = calculateTotalHours(hoveredLog.logIn, hoveredLog.logOut);
    // Update state with the total hours
    setTotalHours(totalHours);
  };

  const calculateTotalHours = (logIn, logOut) => {
    const loginTime = new Date(`01/01/2022 ${logIn}`);
    const logoutTime = new Date(`01/01/2022 ${logOut}`);

    const diffInMilliseconds = logoutTime - loginTime;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours.toFixed(2);
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
        <Grid sx={{ padding: "2px" }}>
          <Card sx={{ padding: "5px" }}>
            <Typography
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                margin: "10px",
                color: "#16355d",
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
            <div style={{ display: "flex" }}>
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
                    {array.map((item, index) => (
                      <tr key={index} onMouseEnter={() => handleHoverDate(item.logDate)}>
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
              {(role === "employee" || role === "manager") && (
                <div style={{ margin: "0px 20px 20px 50px" }}>
                  {/* Render the graph */}
                  <HalfDoughnutWithPointer totalHours={totalHours} />
                </div>
              )}
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendanceDetail;

const handleHoverDate = (logDate) => {
    // Find the log with the matching date
    const hoveredLog = array.find((item) => item.logDate === logDate);
  
    // Check if a matching log is found
    if (hoveredLog) {
      // Calculate total hours for the hovered log date
      const totalHours = calculateTotalHours(hoveredLog.logIn, hoveredLog.logOut);
  
      // Update state with the total hours
      setTotalHours(totalHours);
    } else {
      // If no matching log is found, reset total hours to null
      setTotalHours(null);
    }
  };
  