import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Divider, Card } from "@mui/material";

import { getPosts } from "../../action/posts";
import { dailyAttendance, logList } from "../../action/posts";
import HalfDoughnutWithPointer from "../Attendance/AttendanceChart";
import Panel from "../Panel/Panel";

const AttendanceDetail = ({ currentId, posts }) => {
  const dispatch = useDispatch();
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

  const array = [];

  useEffect(() => {
    currentId && setTotalHours(null);
  }, [currentId]);

  useEffect(() => {
    array.length = 0;
    dispatch(getPosts()).then(() => {
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
  }, [currentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(logList(logData, currentId))
      .then(() => {
        alert("Successfully Logged!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    dispatch(dailyAttendance(formData));
    navigate("/home");
  };

  const role = user.result.role;

  const verifyTheRole = () => {
    if (user.result.role === "admin") {
      return true;
    } else {
      return false;
    }
  };

  const calculateTotalHours = (logIn, logOut) => {
    const loginTime = new Date(`01/01/2022 ${logIn}`);
    const logoutTime = new Date(`01/01/2022 ${logOut}`);

    const diffInMilliseconds = logoutTime - loginTime;
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
    return diffInHours.toFixed(2);
  };

  const handleHoverDate = (logDate) => {
    setHoveredData(true);
    const hoveredLog = array.find((item) => item.logDate === logDate);
    if (hoveredLog) {
      const totalHours = calculateTotalHours(
        hoveredLog.logIn,
        hoveredLog.logOut
      );
      setTotalHours(totalHours);
    } else {
      setTotalHours(null);
    }
  };

  return (
    <div style={{ marginBottom: "180px" }}>
      {/* Your other JSX components */}

      <Grid
        sx={{
          display: "flex",
          "@media (max-width: 600px)": {
            flexDirection: "column",
          },
        }}
      >
        <Panel />
        {/* Your other JSX components */}
        <Grid
          sx={{
            display: "flex",
            padding: "2px",
            marginLeft: "5px",
            "@media (max-width: 600px)": {
              flexDirection: "column",
            },
          }}
        >
          <Card
            elevation={10}
            sx={{
              padding: "5px",
              width: "auto",
            }}
          >
            <Typography
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                margin: "10px",
                color: "#16355d",
              }}
            >
              Employee Name :
            </Typography>
            <div style={{ overflowX: "auto" }}>
              <table
                className="time-sheet-table"
                style={{
                  borderCollapse: "collapse",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Log In</th>
                    <th>Log Out</th>
                  </tr>
                </thead>
                <tbody>
                  {array.map((item, index) => (
                    <tr
                      key={index}
                      onClick={() => handleHoverDate(item.logDate)}
                    >
                      <td>{item.logDate}</td>
                      <td>{item.logIn}</td>
                      <td>{item.logOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          {/* Your other JSX components */}
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendanceDetail;
