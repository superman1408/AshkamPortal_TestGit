import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Input,
  Button,
} from "@mui/material";

import WcIcon from "@mui/icons-material/Wc";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Chart } from "react-google-charts";

const TotalEmployee = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Editable data state
  const [menCount, setMenCount] = useState(27);
  const [womenCount, setWomenCount] = useState(6);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    // Perform save operation with edited data
    console.log("Saving - Men:", menCount, "Women:", womenCount);
    setMenCount(menCount);
    setWomenCount(womenCount);
    setIsEditing(false);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          marginTop: "20px",
          marginLeft: "20px",
          padding: "10px",
          bgcolor: "#cae8e5",
          boxShadow: 1,
          borderRadius: "10px",
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid sx={{ display: "flex", flexDirection: "row" }}>
            <Grid>
              <IconButton
                height="40px"
                width="40px"
                color="primary"
                sx={{
                  ml: "0px",
                  display: {
                    xs: "flex",
                    sm: "flex",
                  },
                }}
              >
                <WcIcon />
              </IconButton>
            </Grid>
            <Grid>
              <Typography
                sx={{
                  marginTop: "5px",
                  marginRight: "0px",
                  marginLeft: "20px",
                  fontWeight: "bolder",
                  fontFamily: "Roboto",
                }}
              >
                Total Employees
              </Typography>
            </Grid>

            <Grid>
              <Typography
                sx={{
                  marginLeft: "20px",
                  marginTop: "5px",
                  marginRight: "50px",
                  fontFamily: "Roboto",
                }}
              >
                {menCount + womenCount}
              </Typography>
            </Grid>
            <Grid>
              <IconButton
                size="50px"
                color="black"
                onClick={isEditing ? handleSave : handleEditToggle}
                sx={{
                  position: "relative",
                }}
              >
                <MoreVertIcon />
              </IconButton>
            </Grid>
          </Grid>
          {/* Render editable fields if in edit mode */}
          {isEditing ? (
            <>
              <Input
                value={menCount}
                onChange={(e) => setMenCount(parseInt(e.target.value) || 0)}
              />
              <Input
                value={womenCount}
                onChange={(e) => setWomenCount(parseInt(e.target.value) || 0)}
              />
            </>
          ) : (
            <Grid sx={{ display: "flex", flexDirection: "row" }}>
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "10px",
                }}
              >
                <Grid
                  sx={{ display: "flex", flexDirection: "row", marginTop: "" }}
                >
                  <Grid>
                    <IconButton height="40px" width="40px" color="primary">
                      <ManIcon />
                    </IconButton>
                  </Grid>

                  <Grid>
                    <Typography sx={{ marginTop: "10px" }}>
                      :{menCount}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    marginBottom: "0px",
                  }}
                >
                  <Grid>
                    <IconButton height="40px" width="40px" color="primary">
                      <WomanIcon />
                    </IconButton>
                  </Grid>

                  <Grid>
                    <Typography sx={{ marginTop: "10px" }}>
                      :{womenCount}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                sx={{
                  width: "250px",
                  height: "120px",
                  marginLeft: "0px",
                }}
              >
                <Chart
                  chartType="PieChart"
                  data={[
                    ["Task", "Hours per Day"],
                    ["Men", menCount],
                    ["Women", womenCount],
                  ]}
                  options={{
                    is3D: true,
                    backgroundColor: {
                      fill: "#cae8e5",
                    },
                  }}
                  width={"250px"}
                  height={"100px"}
                />
              </Grid>
            </Grid>
          )}
          {isEditing && (
            <Button
              sx={{ float: "right", marginTop: "20px", alignContent: "right" }}
              type="submit"
              variant="contained"
              size="small"
              onClick={isEditing ? handleSave : handleEditToggle}
            >
              Save
            </Button>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default TotalEmployee;
