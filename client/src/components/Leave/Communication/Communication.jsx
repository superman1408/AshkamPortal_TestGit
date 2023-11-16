import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, TextField } from "@mui/material";
import Panel from "../../Panel/Panel";

import Inbox from "./Inbox/inbox";
import MessageBody from "./Message/MessageBody";
import { getPosts } from "../../../action/posts";

const Communication = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentId, setCurrentId] = useState(user.result.id);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  return (
    <div style={{ padding: "5px", display: "flex" }}>
      <div>
        {" "}
        <Panel />
      </div>

      <div>
        <TextField></TextField>
        <Inbox setCurrentId={setCurrentId} />

        <TextField></TextField>
      </div>

      {/* <h1>Messages</h1> */}
      <div>
        {user &&
          posts.map(
            (post) =>
              post.name === user.result.name && (
                <div key={post.name}>
                  <Inbox post={post} setCurrentId={setCurrentId} />
                </div>
              )
          )}
      </div>
      <div>
        {user &&
          posts.map(
            (post) =>
              post._id === currentId && (
                <div key={post.contact}>
                  <MessageBody post={post} currentId={currentId} />
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default Communication;
