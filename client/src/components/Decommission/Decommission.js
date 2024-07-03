import React, {useState, useEffect} from "react";
import { Card, Container } from "@mui/material";
import video1 from "../../assets/DECOMMISSION.mp4";

const Decommission = () => {

  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize, { passive: true });
    return () => {
      window.removeEventListener("resize", detectSize, { passive: true });
    };
  }, [dimension]);
  return (
    <Container sx={{
      // padding: "20px",
      display: "flex",
      justifyContent: "center",
      marginBottom: "20px",
    }}>
    <Card
      elevation={10}
      sx={{ display: "flex", width: "1300px", borderRadius: "30px",justifyContent: "center" }}
    >
      <video loop autoPlay muted style={{ display: "flex", width: "1200px" }}>
        <source src={video1} type="video/mp4" />
      </video>
    </Card>
    </Container>
  );
};

export default Decommission;
