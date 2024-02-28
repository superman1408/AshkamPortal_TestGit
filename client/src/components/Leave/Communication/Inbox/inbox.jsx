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
    <div>
      <ButtonBase
        required
        fullwidth="true"
        sx={{
          bgcolor: isClicked ? "#f0f2f1" : "white",
          width: "50vh",
          padding: "5px",
          height: "80px",
        }}
        onClick={openMessage}
        // onMouseEnter={handleMouseEnter}
      >
        {isClicked && (
          <Divider
            orientation="vertical"
            textAlign="left"
            sx={{ borderWidth: "3px", bgcolor: "#535adf" }}
            flexItem
          />
        )}
        <Grid sx={{ display: "flex", width: "calc(100%)", marginLeft: "20px" }}>
          <Avatar
            alt="avatar"
            src={post?.selectedFile}
            withborder="true"
            color="green"
          />

          <Typography
            color="black"
            sx={{ marginLeft: "20px", fontSize: "18px", fontWeight: "bold" }}
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
