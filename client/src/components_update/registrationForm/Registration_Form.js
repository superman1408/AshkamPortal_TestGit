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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../action/posts";

const RegistrationForm = ({ currentId, setCurrentId }) => {
  const options = ["Married", "Single"];

  const [startDate, setStartDate] = useState();

  const UsFormatter = new Intl.DateTimeFormat("en-US");
  const fromDate = UsFormatter.format(startDate);

  const [postData, setPostData] = useState({
    firstName: "",
    lastName: "",
    fromDate: "",
    female: "",

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
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      fromDate: data.get("fromDate"),
      female: data.get("female"),
      email: data.get("email"),
      maritalStatus: data.get("maritalStatus"),
      streetAddress: data.get("streetAddress"),
      city: data.get("city"),
      state: data.get("state"),
      pincode: data.get("pincode"),
      jobTitle: data.get("jobTitle"),
      employeeId: data.get("employeeId"),
      department: data.get("department"),
      supervisor: data.get("supervisor"),
      emergencyName: data.get("emergencyName"),
      emergencyAddress: data.get("emergencyAddress"),
      emergencyContact: data.get("emergencyContact"),
      relationship: data.get("relationship"),
    });

    console.log("date", fromDate);
  };

  // eslint-disable-next-line no-unused-vars
  const handleReset = () => {
    // setCurrentId(null);
    setPostData({
      firstName: "",
      lastName: "",
      fromDate: "",
      female: "",
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

  return (
    <Paper elevation={24} sx={{ width: "800px", marginLeft: "300px" }}>
      <Grid sx={{ marginLeft: "30px", marginRight: "30px" }}>
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: "center" }}>
            <h1>Employee Registration Form</h1>
          </div>
          <Divider
            sx={{
              // marginLeft: "10px",
              // marginRight: "2px",
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
                  value={postData.startDate}
                  // onChange={(startDate) => setStartDate(startDate)}
                  required
                  fullWidth
                  name="birthDate"
                  selected={startDate}
                  dateFormat="dd/MM/yyyy"
                  // value={postData.birthDate}
                  onChange={(e) =>
                    setPostData({ ...postData, fromDate: e.target.value })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div>
            <Typography>Gender</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="null"
              name="radio-buttons-group"
              // value={value}
              // onChange={handleChange}
            >
              <FormControlLabel
                // value="female"
                control={<Radio />}
                label="Female"
                name="female"
                value={postData.female}
                onChange={(e) =>
                  setPostData({ ...postData, female: e.target.value })
                }
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                // value="other"
                control={<Radio />}
                label="Other"
                name="male"
                value={postData.male}
                onChange={(e) =>
                  setPostData({ ...postData, male: e.target.value })
                }
              />
            </RadioGroup>
          </div>
          {/* <Typography>Gender</Typography>
          <Autocomplete
            options={options}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select" variant="outlined" />
            )}
          /> */}
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
            <Autocomplete
              options={options}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select"
                  variant="outlined"
                  name="maritalStatus"
                  value={postData.maritalStatus}
                  onChange={(e) =>
                    setPostData({ ...postData, maritalStatus: e.target.value })
                  }
                />
              )}
            />
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
              // marginLeft: "10px",
              // marginRight: "2px",
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
              // marginLeft: "10px",
              // marginRight: "2px",
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
