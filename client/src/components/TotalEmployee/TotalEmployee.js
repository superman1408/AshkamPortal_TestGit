import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, Grid, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../action/posts";
import WcIcon from "@mui/icons-material/Wc";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#1976d2", "#dc3912"];

const TotalEmployee = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const [menCount, setMenCount] = useState(0);
  const [womenCount, setWomenCount] = useState(0);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      let men = 0;
      let women = 0;
      posts.forEach((post) => {
        if (post.gender === "male") men++;
        else if (post.gender === "female") women++;
      });
      setMenCount(men);
      setWomenCount(women);
    }
  }, [posts]);

  const data = [
    { name: "Men", value: menCount },
    { name: "Women", value: womenCount },
  ];

  return (
    <Container
      sx={{
        display: "flex",
        padding: "20px",
        // bgcolor: "#16355d",

        bgcolor: "#E3F2FD",
        boxShadow: 1,
        maxWidth: "700px",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "20px",
        marginLeft: "20px",

        height: "330px",
        width: "auto",
        "&:hover": {
          bgcolor: "#BBDEFB", // Light gray background on hover
          // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Optional shadow effect
          transform: "translateY(-1px) " /* Hover effect for cards */,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Grid container direction="column">
        <Grid item container alignItems="center" spacing={1}>
          <Grid item>
            <IconButton>
              <WcIcon sx={{ color: "#16355d" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#16355d",
                fontFamily: "Roboto",
              }}
            >
              Total Employees
            </Typography>
          </Grid>
        </Grid>

        <Grid item container spacing={2} mt={2}>
          <Grid item>
            <Box display="flex" alignItems="center" mb={1}>
              <ManIcon color="primary" />
              <Typography sx={{ color: "#16355d", ml: 1 }}>
                {menCount}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <WomanIcon sx={{ color: "#dc3912" }} />
              <Typography sx={{ color: "#16355d", ml: 1 }}>
                {womenCount}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TotalEmployee;
