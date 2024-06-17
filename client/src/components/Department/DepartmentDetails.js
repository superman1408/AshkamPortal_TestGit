import React from "react";
import {
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const DepartmentDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <div>
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
            padding: "10px",
            borderRadius: "5px",
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
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={user.result.selectedFile}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </div>
  );
};

export default DepartmentDetails;
