import { Card, Container, Typography, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mission from "../../assets/Moto1.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const AboutUs = () => {
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const navigate = useNavigate();

  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  const handleGoBack = () => {
    navigate(-1); // this means "go back one step in history"
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize, { passive: true });
    return () => {
      window.removeEventListener("resize", detectSize, { passive: true });
    };
  }, [dimension]);

  return (
    <div>
      <Button
        onClick={handleGoBack}
        sx={{
          padding: "8px 16px",
          color: "#16355d",
          display: {
            xs: "none",
            sm: "inline-block",
          },
        }}
      >
        <ArrowBackIcon />
      </Button>
      <Container
        fluid="true"
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "center",
          marginTop: "0px",
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
            width: "80%",
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
              ASHKAM ENERGY PVT LTD was incorporated in 2015 by a group of
              passionate engineers and professionals accomplishing Make in India
              Global Energy Consultancy services. Their Vision, Mission, and
              Values turned into a progressive & dynamic multi-disciplinary
              engineering consultancy company actively involved in Marine
              Engineering, Naval Architecture, Process, Structural, Civil,
              Mechanical, and Piping Engineering across the industry. The group
              has expertise in Ship Design, Offshore Engineering, Mooring
              Design, Critical Equipment Design, Subsea Pipeline & Marine
              Engineering, Advisory services to Oil & Gas, LNG & Re-gasification
              Terminal Design, Port & Harbour development, Renewable Energy and
              EPC Services.
            </p>
            <Typography
              sx={{
                color: "#0d325c",

                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              VISION
            </Typography>{" "}
            <p style={{ fontFamily: "Roboto" }}>
              A vision of being a Global Leading engineering & consultancy
              organization driven by our entrepreneurial spirit, cutting-edge
              technology, and execution excellence combined with our innovative
              approach ideas.
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
              We are committed to provide Best-in-Class engineering and
              consultancy services encompassing innovative out-of-the-box
              thinking approaches. Our motto for "Thriving on Excellence" is
              achieved by empowering our workforce.
            </p>
            <Typography
              sx={{
                color: "#0b7882",
                fontWeight: "bold",
                fontFamily: "Roboto",
              }}
            >
              VALUES
            </Typography>{" "}
            <p style={{ fontFamily: "Roboto" }}>
              Our business ethics & high professional integrity drive us to
              achieve excellence in engineering with values - <br />
              <b>Trust</b> - The organisation functions with the belief that
              everyone embrace the value of company to deliver what is best for
              the client. <br />
              <b>Empowerment</b> - We believe in an environment which enables
              our team to make decision that contributes to our client's delight
              in setting world-class engineering solution. <br />
              <b>Business Ethics</b> - Its our moral responsibility to adapt the
              robust business ethics to serve our clients with the leadership.
              Integrity & Accountability. We continuously challenge ourselves to
              achieve the high business ethics.
            </p>
            <br />
            <p style={{ fontStyle: "oblique", fontFamily: "Roboto" }}>
              “We conceptualized Ashkam Energy Pvt Ltd to become a key Global
              Engineering Consultancy Firm operating from tier- II city of
              India. We started off our journey rather slowly. However, with the
              backup of years of experience, knowledge, commitment and the
              vision needed to entering a competitive environment, we have been
              able to make our name and place in the industry. Ashkam with the
              motto of “Thriving on Excellence” is on the right track to
              becoming a dynamic multi-disciplinary engineering consultancy
              company in Marine & Offshore, Oil & Gas, Civil Infrastructure,
              Underwater and Subsea Engineering.” To me, “Ashkam is a synonym
              for Leadership, Passion, and Engineering Excellence!”
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
    </div>
  );
};

export default AboutUs;
