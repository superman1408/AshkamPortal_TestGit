import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CChart } from "@coreui/react-chartjs";

import { Box, Typography, Grid, IconButton } from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";

const WeeklyActivity = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          marginTop: "20px",
          marginLeft: "20px",
          padding: "10px",
          bgcolor: "#e2e6cf",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <div>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "20px",
                // marginTop: "10px",
                marginBottom: "30px",
              }}
            >
              <Grid>
                <IconButton>
                  <DescriptionIcon
                    onClick={() => {
                      navigate(`/posts/${user.result._id}/fullweeklyactivity`); // Full Weekly Activity route
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid sx={{ marginTop: "10px" }}>
                <Typography
                  sx={{
                    fontWeight: "bolder",
                    color: "#16355d",
                    fontFamily: "Roboto",
                  }}
                >
                  Weekly Activity
                </Typography>
              </Grid>
            </Grid>

            {/*----------------------------------------------------Line Chart------------------------------------------------------*/}
            <Grid
              sx={{
                display: "flex",
                "@media (maxWidth: 600px)": {
                  display: "flex",
                  // width: "600px",
                  // height: "400px",
                },

                "@media (minWidth: 600px)": {
                  display: "flex",
                },
              }}
            >
              <CChart
                style={{
                  // display: "flex",
                  "@media (maxWidth: 600px)": {
                    flexDirection: "column",
                    // display: "flex",
                  },

                  "@media (minWidth: 600px)": {
                    flexDirection: "row",
                    // width: "600px",
                    // height: "400px",
                  },
                }}
                width={600}
                height={400}
                type="line"
                data={{
                  datasets: [
                    {
                      data: [45, 95, 75],
                      label: "Complete",
                      borderColor: "#1565C0",
                      fill: true,
                      lineTension: 0.5,
                    },
                    {
                      data: [15, 65, 55],
                      label: "Pending",
                      borderColor: "#ba68c8",
                      backgroundColor: "rgba(255, 0, 0, 0.5)",
                      fill: true,
                      lineTension: 0.5,
                    },
                  ],
                  labels: ["January", "February", "March"],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default WeeklyActivity;

// transform this code make the chart
