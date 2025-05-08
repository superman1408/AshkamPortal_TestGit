import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const role = user.result.role;

  return (
    <Box
      sx={{
        borderRadius: "12px",
        padding: "12px",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{
            width: 30,
            height: 30,
            marginLeft: "30px",
            marginTop: "5px",
          }}
          src={
            role === "employee"
              ? "employee"
              : role === "manager"
              ? "manager"
              : role === "admin" && "admin"
          }
        />
        {/* </div>
          <div> */}
        <Typography
          variant="h5"
          sx={{
            color: "#16355d",
            fontFamily: "Roboto",
            display: "flex",
            marginLeft: "20px",
            "@media (max-width: 600px)": {
              flexDirection: "column",
              color: "#16355d",
            },

            "@media (min-width: 600px)": {
              flexDirection: "row",
            },
          }}
        >
          Welcome
          {` ${user.result.firstName.toUpperCase()} !`}
        </Typography>
      </Box>
    </Box>
  );
};

export default Topbar;
