import React, { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../action/posts";

const RegistrationForm = ({ currentId, setCurrentId }) => {
  const [dob, setdob] = useState("");

  const [postData, setPostData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    maritalStatus: "",
    contactNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    jobTitle: "",
    employeeId: "",
    department: "",
    supervisor: "",
    emergencyName: "",
    emergencyAddress: "",
    emergencyContact: "",
    relationship: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
    console.log(postData);
  };

  // to view postdata
  // useEffect(() => {
  //   if (postData.dob || postData.gender == null)
  //     return console.log("Data not present");
  // }, [postData]);

  useEffect(() => {
    if (post) return setPostData(post);
  }, [post]);

  const handleReset = () => {
    setPostData({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      email: "",
      maritalStatus: "",
      contactNumber: "",
      streetAddress: "",
      city: "",
      state: "",
      pincode: "",
      jobTitle: "",
      employeeId: "",
      department: "",
      supervisor: "",
      emergencyName: "",
      emergencyAddress: "",
      emergencyContact: "",
      relationship: "",
      selectedFile: "",
    });
  };

  const handleDOB = (dob) => {
    setdob(dob);
    const UsFormatter = new Intl.DateTimeFormat("en-US");
    const date = UsFormatter.format(dob);
    setPostData({ ...postData, dob: date });
  };

  return (
    <Paper elevation={24} sx={{ width: "800px", justifyContent: "center" }}>
      <Grid
        sx={{ marginLeft: "30px", marginRight: "30px", marginBottom: "30px" }}
      >
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: "30px",
                fontWeight: "bold",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              Employee Registration Form
            </Typography>
          </div>

          <Divider
            sx={{
              borderWidth: "7px",
            }}
          />

          <div sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              sx={{
                margin: "30px 0px 0px 0px",
                fontSize: "18px",
                fontWeight: "200px",
              }}
            >
              Full Name
            </Typography>
            <TextField
              type="text"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              label="First Name"
              sx={{ marginTop: "10px" }}
              value={postData.firstName}
              onChange={(e) =>
                setPostData({ ...postData, firstName: e.target.value })
              }
            />
            <TextField
              type="text"
              name="lastName"
              variant="outlined"
              required
              fullWidth
              label="Last Name"
              sx={{ marginTop: "10px" }}
              value={postData.lastName}
              onChange={(e) =>
                setPostData({ ...postData, lastName: e.target.value })
              }
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Grid sx={{ fontSize: "20px", marginTop: "40px" }}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </Grid>

            <div style={{ width: "150px", height: "100px", marginTop: "40px" }}>
              <img
                style={{ width: "150px", height: "100px" }}
                src={postData.selectedFile}
                alt="Profile_Picture"
              />
            </div>
          </div>

          <div style={{ marginTop: "30px" }}>
            {/* <Typography
              sx={{
                margin: "30px 0px 0px 0px",
                fontSize: "18px",
                fontWeight: "200px",
              }}
            >
              Date of birth
            </Typography> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={dob}
                  name="birthDate"
                  dateFormat="dd/MM/yyyy"
                  label="Date of Birth"
                  onChange={handleDOB}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>

          <div>
            <FormControl>
              <Typography
                sx={{
                  margin: "30px 0px 0px 0px",
                  fontSize: "18px",
                  fontWeight: "200px",
                }}
              >
                Gender
              </Typography>
              <RadioGroup
                defaultValue="female"
                name="controlled-radio-buttons-group"
                onChange={(e) =>
                  setPostData({ ...postData, gender: e.target.value })
                }
              >
                <Radio value="female" label="Female" color="primary" />
                <Radio value="male" label="Male" color="primary" />
                <Radio value="other" label="Other" color="primary" />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            {/* <Typography
              sx={{
                margin: "30px 0px 0px 0px",
                fontSize: "18px",
                fontWeight: "200px",
              }}
            >
              Email
            </Typography> */}
            <TextField
              sx={{ marginTop: "30px" }}
              variant="outlined"
              required
              fullWidth
              type="email"
              name="email"
              label="Email"
              placeholder="example@example.com"
              value={postData.email}
              onChange={(e) =>
                setPostData({ ...postData, email: e.target.value })
              }
            />
          </div>
          <div>
            {/* <Typography
              sx={{
                margin: "30px 0px 0px 0px",
                fontSize: "18px",
                fontWeight: "200px",
              }}
            >
              Marital Status
            </Typography> */}
            <select
              style={{
                width: "300px",
                height: "50px",
                fontSize: "16px",
                marginTop: "30px",
              }}
              name="maritalStatus"
              onChange={(e) =>
                setPostData({ ...postData, maritalStatus: e.target.value })
              }
            >
              <option value="none" selected disabled hidden>
                Marital Status
              </option>
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>

          <div>
            {/* <Typography
              sx={{
                margin: "30px 0px 0px 0px",
                fontSize: "18px",
                fontWeight: "200px",
              }}
            >
              Contact Number
            </Typography> */}
            <TextField
              sx={{ marginTop: "30px" }}
              variant="outlined"
              required
              fullWidth
              label="Contact Number"
              name="contactNumber"
              value={postData.contactNumber}
              onChange={(e) =>
                setPostData({ ...postData, contactNumber: e.target.value })
              }
            />
          </div>
          <div>
            <Typography
              sx={{
                margin: "30px 0px 0px 0px",
                fontSize: "18px",
                fontWeight: "200px",
              }}
            >
              Address
            </Typography>
            <TextField
              sx={{ marginTop: "10px" }}
              variant="outlined"
              required
              fullWidth
              label="Street Address"
              name="streetAddress"
              value={postData.streetAddress}
              onChange={(e) =>
                setPostData({ ...postData, streetAddress: e.target.value })
              }
            />
          </div>
          {/* <div style={{ display: "flex" }}> */}
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <TextField
                sx={{ marginTop: "10px" }}
                variant="outlined"
                required
                fullWidth
                label="City"
                name="city"
                value={postData.city}
                onChange={(e) =>
                  setPostData({ ...postData, city: e.target.value })
                }
              />
            </div>
            <div>
              <TextField
                sx={{ marginTop: "10px" }}
                variant="outlined"
                required
                fullWidth
                label="State"
                name="state"
                value={postData.state}
                onChange={(e) =>
                  setPostData({ ...postData, state: e.target.value })
                }
              />
            </div>

            {/* </div> */}
            <div>
              <TextField
                sx={{ marginTop: "10px" }}
                variant="outlined"
                required
                fullWidth
                label="Pincode"
                name="pincode"
                value={postData.pincode}
                onChange={(e) =>
                  setPostData({ ...postData, pincode: e.target.value })
                }
              />
            </div>
          </Grid>

          <Divider sx={{ margin: "20px 0px 20px 0px", borderWidth: "7px" }} />
          <h2>Job Informations</h2>
          <div sx={{ display: "flex", flexDirection: "row" }}>
            {/* <Typography className={classes.typography}>Title</Typography> */}
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Job Role"
              name="jobTitle"
              value={postData.jobTitle}
              onChange={(e) =>
                setPostData({ ...postData, jobTitle: e.target.value })
              }
            />
          </div>
          <div>
            {/* <Typography className={classes.typography}>Employee Id</Typography> */}
            <TextField
              sx={{ marginTop: "10px" }}
              variant="outlined"
              required
              fullWidth
              label="Employee Id"
              name="employeeId"
              value={postData.employeeId}
              onChange={(e) =>
                setPostData({ ...postData, employeeId: e.target.value })
              }
            />
          </div>
          <div>
            {/* <Typography className={classes.typography}>Department</Typography> */}
            <TextField
              sx={{ marginTop: "10px" }}
              variant="outlined"
              required
              fullWidth
              label="Department"
              name="department"
              value={postData.department}
              onChange={(e) =>
                setPostData({ ...postData, department: e.target.value })
              }
            />
          </div>
          <div>
            {/* <Typography className={classes.typography}>Supervisor</Typography> */}
            <TextField
              sx={{ marginTop: "10px" }}
              variant="outlined"
              required
              fullWidth
              label="Reporting Manager"
              name="supervisor"
              value={postData.supervisor}
              onChange={(e) =>
                setPostData({ ...postData, supervisor: e.target.value })
              }
            />
          </div>

          <Divider sx={{ margin: "20px 0px 20px 0px", borderWidth: "7px" }} />
          <h2>Emergency Contact Informations</h2>
          <div sx={{ display: "flex", flexDirection: "row" }}>
            {/* <Typography className={classes.typography}>Name</Typography> */}
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Name"
              name="emergencyName"
              value={postData.emergencyName}
              onChange={(e) =>
                setPostData({ ...postData, emergencyName: e.target.value })
              }
            />
          </div>
          <div>
            {/* <Typography className={classes.typography}>Address</Typography> */}
            <TextField
              sx={{ marginTop: "10px" }}
              variant="outlined"
              required
              fullWidth
              label="Address"
              name="emergencyAddress"
              value={postData.emergencyAddress}
              onChange={(e) =>
                setPostData({ ...postData, emergencyAddress: e.target.value })
              }
            />
          </div>
          <div>
            {/* <Typography className={classes.typography}>
              Contact Number
            </Typography> */}
            <TextField
              sx={{ marginTop: "10px" }}
              variant="outlined"
              required
              fullWidth
              label="Contact Number"
              name="emergencyContact"
              value={postData.emergencyContact}
              onChange={(e) =>
                setPostData({ ...postData, emergencyContact: e.target.value })
              }
            />
          </div>
          <div>
            {/* <Typography className={classes.typography}>Relationship</Typography> */}
            <TextField
              sx={{ marginTop: "10px" }}
              variant="outlined"
              required
              fullWidth
              label="Relationship"
              name="relationship"
              value={postData.relationship}
              onChange={(e) =>
                setPostData({ ...postData, relationship: e.target.value })
              }
            />
          </div>

          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",

              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Grid>
              <Button type="submit" variant="contained" required fullWidth>
                Register
              </Button>
            </Grid>

            <Grid>
              <Button
                variant="contained"
                onClick={handleReset}
                required
                fullWidth
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};

export default RegistrationForm;
