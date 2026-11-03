/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Avatar,
  Card,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import { getPosts, getEvents } from "../../action/posts";

import FormDialog from "./DialogBox/Dialog";
import CakeIcon from "@mui/icons-material/Cake";
import CelebrationIcon from "@mui/icons-material/Celebration";
// import { motion } from "framer-motion";
import Image from "../../assets/birthday.png";
import "./style.css";
import spotlight from "../../assets/spotlight_icon.png";

const Birthday = () => {
  const dispatch = useDispatch();
  const [evento, setEvento] = useState("");
  const posts = useSelector((state) => state.posts);
  const event = useSelector((state) => state.event);
  const user = JSON.parse(localStorage.getItem("profile"));
  const theme = useTheme();

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getEvents()).then(() => {
      if (event && event.length > 0) {
        setEvento(event.map((item) => item.dailyevent).join(" • "));
      } else {
        setEvento("No events scheduled for today");
      }
    });
  }, [dispatch, event]);

  const activeEmployee = posts.filter((emp) => emp.activeStatus === "Active");
  console.log("activeEmployee", activeEmployee);

  const birthdaysToday = activeEmployee.filter((post) => {
    const day = new Date(post.dob).getDate();
    const month = new Date(post.dob).getMonth() + 1;
    return currentDay === day && currentMonth === month;
  });

  const verify = () =>
    user?.result?.role === "admin" ||
    (user?.result?.role === "manager" &&
      user?.result?.department === "Human Resource");

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
      }}
    >
      <Card
        elevation={6}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover", // makes it cover the card
          backgroundRepeat: "no-repeat", // prevents tiling
          backgroundPosition: "center", // keeps it centered
          display: "flex",
          maxWidth: "500px",
          flexDirection: "column",
          marginLeft: "20px",
          padding: "10px",
          height: "200px",

          backdropFilter: "blur(8px)",
          // background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
          background: "smokewhite",
          // boxShadow: 1,
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative", // Set position to relative
          flex: 1,
          transition: "0.3s",
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "20px 0px 0px 0px",
            width: "40vh",
          },
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        {/* Header */}
        <Grid container alignItems="center" gap={1} mb={2}>
          {/* <CakeIcon sx={{ color: "#d35400" }} /> */}
          <div style={{ padding: "10px" }}>
            <img style={{ color: "#16355d", padding: "2px" }} src={spotlight} />
          </div>

          <Typography
            variant="h6"
            sx={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              // marginLeft: "100px",
              color: "#16355d",
            }}
          >
            In the Spotlight Today
          </Typography>
        </Grid>

        {/* Birthday Section */}
        {birthdaysToday.length === 0 ? (
          <>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#047681", fontWeight: 500 }}
            >
              No Event.
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#047681", fontWeight: 500 }}
            >
              Check back tomorrow!
            </Typography>
          </>
        ) : (
          <Box
            sx={{
              maxHeight: "160px",
              overflowY: "auto",
              pr: 1,
            }}
          >
            {birthdaysToday.map((post) => (
              <Box
                key={post._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: "12px",
                  p: 1.2,
                  mb: 1,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    alt={post.firstName}
                    src={post.selectedFile}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#16355d" }}
                  >
                    {post.firstName} {post.lastName}
                  </Typography>
                </Box>

                <Chip
                  icon={<CelebrationIcon sx={{ color: "#ff9800" }} />}
                  label={post.department}
                  size="small"
                  sx={{
                    backgroundColor: "#fff8e1",
                    color: "#6d4c41",
                    fontWeight: 500,
                  }}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Event Section */}
        <Box
          mt={2}
          sx={{
            overflow: "hidden",
            position: "relative",
            height: "35px",
          }}
        >
          {/* <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            style={{
              whiteSpace: "nowrap",
              fontWeight: 600,
              fontFamily: "Roboto",
              color: "#16355d",
            }}
          >
            {evento}

          </motion.div> */}

          <marquee
            style={{
              whiteSpace: "nowrap",
              fontWeight: 600,
              fontFamily: "Roboto",
              color: "#16355d",
              padding: "10px",
              backgroundColor: "#FBF1D8",
            }}
          >
            {evento}
          </marquee>
        </Box>

        {/* Admin Action */}
        {verify() && (
          <Box sx={{ position: "absolute", top: 15, right: 15 }}>
            <FormDialog />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Birthday;
