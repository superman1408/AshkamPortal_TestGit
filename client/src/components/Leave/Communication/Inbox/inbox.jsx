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

  // 🔒 Exclude Admin roles (case-insensitive)
  if (post?.role?.toLowerCase() === "admin") {
    return null; // Do not render anything
  }

  return (
    <>
      <ButtonBase
        xs={12}
        md={12}
        required
        fullwidth="true"
        sx={{
          bgcolor: "white",
          boxShadow: 9,
          // width: "250px",
          // padding: "5px",
          // height: "80px",
          margin: "2px",

          borderRadius: "12px",
        }}
        onClick={openMessage}
        // onMouseEnter={handleMouseEnter}
      >
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            // marginRight: "10px",
            // marginLeft: "10px",
          }}
        >
          <Grid sx={{ padding: "10px" }}>
            <Avatar
              alt="avatar"
              src={post?.selectedFile}
              withborder="true"
              color="green"
            />
          </Grid>
          <Grid sx={{ width: "240px", padding: "10px" }}>
            <Typography
              variant="h6"
              color="#16355c"
              sx={{ fontFamily: "Roboto" }}
            >
              {post?.firstName.charAt(0).toUpperCase() +
                post?.firstName.slice(1).toLowerCase() +
                " " +
                post?.lastName.charAt(0).toUpperCase() +
                post?.lastName.slice(1).toLowerCase()}
            </Typography>
          </Grid>
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
