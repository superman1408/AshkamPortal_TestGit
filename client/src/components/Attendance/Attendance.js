import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../action/posts";

import { Grid, Typography, IconButton, Card, useTheme } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const Attendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user.result._id;
  const theme = useTheme();

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const absentEmployees = posts.filter(
    (post) => post.presentStatus === "false"
  );

  // const empStrength = posts.filter((post) => post.gender);

  const empStrength = useMemo(
    () => posts.filter((post) => post.gender),
    [posts]
  );

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Card
        elevation={6}
        sx={{
          display: "flex",
          maxWidth: "500px",
          flexDirection: "column",
          marginLeft: "20px",
          padding: "10px",
          height: "150px",

          backdropFilter: "blur(8px)",
          // background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
          background: "smokewhite",
          // boxShadow: 1,
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative", // Set position to relative
          flex: 1,
          transition: "0.3s",
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "20px 0px 0px 0px",
            width: "40vh",
          },
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: theme.shadows[6],

            // p: 2,
            // backdropFilter: "blur(8px)",
            // // background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
            // background: "smokewhite",
            // borderRadius: 3,
            // transition: "0.3s",
            // height: "100%",
            // "&:hover": {
            //   transform: "scale(1.02)",
            //   boxShadow: theme.shadows[6],
          },
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid gap={1} p={1} sx={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              sx={{ color: "#16355d" }}
              onClick={() => {
                navigate(`/${id}/attendanceDisplay`); // Employee Attendance Route
              }}
            >
              <NewspaperIcon />
            </IconButton>

            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                // marginLeft: "100px",
                color: "#16355d",
              }}
            >
              Attendance
            </Typography>
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
                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  Total
                </Typography>
                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  {empStrength.length}
                </Typography>
              </Grid>

              <Grid sx={{ marginLeft: "40px" }}>
                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  Present
                </Typography>

                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  {empStrength.length - absentEmployees.length}
                </Typography>
              </Grid>

              <Grid sx={{ marginLeft: "40px" }}>
                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  Absent
                </Typography>
                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  {absentEmployees.length}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Card>
    </div>
  );
};

export default Attendance;
