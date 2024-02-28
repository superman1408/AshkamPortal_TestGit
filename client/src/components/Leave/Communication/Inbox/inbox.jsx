import { ButtonBase, Typography, Avatar, Grid } from "@mui/material";
import React, { useState } from "react";

const Inbox = ({ post, setCurrentId }) => {
  const [clickedButton, setClickedButton] = useState(false);

  const openMessage = (e) => {
    e.stopPropagation();
    setCurrentId(post._id);
    setClickedButton(true); // Set the clicked state to true when the button is clicked
  };

  // const handleMouseLeave = () => {
  //   setClickedButton(false); // Reset the clicked state when the mouse leaves the button
  // };

  return (
    <div>
      <ButtonBase
        required
        fullwidth="true"
        sx={{
          bgcolor: clickedButton ? "#f0f2f1" : "transparent",
          width: "50vh",
          padding: "5px",
          height: "80px",
        }}
        onClick={openMessage}
        // onMouseLeave={handleMouseLeave}
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
