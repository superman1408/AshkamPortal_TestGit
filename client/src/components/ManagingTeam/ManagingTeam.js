import React from "react";

import {
  Box,
  Grid,
  Typography,
  Divider,
  Stack,
  Avatar,
  Container,
} from "@mui/material";

import avatar1 from "../../assets/MD.jpg";
import avatar2 from "../../assets/avatar2.jpg";
import avatar3 from "../../assets/avatar3.jpg";
import avatar4 from "../../assets/Manilal.jpg";

const ManagingTeam = () => {
  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
        sx={{
          display: "flex",
          padding: "3px",
          bgcolor: "#e9edf7",
          boxShadow: 1,
          maxWidth: "500px",
          borderRadius: "10px",
          // width: "300px",
          overflow: "hidden",
          position: "relative", // Set position to relative
          marginTop: "20px",
          marginLeft: "20px",
          marginRight: "10px",
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
              Leadership
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
            {/* <Grid>
              <Typography
                sx={{
                  color: "#f7100c",
                  marginLeft: "30px",
                  marginTop: "10px",
                  fontFamily: "Roboto",
                }}
              >
                Only Today
              </Typography>
            </Grid> */}
          </Grid>
          <Divider orientation="horizontal" />

          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
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
                    src={avatar2}
                  />
                </Stack>
              </div>
            </Grid>

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
                Mr.Santosh Kumar Jha
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
                CEO
              </Typography>
            </Grid>

            {/* <Grid>
              <Typography
                sx={{
                  color: "#f7100c",
                  marginLeft: "55px",
                  marginTop: "10px",
                  fontFamily: "Roboto",
                }}
              >
                21st To 22nd
              </Typography>
            </Grid> */}
          </Grid>
          <Divider orientation="horizontal" />
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
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
                    src={avatar3}
                  />
                </Stack>
              </div>
            </Grid>

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
                Mr. Srinivas Prasanna
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
                CTO
              </Typography>
            </Grid>
          </Grid>

          <Divider orientation="horizontal" />
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
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
                    src={avatar4}
                  />
                </Stack>
              </div>
            </Grid>

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
                Mr. Manilal Gupta
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
                Business Development
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ManagingTeam;
