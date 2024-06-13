import { Container, Typography, Grid, Stack, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";

import avatar1 from "../../assets/MD.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getPost, getPosts } from "../../action/posts";
import Lead from "./Lead/Lead";

const Department = () => {
  const posts = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));

  const verifyDepat = user.result.department;

  console.log(verifyDepat);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    department: "",
    reportingManager: "",
    selectedFile: "",
  });

  useEffect(() => {
    if (posts) {
      dispatch(getPosts()).then(() => {
        console.log("Data is recieved in the Department Module..!!!");
        // posts.forEach((post) => {
        //   if (post.department === user.result.department) {
        //     setFormData((prevData) => ({
        //       // Merge the new data with previous data using spread operator
        //       ...prevData,
        //       firstName: post.firstName,
        //       lastName: post.lastName,
        //       jobTitle: post.jobTitle,
        //       department: post.department,
        //       reportingManager: post.reportingManager,
        //       selectedFile: post.selectedFile,
        //     }));
        //   }
        //   console.log(formData.firstName);
        // });
      });
    }
  }, [dispatch, posts]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Lead posts={posts} verifyDepat={verifyDepat} />
      {/* <Container
        sx={{
          display: "flex",
          padding: "10px",
          bgcolor: "#f2d5d6",
          boxShadow: 1,
          maxWidth: "500px",
          borderRadius: "10px",
          // width: "100%",
          overflow: "hidden",
          position: "relative", // Set position to relative
        }}
      >
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
            marginRight: "20px",
          }}
        >
          <Grid>
            <Typography
              sx={{
                color: "#16355d",
                fontFamily: "Roboto",
                fontWeight: "bolder",
                mt: "5px",
                mb: "1px",
                ml: "10px",
                alignItems: "center",
                fontSize: "18px",
              }}
            >
              Department
            </Typography>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Stack flexDirection="row">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                  alt="Femy sharp"
                  src={avatar1}
                />
              </Stack>
            </div>
            <Grid>
              <Typography
                sx={{
                  marginLeft: "20px",
                  marginRight: "0px",
                  marginTop: "10px",
                  fontSize: "14px",
                  fontFamily: "Roboto",
                }}
              >
                {formData.reportingManager}
              </Typography>
              <Typography
                sx={{
                  marginLeft: "20px",
                  marginRight: "30px",
                  fontFamily: "Roboto",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                Managing director
              </Typography>
            </Grid>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Stack flexDirection="row">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    marginLeft: "10px",
                    marginTop: "10px",
                  }}
                  alt="Femy sharp"
                  src={avatar1}
                />
              </Stack>
            </div>
            <Grid>
              <Typography
                sx={{
                  marginLeft: "20px",
                  marginRight: "0px",
                  marginTop: "10px",
                  fontSize: "14px",
                  fontFamily: "Roboto",
                }}
              >
                Mr.Abhishek Kumar
              </Typography>
              <Typography
                sx={{
                  marginLeft: "20px",
                  marginRight: "30px",
                  fontFamily: "Roboto",
                  fontSize: "10px",
                  fontWeight: "bold",
                }}
              >
                Managing director
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container> */}
    </div>
  );
};

export default Department;
