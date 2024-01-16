import React from "react";
import { useDispatch } from "react-redux";
import useStyles from "./style";
import { deletePost } from "../../../action/posts";
import { Box, Button, Typography, Card } from "@mui/material";
import {} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

// import Navbar from "../../Navbar/navbar";

const Post = ({ post, setCurrentId }) => {
  //   const submit = () => {
  //     console.log("its workings");
  //   };
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // console.log(post);

  return (
    <Box
      container
      component="main"
      sx={{
        marginTop: "100px",
        bgcolor: "blue",
      }}
    >
      <Card elevation={10}>
        <Typography
          variant="h5"
          sx={{ marginTop: "20px", marginBottom: "30px", textAlign: "center" }}
        >
          Employee Information
        </Typography>
        <Box sx={{ padding: "10px", alignSelf: "center" }}>
          <div className={classes.profilePic}>
            <img
              style={{ width: "150px", height: "100px" }}
              src={post.selectedFile}
              alt="Profile_Picture"
            />
          </div>
          <div style={{ marginLeft: "50px" }}>
            <Typography sx={{ marginTop: "10px" }}>
              Name : {post.firstName} {post.lastName}
            </Typography>

            <Typography sx={{ marginTop: "10px" }}>
              Id : {post.employeeId}
            </Typography>

            <Typography sx={{ marginTop: "10px" }}>
              Department : {post.department}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Contact Number : {post.contactNumber}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Email : {post.email}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Date of Birth : {post.dob}
            </Typography>

            <Typography sx={{ marginTop: "10px" }}>
              Gender : {post.gender}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Marital Status : {post.maritalStatus}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Job Title : {post.jobTitle}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Job Skill : {post.jobSkill}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Reporting Manager : {post.reportingManager}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Street Address : {post.streetAddress}
            </Typography>

            <Typography sx={{ marginTop: "10px" }}>
              City : {post.city}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              State : {post.state}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Pincode : {post.pincode}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Emergency Name : {post.emergencyName}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              Emergency Contact : {post.emergencyContact}
            </Typography>
            <Typography sx={{ marginTop: "10px" }}>
              relationship : {post.relationship}
            </Typography>

            <Typography sx={{ marginTop: "10px" }}>
              Emergency Address : {post.emergencyAddress}
            </Typography>
          </div>
          <div className={classes.button_Container}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => setCurrentId(post._id)}
            >
              Edit
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                console.log("profile");
                navigate(`/mail/${post._id}/leave`, { replace: true });
              }}
            >
              Mail
            </Button>
            <Button
              className={classes.submit}
              color="secondary"
              variant="contained"
              onClick={() => dispatch(deletePost(post._id))}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Card>
    </Box>
  );
};

export default Post;
