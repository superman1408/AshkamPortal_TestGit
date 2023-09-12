import React from 'react';

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { LOGOUT } from "../../../constants/actionTypes";

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

import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";


import avatar1 from "../../../image/Profile.jpg";

const Panel = () => {
  const [Btn, setBtn] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) switchMode();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const switchMode = () => {
    setUser(null);
    dispatch({ type: LOGOUT });
    navigate("/auth");
  };


  return (
    <div>
        <Grid sx={{ width:"220px" }}>
            <Stack flexDirection="row" sx={{
                ml: "85px",
                display: {
                  xs: "block",
                  sm: "block",
                },
              }}>
                <Avatar
                  sx={{ width: 40, height: 40, marginLeft: "10px" }}
                  alt="Femy sharp"
                  src={avatar1}
                />
              </Stack>
            <Typography sx={{ marginLeft: "70px", color: "black" }}>
              Employee
            </Typography>
            <Typography sx={{ marginLeft: "60px", color: "black" }}>
              Management
            </Typography>

            <Divider sx={{ mb: 6, ml:0, mr:0 }} />

            <Box sx={{ mb: 2 }}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: "#038f7c" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <EventAvailableIcon sx={{ color: "#038f7c" }} />
                </ListItemIcon>
                <ListItemText primary="Attendance" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltIcon sx={{ color: "#038f7c" }} />
                </ListItemIcon>
                <ListItemText primary="Employee" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <AnalyticsIcon sx={{ color: "#038f7c" }} />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <BadgeIcon sx={{ color: "#038f7c" }} />
                </ListItemIcon>
                <ListItemText primary="Report Attendance" />
              </ListItemButton>



              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: "#038f7c" }} />
                </ListItemIcon>
                <ListItemText primary="settings" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "#038f7c" }} />
                </ListItemIcon>
                <ListItemText onClick={switchMode} primary="logout" />
              </ListItemButton>
            </Box>
          </Grid>
    </div>
  )
}

export default Panel