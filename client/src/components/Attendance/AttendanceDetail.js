import { TextField, Typography, Grid, Divider, Card } from "@mui/material";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getPosts } from "../../action/posts";

import AttendanceCombo from "./AttendanceCombo";
import { dailyAttendance, logList } from "../../action/posts";

const AttendanceDetail = () => {
  // const  id  = useParams();
  const [currentId, setCurrentId] = useState(null);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"));
  const role = user.result.role;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    presentEmployee: "",
    absentEmployee: "",
  });

  const [logData, setLogData] = useState({
    currentDate: "",
    logIn: "",
    logOut: "",
  });

  useEffect(() => {
    // setCurrentId(id);
    // setIsLoading(true);
    if (posts) {
      dispatch(getPosts()).then(() => {
        console.log("Activity Display is recieving the posts..!!!@@@@@@");
        // eslint-disable-next-line array-callback-return
        posts.map((post) => {
          if (post._id === currentId) {
            setPost(post);
          }
        });
      });
    }
    setIsLoading(false);
  }, [isLoading, currentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(logList(logData, currentId));
  };

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    dispatch(dailyAttendance(formData));
    navigate("/home");
  };

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const currentDate = `${month}/${date}/${year}`;
    setLogData({ ...logData, currentDate });
  }, []);

  return (
    <div style={{ marginBottom: "180px" }}>
      <div>
        <AttendanceCombo posts={posts} setCurrentId={setCurrentId} />
      </div>
      <h2
        style={{ color: "#16355d", marginLeft: "20px", fontFamily: "Roboto" }}
      >
        Employee Attendance
      </h2>
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
                // value={logIn}
                // onChange={(e) => setLogIn(e.target.value)}
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
                // style={{ marginLeft: "150px" }}
                width="100"
                type="time"
                id="netTime"
                // value={logout}
                // onChange={(e) => setLogout(e.target.value)}
                value={logData.logOut}
                onChange={(e) =>
                  setLogData({ ...logData, logOut: e.target.value })
                }
              />
            </div>

            {/* </div> */}
            <div style={{ display: "flex", float: "right", marginTop: "50px" }}>
              <button style={{ fontFamily: "Roboto" }} type="submit">
                Submit
              </button>
            </div>
          </form>
        </Grid>

        <Grid>
          <Card>
            <Typography
              style={{
                fontFamily: "robota",
                fontWeight: "bold",
                margin: "10px 10px 10px 10px",
              }}
            >
              Employee Name : {post?.firstName + " " + post?.lastName}
            </Typography>
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
                  {posts
                    .filter((post) => post._id === currentId)
                    .map((post, index) => (
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
                          {post?.currentDate}
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
                          {post?.logIn}
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
                          {post?.logOut}
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
