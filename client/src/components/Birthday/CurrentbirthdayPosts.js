import React, { useEffect, useState } from "react";

import { Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../action/posts";

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
        let day = new Date(post.dob).getDate();
        let month = new Date(post.dob).getMonth() + 1;

        if (currentDay === day && currentMonth === month) {
          return (
            <Typography post={post} variant="h6" sx={{ marginLeft: "10px" }}>
              {post.email}
            </Typography>
          );
        }
      })}
    </>
  );
};

export default CurrentbirthdayPosts;
