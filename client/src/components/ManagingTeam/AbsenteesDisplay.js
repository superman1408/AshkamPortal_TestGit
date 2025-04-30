import React, { useState, useEffect } from "react";

import {
  Grid,
  Typography,
  Stack,
  Avatar,
  Container,
  IconButton,
} from "@mui/material";
import HailIcon from "@mui/icons-material/Hail";
import { getPosts } from "../../action/posts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AbsenteesDisplay = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user.result._id;
  const posts = useSelector((state) => state.posts);

  const [currentId, setCurrentId] = useState(id);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (posts) {
      dispatch(getPosts()).then(() => {
        // eslint-disable-next-line array-callback-return
        posts.map((post) => {
          if (post._id === currentId) {
            setCurrentId(post._id);
          }
        });
      });
    }
  }, [dispatch]);

  const verifyTheRole = () => {
    if (user.result.role === "admin") {
      return true;
    } else {
      return false;
    }
  };

  const formatName = (firstName, lastName) => {
    return (
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1).toLowerCase() +
      " " +
      lastName.charAt(0).toUpperCase() +
      lastName.slice(1).toLowerCase()
    );
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const nameA = formatName(a.firstName, a.lastName);
    const nameB = formatName(b.firstName, b.lastName);
    return nameA.localeCompare(nameB);
  });

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
        sx={{
          display: "flex",
          padding: "3px",
          // bgcolor: "#e9edf7",
          // bgcolor: "#16355d",
          bgcolor: "#E3F2FD",
          boxShadow: 1,
          maxWidth: "500px",
          borderRadius: "10px",

          position: "relative", // Set position to relative
          // marginTop: "20px",
          marginLeft: "20px",
          marginRight: "0px",

          "@media (max-width: 600px)": {
            display: "flex",
            margin: "20px 20px 0px 0px",
          },

          "&:hover": {
            bgcolor: "#BBDEFB", // Light gray background on hover
            // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional shadow effect
            transform: "translateY(-3px) " /* Hover effect for cards */,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
            marginRight: "20px",
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid>
              <IconButton
                sx={{ color: "#16355d" }}
                onClick={
                  verifyTheRole()
                    ? () => navigate(`/${id}/absentdetails`)
                    : null // Employee Attendance Route
                }
              >
                <HailIcon />
              </IconButton>
            </Grid>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item>
                <Typography
                  sx={{
                    color: "#16355d",
                    // color: "white",
                    fontFamily: "Roboto",
                    fontWeight: "bolder",
                    mt: "5px",
                    mb: "1px",
                    ml: "10px",
                    fontSize: "18px",
                    textAlign: "center",
                  }}
                >
                  Absentees
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)", // 4 columns per row
              gap: "10px",
              padding: "10px 0",
            }}
          >
            {sortedPosts.map((post, index) => {
              if (post.presentStatus === "false") {
                return (
                  <Grid
                    item
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                      alt={formatName(post.firstName, post.lastName)}
                      src={post?.selectedFile}
                    />
                    <Typography
                      sx={{
                        fontSize: "13px",
                        fontWeight: "bold",
                        mt: "4px",
                        color: "#16355d",
                        fontFamily: "Roboto",
                      }}
                    >
                      {formatName(post.firstName, post.lastName)}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "11px",
                        color: "#16355d",
                        fontFamily: "Roboto",
                      }}
                    >
                      {post.department}
                    </Typography>
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AbsenteesDisplay;
