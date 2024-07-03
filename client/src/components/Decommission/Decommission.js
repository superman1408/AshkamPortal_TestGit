import React from "react";
import { Card, Container } from "@mui/material";
import video1 from "../../assets/DECOMMISSION.mp4";

const Decommission = () => {
  return (
    <Container sx={{justifyContent: "center"}}>
    <Card
      elevation={10}
      sx={{ display: "flex", width: "1300px", borderRadius: "12px",justifyContent: "center" }}
    >
      <video loop autoPlay muted style={{ display: "flex", width: "1300px" }}>
        <source src={video1} type="video/mp4" />
      </video>
    </Card>
    </Container>
  );
};

export default Decommission;
