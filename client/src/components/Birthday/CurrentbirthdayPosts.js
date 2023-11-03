import React, { useEffect, useState } from "react";

import { TextField, Typography, Avatar } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../action/posts";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import InputAdornment from "@mui/material/InputAdornment";

const CurrentbirthdayPosts = () => {
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
    <>
      {posts.map((post) => {
        console.log(post.dob);

        let day = new Date(post.dob).getDate();
        let month = new Date(post.dob).getMonth() + 1;
        console.log(day);
        console.log(month);

        if (currentDay === day && currentMonth === month) {
          console.log(post.firstName, "'s birthday");
          return (
            // <Typography post={post} variant="h6" sx={{ marginLeft: "10px" }}>
            //   {post.email}
            // </Typography>
            <>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <TextField
                  sx={{ backgroundColor: "#CEE1F9" }}
                  value={post.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </>
          );
        } else {
          console.log("No birthday");
        }
      })}
    </>
  );
};

export default CurrentbirthdayPosts;
