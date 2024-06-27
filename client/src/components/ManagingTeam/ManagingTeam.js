import React, { useState, useEffect } from "react";

import {
  Box,
  Grid,
  Typography,
  Divider,
  Stack,
  Avatar,
  Container,
  IconButton,
} from "@mui/material";
import HailIcon from "@mui/icons-material/Hail";
import { getPosts } from "../../action/posts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import avatar1 from "../../assets/MD.jpg";
import avatar2 from "../../assets/avatar2.jpg";
import avatar3 from "../../assets/avatar3.jpg";
import avatar4 from "../../assets/Manilal.jpg";

const ManagingTeam = () => {
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
          // width: "300px",
          overflow: "hidden",
          position: "relative", // Set position to relative
          marginTop: "20px",
          marginLeft: "20px",
          marginRight: "0px",
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "0px 20px 0px 0px",
          },
          // "@media (max-width: 400px)": {
          //   width: "40vh",
          // },
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
                onClick={() => {
                  navigate(`/${id}/absentdetails`); // Employee Attendance Route
                }}
              >
                <HailIcon />
              </IconButton>
            </Grid>
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
                  fontSize: "18px",
                }}
              >
                Absentees
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
              {posts.map((post) => {
                if (post.presentStatus === "false") {
                  return (
                    <>
                      <Grid sx={{ display: "flex", flexDirection: "row" }}>
                        <Grid>
                          <Stack flexDirection="row">
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                marginLeft: "10px",
                                marginTop: "10px",
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
                            {post?.firstName + " " + post.lastName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
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

export default ManagingTeam;
