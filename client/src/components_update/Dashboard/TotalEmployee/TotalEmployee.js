import React from 'react';
import {
    Box,
    IconButton,
    Typography,
    
  } from "@mui/material";



import WcIcon from "@mui/icons-material/Wc";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";

import { CChart } from "@coreui/react-chartjs";

const TotalEmployee = () => {
  return (
    <div>
          <Box
                      sx={{
                        width: "300px",
                        height: "150px",
                        marginTop: "20px",
                        marginLeft: "20px",
                        padding: "10px",
                        bgcolor: "#cae8e5",
                        boxShadow: 1,

                        borderRadius: "10px",
                      }}
                    >
                      <IconButton
                        size="200px"
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
                      <Typography
                        sx={{
                          marginTop: "-30px",
                          marginRight: "50px",
                          marginLeft: "40px",
                          fontWeight: "bolder",
                        }}
                      >
                        Total Employees{" "}
                      </Typography>
                      <Typography
                        sx={{ marginLeft: "180px", marginTop: "-23px" }}
                      >
                        32
                      </Typography>

                      <IconButton
                        size="200px"
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
                      <Typography
                        sx={{ marginLeft: "30px", marginTop: "-30px" }}
                      >
                        : 27
                      </Typography>

                      <IconButton
                        size="200px"
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
                      <Typography
                        sx={{ marginLeft: "30px", marginTop: "-30px" }}
                      >
                        : 05
                      </Typography>

                      <div
                        style={{
                          width: "200px",
                          // height: "100px",
                          marginLeft: "100px",
                          marginTop: "-140px",
                        }}
                      >
                        {/*-------------------------------------------------------------------Doughtnut Chart----------------------------------------------------------------*/}
                        <CChart
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
                            },
                          }}
                        />
                      </div>
                    </Box>
    </div>
  )
}

export default TotalEmployee