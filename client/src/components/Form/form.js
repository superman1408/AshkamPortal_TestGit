import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./style";
import { createPost, updatePost } from "../../action/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    employeeName: "",
    employeeId: "",
    department: "",
    designation: "",
    contactNumber: "",
    email: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();

  // to view postdata
  useEffect(() => {
    if (post) return setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("button is clicked");
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    // ________for displaying textfield inputs in console_____________________

    const data = new FormData(e.currentTarget);
    console.log({
      employeeName: data.get("employeeName"),
      employeeId: data.get("employeeID"),
      department: data.get("department"),
      designation: data.get("designation"),
      contactNumb: data.get("contactNumb"),
      email: data.get("email"),
      selectedFile: data.get("selectedFile"),
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleReset = () => {
    // setCurrentId(null);
    setPostData({
      employeeName: "",
      employeeId: "",
      department: "",
      designation: "",
      contactNumber: "",
      email: "",
      selectedFile: null,
    });
  };

  const classes = useStyles();
  return (
    <Box sx={{ padding: "30px", borderRadius: "12px", marginTop: "40px" }}>
      <form className={classes.form_body} onSubmit={handleSubmit}>
        <Grid style={{ marginBottom: "50px" }}>
          <Typography
            variant="h3"
            align="center"
            className={classes.typography}
          >
            {currentId ? "Re-Register" : "Register"}
          </Typography>
        </Grid>

        <Grid align="center">
          <TextField
            label="Employee Name"
            variant="outlined"
            type="text"
            name="employeeName"
            className={classes.form__input}
            value={postData.employeeName}
            onChange={(e) =>
              setPostData({ ...postData, employeeName: e.target.value })
            }
          />
        </Grid>

        <Grid align="center" sx={{ marginTop: "30px" }}>
          <TextField
            type="text"
            label="Employee Id"
            variant="outlined"
            name="employeeID"
            className={classes.form__input}
            value={postData.employeeId}
            onChange={(e) =>
              setPostData({ ...postData, employeeId: e.target.value })
            }
          />
        </Grid>

        <Grid align="center" sx={{ marginTop: "30px" }}>
          <TextField
            type="text"
            label="Designation"
            variant="outlined"
            name="designation"
            className={classes.form__input}
            value={postData.designation}
            onChange={(e) =>
              setPostData({ ...postData, designation: e.target.value })
            }
          />
        </Grid>

        <Grid align="center" sx={{ marginTop: "30px" }}>
          <TextField
            label="Department"
            variant="outlined"
            type="text"
            name="department"
            className={classes.form__input}
            value={postData.department}
            onChange={(e) =>
              setPostData({ ...postData, department: e.target.value })
            }
          />
        </Grid>

        <Grid align="center" sx={{ marginTop: "30px" }}>
          <TextField
            label="Contact Number"
            variant="outlined"
            type="text"
            name="contactNumb"
            className={classes.form__input}
            value={postData.contactNumber}
            onChange={(e) =>
              setPostData({ ...postData, contactNumber: e.target.value })
            }
          />
        </Grid>

        <Grid className="email" align="center" sx={{ marginTop: "30px" }}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            className={classes.form__input}
            value={postData.email}
            onChange={(e) =>
              setPostData({ ...postData, email: e.target.value })
            }
          />
        </Grid>

        <Grid align="center" sx={{ marginTop: "30px" }}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </Grid>

        <Grid container className={classes.buttonContainer}>
          <Grid className={classes.button}>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </Grid>

          <Grid>
            <Button variant="contained" onClick={handleReset}>
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>

      <Divider />
    </Box>
  );
};

export default Form;
