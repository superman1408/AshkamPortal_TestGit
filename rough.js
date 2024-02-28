
// Inbox.js
import { ButtonBase, Typography, Avatar, Grid } from "@mui/material";
import React from "react";

const Inbox = ({ post, setCurrentId, onClick, isHovered }) => {
  const openMessage = (e) => {
    e.stopPropagation();
    setCurrentId(post._id);
    onClick(post._id); // Notify the parent component that this Inbox is clicked
  };

  return (
    <div>
      <ButtonBase
        required
        fullwidth="true"
        sx={{
          bgcolor: isHovered ? "#f0f2f1" : "transparent",
          width: "50vh",
          padding: "5px",
          height: "80px",
        }}
        onClick={openMessage}
        onMouseEnter={() => setCurrentId(post._id)}
        onMouseLeave={() => setCurrentId(null)}
      >
        <Grid sx={{ display: "flex", width: "calc(100%)", marginLeft: "20px" }}>
          <Avatar
            alt="avatar"
            src={post?.selectedFile}
            withborder="true"
            color="green"
          />
          <Typography variant="h6" color="black" sx={{ marginLeft: "20px" }}>
            {post?.firstName + " " + post?.lastName}
          </Typography>
        </Grid>
      </ButtonBase>
    </div>
  );
};

export default Inbox;



// Communication.js
import React, { useState, useEffect } from "react";
import { Grid, Card, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../../Panel/Panel";

import Inbox from "./Inbox/inbox";
import MessageBody from "./Message/MessageBody";
import { getPosts } from "../../../action/posts";

const Communication = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const handleClick = (clickedId) => {
    setCurrentId(clickedId); // Update the currentId state when an Inbox is clicked
  };

  return (
    <>
      <div style={{ padding: "5px", display: "flex" }}>
        <Card elevation={10}>
          <Panel />
        </Card>
        <Grid
          sx={{
            display: "flex",
          }}
        >
          <div
            style={{
              height: "600px",
              overflow: "auto",
              width: "300px",
              pointerEvents: "auto",
              marginLeft: "10px",
            }}
          >
            <div>
              {user &&
                posts.map(
                  (post) =>
                    post.name === user.result.name && (
                      <div key={post._id}>
                        <Inbox
                          post={post}
                          setCurrentId={setCurrentId}
                          onClick={handleClick}
                          isHovered={currentId === post._id}
                        />
                        <Divider
                          variant="inset"
                          sx={{ borderWidth: "1px", fontWeight: "15px" }}
                        />
                      </div>
                    )
                )}
            </div>
          </div>
          <div>
            <div style={{ width: "500", height: "600" }}>
              <div
                style={{
                  background: "#cfd1d0",
                  height: "600px",
                  overflow: "auto",
                  top: "100px",
                  zIndex: 99999,
                  width: "auto",
                  pointerEvents: "auto",
                }}
              >
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
            </div>
          </div>
        </Grid>
      </div>
    </>
  );
};

export default Communication;
