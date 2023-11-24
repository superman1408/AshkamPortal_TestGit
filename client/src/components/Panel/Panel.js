import React from "react";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";

import {
  Box,
  Grid,
  Typography,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Stack,
  Avatar,
  Card,
  Drawer,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import ForwardToInboxTwoToneIcon from "@mui/icons-material/ForwardToInboxTwoTone";

// import avatar1 from "../../assets/Profile.jpg";

const Panel = (post) => {
  const [state, setState] = React.useState();
  // const [Btn, setBtn] = useState(false);

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

  const toggleDrawer = (state) => (event) => {
    event.preventDefault();
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(state);
  };

  return (
    <Card elevation={10}>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          width: "100%",
          height:"100vh"
        }}
      >
        <Grid>
          <Stack
            flexDirection="row"
            sx={{
              mt: "10px",
              ml: "85px",
              display: {
                xs: "block",
                sm: "block",
              },
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                marginLeft: "10px",
                bgcolor: "orange",
              }}
            >
              {/* {post.firstName} */}

              {user.result.firstName.charAt(0).toUpperCase() +
                user.result.lastName.charAt(0).toUpperCase()}
            </Avatar>
          </Stack>
        </Grid>
        <Grid>
          <Typography
            sx={{ marginLeft: "80px", color: "black", marginTop: "10px" }}
          >
            Employee
          </Typography>
          <Typography sx={{ marginLeft: "70px", color: "black" }}>
            Management
          </Typography>
        </Grid>

        <Divider sx={{ mb: 6, ml: 0, mr: 0 }} />

        <Grid>
          <Box sx={{ mb: "10px" }}>
            <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>

            {/* inbox added here */}
            <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <ForwardToInboxTwoToneIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItemButton>

            <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <PeopleAltIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText primary="Employee" />
            </ListItemButton>

            <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <AnalyticsIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText primary="Analytics" />
            </ListItemButton>

            <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <BadgeIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText primary="Report Attendance" />
            </ListItemButton>

            <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText primary="settings" />
            </ListItemButton>

            <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText onClick={switchMode} primary="logout" />
            </ListItemButton>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Panel;
