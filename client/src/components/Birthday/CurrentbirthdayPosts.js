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
  // console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;

  return (
    <>
      {posts.map((post) => {
<<<<<<< HEAD
=======
        // console.log(post.dob);

>>>>>>> birthdayLayout
        let day = new Date(post.dob).getDate();
        let month = new Date(post.dob).getMonth() + 1;

        if (currentDay === day && currentMonth === month) {
          return (
            // <Typography post={post} variant="h6" sx={{ marginLeft: "10px" }}>
            //   {post.email}
            // </Typography>
            <React.Fragment key={post.dob}>
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
            </React.Fragment>
          );
<<<<<<< HEAD
=======
        } else {
          // console.log("No birthday");
>>>>>>> birthdayLayout
        }
      })}
    </>
  );
};

export default CurrentbirthdayPosts;
