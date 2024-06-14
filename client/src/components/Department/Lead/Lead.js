import React from "react";
import { Typography, Grid, Avatar, Stack } from "@mui/material";

const Lead = ({ post, verifyDepat }) => {
  return (
    <div>
      <Grid sx={{ display: "flex", flexDirection: "row" }}>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Stack flexDirection="row">
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
                alt="Femy sharp"
                src={post.selectedFile}
              />
            </Stack>
          </div>
        </Grid>
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              marginLeft: "20px",
              marginRight: "0px",
              marginTop: "18px",
              fontSize: "14px",
              fontFamily: "Roboto",
            }}
          >
            {post.firstName + post.lastName}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Lead;
