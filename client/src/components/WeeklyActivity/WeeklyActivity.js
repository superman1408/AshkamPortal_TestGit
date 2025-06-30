import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Container,
  useTheme,
} from "@mui/material";
import { getPosts } from "../../action/posts";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
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
  const theme = useTheme();

  useEffect(() => {
    setIsLoading(true);
    dispatch(getPosts()).then(() => {
      setIsLoading(false);
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

  // Sort by date
  // const sortedPosts = [...filteredPosts].sort(
  //   (a, b) => new Date(a.date) - new Date(b.date)
  // );

  // // Extract sorted data
  // const labels = sortedPosts.map((post) => post.date);
  // const overTimeData = sortedPosts.map((post) => post.overTime);
  // const netTimeData = sortedPosts.map((post) => post.netTime);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Net Time vs Over Time (Stacked)",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // const labels = dateData[0];

  const groupedMap = {};

  filteredPosts.forEach((post) => {
    for (let i = 0; i < post.date.length; i++) {
      const date = post.date[i];
      const net = parseFloat(post.netTime[i]) || 0;
      const over = parseFloat(post.overTime[i]) || 0;

      if (!groupedMap[date]) {
        groupedMap[date] = { netTime: 0, overTime: 0 };
      }

      groupedMap[date].netTime += net;
      groupedMap[date].overTime += over;
    }
  });

  // Convert the map back to an array
  const groupedEntries = Object.keys(groupedMap)
    .map((date) => ({
      date,
      netTime: groupedMap[date].netTime,
      overTime: groupedMap[date].overTime,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Then extract your data for the graph
  const labels = groupedEntries.map(
    (entry) =>
      entry.date && dayjs(entry.date).isValid()
        ? dayjs(entry.date).format("ddd, DD MMM")
        : "N/A" // or "--" or "" or "N/A" if you prefer
  );

  const netTimeData = groupedEntries.map((entry) => entry.netTime);
  const overTimeData = groupedEntries.map((entry) => entry.overTime);

  const data = {
    labels,
    datasets: [
      {
        label: "Net Time",
        data: netTimeData,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Over Time",
        data: overTimeData,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
        mt={2}
        sx={{
          padding: "5px",
          maxWidth: "500px",
          backdropFilter: "blur(8px)",
          background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
          boxShadow: 1,
          width: "100%",
          borderRadius: "10px",
          height: "auto",

          transform: "all 0.2 ease-in-out",
          "@media (max-width: 600px)": {
            margin: "20px 0px 0px 0px",
            height: "auto",
          },
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <div>
          <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Grid
              mt={2}
              gap={1}
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "20px",
                marginBottom: "30px",
              }}
            >
              <Grid>
                <IconButton
                  sx={{ color: "#16355d" }}
                  onClick={() => {
                    navigate(`/posts/${user.result._id}/fullweeklyactivity`);
                  }}
                >
                  <DescriptionIcon />
                </IconButton>
              </Grid>
              <Grid>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    fontWeight: "bolder",
                    fontFamily: "Roboto",
                    color: "#16355d",
                  }}
                >
                  Weekly Activity
                </Typography>
              </Grid>
            </Grid>
            <div style={{ height: 400 }}>
              {" "}
              {/* or whatever height you want */}
              <Bar
                options={{ ...options, maintainAspectRatio: false }}
                data={data}
              />
            </div>
            {/* <Bar options={options} data={data} /> */}
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default WeeklyActivity;
// const datasets = [
//     {
//       label: "Net Time",
//       data: netTimeData,
//       backgroundColor: "rgba(255, 99, 132, 0.2)",
//       borderColor: "rgba(255, 99, 132, 1)",
//       borderWidth: 1,
//     },
//     {
//       label: "Over Time",
//       data: overTimeData,
//       backgroundColor: "rgba(54, 162, 235, 0.2)",
//       borderColor: "rgba(54, 162, 235, 1)",
//       borderWidth: 1,
//     },
//   ];
