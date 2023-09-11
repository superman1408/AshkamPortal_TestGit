import React from 'react';

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
import GroupsIcon from "@mui/icons-material/Groups";
import SearchIcon from "@mui/icons-material/Search";
import SearchIconWrapper from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Panel = () => {
  return (
    <div>
        <Grid sx={{ width:"220px" }}>
            <IconButton
              size="200px"
              color="secondary"
              sx={{
                ml: "75px",
                display: {
                  xs: "block",
                  sm: "block",
                },
              }}
            >
              <GroupsIcon />
            </IconButton>
            <Typography sx={{ marginLeft: "70px", color: "indigo" }}>
              Employee
            </Typography>
            <Typography sx={{ marginLeft: "60px", color: "indigo" }}>
              Management
            </Typography>

            <Divider sx={{ mb: 6, ml:0, mr:0 }} />

            <Box sx={{ mb: 2 }}>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon sx={{ color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <EventAvailableIcon sx={{ color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Attendance" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <PeopleAltIcon sx={{ color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Employee" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <AnalyticsIcon sx={{ color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Analytics" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <BadgeIcon sx={{ color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Report Attendance" />
              </ListItemButton>

              <ListItemButton>
                <ListItemIcon>
                  <SettingsIcon sx={{ color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText primary="settings" />
              </ListItemButton>
            </Box>
          </Grid>
    </div>
  )
}

export default Panel