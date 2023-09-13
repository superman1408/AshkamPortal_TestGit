import React from "react";
import { Box, IconButton, Typography, Grid, Card } from "@mui/material";

import WcIcon from "@mui/icons-material/Wc";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";

import { CChart } from "@coreui/react-chartjs";
import DonutChart from "react-donut-chart";

const TotalEmployee = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          marginTop: "20px",
          marginLeft: "20px",
          padding: "10px",
          bgcolor: "#cae8e5",
          boxShadow: 1,

          borderRadius: "10px",
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
              <IconButton
                height="40px"
                width="40px"
                color="primary"
                sx={{
                  ml: "0px",
                  display: {
                    xs: "flex",
                    sm: "flex",
                  },
                }}
              >
                <WcIcon />
              </IconButton>
            </Grid>
            <Grid>
              <Typography
                sx={{
                  marginTop: "5px",
                  marginRight: "0px",
                  marginLeft: "20px",
                  fontWeight: "bolder",
                }}
              >
                Total Employees
              </Typography>
            </Grid>
            <Grid>
              <Typography
                sx={{
                  marginLeft: "20px",
                  marginTop: "5px",
                  marginRight: "50px",
                }}
              >
                32
              </Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid sx={{ display: "flex", flexDirection: "column" }}>
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Grid>
                  <IconButton
                    height="40px"
                    width="40px"
                    color="primary"
                    sx={{
                      mt: "30px",
                      display: {
                        xs: "flex",
                        sm: "flex",
                      },
                    }}
                  >
                    <ManIcon />
                  </IconButton>
                </Grid>

                <Grid>
                  <Typography sx={{ marginLeft: "0px", marginTop: "40px" }}>
                    : 27
                  </Typography>
                </Grid>
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Grid>
                  <IconButton
                    height="40px"
                    width="40px"
                    color="primary"
                    sx={{
                      mt: "10px",
                      display: {
                        xs: "flex",
                        sm: "flex",
                      },
                    }}
                  >
                    <WomanIcon />
                  </IconButton>
                </Grid>

                <Grid>
                  <Typography sx={{ marginLeft: "0px", marginTop: "20px" }}>
                    : 05
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* <div
              sx={{
                backgroundcolor: "pink",
                display: "flex",
                width: "100px",
                height: "50px",
              }}
            > */}
            {/* <div
                style={{
                  width: "200px",
                  height: "100px",
                  marginLeft: "30px",
                }}
              > */}
            {/*-------------------------------------------------------------------Doughtnut Chart----------------------------------------------------------------*/}
            {/* <CChart
                type="doughnut"
                data={{
                  datasets: [
                    {
                      backgroundColor: ["#1565C0", "#ba68c8"],
                      data: [27, 5],
                    },
                  ],
                  labels: ["Men", "Women"],
                }}
                options={{
                  plugins: {
                    legend: {
                      position: "right",
                    },

                    responsive: true,
                    plugins: {
                      tooltip: {
                        enabled: false, // <-- this option disables tooltips
                      },
                    },
                  },
                }}
              /> */}

            <Grid
              sx={{
                display: "flex",
                width: "200px",
                height: "150px",
                backgroundColor: "red",
              }}
            >
              <DonutChart
                data={[
                  {
                    label: "Men",
                    value: 27,
                  },
                  {
                    label: "Women",
                    value: 6,
                  },
                ]}
              />
            </Grid>
            {/* </div> */}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default TotalEmployee;
