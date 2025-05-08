import {
  Container,
  Typography,
  Grid,
  IconButton,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();

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
        backdropFilter: "blur(8px)",
        background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.05)",
        maxWidth: 700,
        width: "100%",
        p: 3,
        borderRadius: "10px",
        overflow: "hidden",
        position: "relative",
        height: "330px",
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
          marginBottom: "48px",
        }}
      >
        <Grid>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            mt={2}
            ml={1}
            gap={1}
          >
            <IconButton
              sx={{ color: "#16355d" }}
              onClick={() => {
                navigate(`/departmentdetails`); // Employee Attendance Route
              }}
            >
              <GroupsIcon />
            </IconButton>
            <Typography
              variant="h6"
              fontWeight={600}
              color="#16355d"
              fontFamily="Roboto"
            >
              Department
            </Typography>
          </Grid>

          <Typography
            variant="subtitle1"
            color="text.secondary"
            fontFamily="Poppins"
            ml={7}
            sx={{
              fontWeight: "bolder",
              mt: "0px",
              mb: "1px",
              alignItems: "center",
              fontSize: "15px",
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
