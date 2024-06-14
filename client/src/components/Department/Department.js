import { Container, Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getPost, getPosts } from "../../action/posts";
import Lead from "./Lead/Lead";

const Department = () => {
  const posts = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));

  const verifyDepat = user.result.department;

  console.log(verifyDepat);

  const dispatch = useDispatch();

  useEffect(() => {
    if (posts) {
      dispatch(getPosts()).then(() => {
        console.log("Data is recieved in the Department Module..!!!");
      });
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
          marginBottom: "10px",
          // marginRight: "20px",
        }}
      >
        <Grid>
          <Typography
            sx={{
              color: "#16355d",
              fontFamily: "Roboto",
              fontWeight: "bolder",
              mt: "5px",
              mb: "1px",
              ml: "10px",
              alignItems: "center",
              fontSize: "17px",
            }}
          >
            {verifyDepat}
          </Typography>
        </Grid>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          {posts.map((post) => {
            if (post.department === verifyDepat) {
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
