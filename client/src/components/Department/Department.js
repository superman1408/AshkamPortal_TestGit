import { Container, Typography, Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../action/posts";
import Lead from "./Lead/Lead";

import GroupsIcon from "@mui/icons-material/Groups";

const Department = () => {
  const posts = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user.result._id;

  const verifyDepat = user.result.department;

  const navigate = useNavigate();

  // console.log(verifyDepat);

  const dispatch = useDispatch();

  useEffect(() => {
    if (posts) {
      dispatch(getPosts());
    }
  }, [dispatch, posts]);

  return (
    <Container
      sx={{
        display: "flex",
        padding: "10px",
        // bgcolor: "#f2d5d6",
        // bgcolor: "#16355d",
        bgcolor: "#E3F2FD",
        boxShadow: 1,
        maxWidth: "700px",
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        height: "330px",
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "48px",
        }}
      >
        <Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
              <IconButton
                sx={{ color: "#16355d" }}
                onClick={() => {
                  navigate(`/departmentdetails`); // Employee Attendance Route
                }}
              >
                {" "}
                <GroupsIcon />
              </IconButton>
            </Grid>
            <Grid>
              <Typography
                sx={{
                  color: "#16355d",
                  // color: "white",
                  marginLeft: "30px",
                  marginTop: "9px",
                  fontFamily: "Roboto",
                  fontSize: "18px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Department
              </Typography>
            </Grid>
          </Grid>
          <Typography
            sx={{
              color: "#16355d",
              // color: "white",
              fontFamily: "Roboto",
              fontWeight: "bolder",
              mt: "opx",
              mb: "1px",
              ml: "30px",
              alignItems: "center",
              fontSize: "15px",
              textAlign: "center",
            }}
          >
            {verifyDepat}
          </Typography>
        </Grid>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {posts.map((post) => {
            if (post.department === verifyDepat && post.role === "manager") {
              return (
                <Lead key={post._id} post={post} verifyDepat={verifyDepat} />
              );
            }
            return null;
          })}
        </div>
      </Grid>
    </Container>
  );
};

export default Department;

// sx={{
//   display: "flex",
//   marginTop: "20px",
//   marginLeft: "20px",
//   maxWidth: "330px",
//   width: "330px",
//   height: "280px",
//   padding: "20px",
//   bgcolor: "#e9edf7",
//   boxShadow: 1,
//   borderRadius: "10px",
//   // "@media (max-width: 600px)": {
//   //   display: "flex",
//   //   margin: "20px 20px 0px 0px",
//   //   width: "50vh",
//   // },
//   // "@media (max-width: 720px)": {
//   //   display: "flex",
//   //   margin: "20px 20px 0px 20px",
//   //   width: "100%",
//   // },
// }}
