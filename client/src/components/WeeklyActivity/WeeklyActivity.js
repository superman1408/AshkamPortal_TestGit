import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";
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
      console.log("Activity");
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
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Over Time",
        data: overTimeData[0],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          marginTop: "20px",
          marginLeft: "20px",
          padding: "10px",
          bgcolor: "#e2e6cf",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <div
          onClick={() => {
            navigate(`/posts/${user.result._id}/fullweeklyactivity`); // Full Weekly Activity route
          }}
        >
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "20px",
                // marginTop: "10px",
                marginBottom: "30px",
              }}
            >
              <Grid>
                <IconButton>
                  <DescriptionIcon
                    onClick={() => {
                      navigate(`/posts/${user.result._id}/fullweeklyactivity`); // Full Weekly Activity route
                    }}
                  />
                </IconButton>
              </Grid>
              <Grid sx={{ marginTop: "10px" }}>
                <Typography sx={{ fontWeight: "bolder", fontFamily: "Roboto" }}>
                  Weekly Activity
                </Typography>
              </Grid>
            </Grid>

            <Bar options={options} data={data} />
          </Grid>
        </div>
      </Box>
    </div>
  );
};
export default WeeklyActivity;
