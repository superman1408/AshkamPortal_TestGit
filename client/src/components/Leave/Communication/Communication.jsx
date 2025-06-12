import React, { useState, useEffect } from "react";
import { Grid, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../../Panel/Panel";

import Inbox from "./Inbox/inbox";
import MessageBody from "./Message/MessageBody";
import { getPosts } from "../../../action/posts";

import useMediaQuery from "@mui/material/useMediaQuery";
import MessageBodyImage from "../../../../src/assets/MessageBodyImage.png";

const Communication = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentId, setCurrentId] = useState(user.result.id);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const matches = useMediaQuery("(min-width:1024px) and (max-width:1440px)");
  // const matches = useMediaQuery("(min-width:1244px)");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const verifyTheRole = () => {
    if (user.result.role === "admin") {
      return true;
    } else if (
      user.result.role === "manager" &&
      user.result.department.toLowerCase() === "human resource"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const verifyManager = () => {
    if (user.result.role === "manager") {
      return true;
    } else {
      return false;
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    const nameA = a.firstName.toLowerCase() + " " + a.lastName.toLowerCase();
    const nameB = b.firstName.toLowerCase() + " " + b.lastName.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

  return (
    <Grid sx={{display: "flex", flexDirection: "column", alignItems: "center", padding: "2px"}}>
      <div style={{fontSize: "28px", font: "Roboto", fontWeight: "bolder", color: "#0D325C"}}>Message Center</div>
      <Grid
  container
  spacing={2}
  sx={{
    marginTop: "10px",
    padding: "2px",
    flexDirection: { xs: "column", md: "row" },
    width: "100%",
  }}
>
  {matches && (
    <Grid item md={2} sx={{ minWidth: "200px" }}>
      <Panel />
    </Grid>
  )}

  <Grid item xs={12} md={4} sx={{ height: "600px", overflow: "auto" }}>
    {verifyTheRole()
      ? sortedPosts.map((post) => (
          <div key={post._id} style={{ marginTop: "10px" }}>
            <Inbox post={post} setCurrentId={setCurrentId} />
            <Divider sx={{ borderWidth: "1px" }} />
          </div>
        ))
      : verifyManager()
      ? sortedPosts.map(
          (post) =>
            post.department === user.result.department && (
              <div key={post._id} style={{ marginTop: "10px" }}>
                <Inbox post={post} setCurrentId={setCurrentId} />
                <Divider sx={{ borderWidth: "1px" }} />
              </div>
            )
        )
      : sortedPosts.map(
          (post) =>
            post._id === user.result._id && (
              <div key={post._id} style={{ marginTop: "10px" }}>
                <Inbox post={post} setCurrentId={setCurrentId} />
                <Divider sx={{ borderWidth: "1px" }} />
              </div>
            )
        )}
  </Grid>

  <Grid item xs={12} md={6} sx={{ height: "600px", overflowY: "auto" }}>
    {user &&
      posts.map(
        (post) =>
          post._id === currentId && (
            <div key={post._id}>
              <MessageBody post={post} currentId={currentId} />
            </div>
          )
      )}
    <Grid
      sx={{
        margin: matches ? "100px 130px" : "20px",
      }}
    >
      <img
        src={MessageBodyImage}
        alt="logo"
        style={{ opacity: "70%", width: "100%" }}
      />
    </Grid>
  </Grid>
</Grid>
    </Grid>
  );
};

export default Communication;
