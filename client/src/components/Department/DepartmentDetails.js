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
    <div style={{ display: "flex", flex: 1 }}>
      <Grid
        sx={{ flexDirection: "column", padding: "10px", textAlign: "center" }}
      >
        <Grid sx={{ marginTop: "20px" }}>
          <Grid
            container
            // justifyContent="space-evenly"
            spacing={7}
            sx={{ display: "flex", flexDirection: "row", marginLeft: "60px" }}
          >
            <Grid item>
              <Item>ENGINEERING</Item>
              <div>
                {verifyDepat.toUpperCase() === "ENGINEERING" && (
                  <div style={{ textAlign: "center" }}>
                    <SouthIcon />
                  </div>
                )}
              </div>
            </Grid>
            <Grid item>
              <Item>INFORMATION TECHNOLOGY</Item>
              <div>
                {verifyDepat.toUpperCase() === "INFORMATION TECHNOLOGY" && (
                  <div style={{ textAlign: "center" }}>
                    <SouthIcon />
                  </div>
                )}
              </div>
            </Grid>
            <Grid item>
              <Item>HUMAN RESOURCE </Item>
              <div>
                {verifyDepat.toUpperCase() === "HUMAN RESOURCE" && (
                  <div style={{ textAlign: "center" }}>
                    <SouthIcon />
                  </div>
                )}
              </div>
            </Grid>
            <Grid item>
              <Item>ACCOUNTS & TAXATION</Item>
              <div>
                {verifyDepat.toUpperCase() === "ACCOUNTS & TAXATION" && (
                  <div style={{ textAlign: "center" }}>
                    <SouthIcon />
                  </div>
                )}
              </div>
            </Grid>
            <Grid item>
              <Item>COMMERCIAL & BD</Item>
              <div>
                {verifyDepat.toUpperCase() === "COMMERCIAL & BD" && (
                  <div style={{ textAlign: "center" }}>
                    <SouthIcon />
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid sx={{ marginTop: "20px" }}>
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
                  <div key={index} style={{ margin: "20px 20px 20px 20px" }}>
                    <Card sx={{ maxWidth: 200, maxHeight: 250 }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={post.selectedFile}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {post.firstName + " " + post.lastName}
                        </Typography>
                        <Typography>{post.jobTitle}</Typography>
                      </CardContent>
                    </Card>
                  </div>
                );
              }
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DepartmentDetails;
