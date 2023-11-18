import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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
    <>
      <div style={{ padding: "5px", display: "flex" }}>
        <div>
          <Panel />
        </div>
        <Grid sx={{ bgcolor: "#047782", display: "flex", width: "100%" }}>
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
                    <div key={post._id}>
                      <MessageBody post={post} currentId={currentId} />
                    </div>
                  )
              )}
          </div>
        </Grid>
      </div>
    </>
  );
};

export default Communication;
