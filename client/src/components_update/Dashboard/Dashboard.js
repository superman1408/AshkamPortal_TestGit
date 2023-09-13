import React from "react";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// import Navbar from "../Navbar/navbar";

import { LOGOUT } from "../../constants/actionTypes";
// import avatar1 from "../../image/Profile.jpg";

import WeeklyActivity from "./WeeklyActivity/WeeklyActivity";
import Skill from "./Skills/Skill";
import TotalEmployee from "./TotalEmployee/TotalEmployee";
import EmployeeOnHoliday from "./EmployeeOnHoliday/EmployeeOnHoliday";
import Calender from "./Calender/Calender";
import Birthday from "./Birthday/Birthday";

import decode from "jwt-decode";
import { Link } from "react-router-dom";
// import { Search } from "react-router-dom";
import { styled } from "@mui/material/styles";
// import "./style.css";

import {
  Box,
  Grid,
  IconButton,
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Search,
  Stack,
  Avatar,
  Button,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import Panel from "./Panel/Panel";
import Attendance from "./Attendance/Attendance";
import { Card } from "@material-ui/core";

// const settings = ["Theme", "Keyboard shortcuts", "settings", "Extensions"];

const Admin = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2px",
          padding: "0px",
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          {/*------------------Panel----------------------------- */}
          <Panel />

          {/* ---------------Dashboard section-------------------------*/}
          <Grid
            sx={{
              display: "flex",
              marginBottom: "5px",
              flexDirection: "column",
              bgcolor: "#f0f2f1",
            }}
          >
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <Grid>
                <Typography
                  variant="h5"
                  sx={{ display: "flex", marginLeft: "80px" }}
                >
                  Welcome Admin!
                </Typography>

                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <Grid>
                    <TotalEmployee />
                  </Grid>

                  <Grid>
                    <Skill />
                  </Grid>
                </Grid>

                <Grid>
                  <WeeklyActivity />
                </Grid>
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "column " }}>
                <Grid>
                  <Attendance />
                </Grid>

                <Grid>
                  <Birthday />
                </Grid>

                <Grid>
                  <EmployeeOnHoliday />
                </Grid>

                <Grid sx={{ boxShadow: "1", border: "1 px solid black" }}>
                  <Calender />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>;
export default Admin;
