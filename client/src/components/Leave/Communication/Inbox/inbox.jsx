import { ButtonBase, Typography, Avatar, Grid, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";

const Inbox = ({ post, setCurrentId }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [clickedId, setClickedId] = useState();

  useEffect(() => {
    setClickedId(post._id);
  }, [clickedId]); // Log the updated clickedId when it changes

  const openMessage = (e) => {
    e.stopPropagation();
    setCurrentId(post._id);
    if (clickedId === post._id) {
      setIsClicked(true);
    } else setIsClicked(!isClicked);
  };

  return (
    <>
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

          borderRadius: "12px",
        }}
        onClick={openMessage}
        // onMouseEnter={handleMouseEnter}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: "50px",
          }}
        >
          <Avatar
            alt="avatar"
            src={post?.selectedFile}
            withborder="true"
            color="green"
          />

          <Typography
            variant="h6"
            color="#16355c"
            sx={{ marginLeft: "20px", fontFamily: "Roboto" }}
          >
            {post?.firstName.charAt(0).toUpperCase() +
              post?.firstName.slice(1).toLowerCase() +
              " " +
              post?.lastName.charAt(0).toUpperCase() +
              post?.lastName.slice(1).toLowerCase()}
          </Typography>
        </Grid>

        {/* <div width="calc(50%)">
          <Typography variant="h5" color="black">
            {post?.firstName}
          </Typography>
        </div> */}
      </ButtonBase>
      {/* </Button> */}
    </>
  );
};

export default Inbox;

//  all avatar should align in same distance from right margin
