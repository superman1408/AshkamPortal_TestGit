import React from "react";

import WeeklyActivity from "../WeeklyActivity/WeeklyActivity";
import TotalEmployee from "../TotalEmployee/TotalEmployee";
import ManagingTeam from "../ManagingTeam/ManagingTeam";
import Calender from "../Calender/Calender";
import Birthday from "../Birthday/Birthday";

import { Avatar, Box, Grid, Typography } from "@mui/material";
import Panel from "../Panel/Panel";
import Attendance from "../Attendance/Attendance";
import SkillDisplay from "../Skills/SkillDisplay";

import employee from "../../assets/employeeimg.png";

import manager from "../../assets/managerimg.png";
import admin from "../../assets/IT.png";

import useMediaQuery from "@mui/material/useMediaQuery";

const Admin = ({ currentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const matches = useMediaQuery("(min-width:1120px)");

  const role = user.result.role;

  return (
    <div style={{ minheight: "100%", padding: "10px", display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2px",
          padding: "2px",
          // bgcolor: "background.paper",
          boxShadow: 1,
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
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            ></Grid>

            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                marginTop: "20px",
                "@media (max-width: 750px)": {
                  flexDirection: "column",
                },

                "@media (min-width: 750px)": {
                  flexDirection: "row",
                },
              }}
            >
              <Grid>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "20px", height: "30px" }}>
                    <Avatar
                      sx={{
                        width: 30,
                        height: 30,
                        marginLeft: "30px",
                        marginTop: "5px",
                      }}
                      src={
                        role === "employee"
                          ? employee
                          : role === "manager"
                          ? manager
                          : role === "admin" && admin
                      }
                    />
                  </div>
                  <div>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "#16355d",
                        fontFamily: "Roboto",
                        display: "flex",
                        marginLeft: "60px",
                        marginBottom: "20px",
                        // fontWeight: "bold",
                        "@media (max-width: 600px)": {
                          flexDirection: "column",
                          color: "#16355d",
                        },

                        "@media (min-width: 600px)": {
                          flexDirection: "row",
                        },
                      }}
                    >
                      Welcome
                      {` ${user.result.firstName.toUpperCase()} !`}
                    </Typography>
                  </div>
                </div>
                <Grid
                  sx={{
                    display: "flex",
                    "@media (max-width: 720px)": {
                      flexDirection: "column",
                    },

                    "@media (min-width: 720px)": {
                      flexDirection: "row",
                    },
                  }}
                >
                  <Grid>
                    <ManagingTeam />
                  </Grid>

                  <Grid sx={{ margin: "20px 0px 0px 20px" }}>
                    <SkillDisplay currentId={currentId} />
                  </Grid>
                </Grid>

                <Grid>
                  <WeeklyActivity />
                </Grid>
              </Grid>

              <Grid sx={{ display: "flex", flexDirection: "column " }}>
                <Grid>
                  <Attendance />
                </Grid>

                <Grid>
                  <Birthday />
                </Grid>

                <Grid>
                  <TotalEmployee />
                </Grid>

                <Grid
                  sx={{
                    marginTop: "10px",
                    marginLeft: "20px",
                    marginRight: "0px",
                  }}
                >
                  <Calender />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
// {/* <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>; */}
export default Admin;
