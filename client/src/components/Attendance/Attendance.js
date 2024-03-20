import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAttendancePosts } from "../../action/posts";
import { useParams } from "react-router-dom";

import { Box, Grid, Typography, ButtonBase, IconButton } from "@mui/material";
import attendance from "../../reducers/attendance";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState({
    presentEmp: "",
    absentEmp: "",
  });

  const dispatch = useDispatch();

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

  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "52px",
          marginLeft: "20px",
          padding: "5px",
          bgcolor: "#e2e6cf",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <Grid sx={{ marginLeft: "10px" }}>
            <IconButton onClick={() => {
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
              }}
            >
              ATTENDANCE
            </Typography>
          </Grid>
        </Grid>
        <ButtonBase
          onClick={() => {
            navigate(`/${id}/attendanceDisplay`); // Employee Attendance Route
          }}
        >
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
        </ButtonBase>
      </Box>
    </div>
  );
};

export default Attendance;
