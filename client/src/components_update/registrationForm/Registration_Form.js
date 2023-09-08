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
    });
  };

  const handleDOB = (dob) => {
    setdob(dob);
    const UsFormatter = new Intl.DateTimeFormat("en-US");
    const date = UsFormatter.format(dob);
    setPostData({ ...postData, dob: date });
  };

  return (
    <Paper elevation={24} sx={{ width: "800px", marginLeft: "300px" }}>
      <Grid sx={{ marginLeft: "30px", marginRight: "30px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <h1>Employee Registration Form</h1>
          </div>
          <Divider
            sx={{
              borderWidth: "7px",
            }}
          />
          <div sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>Full Name</Typography>
            <TextField
              type="text"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              label="First Name"
              sx={{ marginTop: "20px" }}
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
              sx={{ marginTop: "20px" }}
              value={postData.lastName}
              onChange={(e) =>
                setPostData({ ...postData, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <Typography>Date of birth</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  value={dob}
                  required
                  fullWidth
                  name="birthDate"
                  dateFormat="dd/MM/yyyy"
                  onChange={handleDOB}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                defaultValue="female"
                name="controlled-radio-buttons-group"
                onChange={(e) =>
                  setPostData({ ...postData, gender: e.target.value })
                }
              >
                <Radio value="female" label="Female" color="success" />
                <Radio value="male" label="Male" color="success" />
                <Radio value="other" label="Other" color="success" />
              </RadioGroup>
            </FormControl>
          </div>
          <div>
            <Typography>Email</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              type="email"
              name="email"
              value={postData.email}
              onChange={(e) =>
                setPostData({ ...postData, email: e.target.value })
              }
            />
            <h5>example@example.com</h5>
          </div>
          <div>
            <Typography>Marital Status</Typography>
            <select
              name="maritalStatus"
              onChange={(e) =>
                setPostData({ ...postData, maritalStatus: e.target.value })
              }
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
            </select>
          </div>
          <div>
            <Typography>Address</Typography>
            <TextField
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
          <div style={{ display: "flex" }}>
            <div>
              <TextField
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
          </div>
          <div>
            <TextField
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
          <Divider
            sx={{
              borderWidth: "7px",
            }}
          />
          <h2>Job Informations</h2>
          <div sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>Title</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              label=""
              sx={{ marginTop: "20px" }}
              name="jobTitle"
              value={postData.jobTitle}
              onChange={(e) =>
                setPostData({ ...postData, jobTitle: e.target.value })
              }
            />
          </div>
          <div>
            <Typography>Employee Id</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="employeeId"
              value={postData.employeeId}
              onChange={(e) =>
                setPostData({ ...postData, employeeId: e.target.value })
              }
            />
          </div>
          <div>
            <Typography>Department</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="department"
              value={postData.department}
              onChange={(e) =>
                setPostData({ ...postData, department: e.target.value })
              }
            />
          </div>
          <div>
            <Typography>Supervisor</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="supervisor"
              value={postData.supervisor}
              onChange={(e) =>
                setPostData({ ...postData, supervisor: e.target.value })
              }
            />
          </div>

          <Divider
            sx={{
              borderWidth: "7px",
            }}
          />
          <h2>Emergency Contact Informations</h2>
          <div sx={{ display: "flex", flexDirection: "row" }}>
            <Typography>Name</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              label=""
              sx={{ marginTop: "20px" }}
              name="emergencyName"
              value={postData.emergencyName}
              onChange={(e) =>
                setPostData({ ...postData, emergencyName: e.target.value })
              }
            />
          </div>
          <div>
            <Typography>Address</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="emergencyAddress"
              value={postData.emergencyAddress}
              onChange={(e) =>
                setPostData({ ...postData, emergencyAddress: e.target.value })
              }
            />
          </div>
          <div>
            <Typography>Contact Number</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="emergencyContact"
              value={postData.emergencyContact}
              onChange={(e) =>
                setPostData({ ...postData, emergencyContact: e.target.value })
              }
            />
          </div>
          <div>
            <Typography>Relationship</Typography>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="relationship"
              value={postData.relationship}
              onChange={(e) =>
                setPostData({ ...postData, relationship: e.target.value })
              }
            />
          </div>

          <Grid container>
            <Grid>
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
      </Grid>
    </Paper>
  );
};

export default RegistrationForm;
