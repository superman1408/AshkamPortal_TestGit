import React from "react";
// import Navbar from "../Navbar/navbar";

import WeeklyActivity from "../WeeklyActivity/WeeklyActivity";
import Skill from "../Skills/Skill";
import TotalEmployee from "../TotalEmployee/TotalEmployee";
import EmployeeOnHoliday from "../EmployeeOnHoliday/EmployeeOnHoliday";
import Calender from "../Calender/Calender";
import Birthday from "../Birthday/Birthday";

import { Box, Grid, Typography } from "@mui/material";
import Panel from "../Panel/Panel";
import Attendance from "../Attendance/Attendance";
import { useParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const id = useParams();
  console.log("id in home page", id);

  return (
    <div style={{ minheight: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "2px",
          padding: "0px",
          bgcolor: "background.paper",
          boxShadow: 1,
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "row" }}>
          {/*------------------Panel----------------------------- */}
          <Panel prop={user.result._id} />

          {/* ---------------Dashboard section-------------------------*/}
          <Grid
            sx={{
              display: "flex",
              marginBottom: "5px",
              flexDirection: "column",
              bgcolor: "#f0f2f1",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
              }}
            ></Grid>

            <Grid
              sx={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
            >
              <Grid>
                <div>
                  <Typography
                    variant="h5"
                    sx={{
                      display: "flex",
                      marginLeft: "80px",
                      fontWeight: "bold",
                    }}
                  >
                    Welcome
                    {` ${user.result.role.toUpperCase()} !`}
                  </Typography>
                </div>
                <Grid sx={{ display: "flex" }}>
                  <Grid>
                    <TotalEmployee />
                  </Grid>

                  <Grid>
                    <Skill />
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
                  <EmployeeOnHoliday />
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
