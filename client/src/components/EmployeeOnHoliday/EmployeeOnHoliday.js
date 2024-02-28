import React from "react";

import { Box, Grid, Typography, Divider, Stack, Avatar } from "@mui/material";

import avatar1 from "../../assets/Profile.jpg";
import avatar2 from "../../assets/profile1.jpg";

const EmployeeOnHoliday = () => {
  return (
    <div>
      <Box
        sx={{
          // width: "340px",
          // height: "150px",
          display: "flex",
          marginTop: "10px",
          marginLeft: "20px",
          padding: "2px",
          bgcolor: "#e9edf7",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid>
            <Typography sx={{ fontFamily: "Roboto", fontWeight: "bolder", mb: "1px", ml: "10px" }}>
              Employees on Holiday
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Stack flexDirection="row">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                  alt="Femy sharp"
                  src={avatar1}
                />
              </Stack>
            </div>
            <Grid>
              <Typography
                sx={{
                  marginLeft: "30px",
                  marginRight: "30px",
                  marginTop: "10px",
                  fontFamily: "Roboto",
                }}
              >
                Unhealthy Today
              </Typography>
            </Grid>
            <Grid>
              <Typography
                sx={{
                  color: "#f7100c",
                  marginLeft: "30px",
                  marginTop: "10px",
                  fontFamily: "Roboto",
                }}
              >
                Only Today
              </Typography>
            </Grid>
          </Grid>
          <Divider orientation="horizontal" />

          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
              <div>
                <Stack flexDirection="row">
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      marginLeft: "10px",
                      marginTop: "10px",
                    }}
                    alt="Femy sharp"
                    src={avatar2}
                  />
                </Stack>
              </div>
            </Grid>

            <Grid>
              <Typography
                sx={{
                  marginLeft: "30px",
                  marginRight: "30px",
                  marginTop: "10px",
                  fontFamily: "Roboto",
                }}
              >
                On Holiday      
              </Typography>
            </Grid>

            <Grid>
              <Typography
                sx={{
                  color: "#f7100c",
                  marginLeft: "55px",
                  marginTop: "10px",
                  fontFamily: "Roboto",
                }}
              >
                21st To 22nd
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default EmployeeOnHoliday;
