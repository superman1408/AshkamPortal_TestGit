import React from "react";
import { Typography, Grid, Avatar, Stack, Divider } from "@mui/material";

const Lead = ({ post, verifyDepat }) => {
  return (
    <div>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap", // This allows layout to wrap if needed
          width: "100%",
        }}
      >
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
              color: "#16355d",
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
              color: "#16355d",
              fontWeight: "bold",
            }}
          >
            {post.jobTitle}-{post.role.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
      <Divider orientation="horizontal" />

{/*  This section commented as user is rendering everytime when Lead component is called so it is shifted to Department.js file */}

      {/* {user.result.role === post.role ? (
        <Grid sx={{ marginBottom: "62px" }}></Grid>
      ) : (
        <Grid
          sx={{ display: "flex", flexDirection: "row", marginBottom: "2px" }}
        >
          <Grid
            sx={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
          >
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
            }}
          >
            <Typography
              sx={{
                marginLeft: "20px",
                marginRight: "0px",
                marginTop: "18px",
                fontSize: "14px",
                fontFamily: "Roboto",
                color: "#16355d",
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
                marginBottom: "2px",
                fontWeight: "bold",
                color: "#16355d",
              }}
            >
              {user.result.jobTitle}
            </Typography>
          </Grid>
        </Grid>
      )} */}
    </div>
  );
};

export default Lead;
