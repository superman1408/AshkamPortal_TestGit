import { Container } from "@mui/material";
import React from "react";
import Attendance from "../Attendance/Attendance";
import { Avatar, Box, Grid, Typography } from "@mui/material";

const Topbar = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const role = user.result.role;

  return (
    <div>
      <Container
        sx={{
          bgcolor: "white",
          display: "flex",
          justifyContent: "space-between",
          width: "1000px",
          padding: "12px",
          borderRadius: "12px",
          marginLeft: "10px",
        }}
      >
        <div>
          <div style={{ display: "flex" }}>
            <div style={{ width: "20px", height: "30px" }}>
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
            </div>
            <div>
              <Typography
                variant="h5"
                sx={{
                  color: "#16355d",
                  fontFamily: "Roboto",
                  display: "flex",
                  marginLeft: "60px",
                  marginBottom: "20px",
                  // fontWeight: "bold",
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
            </div>
          </div>
        </div>
        {/* <div>
          <Attendance />
        </div> */}
      </Container>
    </div>
  );
};

export default Topbar;
