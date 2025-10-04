import React from "react";
import WeeklyActivity from "../WeeklyActivity/WeeklyActivity";
import TotalEmployee from "../TotalEmployee/TotalEmployee";
import AbsenteesDisplay from "../ManagingTeam/AbsenteesDisplay";
import Calender from "../Calender/Calender";
import Birthday from "../Birthday/Birthday";
import { Box, Grid, Typography, Paper } from "@mui/material";
import Panel from "../Panel/Panel";
import Attendance from "../Attendance/Attendance";
import Department from "../Department/Department";
import TimeDate from "../TimeDate/TimeDate";
import Topbar from "../Topbar/Topbar";

const Admin = ({ currentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const role = user.result.role;

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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Admin;
