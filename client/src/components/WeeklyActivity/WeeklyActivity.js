import React from "react";
// import { useNavigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { CChart } from "@coreui/react-chartjs";
import { Box, Typography, Grid, ButtonBase } from "@mui/material";

const WeeklyActivity = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  return (
    <div>
      <Box
        sx={{
          // width: "640px",
          // height: "417px",
          display: "flex",
          marginTop: "20px",
          marginLeft: "20px",
          padding: "10px",
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <ButtonBase
          onClick={() => {
            navigate("/fullweeklyactivity"); // Full Weekly Activity route
          }}
        >
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Grid
              sx={{
                marginLeft: "20px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              <Typography sx={{ fontWeight: "bolder" }}>
                Weekly Activity
              </Typography>
            </Grid>

            {/*----------------------------------------------------Line Chart------------------------------------------------------*/}
            <Grid>
              <CChart
                style={{ display: "flex" }}
                // width="600px"
                // height="400px"
                type="line"
                data={{
                  datasets: [
                    {
                      data: [8137119, 9431691, 10266674],
                      label: "Revenue",
                      borderColor: "#1565C0",
                      fill: true,
                      lineTension: 0.5,
                    },
                    {
                      data: [1216410, 1371390, 1477380],
                      label: "Expenditure",
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
        </ButtonBase>
      </Box>
    </div>
  );
};

export default WeeklyActivity;
