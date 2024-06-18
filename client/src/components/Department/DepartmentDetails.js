import React from "react";
import { styled } from "@mui/material/styles";
import {
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import avatar1 from "../../assets/MD.jpg";

const DepartmentDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "grey",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
  }));

  return (
    <div style={{ display: "flex", flex: 2 }}>
      <Grid sx={{ flexDirection: "column", padding: "10px" }}>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "pink",
          }}
        >
          <Grid>
            <CardActionArea>
              <CardMedia
                component="img"
                height="100px"
                image={avatar1}
                alt="green iguana"
              />
            </CardActionArea>
          </Grid>

          <Grid>
            <Typography
              component="div"
              sx={{
                fontSize: "15px",
                marginTop: "30px",
                marginLeft: "10px",
                fontWeight: "bolder",
              }}
            >
              MR. ABHISHEK KUMAR
            </Typography>

            <Typography
              sx={{
                fontSize: "15px",
                marginLeft: "10px",
              }}
            >
              Managing <br />
              Director
            </Typography>
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: "20px" }}>
          <Grid
            container
            justifyContent="space-evenly"
            spacing={1}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            <Grid item>
              <Item>ENGINEERING</Item>
            </Grid>
            <Grid item xs={3}>
              <Item>IT</Item>
            </Grid>
            <Grid item>
              <Item>HR & ADMIN</Item>
            </Grid>
            <Grid item>
              <Item>ACCOUNTS & TAXATION</Item>
            </Grid>
            <Grid item>
              <Item>COMMERCIAL & BD</Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default DepartmentDetails;
