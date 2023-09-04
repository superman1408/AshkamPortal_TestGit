import React from "react";
import LOGO from "../images/Company.png";
import { Link } from "@mui/material";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";

const HeroHeader = () => {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      {isMatch ? (
        <Grid sx={{ display: "flex" }}>
          <Grid style={{ marginLeft: "30px", padding: "10px" }}>
            <img src={LOGO} alt="logo" style={{ width: "100px" }} />
          </Grid>
          <Grid sx={{ display: "flex", padding: "5px" }}>
            <Grid
              sx={{
                marginLeft: "50px",
                padding: "10px",
                display: "flex",
                fontSize: "10px",
              }}
            >
              <ContactMailIcon color="primary" />
              <Link
                href="http://www.ashkam.in/contact-us"
                sx={{ marginLeft: "5px", cursor: "pointer" }}
              >
                Contact Us
              </Link>
            </Grid>
            <Grid
              sx={{
                marginLeft: "3px",
                padding: "10px",
                display: "flex",
                fontSize: "10px",
              }}
            >
              <OpenInBrowserIcon color="primary" />
              <Link
                href="http://www.ashkam.in/"
                sx={{ marginLeft: "5px", cursor: "pointer" }}
              >
                ASHKAM WEBSITE
              </Link>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid sx={{ display: "flex" }}>
          <Grid style={{ marginLeft: "30px", padding: "10px" }}>
            <img src={LOGO} alt="logo" style={{ width: "200px" }} />
          </Grid>
          <Grid style={{ marginLeft: "600px", display: "flex" }}>
            <Grid sx={{ padding: "10px", display: "flex" }}>
              <ContactMailIcon color="primary" />
              <Link
                href="http://www.ashkam.in/contact-us"
                sx={{ marginLeft: "5px", cursor: "pointer" }}
              >
                Contact Us
              </Link>
            </Grid>
            <Grid sx={{ marginLeft: "10px", padding: "10px", display: "flex" }}>
              <OpenInBrowserIcon color="primary" />
              <Link
                href="http://www.ashkam.in/"
                sx={{ marginLeft: "5px", cursor: "pointer" }}
              >
                ASHKAM WEBSITE
              </Link>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default HeroHeader;
