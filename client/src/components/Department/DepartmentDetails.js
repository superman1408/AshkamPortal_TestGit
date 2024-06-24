import React, { useEffect } from "react";
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
} from "@mui/material";
import avatar1 from "../../assets/MD.jpg";

const DepartmentDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const posts = useSelector((state) => state.posts);
  const verifyDepat = user.result.department;

  const dispatch = useDispatch();

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

  return (
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
        <Typography variant="h5">{verifyDepat}</Typography>
        <Grid sx={{ marginTop: "20px", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {posts.map((post, index) => {
              if (post.department === verifyDepat) {
                return (
                  <div key={index} style={{ margin: "20px" }}>
                    <ButtonBase>
                      <Card sx={{ maxWidth: 300, maxHeight: 250 }}>
                        <CardMedia
                          sx={{ padding: "2px" }}
                          component="img"
                          height="180"
                          image={post.selectedFile}
                        />
                        <CardContent sx={{ padding: "5px", height: "200px" }}>
                          <Typography
                            gutterBottom
                            component="div"
                            sx={{ fontSize: "18px" }}
                          >
                            {post.firstName + " " + post.lastName}
                          </Typography>
                          <Typography sx={{ fontSize: "15px" }}>
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
  );
};

export default DepartmentDetails;
