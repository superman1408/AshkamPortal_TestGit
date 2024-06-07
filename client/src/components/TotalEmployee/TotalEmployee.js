import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Grid, Container } from "@mui/material";

import { getPosts } from "../../action/posts";
import { useDispatch, useSelector } from "react-redux";

import WcIcon from "@mui/icons-material/Wc";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import { Chart } from "react-google-charts";

const TotalEmployee = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  // Editable data state
  const [menCount, setMenCount] = useState(0);
  const [womenCount, setWomenCount] = useState(0);

  useEffect(() => {
    dispatch(getPosts());
  }, [posts]);

  useEffect(() => {
    if (posts.length > 0) {
      let men = 0;
      let women = 0;
      posts.forEach((post) => {
        if (post.gender === "male") {
          men++;
        } else if (post.gender === "female") {
          women++;
        }
      });
      setMenCount(men);
      setWomenCount(women);
    }
  }, [posts]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
        sx={{
          display: "flex",
          marginTop: "10px",
          marginLeft: "20px",
          maxWidth: "500px",
          padding: "5px",
          bgcolor: "#e9edf7",
          boxShadow: 1,
          borderRadius: "10px",
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "20px 20px 0px 0px",
          },
          // "@media (max-width: 400px)": {
          //   width: "40vh",
          // },
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
                  color: "#16355d",
                  fontFamily: "Roboto",
                  fontSize: "18px",
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
                  fontFamily: "Roboto",
                }}
              >
                {menCount + womenCount}
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
              <Grid
                sx={{ display: "flex", flexDirection: "row", marginTop: "" }}
              >
                <Grid>
                  <IconButton height="40px" width="40px" color="primary">
                    <ManIcon />
                  </IconButton>
                </Grid>

                <Grid>
                  <Typography sx={{ marginTop: "10px" }}>
                    :{menCount}
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
                    sx={{ color: "#dc3912" }}
                  >
                    <WomanIcon />
                  </IconButton>
                </Grid>

                <Grid>
                  <Typography sx={{ marginTop: "10px" }}>
                    :{womenCount}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid
              sx={{
                width: "250px",
                height: "120px",
                marginLeft: "0px",
              }}
            >
              <Chart
                chartType="PieChart"
                data={[
                  ["Task", "Hours per Day"],
                  ["Men", menCount],
                  ["Women", womenCount],
                ]}
                options={{
                  is3D: true,
                  backgroundColor: {
                    fill: "#e9edf7",
                  },
                }}
                width={"250px"}
                height={"100px"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TotalEmployee;
