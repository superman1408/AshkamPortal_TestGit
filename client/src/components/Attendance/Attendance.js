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
          flexDirection: "column",
          marginTop: "52px",
          marginLeft: "20px",
          padding: "10px",
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <Typography sx={{fontFamily: "Roboto", fontWeight: "bold", marginLeft: "140px", color: "#16355d"}}>ATTENDANCE</Typography>
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
              <Typography sx={{fontFamily: "Roboto",}}>Total</Typography>
              <Typography>30</Typography>
            </Grid>

            <Grid sx={{ marginLeft: "40px" }}>
              <Typography sx={{fontFamily: "Roboto",}}>Present</Typography>
              <Typography>28</Typography>
            </Grid>

            <Grid sx={{ marginLeft: "40px" }}>
              <Typography sx={{fontFamily: "Roboto",}}>Absent</Typography>
              <Typography>2</Typography>
            </Grid>
          </Grid>
        </ButtonBase>
      </Box>
    </div>
  );
};

export default Attendance;
