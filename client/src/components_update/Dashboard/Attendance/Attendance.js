import React from 'react';

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

const Attendance = () => {
  return (
    <div>
        <Box
                    sx={{
                      width: "340px",
                      height: "40px",
                      marginTop: "10px",
                      marginLeft: "20px",
                      padding: "10px",
                      bgcolor: "#b1b5b5",
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
    </div>
  )
}

export default Attendance