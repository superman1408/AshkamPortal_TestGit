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
          bgcolor: "#e9edf7",
          boxShadow: 1,
          maxWidth: "500px",
          borderRadius: "10px",

          position: "relative", // Set position to relative
          marginTop: "20px",
          marginLeft: "20px",
          marginRight: "0px",

          "@media (max-width: 600px)": {
            display: "flex",
            margin: "0px 20px 0px 0px",
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
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "100px",
              overflow: "auto",

              width: "300px",
              pointerEvents: "auto",
            }}
          >
            <Grid>
              {sortedPosts.map((post, index) => {
                if (post.presentStatus === "false") {
                  return (
                    <div key={index}>
                      <Grid sx={{ display: "flex", flexDirection: "row" }}>
                        <Grid>
                          <Stack flexDirection="row">
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                marginLeft: "10px",
                                marginTop: "10px",
                                userSelect: "none", // Prevent selection
                                pointerEvents: "none", // Prevent interaction
                              }}
                              alt="Femy sharp"
                              src={post?.selectedFile}
                            />
                          </Stack>
                        </Grid>
                        <Grid>
                          <Typography
                            sx={{
                              marginLeft: "10px",
                              marginRight: "0px",
                              marginTop: "10px",
                              fontSize: "14px",
                              fontFamily: "Roboto",
                            }}
                          >
                            {formatName(post.firstName, post.lastName)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </div>
                  );
                }
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AbsenteesDisplay;
