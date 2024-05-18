import { Card, Container, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Mission from "../../assets/Moto1.png";

const AboutUs = () => {
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
    <Container
      fluid="true"
      sx={{
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Card
        elevation={20}
        sx={{
          padding: "50px",
          borderRadius: "20px",
          display: {
            xs: "0",
            sm: "600",
          },
          bgcolor: "background.Card",
          boxShadow: "5px",
          width: "auto",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bolder",
            padding: "10px",
            fontSize: "30px",
            float: "center",
            color: "#0b7882",
            fontFamily: "Roboto",
          }}
        >
          {" "}
          About Ashkam
        </Typography>
        <Grid
          sx={{
            marginLeft: "10px",
            marginRight: "10px",
            backgroundImage: `url(${Mission})`, // Set background image here
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
          }}
        >
          <p style={{ fontFamily: "Roboto" }}>
            ASHKAM ENERGY was incorporated in 2015 by a group of passionate
            engineers and professionals accomplishing Make in India Global
            Energy Consulting services. Their Mission, Vision, and Values turned
            into a progressive & dynamic multi-disciplinary engineering
            consulting company actively involved in Marine & Naval
            Architectural, Process, Structural, Civil, Mechanical, and Piping
            Engineering across the industry. The group has expertise in Offshore
            Engineering, Mooring Design, Engineering, Subsea Pipeline & Marine
            Engineering, Advisory services to Oil & Gas, LNG & Re-gasification
            Terminal Design, Marine Port & Harbor development, and Renewable
            Energy.
          </p>
          <Typography
            sx={{
              color: "#0b7882",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          >
            VISION
          </Typography>{" "}
          <p style={{ fontFamily: "Roboto" }}>
            A vision of being a Global Leading engineering & and consulting
            organization driven by our entrepreneurial spirit, cutting-edge
            technology, and execution excellence combined with our
            out-of-the-box approach and innovative ideas.
          </p>
          <Typography
            sx={{
              color: "#e46025",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          >
            MISSION
          </Typography>{" "}
          <p style={{ fontFamily: "Roboto" }}>
            We are committed to providing Best-in-Class engineering and
            consulting services to our clients encompassing innovative
            out-of-the-box thinking approaches. Our motto for "Thriving on
            Excellence" is achieved by empowering our workforce.
          </p>
          <Typography
            sx={{
              color: "#0d325c",
              fontWeight: "bold",
              fontFamily: "Roboto",
            }}
          >
            VALUE
          </Typography>{" "}
          <p style={{ fontFamily: "Roboto" }}>
            Our business ethics and high professional integrity drive us to
            achieve excellence in engineering with values such as - <br />
            <b>Trust</b> - The organization functions with the belief that
            everyone embraces the value of the company to deliver the best for
            the client. <br />
            <b>Empowerment</b> - We believe in an environment that enables our
            team to make the decision that contributes to our client's delight
            in getting world-class engineering solutions. <br />
            <b>Business Ethics</b> - It's our moral responsibility to adopt
            robust business ethics to serve our clients with leadership,
            Integrity, and Accountability. We continuously challenge ourselves
            to achieve high business ethics.
          </p>
          <br />
          <p style={{ fontStyle: "oblique", fontFamily: "Roboto" }}>
            “We conceptualized Ashkam Energy to become a key Global Engineering
            Consulting Firm operating from tier- II city of India. We started
            off our journey rather slowly. However, with the backup of years of
            experience, knowledge, and the commitment and vision needed to enter
            a competitive environment we have been able to make our name and
            place in the industry. Ashkam with the motto of Thriving on
            Excellence is on the right track to becoming a dynamic
            multi-disciplinary engineering consulting company in Marine &
            Offshore, Oil & Gas, Civil Infrastructure, Underwater and Subsea
            Engineering.” To me, “Ashkam is a synonym for Leadership, Passion,
            and Engineering Excellence!”
            <br />
          </p>{" "}
          <Typography sx={{ float: "right", fontStyle: "oblique" }}>
            ~ MR. ABHISHEK KUMAR
            <br /> Managing Director <br />
            (M.Tech - Ocean Engineering &<br /> Naval Architecture, B.E.
            Aeronautics)
          </Typography>
        </Grid>
      </Card>
    </Container>
  );
};

export default AboutUs;
