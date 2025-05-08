import React, { useState, useEffect } from "react";

import {
  Grid,
  Typography,
  Avatar,
  Container,
  IconButton,
  useTheme,
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

  const theme = useTheme();

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

          backdropFilter: "blur(8px)",
          background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
          boxShadow: 1,
          maxWidth: "500px",
          borderRadius: "10px",
          width: "100%",
          position: "relative", // Set position to relative
          marginLeft: "20px",
          marginRight: "0px",

          "@media (max-width: 600px)": {
            display: "flex",
            margin: "20px 20px 0px 0px",
          },

          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: theme.shadows[6],
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
            gap={1}
            p={1.5}
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <IconButton
              sx={{ color: "#16355d" }}
              onClick={
                verifyTheRole() ? () => navigate(`/${id}/absentdetails`) : null // Employee Attendance Route
              }
            >
              <HailIcon />
            </IconButton>

            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                color: "#16355d",
                // color: "white",
                fontFamily: "Roboto",
                fontWeight: "bolder",
              }}
            >
              Absentees
            </Typography>
          </Grid>
          <Grid
            container
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)", // 4 columns per row
              gap: "10px",
              padding: "10px 0",
              height: "200px",
              overflowY: "auto",
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
