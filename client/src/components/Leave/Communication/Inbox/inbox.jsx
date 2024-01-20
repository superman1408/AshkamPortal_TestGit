import { ButtonBase, Typography, Button, Avatar, Grid } from "@mui/material";
import React from "react";

// import Message from "../Message/message";

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
            bgcolor: "#aee3e8",
            width: "50vh",
            padding: "5px",
            height: "80px",
          }}
          onClick={openMessage}
        >
          <Grid
            sx={{ display: "flex", width: "calc(100%)", marginLeft: "20px" }}
          >
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

          {/* <div width="calc(50%)">
            <Typography variant="h5" color="black">
              {post?.name}
            </Typography>
          </div> */}
        </ButtonBase>
      </Button>
    </div>
  );
};

export default Inbox;
