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
      {/* <Button required fullWidth> */}
      <ButtonBase
        required
        fullwidth="true"
        sx={{
          bgcolor: "smokewhite",
          boxShadow: 5,
          width: "47vh",
          padding: "5px",
          height: "80px",
          margin: "2px",
        }}
        onClick={openMessage}
      >
        <Grid sx={{ display: "flex", flexDirection: "row",  alignContent: "space-between", marginRight: "80px" }}>
          <Avatar
            alt="avatar"
            src={post?.selectedFile}
            withborder="true"
            color="green"
          />

          <Typography variant="h6" color="#16355c" sx={{ marginLeft: "20px", fontFamily: "Roboto" }}>
            {post?.firstName + " " + post?.lastName}
          </Typography>
        </Grid>

        {/* <div width="calc(50%)">
            <Typography variant="h5" color="black">
              {post?.name}
            </Typography>
          </div> */}
      </ButtonBase>
      {/* </Button> */}
    </div>
  );
};

export default Inbox;
