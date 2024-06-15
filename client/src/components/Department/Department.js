import { Container, Typography, Grid, IconButton } from "@mui/material";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPost, getPosts } from "../../action/posts";
import Lead from "./Lead/Lead";

import GroupsIcon from "@mui/icons-material/Groups";

const Department = () => {
  const posts = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));

  const verifyDepat = user.result.department;

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
        bgcolor: "#f2d5d6",
        boxShadow: 1,
        maxWidth: "500px",
        borderRadius: "10px",
        // width: "100%",
        overflow: "hidden",
        position: "relative", // Set position to relative
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "48px",
          // marginRight: "20px",
        }}
      >
        <Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
              <IconButton>
                {" "}
                <GroupsIcon />
              </IconButton>
            </Grid>
            <Grid>
              <Typography
                sx={{
                  color: "#16355d",
                  marginLeft: "30px",
                  // marginRight: "30px",
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
            variant="h6"
            sx={{
              color: "#16355d",
              fontFamily: "Roboto",
              fontWeight: "bolder",
              mt: "opx",
              mb: "1px",
              ml: "30px",
              // mr: "40px",
              alignItems: "center",
              // fontSize: "15px",
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
