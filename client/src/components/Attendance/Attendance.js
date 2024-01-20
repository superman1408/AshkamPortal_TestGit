import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Grid, Typography, ButtonBase } from "@mui/material";

const Attendance = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          marginTop: "52px",
          marginLeft: "20px",
          padding: "10px",
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <ButtonBase
          onClick={() => {
            navigate("/employeeAttendance"); // Employee Attendance Route
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Grid sx={{ marginLeft: "40px" }}>
              <Typography>Total</Typography>
              <Typography>30</Typography>
            </Grid>

            <Grid sx={{ marginLeft: "40px" }}>
              <Typography>Present</Typography>
              <Typography>28</Typography>
            </Grid>

            <Grid sx={{ marginLeft: "40px" }}>
              <Typography>Absent</Typography>
              <Typography>2</Typography>
            </Grid>
          </Grid>
        </ButtonBase>
      </Box>
    </div>
  );
};

export default Attendance;
