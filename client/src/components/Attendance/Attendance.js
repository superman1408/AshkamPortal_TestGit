import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAttendancePosts } from "../../action/posts";

import { Box, Grid, Typography, ButtonBase } from "@mui/material";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState({
    presentEmp: "",
    absentEmp: "",
  });

  const dispatch = useDispatch();

  const attend = useSelector((state) => state.attend);

  useEffect(() => {
    if (attend) {
      dispatch(getAttendancePosts()).then(() => {
        // Assuming `attend` is an array of objects, you may need to loop through it
        attend.forEach((items) => {
          setAttendanceData((prevData) => ({
            // Merge the new data with previous data using spread operator
            ...prevData,
            presentEmp: items.presentEmployee,
            absentEmp: items.absentEmployee,
          }));
        });
      });
    }
  }, [dispatch, attend]);

  const navigate = useNavigate();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "52px",
          marginLeft: "20px",
          padding: "5px",
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Roboto",
            fontWeight: "bold",
            marginLeft: "130px",
            color: "#16355d",
          }}
        >
          ATTENDANCE
        </Typography>
        <ButtonBase
          onClick={() => {
            navigate("/attendanceDetail"); // Employee Attendance Route
          }}
        >
          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Grid>
              <Typography sx={{ fontFamily: "Roboto" }}>Total</Typography>
              <Typography>
                {+attendanceData.presentEmp + +attendanceData.absentEmp}
              </Typography>
            </Grid>

            <Grid sx={{ marginLeft: "40px" }}>
              <Typography sx={{ fontFamily: "Roboto" }}>Present</Typography>

              <Typography>{attendanceData.presentEmp}</Typography>
            </Grid>

            <Grid sx={{ marginLeft: "40px" }}>
              <Typography sx={{ fontFamily: "Roboto" }}>Absent</Typography>
              <Typography>{attendanceData.absentEmp}</Typography>
            </Grid>
          </Grid>
        </ButtonBase>
      </Box>
    </div>
  );
};

export default Attendance;
