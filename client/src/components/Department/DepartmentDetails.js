import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../action/posts";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DepartmentDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.posts);
  const verifyDepat = user.result.department;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (posts) {
      dispatch(getPosts());
    }
  }, [dispatch, posts]);

  const activeEmployees = posts.filter((emp) => emp.activeStatus === "Active");

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderCard = (post) => (
    <Card
      sx={{
        width: 200,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: 3,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        image={post.selectedFile}
        alt="Profile"
        sx={{
          height: 160,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ textAlign: "center", p: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 600, color: "#16355d" }}
        >
          {post.firstName + " " + post.lastName}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post.jobTitle}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6, position: "relative" }}>
      {/* Back Button */}
      <IconButton
        onClick={handleGoBack}
        sx={{
          position: "absolute",
          left: 16,
          top: 16,
          zIndex: 1000, // ensures it’s on top
          "&:hover": { bgcolor: "#e3eaf3" },
        }}
      >
        <ArrowBackIcon sx={{ color: "#16355d" }} />
      </IconButton>
      {/* Department Title */}
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ color: "#16355d", fontFamily: "Roboto" }}
        >
          {verifyDepat}
        </Typography>
      </Box>

      {/* Managers */}
      <Box mb={3}>
        <Grid container spacing={3} justifyContent="center">
          {posts
            .filter(
              (post) =>
                post.department === verifyDepat && post.role === "manager",
            )
            .map((post, idx) => (
              <Grid item key={idx}>
                {renderCard(post)}
              </Grid>
            ))}
        </Grid>
      </Box>

      <Divider
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          borderWidth: "5px",
          bgcolor: "#336699",
        }}
      />

      {/* Employees */}
      <Box>
        <Grid container spacing={3} justifyContent="center">
          {activeEmployees
            .filter(
              (post) =>
                post.department === verifyDepat && post.role === "employee",
            )
            .sort((a, b) =>
              (a.firstName + " " + a.lastName).localeCompare(
                b.firstName + " " + b.lastName,
              ),
            )
            .map((post, idx) => (
              <Grid item key={idx}>
                {renderCard(post)}
              </Grid>
            ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default DepartmentDetails;
