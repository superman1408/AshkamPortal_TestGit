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
    console.log("clickedId", clickedId);
    // setIsClicked(true); // Set the isClicked state to true when the button is clicked
    if (clickedId === post._id) {
      setIsClicked(true);
      console.log("here");
    } else setIsClicked(!isClicked);
  };

  return (
    <div
      style={{
        "@media (max-width: 600px)": {
          width: "50px",
        },
      }}
    >
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
        // onMouseEnter={handleMouseEnter}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            alignContent: "space-between",
            marginRight: "80px",
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
