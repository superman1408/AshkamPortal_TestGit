import React, { useState, useEffect } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Box,
  Button,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Divider, Grid } from "@mui/material";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";

const PAGES = ["Home", "Profile", "Leave", "About Us"];
const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) switchMode();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const switchMode = () => {
    setUser(null);
    dispatch({ type: LOGOUT });
    navigate("/inbox");
  };
  return (
    <>
      <Drawer
        sx={{
          width: 240,
        }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {/* {PAGES.map((page, index) => (
            <ListItemButton key={index}>
              <ListItemIcon>
                <ListItemText>{page}</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          ))} */}

          <ListItemButton>
            <ListItemIcon>
              <Button
                component={Link}
                to="/dashboard"
                id="dashboard"
                type="submit"
                color="primary"
                required
                fullWidth
              >
                Home
              </Button>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <Button
                component={Link}
                to="/profile"
                id="dashboard"
                type="submit"
                color="primary"
                required
                fullWidth
              >
                Profile
              </Button>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <Button
                component={Link}
                to="/leave"
                id="dashboard"
                type="submit"
                color="primary"
                required
                fullWidth
              >
                Leave
              </Button>
            </ListItemIcon>
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <Button
                component={Link}
                to="/profile"
                id="dashboard"
                type="submit"
                color="primary"
                required
                fullWidth
              >
                About Us
              </Button>
            </ListItemIcon>
          </ListItemButton>
        </List>

        <Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            required
            fullWidth
            onClick={switchMode}
          >
            LOG OUT
          </Button>
        </Box>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        sx={{ color: "white" }}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComp;
