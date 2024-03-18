import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getAttendancePosts } from "../../action/posts";

import { Box, Grid, Typography, ButtonBase } from "@mui/material";

const Attendance = () => {
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAttendancePosts());
  }, [dispatch]);

  console.log(posts);
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
              <Typography>{posts.presentEmployee}</Typography>
            </Grid>

            <Grid sx={{ marginLeft: "40px" }}>
              <Typography sx={{ fontFamily: "Roboto" }}>Absent</Typography>
              <Typography>{posts.absentEmployee}</Typography>
            </Grid>
          </Grid>
        </ButtonBase>
      </Box>
    </div>
  );
};

export default Attendance;
