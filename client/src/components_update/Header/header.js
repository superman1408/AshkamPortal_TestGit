/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppBar,
  Toolbar,
  Tab,
  Tabs,
  Button,
  useMediaQuery,
  useTheme,
  Box,
  Divider,
  Avatar,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import DrawerComp from "./drawerComponent";
import HeroHeader from "./heroBanner";
import HomeIcon from "@mui/icons-material/Home";
import { LOGOUT } from "../../constants/actionTypes";

const PAGES = ["Home", "Profile", "Leave", "About Us"];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) switchMode();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const switchMode = (e) => {
    e.preventDefault();
    setUser(null);
    dispatch({ type: LOGOUT });
    navigate("/", { replace: true });
    console.log("Log out");
  };

  return (
    <>
      <HeroHeader />
      <Box
        container
        component="main"
        fullWidth
        sx={{
          position: "sticky",
          top: "0",
        }}
      >
        <AppBar sx={{ position: "sticky", top: "0", bgcolor: "#0C60C0" }}>
          <Toolbar variant="dense">
            {isMatch ? (
              <>
                <DrawerComp />
              </>
            ) : (
              <>
                {/* <Tabs
                  textColor="inherit"
                  value={value}
                  onChange={(e, value) => setValue(value)}
                  indicatorColor="secondary"
                >
                  {PAGES.map((page, index) => (
                    <Tab key={index} label={page} />
                  ))}
                </Tabs> */}

                <Tabs
                  textColor="inherit"
                  value={value}
                  onChange={(e, value) => setValue(value)}
                  indicatorColor="secondary"
                  sx={{ marginLeft: "300px" }}
                >
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    color="white"
                  />
                  <div style={{ padding: "10px" }}>
                    <IconButton component={Link} to="/home" id="home">
                      <HomeIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                  </div>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    color="white"
                  />
                  <Tab
                    component={Link}
                    to="/profile"
                    type="submit"
                    required
                    fullWidth
                    label="Profile"
                    sx={{ fontSize: "15px", marginLeft: "20px" }}
                  />
                  <Tab
                    component={Link}
                    to="/mail/:id/leave"
                    type="submit"
                    label="Leave"
                    sx={{ fontSize: "15px" }}
                  />
                  <Tab
                    component={Link}
                    to="/aboutUs"
                    type="submit"
                    label="About Us"
                    sx={{ fontSize: "15px" }}
                  />
                </Tabs>
              </>
            )}

            <Toolbar sx={{ marginLeft: "auto" }}>
              {user ? (
                <div style={{ display: "flex", marginRight: "20px" }}>
                  <Avatar alt={user?.result?.name} src={user?.result?.imageUrl}>
                    {user?.result?.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h6">{user?.result?.name}</Typography>
                </div>
              ) : (
                <span></span>
              )}

              <Button
                type="submit"
                variant="contained"
                outlined
                onClick={switchMode}
                sx={{ marginLeft: "auto", bgcolor: "#133254" }}
              >
                Log Out
              </Button>
            </Toolbar>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
