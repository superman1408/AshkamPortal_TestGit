import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WeeklyActivity from "../WeeklyActivity/WeeklyActivity";
import TotalEmployee from "../TotalEmployee/TotalEmployee";
import AbsenteesDisplay from "../ManagingTeam/AbsenteesDisplay";
import Calender from "../Calender/Calender";
import Birthday from "../Birthday/Birthday";
import { Box, Grid, Typography, Paper, Fab, Button } from "@mui/material";
import Panel from "../Panel/Panel";
import Attendance from "../Attendance/Attendance";
import Department from "../Department/Department";
import TimeDate from "../TimeDate/TimeDate";
import Topbar from "../Topbar/Topbar";

import confetti from "canvas-confetti";

import DiwaliGif from "../../assets/Diwali.gif";

const Admin = ({ currentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const role = user.result.role;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/attendance");
  };

  // // 🔥 Firecracker function
  // const fireCrackers = () => {
  //   const duration = 3 * 1000; // 3 seconds
  //   const animationEnd = Date.now() + duration;
  //   const defaults = {
  //     startVelocity: 30,
  //     spread: 360,
  //     ticks: 60,
  //     zIndex: 2000,
  //   };

  //   const randomInRange = (min, max) => Math.random() * (max - min) + min;

  //   const interval = setInterval(() => {
  //     const timeLeft = animationEnd - Date.now();

  //     if (timeLeft <= 0) {
  //       clearInterval(interval);
  //       return;
  //     }

  //     const particleCount = 50 * (timeLeft / duration);

  //     confetti(
  //       Object.assign({}, defaults, {
  //         particleCount,
  //         origin: {
  //           x: randomInRange(0.1, 0.9),
  //           y: randomInRange(0.1, 0.5),
  //         },
  //         colors: ["#ffeb00", "#eb6e08ff", "#f1db13ff"],
  //         shapes: ["circle"],
  //         scalar: 0.8,
  //       })
  //     );
  //   }, 250);
  // };

  // // 🔹 Trigger firecrackers once when dashboard loads
  // useEffect(() => {
  //   fireCrackers();
  // }, []);

  return (
    <Box
      p={2}
      sx={{
        display: "flex",
        minHeight: "100vh",

        // bgcolor: "#f4f6f8"
      }}
    >
      <Box
        ml={2}
        component="main"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* <Fab
          onClick={fireCrackers}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 40,
            backgroundColor: "transparent",
            boxShadow: "none",
            width: 230,
            height: 230,
            "&:hover": {
              // backgroundColor: "transparent",
            },
          }}
        >
          <img
            src={DiwaliGif} // or {DiwaliGif} if imported
            alt="Fireworks"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </Fab> */}

        <Grid container spacing={2}>
          <Topbar />
          <Grid item xs={12} md={4} sx={{ p: 1, width: "100%" }}>
            <Department />
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1, width: "100%" }}>
            <TotalEmployee />
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1, width: "100%" }}>
            <Box>
              <TimeDate />
            </Box>
            <Box mt={2}>
              <Attendance />
            </Box>
          </Grid>
          <Grid item xs={12} md={8} sx={{ p: 1, width: "100%" }}>
            <WeeklyActivity />
          </Grid>
          <Grid item xs={12} md={4} sx={{ p: 1, width: "100%" }}>
            <Box>
              <Birthday />
            </Box>
            <Box mt={2}>
              <AbsenteesDisplay />
            </Box>
            <Button onClick={handleClick}>Click Me</Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Admin;
