import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAttendancePosts } from "../../action/posts";

import {
  Grid,
  Typography,
  IconButton,
  Container,
  useTheme,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState({
    presentEmp: "",
    absentEmp: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const attend = useSelector((state) => state.attend);
  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user.result._id;
  const theme = useTheme();

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

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
        sx={{
          display: "flex",
          maxWidth: "500px",
          flexDirection: "column",
          marginLeft: "20px",
          padding: "10px",
          height: "150px",

          backdropFilter: "blur(8px)",
          background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
          boxShadow: 1,
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative", // Set position to relative
          flex: 1,
          transition: "all 0.2s ease-in-out",
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "20px 0px 0px 0px",
            width: "40vh",
          },
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid gap={1} p={1} sx={{ display: "flex", flexDirection: "row" }}>
            <IconButton
              sx={{ color: "#16355d" }}
              onClick={() => {
                navigate(`/${id}/attendanceDisplay`); // Employee Attendance Route
              }}
            >
              <NewspaperIcon />
            </IconButton>

            <Typography
              variant="h6"
              fontWeight={600}
              sx={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                // marginLeft: "100px",
                color: "#16355d",
              }}
            >
              Attendance
            </Typography>
          </Grid>
          <div>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Grid>
                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  Total
                </Typography>
                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  {+attendanceData.presentEmp + +attendanceData.absentEmp}
                </Typography>
              </Grid>

              <Grid sx={{ marginLeft: "40px" }}>
                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  Present
                </Typography>

                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  {attendanceData.presentEmp}
                </Typography>
              </Grid>

              <Grid sx={{ marginLeft: "40px" }}>
                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  Absent
                </Typography>
                <Typography sx={{ fontFamily: "Roboto", color: "#16355d" }}>
                  {attendanceData.absentEmp}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default Attendance;
