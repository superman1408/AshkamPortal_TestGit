import React from "react";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";

import useMediaQuery from "@mui/material/useMediaQuery";

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

const Panel = () => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    left: false,
  });
  // const [Btn, setBtn] = useState(false);

  const matches = useMediaQuery("(min-width:990px)");

  const dispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const id = user.result._id;

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

  const inboxMode = () => {
    navigate(`/mail/${id}/communication`);
  };

  const employeeMode = () => {
    navigate(`/${id}/profile`);
  };

  const analytics = () => {
    navigate(`/posts/${id}/fullweeklyactivity`);
  };

  const attendance = () => {
    navigate(`/${id}/attendanceDisplay`);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const firstNameAtInitial = user.result.firstName.toLowerCase();

  const lastNameAtInitial = user.result.lastName.toLowerCase();

  const userName =
    firstNameAtInitial.charAt(0).toUpperCase() +
    firstNameAtInitial.slice(1).toLowerCase() +
    " " +
    lastNameAtInitial.charAt(0).toUpperCase() +
    lastNameAtInitial.slice(1).toLowerCase();

  return (
    <Card
      sx={{
        bgcolor: "#ede4e5",
        borderRadius: "12px",
        padding: "10px",
        "@media (max-width: 600px)": {
          flexDirection: "column",
          width: "50vh",
          padding: "0px",
        },

        "@media (min-width: 600px)": {
          flexDirection: "column",
          // padding: "0px",
        },
      }}
      elevation={10}
    >
      <div>
        {matches && (
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
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{
                  mt: 2,
                }}
              >
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    // marginLeft: "10px",
                    justifyContent: "center",
                    bgcolor: "orange",
                    userSelect: "none", // Prevent selection
                    pointerEvents: "none", // Prevent interaction
                  }}
                  src={user.result.selectedFile}
                />
              </Stack>
            </Grid>
            <Grid>
              <Typography
                sx={{
                  justifyContent: "center",
                  textAlign: "center",
                  fontFamily: "Roboto",
                  // marginLeft: "70px",
                  marginTop: "10px",
                  color: "#16355d",
                }}
              >
                {userName}
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
                  fontFamily: "Roboto",
                  fontWeight: "bold",
                  fontSize: "10px",
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

                <ListItemButton
                  sx={{ mb: "10px" }}
                  onClick={() => employeeMode(user.result._id, "registration")}
                >
                  <ListItemIcon>
                    <PeopleAltIcon sx={{ color: "#038f7c" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#16355d" }} primary="Profile" />
                </ListItemButton>

                {/* inbox added here */}
                <ListItemButton
                  sx={{ mb: "10px" }}
                  onClick={() => inboxMode(user.result._id, "inbox")}
                >
                  <ListItemIcon sx={{ mb: "10px" }} onClick={dashboardMode}>
                    <ForwardToInboxTwoToneIcon sx={{ color: "#038f7c" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#16355d" }} primary="Inbox" />
                </ListItemButton>

                <ListItemButton sx={{ mb: "10px" }} onClick={analytics}>
                  <ListItemIcon>
                    <AnalyticsIcon sx={{ color: "#038f7c" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#16355d" }} primary="Analytics" />
                </ListItemButton>

                <ListItemButton sx={{ mb: "10px" }} onClick={attendance}>
                  <ListItemIcon>
                    <BadgeIcon sx={{ color: "#038f7c" }} />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ color: "#16355d" }}
                    primary="Attendance Report"
                  />
                </ListItemButton>

                {/* <ListItemButton sx={{ mb: "10px" }}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: "#038f7c" }} />
              </ListItemIcon>
              <ListItemText sx={{color: "#16355d"}} primary="settings" />
            </ListItemButton> */}

                <ListItemButton sx={{ mb: "10px" }} onClick={switchMode}>
                  <ListItemIcon>
                    <LogoutIcon sx={{ color: "#038f7c" }} />
                  </ListItemIcon>
                  <ListItemText sx={{ color: "#16355d" }} primary="Logout" />
                </ListItemButton>
              </Box>
            </Grid>
          </Grid>
        )}
      </div>
    </Card>
  );
};

export default Panel;
