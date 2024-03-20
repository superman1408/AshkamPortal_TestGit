import React, { useEffect, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";
import { CChart } from "@coreui/react-chartjs";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import { getPosts } from "../../action/posts";
import DescriptionIcon from "@mui/icons-material/Description";
import { useDispatch, useSelector } from "react-redux";

const WeeklyActivity = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log("user", user);
  const [currentId, setCurrentId] = useState(user.result._id);
  console.log("currentId", currentId);

  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts()).then(() => {
      console.log("Activity");
    });
  }, []);

  console.log(posts);

  const navigate = useNavigate();
  // const location = useLocation();

  // eslint-disable-next-line no-unused-vars

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

            {/*----------------------------------------------------Line Chart------------------------------------------------------*/}

            <div>
              {posts.map((post) => {
                if (post._id === currentId) {
                  const projectCodes =
                    post?.projectCode instanceof Array
                      ? post.projectCode
                      : [post.projectCode];
                  return (
                    <React.Fragment key={post._id}>
                      {projectCodes.map((code, index) => (
                        <Typography
                          key={index}
                          style={{
                            fontFamily: "robota",
                            fontWeight: "bold",
                            margin: "10px",
                          }}
                        >
                          Project Code: {code}
                        </Typography>
                      ))}
                    </React.Fragment>
                  );
                }
                return null;
              })}

              {posts.map((post) => {
                if (post._id === currentId) {
                  const overTimes =
                    post?.overTime instanceof Array
                      ? post.overTime
                      : [post.overTime];
                  return (
                    <React.Fragment key={post._id}>
                      {overTimes.map((code, index) => (
                        <Typography
                          key={index}
                          style={{
                            fontFamily: "robota",
                            fontWeight: "bold",
                            margin: "10px",
                          }}
                        >
                          Over Time: {code}
                        </Typography>
                      ))}
                    </React.Fragment>
                  );
                }
                return null;
              })}

              {posts.map((post) => {
                if (post._id === currentId) {
                  const netTimes =
                    post?.netTime instanceof Array
                      ? post.netTime
                      : [post.netTime];
                  return (
                    <React.Fragment key={post._id}>
                      {netTimes.map((code, index) => (
                        <Typography
                          key={index}
                          style={{
                            fontFamily: "robota",
                            fontWeight: "bold",
                            margin: "10px",
                          }}
                        >
                          Net Time: {code}
                        </Typography>
                      ))}
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </div>

            <Grid
              sx={{
                display: "flex",
                "@media (maxWidth: 600px)": {
                  display: "flex",
                  // width: "600px",
                  // height: "400px",
                },

                "@media (minWidth: 600px)": {
                  display: "flex",
                },
              }}
            >
              <CChart
                style={{
                  // display: "flex",
                  "@media (maxWidth: 600px)": {
                    flexDirection: "column",
                    // display: "flex",
                  },

                  "@media (minWidth: 600px)": {
                    flexDirection: "row",
                    // width: "600px",
                    // height: "400px",
                  },
                }}
                width={600}
                height={400}
                type="line"
                data={{
                  datasets: [
                    {
                      data: [45, 95, 75],
                      label: "Complete",
                      borderColor: "#1565C0",
                      fill: true,
                      lineTension: 0.5,
                    },
                    {
                      data: [15, 65, 55],
                      label: "Pending",
                      borderColor: "#ba68c8",
                      backgroundColor: "rgba(255, 0, 0, 0.5)",
                      fill: true,
                      lineTension: 0.5,
                    },
                  ],
                  labels: ["January", "February", "March"],
                }}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default WeeklyActivity;

// transform this code make the chart
