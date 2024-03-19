import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAttendancePosts } from "../../action/posts";
import { useParams } from "react-router-dom";

import { Box, Grid, Typography, ButtonBase } from "@mui/material";
import attendance from "../../reducers/attendance";

const Attendance = () => {
  const id = useParams();
  console.log(id);

  const dispatch = useDispatch();

  const attend = useSelector((state) => state.attend);

  useEffect(() => {
    dispatch(getAttendancePosts());
  }, [dispatch]);

  console.log(attend);
  console.log(attend?.presentEmployee);

  // const { presentEmployee = 0, absentEmployee = 0 } = attend || {};

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
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            marginLeft: "130px",
            color: "#16355d",
          }}
        >
          ATTENDANCE
        </Typography>
        <ButtonBase
          onClick={() => {
            navigate("/attendanceDetail"); // Employee Attendance Route
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
              <Typography>30</Typography>
            </Grid>

            <Grid sx={{ marginLeft: "40px" }}>
              <Typography sx={{ fontFamily: "Roboto" }}>Present</Typography>

              <Typography>{attend?.presentEmployee}</Typography>
            </Grid>

            <Grid sx={{ marginLeft: "40px" }}>
              <Typography sx={{ fontFamily: "Roboto" }}>Absent</Typography>
              <Typography>{attend?.absentEmployee}</Typography>
            </Grid>
          </Grid>
        </ButtonBase>
      </Box>
    </div>
  );
};

export default Attendance;

// log showing undefined
