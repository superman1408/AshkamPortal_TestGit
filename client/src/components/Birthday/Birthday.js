import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  Avatar,
  Button,
  ButtonBase,
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
  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;
  // const UsFormatter = new Intl.DateTimeFormat("en-US");
  // const currentDate = UsFormatter.format(date);
  // const currentDate = UsFormatter.format(date);
  console.log("currentDay", currentDay);
  console.log("currentMonth", currentMonth);

  return (
    <div>
      <Box
        sx={{
          // width: "340px",
          // height: "70px",
          display: "flex",
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
        <ButtonBase>
          <Stack flexDirection="row">
            <Avatar
              sx={{
                width: 40,
                height: 40,
                marginLeft: "20px",
                marginTop: "10px",
              }}
              alt="Femy sharp"
              src={avatar1}
            />
          </Stack>
          <Grid>
            {/* {posts.map((post) => {
              console.log(post.dob);

              let day = new Date(post.dob).getDate();
              let month = new Date(post.dob).getMonth() + 1;
              console.log(day);
              console.log(month);

              if (currentDay === day && currentMonth === month) {
                console.log(post.firstName, "'s birthday");
                return (
                  <Typography
                    post={post}
                    variant="h6"
                    sx={{ marginLeft: "40px" }}
                  >
                    {post.firstName + " " + post.lastName}
                  </Typography>
                );
              } else {
                console.log("No birthday");
              }
            })} */}

            <Typography sx={{ marginLeft: "40px", fontSize: "13px" }}>
              Has birthday today
            </Typography>
            <Button
              sx={{
                marginLeft: "50px",
                marginRight: "0px",
                // bgcolor: "#ecd0f5",
                fontSize: "13px",
              }}
              // onClick={() => setBtn(!Btn)}
            >
              {" "}
              <AlertDialogSlide />
            </Button>
            {/* {Btn && (
              <ReactConfetti
                width={dimension.width}
                height={dimension.height}
                tweenDuration={100}
              /> */}
          </Grid>
          <div class="btn-particles"></div>
        </ButtonBase>
      </Box>
    </div>
  );
};

export default Birthday;
