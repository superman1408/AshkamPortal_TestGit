import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, IconButton, Container } from "@mui/material";
import { getPosts } from "../../action/posts";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeeklyActivity = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [currentId, setCurrentId] = useState(user.result._id);

  const [isLoading, setIsLoading] = useState(true);

  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts()).then(() => {
      setIsLoading(true);
    });
  }, []);

  useEffect(() => {
    if (isLoading === true) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [isLoading]);

  const navigate = useNavigate();

  // Filter the post based on currentId
  const filteredPosts = posts.filter((post) => post._id === currentId);

  // Extract project codes, over time, and net time data
  const dateData = filteredPosts.map((post) => post.date);
  const overTimeData = filteredPosts.map((post) => post.overTime);
  const netTimeData = filteredPosts.map((post) => post.netTime);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
      },
    },
  };

  const labels = dateData[0];

  const data = {
    labels,
    datasets: [
      {
        label: "Net Time",
        data: netTimeData[0],
        backgroundColor: "#eb9367",
      },
      {
        label: "Over Time",
        data: overTimeData[0],
        backgroundColor: "#047682",
      },
    ],
  };

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
        sx={{
          // display: "flex",
          marginTop: "20px",
          marginLeft: "20px",
          padding: "5px",
          maxWidth: "500px",
          bgcolor: "#e2e6cf",
          boxShadow: 1,
          borderRadius: "10px",
          height: "480px",
          "@media (max-width: 600px)": {
            // display: "flex",
            margin: "20px 20px 0px 0px",
            height: "60vh",
          },
          // "@media (max-width: 400px)": {
          //   width: "40vh",
          // },

          // "@media (min-width: 600px)": {},
        }}
      >
        <div>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "20px",
                marginBottom: "30px",
              }}
            >
              <Grid>
                <IconButton
                  onClick={() => {
                    navigate(`/posts/${user.result._id}/fullweeklyactivity`);
                  }}
                >
                  <DescriptionIcon />
                </IconButton>
              </Grid>
              <Grid sx={{ marginTop: "10px" }}>
                <Typography
                  sx={{
                    fontWeight: "bolder",
                    fontFamily: "Roboto",
                    color: "#16355d",
                    fontSize: "18px",
                  }}
                >
                  Weekly Activity
                </Typography>
              </Grid>
            </Grid>
            <Bar options={options} data={data} />
          </Grid>
        </div>
      </Container>
    </div>
  );
};
export default WeeklyActivity;
