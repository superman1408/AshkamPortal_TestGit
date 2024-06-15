import React from "react";
import { Typography, Grid, Avatar, Stack, Divider } from "@mui/material";

const Lead = ({ post, verifyDepat }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
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
                  marginTop: "20px",
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
            {post.firstName + " " + post.lastName}
          </Typography>
          <Typography
            sx={{
              marginLeft: "20px",
              marginRight: "30px",
              fontFamily: "Roboto",
              fontSize: "12px",

              fontWeight: "bold",
            }}
          >
            {post.jobTitle}
          </Typography>
        </Grid>
      </Grid>
      <Divider orientation="horizontal" />
      <Grid sx={{ display: "flex", flexDirection: "row" }}>
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Stack flexDirection="row">
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  marginLeft: "10px",
                  marginTop: "20px",
                }}
                alt="Femy sharp"
                src={user.result.selectedFile}
              />
            </Stack>
          </div>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "48px",
          }}
        >
          <Typography
            sx={{
              marginLeft: "20px",
              marginRight: "0px",
              marginTop: "18px",
              fontSize: "14px",
              fontFamily: "Roboto",
            }}
          >
            {user.result.firstName + " " + user.result.lastName}
          </Typography>
          <Typography
            sx={{
              marginLeft: "20px",
              marginRight: "30px",
              fontFamily: "Roboto",
              fontSize: "12px",

              fontWeight: "bold",
            }}
          >
            {user.result.jobTitle}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Lead;
