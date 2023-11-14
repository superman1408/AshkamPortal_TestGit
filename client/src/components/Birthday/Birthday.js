import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Avatar,
  Button,
  ButtonBase,
  Card,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import avatar1 from "../../assets/Profile.jpg";
import Image from "../../assets/Balloon.png";

import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../action/posts";

import AlertDialogSlide from "../Birthday/BirthdayMail";

const Birthday = () => {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [dimension]);

  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  // console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div>
      <Box
        sx={{
          marginTop: "10px",
          marginLeft: "20px",
          padding: "2px",
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: "10px",
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover",
        }}
      >
        {/* <ButtonBase> */}

        <Grid>
          {posts.map((post) => {
            let day = new Date(post.dob).getDate();
            let month = new Date(post.dob).getMonth() + 1;

            if (currentDay === day && currentMonth === month) {
              return (
                <React.Fragment key={post.dob}>
                  <Card
                    elevation={15}
                    sx={{
                      display: "flex",
                      marginTop: "15px",
                      alignItems: "center",
                      width: "70%",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        marginLeft: "20px",
                      }}
                      alt="user"
                      src={avatar1}
                    />
                    <Typography
                      post={post}
                      variant="h6"
                      sx={{
                        marginLeft: "20px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {post.firstName + " " + post.lastName}
                    </Typography>
                  </Card>
                </React.Fragment>
              );
            }
          })}

          <Button
            sx={{
              // marginLeft: "50px",
              // marginRight: "0px",
              // bgcolor: "#ecd0f5",
              fontSize: "13px",
              marginLeft: "20vh",
            }}
          >
            {" "}
            <AlertDialogSlide />
          </Button>
        </Grid>
      </Box>
    </div>
  );
};

export default Birthday;
