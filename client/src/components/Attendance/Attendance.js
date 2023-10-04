import React from "react";

import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

const Attendance = () => {
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
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Grid sx={{ marginLeft: "40px" }}>
            <Typography>attendance</Typography>
            <Typography sx={{ marginLeft: "30px" }}>30</Typography>
          </Grid>

          <Grid sx={{ marginLeft: "40px" }}>
            <Typography>Present</Typography>
            <Typography sx={{ marginLeft: "20px" }}>28</Typography>
          </Grid>

          <Grid sx={{ marginLeft: "40px" }}>
            <Typography>absent</Typography>
            <Typography sx={{ marginLeft: "20px" }}>2</Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Attendance;
