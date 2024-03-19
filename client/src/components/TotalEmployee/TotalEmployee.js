import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Input,
  Button,
} from "@mui/material";

import { getPosts } from "../../action/posts";
import { useDispatch, useSelector } from "react-redux";

import WcIcon from "@mui/icons-material/Wc";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Chart } from "react-google-charts";

const TotalEmployee = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Editable data state
  const [menCount, setMenCount] = useState(0);
  const [womenCount, setWomenCount] = useState(0);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

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
    <div>
      <Box
        sx={{
          display: "flex",
          marginTop: "10px",
          marginLeft: "20px",
          padding: "5px",
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
                  fontFamily: "Roboto",
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
                  <IconButton height="40px" width="40px" color="primary">
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
                    fill: "#cae8e5",
                  },
                }}
                width={"250px"}
                height={"100px"}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default TotalEmployee;
