import React from "react";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// import Navbar from "../Navbar/navbar";

import { LOGOUT } from "../../constants/actionTypes";
import avatar1 from "../../image/Profile.jpg";

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





const settings = ["Theme", "Keyboard shortcuts", "settings", "Extensions"];

const Admin = () => {
  const [date, setDate] = useState(new Date());
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [Btn, setBtn] = useState(false);

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  

  useEffect(() => {
    window.addEventListener("resize", detectSize);
    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [dimension]);

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
    navigate("/");
  };

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2px",
          padding: "10px",
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          {/*------------------------------------------------Panel----------------------------------------------- */}
          <Grid sx={{ mr: "30px" }}>
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
            <Typography sx={{ marginLeft: "60px", color: "indigo" }}>
              Employee
            </Typography>
            <Typography sx={{ marginLeft: "50px", color: "indigo" }}>
              Management
            </Typography>

            <Divider sx={{ mb: 8 }} />

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

          {/* ----------------------------------------Dashboard section-------------------------------------------------*/}
          <Grid
            sx={{
              display: "flex",
              marginBottom: "5px",
              flexDirection: "column",
              bgcolor: "#f0f2f1",
              padding: "2px",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Stack flexDirection="row" spacing={2}>
                <Avatar
                  sx={{ width: 40, height: 40, marginLeft: "750px" }}
                  alt="Femy sharp"
                  src={avatar1}
                />
              </Stack>
              <ListItemButton sx={{ marginLeft: "0px" }}>
                <ListItemIcon>
                  <NotificationsIcon sx={{ color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText primary="Notification" />
              </ListItemButton>
              <Divider orientation="vertical" />
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "secondary.main" }} />
                </ListItemIcon>
                <ListItemText onClick={switchMode} primary="logout" />
              </ListItemButton>
            </Grid>

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
                    <TotalEmployee/>
                    
                  </Grid>
                  <Grid>
                    <Skill/>
                  </Grid>
                </Grid>
                <Grid>
                <WeeklyActivity/>
                </Grid>
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "column " }}>
                <Grid>
                  <Box
                    sx={{
                      width: "380px",
                      height: "40px",
                      marginTop: "10px",
                      marginLeft: "20px",
                      padding: "10px",
                      bgcolor: "background.paper",
                      boxShadow: 1,
                      borderRadius: "10px",
                    }}
                  >
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        bgcolor: "#e9edf7",
                      }}
                    >
                      <Grid sx={{ marginLeft: "40px" }}>
                        <Typography>attendance</Typography>
                        <Typography>30</Typography>
                      </Grid>

                      <Grid sx={{ marginLeft: "40px" }}>
                        <Typography>Late</Typography>
                        <Typography>3</Typography>
                      </Grid>

                      <Grid sx={{ marginLeft: "40px" }}>
                        <Typography>absent</Typography>
                        <Typography>2</Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>

                <Grid>
                  <Birthday/>
                </Grid>

                <Grid>
                  <EmployeeOnHoliday/>
                </Grid>

                <Grid>
                  <Calender/>
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
