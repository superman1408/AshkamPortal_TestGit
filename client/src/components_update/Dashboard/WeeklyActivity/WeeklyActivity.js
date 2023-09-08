import React from 'react';
import { CChart } from "@coreui/react-chartjs";
import {Box, Typography} from "@mui/material";


const chart = () => {
  return (
    <div>
        <Box
                  sx={{
                    width: "640px",
                    height: "417px",
                    marginTop: "20px",
                    marginLeft: "20px",
                    padding: "10px",
                    bgcolor: "background.paper",
                    boxShadow: 1,
                    borderRadius: "10px",
                  }}
                >
                  <Typography sx={{ fontWeight: "bolder" }}>
                    Weekly Activity
                  </Typography>

                  {/*----------------------------------------------------Line Chart------------------------------------------------------*/}
                  <CChart
                    type="line"
                    data={{
                      datasets: [
                        {
                          data: [8137119, 9431691, 10266674],
                          label: "Infected",
                          borderColor: "#1565C0",
                          fill: true,
                          lineTension: 0.5,
                        },
                        {
                          data: [1216410, 1371390, 1477380],
                          label: "Deaths",
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
                </Box>
    </div>
  )
}

export default chart