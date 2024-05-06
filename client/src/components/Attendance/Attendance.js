import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAttendancePosts } from "../../action/posts";

import { Box, Grid, Typography, IconButton, Container } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";


const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState({
    presentEmp: "",
    absentEmp: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const attend = useSelector((state) => state.attend);
  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user.result._id;

  useEffect(() => {
    if (attend) {
      dispatch(getAttendancePosts()).then(() => {
        // Assuming `attend` is an array of objects, you may need to loop through it
        attend.forEach((items) => {
          setAttendanceData((prevData) => ({
            // Merge the new data with previous data using spread operator
            ...prevData,
            presentEmp: items.presentEmployee,
            absentEmp: items.absentEmployee,
          }));
        });
      });
    }
  }, [dispatch, attend]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
        sx={{
          display: "flex",
          // width: "100%",
          maxWidth: "500px",
          flexDirection: "column",
          marginTop: "52px",
          marginLeft: "20px",
          padding: "5px",
          bgcolor: "#e2e6cf",
          boxShadow: 1,
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative", // Set position to relative
          flex: 1,
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid sx={{ marginLeft: "10px" }}>
              <IconButton
                onClick={() => {
                  navigate(`/${id}/attendanceDisplay`); // Employee Attendance Route
                }}
              >
                <NewspaperIcon />
              </IconButton>
            </Grid>
            <Grid sx={{ marginLeft: "70px" }}>
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  // marginLeft: "100px",
                  marginTop: "10px",
                  color: "#16355d",
                  fontSize: "18px",
                }}
              >
                Attendance
              </Typography>
            </Grid>
          </Grid>
          <div>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Grid>
                <Typography sx={{ fontFamily: "Roboto" }}>Total</Typography>
                <Typography>
                  {+attendanceData.presentEmp + +attendanceData.absentEmp}
                </Typography>
              </Grid>

              <Grid sx={{ marginLeft: "40px" }}>
                <Typography sx={{ fontFamily: "Roboto" }}>Present</Typography>

                <Typography>{attendanceData.presentEmp}</Typography>
              </Grid>

              <Grid sx={{ marginLeft: "40px" }}>
                <Typography sx={{ fontFamily: "Roboto" }}>Absent</Typography>
                <Typography>{attendanceData.absentEmp}</Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Attendance;
