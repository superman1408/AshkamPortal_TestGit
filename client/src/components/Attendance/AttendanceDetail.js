import { TextField, Typography, Grid, Divider, Card } from "@mui/material";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getPosts } from "../../action/posts";

import AttendanceCombo from "./AttendanceCombo";
import { dailyAttendance } from "../../action/posts";

const AttendanceDetail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [present, setPresent] = useState("");
  const [absent, setAbsent] = useState("");
  const [logIn, setLogIn] = useState("");
  const [logout, setLogout] = useState("");

  const [formData, setFormData] = useState({
    presentEmployee: "",
    absentEmployee: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(present);
    console.log(absent);
    console.log(logIn);
    console.log(logout);
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    console.log(present, absent);
    dispatch(dailyAttendance(formData));
    navigate("/home");
  };
  return (
    <div>
      <h2>Employee Attendance</h2>
      <Divider sx={{ fontSize: "50px", fontWeight: "bold" }} />
      <Grid sx={{ display: "flex", flexDirection: "row" }}>
        <Grid
          sx={{
            padding: "10px",
            width: "20%",
            backgroundColor: "whitesmoke",
            margin: "0px 20px 0px 20px",
          }}
        >
          <form className="time-sheet-form" onSubmit={handleAttendanceSubmit}>
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
                  setFormData({ ...formData, presentEmployee: e.target.value })
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
                  setFormData({ ...formData, absentEmployee: e.target.value })
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
                htmlFor="login"
              >
                Log In Time :
              </label>
              <input
                style={{}}
                type="time"
                id="netTime"
                value={logIn}
                onChange={(e) => setLogIn(e.target.value)}
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
                // style={{ marginLeft: "150px" }}
                width="100"
                type="time"
                id="netTime"
                value={logout}
                onChange={(e) => setLogout(e.target.value)}
              />
            </div>

            {/* </div> */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button style={{ fontFamily: "Roboto" }} type="submit">
                Submit
              </button>
            </div>
          </form>
        </Grid>

        <Grid>
          <Card>
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
                      Present Employee
                    </th>
                    <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
                      Absent Employee
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
                  <tr>
                    <td
                      style={{
                        color: "#e55d17",
                        fontFamily: "Roboto",
                        padding: "10px",
                        alignContent: "center",
                      }}
                    >
                      {present}
                    </td>
                    <td
                      style={{
                        color: "#e55d17",
                        fontFamily: "Roboto",
                        padding: "10px",
                        alignContent: "center",
                      }}
                    >
                      {absent}
                    </td>
                    <td
                      style={{
                        color: "#e55d17",
                        fontFamily: "Roboto",
                        padding: "10px",
                        alignContent: "center",
                      }}
                    >
                      {logIn}
                    </td>
                    <td
                      style={{
                        color: "#e55d17",
                        fontFamily: "Roboto",
                        padding: "10px",
                        alignContent: "center",
                      }}
                    >
                      {logout}
                    </td>
                  </tr>
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
