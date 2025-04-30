import React from "react";

import WeeklyActivity from "../WeeklyActivity/WeeklyActivity";
import TotalEmployee from "../TotalEmployee/TotalEmployee";
import AbsenteesDisplay from "../ManagingTeam/AbsenteesDisplay";
import Calender from "../Calender/Calender";
import Birthday from "../Birthday/Birthday";

import { Avatar, Box, Grid, Card, CardContent } from "@mui/material";
import Panel from "../Panel/Panel";
import Attendance from "../Attendance/Attendance";
import SkillDisplay from "../Skills/SkillDisplay";

import employee from "../../assets/employeeimg.png";

import manager from "../../assets/managerimg.png";
import admin from "../../assets/IT.png";

import useMediaQuery from "@mui/material/useMediaQuery";
import Department from "../Department/Department";
import Topbar from "../Topbar/Topbar";

const Admin = ({ currentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const matches = useMediaQuery("(min-width:1120px)");

  const role = user.result.role;

  return (
    <div style={{ minHeight: "100%", padding: "10px", display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2px",
          padding: "2px",
          // bgcolor: "background.paper",
          boxShadow: 1,
          "@media (max-width: 700px)": {
            display: "flex",
          },
          "@media (min-width: 700px)": {
            display: "flex",
          },
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            "@media (max-width: 600px)": {
              flexDirection: "column",
            },

            "@media (min-width: 600px)": {
              flexDirection: "row",
            },
          }}
        >
          {/*------------------Panel----------------------------- */}
          <Panel prop={user.result} />

          {/* ---------------Dashboard section-------------------------*/}
          <Grid
            sx={{
              display: "flex",
              marginBottom: "5px",
              flexDirection: "column",
              flex: 1,
              // bgcolor: "#f0f2f1",
              "@media only screen and  (max-width: 600px)": {
                margin: "0px",
                marginLeft: "0px",
                display: "flex",
              },
              "@media (min-width: 600px)": {
                display: "flex",
              },
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
                "@media only screen and (max-width: 750px)": {
                  flexDirection: "column",
                  margin: "0px",
                },

                "@media (min-width: 750px)": {
                  flexDirection: "row",
                  display: "flex",
                },
              }}
            >
              <Grid>
                {/* <div style={{ display: "flex" }}>
                  <div style={{ width: "20px", height: "30px" }}></div>
                </div> */}
                <div>
                  <Topbar />
                </div>

                <div>
                  <Grid
                    sx={{
                      display: "flex",
                      "@media (max-width: 720px)": {
                        flexDirection: "column",
                        margin: "0px",
                      },

                      "@media (min-width: 720px)": {
                        flexDirection: "row",
                      },
                    }}
                  >
                    <Grid
                      sx={{
                        margin: "20px 0px 0px 0px",
                        "@media (max-width: 720px)": {
                          margin: "20px 20px 0px 20px",
                          // width: "70vh",
                        },
                        "@media (min-width: 600px)": {
                          margin: "20px 0px 0px 20px",
                          width: "50vh",
                        },
                        "@media (max-width: 400px)": {
                          width: "42vh",
                        },
                      }}
                    >
                      <Department />
                    </Grid>
                    <Grid
                      sx={{
                        "@media (max-width: 720px)": {
                          display: "flex",
                          margin: "0px 20px 0px 0px",
                          // width: "50vh",
                        },
                        "@media (max-width: 600px)": {
                          margin: "20px 0px 0px 0px",
                          width: "70vh",
                        },
                      }}
                    >
                      <TotalEmployee />
                    </Grid>

                    <div
                      style={{
                        width: "auto",
                        minWidth: 320,
                        maxWidth: "100%",
                        height: "300px",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: 3,
                        borderRadius: 2,
                        marginTop: "20px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <Birthday />
                      </div>
                      {/* <div style={{ flex: 1 }}>
                      <AbsenteesDisplay />
                    </div> */}

                      <div style={{ marginTop: "20px" }}>
                        <Attendance />
                      </div>
                    </div>
                  </Grid>
                </div>

                {/* <Grid
                  sx={{
                    "@media (max-width: 720px)": {
                      display: "flex",
                      margin: "0px 20px 0px 0px",
                    },
                    "@media (max-width: 600px)": {
                      margin: "20px 20px 0px 20px",
                    },
                    "@media (max-width: 400px)": {
                      width: "43vh",
                    },
                  }}
                >
                  <WeeklyActivity />
                </Grid> */}

                {/* <Grid sx={{ display: "flex", flexDirection: "column " }}> */}
                {/* <Grid
                  sx={{
                    "@media (max-width: 720px)": {
                      margin: "20px 20px 0px 0px",
                    },
                    "@media (max-width: 600px)": {
                      margin: "20px 20px 0px 20px",
                    },
                    "@media (max-width: 400px)": {
                      width: "44vh",
                    },
                  }}
                >
                  <Attendance />
                </Grid> */}

                {/* <Grid
                  sx={{
                    "@media (max-width: 720px)": {
                      margin: "20px 20px 0px 0px",
                    },
                    "@media (max-width: 600px)": {
                      margin: "20px 20px 0px 20px",
                    },
                    "@media (max-width: 400px)": {
                      width: "44vh",
                    },
                  }}
                >
                  <Birthday />
                </Grid> */}

                {/* <Grid
                  sx={{
                    marginTop: "10px",
                    marginLeft: "20px",
                    marginRight: "0px",
                    "@media (max-width: 720px)": {
                      margin: "20px 20px 0px 20px",
                    },
                    "@media (max-width: 600px)": {
                      // width: "40vh",
                      display: "flex",
                      margin: "20px 20px 0px 20px",
                    },
                    "@media (max-width: 400px)": {
                      width: "40vh",
                    },
                  }}
                >
                  <Calender />
                </Grid> */}
                <div style={{ display: "flex" }}>
                  <Grid
                    sx={{
                      "@media (max-width: 720px)": {
                        display: "flex",
                        margin: "0px 20px 0px 0px",
                      },
                      "@media (max-width: 600px)": {
                        margin: "20px 20px 0px 20px",
                      },
                      "@media (max-width: 400px)": {
                        width: "43vh",
                      },
                    }}
                  >
                    <WeeklyActivity />
                  </Grid>
                  <Grid>
                    <Grid
                      sx={{
                        marginTop: "20px",
                        marginLeft: "20px",
                        "@media (max-width: 720px)": {
                          margin: "20px 20px 0px 20px",
                        },
                        "@media (max-width: 600px)": {
                          // width: "40vh",
                          display: "flex",
                          margin: "20px 20px 0px 20px",
                        },
                        "@media (max-width: 400px)": {
                          width: "40vh",
                        },
                      }}
                    >
                      <Calender />
                    </Grid>
                  </Grid>
                </div>
                <Grid sx={{ marginTop: "20px" }}>
                  <AbsenteesDisplay />
                </Grid>
              </Grid>

              {/* </Grid> */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
// {/* <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>; */}
export default Admin;
