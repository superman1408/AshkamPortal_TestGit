import React from "react";
import { WiDayCloudy } from "react-icons/wi";

import { Grid, Typography, Container, useTheme } from "@mui/material";

const TimeDate = () => {
  const theme = useTheme();

  const date = new Date();
  console.log(date);

  return (
    <div style={{ display: "flex", flex: 1 }}>
      <Container
        sx={{
          display: "flex",
          backdropFilter: "blur(8px)",
          background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
          maxWidth: "500px",
          flexDirection: "column",
          marginLeft: "20px",
          height: "150px",
          padding: "10px",
          boxShadow: 1,
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative", // Set position to relative
          flex: 1,
          border: " solid rgba(255, 255, 255, 0.3)",
          transition: "all 0.2s ease-in-out",
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "20px 0px 0px 0px",
            width: "40vh",
          },
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
          <Grid sx={{ display: "flex", flexDirection: "row" }}></Grid>
          <div>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                padding: "20px",
              }}
            >
              <WiDayCloudy
                size={50}
                color="#94a3b8"
                style={{ marginBottom: "8px" }}
              />

              <div style={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  color="#16355d"
                  fontFamily="Roboto"
                  sx={{
                    textTransform: "capitalize",
                    letterSpacing: "0.5px",
                  }}
                >
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    day: "2-digit",
                    month: "long",
                  })}
                </Typography>

                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  fontFamily="Roboto"
                  color="#16355d"
                  sx={{
                    marginTop: "4px",
                  }}
                >
                  {date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </div>
            </Grid>
          </div>
        </Grid>
      </Container>
    </div>
  );
};

export default TimeDate;
