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
    <div style={{ display: "flex", flex: 1 }}>
      <Grid sx={{ flexDirection: "column", padding: "10px" }}>
        <Grid sx={{ marginTop: "20px" }}>
          <Grid
            container
            // justifyContent="space-evenly"
            spacing={7}
            sx={{ display: "flex", flexDirection: "row", marginLeft: "60px" }}
          >
            <Grid item>
              <Item>ENGINEERING</Item>
            </Grid>
            <Grid item>
              <Item>INFORMATION TECHNOLOGY</Item>
            </Grid>
            <Grid item>
              <Item>HUMAN RESOURCE </Item>
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
