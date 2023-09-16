import React from "react";
import { Box, IconButton, Typography, Grid, Card } from "@mui/material";

import WcIcon from "@mui/icons-material/Wc";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";

import { CChart } from "@coreui/react-chartjs";
import DonutChart from "react-donut-chart";
import { Chart } from "react-google-charts";

const TotalEmployee = () => {
  const data = [
    ["Task", "Hours per Day"],
    ["Men", 27],
    ["Women", 6],
  ];

  const options = {
    is3D: true,
    backgroundColor: {
      fill: "#cae8e5",
    },
  };
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
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                marginRight: "10px",
              }}
            >
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Grid>
                  <IconButton
                    height="40px"
                    width="40px"
                    color="primary"
                    sx={{
                      display: "flex",
                      mt: "20px",
                      // display: {
                      //   xs: "flex",
                      //   sm: "flex",
                      // },
                    }}
                  >
                    <ManIcon />
                  </IconButton>
                </Grid>

                <Grid>
                  <Typography
                    sx={{
                      marginLeft: "0px",
                      marginTop: "30px",
                      // display: "flex",
                    }}
                  >
                    : 27
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "0px",
                }}
              >
                <Grid>
                  <IconButton
                    height="40px"
                    width="40px"
                    color="primary"
                    sx={{
                      mt: "0px",
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
                  <Typography sx={{ marginLeft: "0px", marginTop: "8px" }}>
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
            <Grid
              sx={{
                width: "250px",
                height: "130px",
                // marginRight: "0px",
                marginLeft: "0px",
                // border: "1px solid black",
              }}
            >
              {/*-------------------------------------------------------------------Doughtnut Chart----------------------------------------------------------------*/}

              <Chart
                marginLeft={"0px"}
                chartType="PieChart"
                data={data}
                options={options}
                width={"250px"}
                height={"130px"}
              />

              {/* <DonutChart
                width={150}
                height={300}
                onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
                strokeColor={reactDonutChartStrokeColor}
                data={reactDonutChartdata}
                colors={reactDonutChartBackgroundColor}
                innerRadius={reactDonutChartInnerRadius}
                // selectedOffset={reactDonutChartSelectedOffset}
                onClick={(item, toggled) =>
                  reactDonutChartHandleClick(item, toggled)
                }
              /> */}

              {/* <CChart
                type="doughnut"
                height="30px"
                marginTop="0px"
                data={{
                  datasets: [
                    {
                      backgroundColor: ["#1565C0", "#ba68c8"],
                      data: [27, 5],
                      visible: false,
                    },
                  ],
                  labels: ["Men", "Women"],
                  visible: false,
                }}
                options={{
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              /> */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default TotalEmployee;
