import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../action/posts";
import { styled } from "@mui/material/styles";
import SouthIcon from "@mui/icons-material/South";
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
  IconButton,
  Button,
  CardActions,
  ButtonBase,
  Divider,
} from "@mui/material";
import avatar1 from "../../assets/MD.jpg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const DepartmentDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.posts);
  const verifyDepat = user.result.department;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "grey",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.primary,
  }));

  useEffect(() => {
    if (posts) {
      dispatch(getPosts());
    }
  }, [dispatch, posts]);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div style={{ display: "inline", float: "left" }}>
        <Button
          onClick={handleGoBack}
          sx={{
            padding: "8px 16px",
            color: "#16355d",
            float: "left",
            display: {
              xs: "none",
              sm: "inline-block",
            },
          }}
        >
          <ArrowBackIcon />
        </Button>
      </div>
      <Container
        fluid="true"
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Grid sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ color: "#16355d", fontFamily: "Roboto" }}
          >
            {verifyDepat}
          </Typography>
          <Grid>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {posts.map((post) => {
                if (
                  post.department === verifyDepat &&
                  post.role === "manager"
                ) {
                  return (
                    <div style={{ margin: "20px" }}>
                      <ButtonBase>
                        <Card
                          sx={{
                            width: 180,
                            maxHeight: 220,
                            borderRadius: "10%",
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={post.selectedFile}
                            alt="Post image"
                            sx={{
                              padding: "2px",
                              height: "150px",
                              borderRadius: "10%", // or "50%" for circle
                              objectFit: "cover",
                            }}
                          />
                          <CardContent sx={{ padding: "5px" }}>
                            <Typography
                              gutterBottom
                              component="div"
                              sx={{
                                fontSize: "18px",
                                color: "#16355d",
                                fontFamily: "Roboto",
                                lineHeight: 1.2,
                              }}
                            >
                              {post.firstName + " " + post.lastName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "15px",
                                color: "#16355d",
                                fontFamily: "Roboto",
                                lineHeight: 1.2,
                              }}
                            >
                              {post.jobTitle}
                            </Typography>
                          </CardContent>
                        </Card>
                      </ButtonBase>
                    </div>
                  );
                }
              })}
            </div>
          </Grid>
          <Divider
            sx={{
              borderWidth: "5px",
              bgcolor: "grey",
            }}
          />
          <Grid sx={{ marginTop: "20px", textAlign: "center" }}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {posts.map((post, index) => {
                if (
                  post.department === verifyDepat &&
                  post.role === "employee"
                ) {
                  return (
                    <div key={index} style={{ margin: "20px" }}>
                      <ButtonBase>
                        <Card
                          sx={{
                            width: 180,
                            maxHeight: 220,
                            borderRadius: "10%",
                          }}
                        >
                          <CardMedia
                            component="img"
                            image={post.selectedFile}
                            alt="Post image"
                            sx={{
                              padding: "2px",
                              height: "150px",
                              borderRadius: "10%", // or "50%" for circle
                              objectFit: "cover",
                            }}
                          />

                          <CardContent sx={{ padding: "5px" }}>
                            <Typography
                              gutterBottom
                              component="div"
                              sx={{
                                fontSize: "18px",
                                color: "#16355d",
                                fontFamily: "Roboto",
                                lineHeight: 1.2,
                              }}
                            >
                              {post.firstName + " " + post.lastName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "15px",
                                color: "#16355d",
                                fontFamily: "Roboto",
                                lineHeight: 1.2,
                              }}
                            >
                              {post.jobTitle}
                            </Typography>
                          </CardContent>
                        </Card>
                      </ButtonBase>
                    </div>
                  );
                }
              })}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DepartmentDetails;
