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
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
// import SettingsIcon from "@mui/icons-material/Settings";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import LogoutIcon from "@mui/icons-material/Logout";
import ForwardToInboxTwoToneIcon from "@mui/icons-material/ForwardToInboxTwoTone";

// import avatar1 from "../../assets/Profile.jpg";

const Panel = ({ prop }) => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = React.useState();
  // const [Btn, setBtn] = useState(false);

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  // console.log("id in home page", prop);

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

  const dashboardMode = () => {
    navigate("/home");
  };

  const inboxMode = (id) => {
    navigate(`/mail/${id}/communication`);
  };

  const employeeMode = (id) => {
    navigate(`/${id}/profile`);
  };

  // const toggleDrawer = (state) => (event) => {
  //   event.preventDefault();
  //   if (
  //     event &&
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  //   setState(state);
  // };

  return (
    <Card
      sx={{
        bgcolor: "#ede4e5",
        borderRadius: "12px",
        "@media (max-width: 600px)": {
          flexDirection: "column",
          width: "50vh",
        },

        "@media (min-width: 600px)": {
          flexDirection: "column",
        },
      }}
      elevation={10}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#ede4e5",
          width: "100%",
          height: "100vh",
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
              src={user.result.selectedFile}
            />
          </Stack>
        </Grid>
        <Grid>
          <Typography
            sx={{
              // justifyContent: "center",
              // textAlign: "center",
              fontFamily: "Roboto",
              marginLeft: "70px",
              marginTop: "10px",
              color: "#16355d",
            }}
          >
            {user.result.firstName + " " + user.result.lastName}
          </Typography>
        </Grid>

        <Divider sx={{ mb: 6, ml: 0, mr: 0 }} />
        <Card
          elevation={5}
          sx={{
            backgroundColor: "#16355d",
            marginLeft: "50px",
            marginRight: "50px",
            marginTop: "-30px",
            marginBottom: "30px",
          }}
        >
          <Typography
            sx={{
              color: "white",
              textAlign: "center",
              fontFamily: "Robota",
              fontWeight: "bold",
              fontSize: "12px",
            }}
          >
            {user.result.role.toUpperCase()}
          </Typography>
        </Card>
        <Grid>
          <Box sx={{ mb: "10px" }}>
            <ListItemButton sx={{ mb: "10px" }} onClick={dashboardMode}>
              <ListItemIcon>
                <DashboardIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#16355d" }} primary="Dashboard" />
            </ListItemButton>

            {/* inbox added here */}
            <ListItemButton
              sx={{ mb: "10px" }}
              onClick={() => inboxMode(user.result._id, "inbox")}
            >
              <ListItemIcon>
                <ForwardToInboxTwoToneIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#16355d" }} primary="Inbox" />
            </ListItemButton>

            <ListItemButton
              sx={{ mb: "10px" }}
              onClick={() => employeeMode(user.result._id, "registration")}
            >
              <ListItemIcon>
                <PeopleAltIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#16355d" }} primary="Employee" />
            </ListItemButton>

            <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <AnalyticsIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText sx={{ color: "#16355d" }} primary="Analytics" />
            </ListItemButton>

            <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <BadgeIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "#16355d" }}
                primary="Report Attendance"
              />
            </ListItemButton>

            {/* <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText sx={{color: "#16355d"}} primary="settings" />
            </ListItemButton> */}

            <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText
                sx={{ color: "#16355d" }}
                onClick={switchMode}
                primary="logout"
              />
            </ListItemButton>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Panel;
