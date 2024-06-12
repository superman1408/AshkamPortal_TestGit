import { Container, Typography, Grid, Stack, Avatar } from "@mui/material";
import React, { useEffect } from "react";

import avatar1 from "../../assets/MD.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../action/posts";

const Department = () => {
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    department: "",
    reportingManager: "",
    emergencyName: "",
    emergencyAddress: "",
    emergencyContact: "",
    relationship: "",
    selectedFile: "",
  });

  useEffect(() => {
    dispatch(getPost()).then(() => {
      console.log("Data is recieved in the Registration Module..!!!");
    });
  }, [dispatch]);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
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
      </Container>
    </div>
  );
};

export default Department;
