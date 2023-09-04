import {
  Box,
  ButtonBase,
  Card,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import React from "react";
import Message from "../Message/message";

const Inbox = ({ post, setCurrentId }) => {
  const openMessage = (e) => {
    console.log("button is workin");
    e.stopPropagation();
    setCurrentId(post._id);
  };

  return (
    <div>
      <Button required fullWidth>
        <ButtonBase
          sx={{
            bgcolor: "pink",
            width: "100%",
            padding: "5px",
            height: "100px",
          }}
          onClick={openMessage}
        >
          <div>
            <Avatar
              alt="avatar"
              src={post?.selectedFile}
              withBorder={true}
              color="green"
            />
          </div>

          <div className="grid grid-rows-2">
            <Typography variant="h5" color="blue">
              {post?.name}
            </Typography>
            <Typography variant="h6">{post?.email}</Typography>
          </div>
        </ButtonBase>
      </Button>
    </div>
  );
};

export default Inbox;
