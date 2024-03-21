import React, { useState, useEffect, useRef } from "react";

import {
  Divider,
  Grid,
  Card,
  TextField,
  Typography,
  Container,
  CircularProgress,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControl from "@mui/joy/FormControl";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../action/posts";
import { useNavigate, useParams } from "react-router-dom";
import ComboBox from "./ComboBox/ComboBox";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import dayjs from "dayjs";

const RegistrationForm = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  const componentRef = useRef();
  const [dob, setdob] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const posts = useSelector((state) => state.posts);
  const [isLoading, setIsLoading] = useState(true);

  const [postData, setPostData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    dob: "",
    gender: "",
    email: "",
    maritalStatus: "",
    contactNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    pincode: "",
    jobSkills: "",
    jobTitle: "",
    employeeId: "",
    department: "",
    reportingManager: "",
    emergencyName: "",
    emergencyAddress: "",
    emergencyContact: "",
    relationship: "",
    selectedFile: "",
  });

  const role = user.result.role;

  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (option) => {
    setSelectedOption(option);
    console.log(option);
    setPostData({ ...postData, role: option });

    // setFormData({
    //   ...formData,
    //   role: option,
    // });
  };

  const { id } = useParams();
  // console.log("id in registration page", id);

  useEffect(() => {
    if (!currentId) return setCurrentId(id);
    dispatch(getPosts())
      .then(() => {
        console.log("Data is recieved in the Registration Module..!!!");
        // eslint-disable-next-line array-callback-return
        posts.map((items) => {
          for (let index = 0; index <= posts.length; index++) {
            if (items._id === currentId) {
              setPostData(() => ({
                ...postData,
                firstName: items.firstName,
                lastName: items.lastName,
                role: items.role,
                dob: items.dob,
                gender: items.gender,
                email: items.email,
                maritalStatus: items.maritalStatus,
                contactNumber: items.contactNumber,
                streetAddress: items.streetAddress,
                city: items.city,
                state: items.state,
                pincode: items.pincode,
                jobSkills: items.jobSkills,
                jobTitle: items.jobTitle,
                employeeId: items.employeeId,
                department: items.department,
                reportingManager: items.reportingManager,
                emergencyName: items.emergencyName,
                emergencyAddress: items.emergencyAddress,
                emergencyContact: items.emergencyContact,
                relationship: items.relationship,
                selectedFile: items.selectedFile,
              }));
              setSelectedOption(items.role);

              break;
            }
          }
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [currentId, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
      setUser(null);
      navigate("/home");
    } else {
      console.log("Not set current ID");
    }

    setFormSubmitted(true);
    console.log("Form submitted:", formSubmitted);
  };

  const handleDOB = (dob) => {
    setdob(dob);
    const UsFormatter = new Intl.DateTimeFormat("en-US");
    const date = UsFormatter.format(dob);
    setPostData({ ...postData, dob: date });
  };

  return (
    <Container
      fluid="true"
      ref={componentRef}
      maxwidth="true"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <Card
        elevation={24}
        sx={{ width: "800px", justifyContent: "center", height: "100%" }}
      >
        {isLoading ? (
          <>
            <CircularProgress />
            Loading...
          </>
        ) : (
          <Grid
            sx={{
              marginLeft: "30px",
              marginRight: "30px",
              marginBottom: "30px",
            }}
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
                    fontFamily: "Roboto",
                  }}
                >
                  Employee Registration Form
                </Typography>
              </div>
              <Divider
                sx={{
                  borderWidth: "7px",
                  bgcolor: "#e55d17",
                }}
              />
              <div>
                {role === "admin" && (
                  <>
                    <ComboBox posts={posts} setCurrentId={setCurrentId} />
                    <Grid
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ alignItems: "center" }}>
                          {selectedOption === "admin" ? (
                            <AdminPanelSettingsIcon
                              fontSize="small"
                              style={{ color: "#e55d17" }}
                            />
                          ) : (
                            <AdminPanelSettingsOutlinedIcon fontSize="10px" />
                          )}
                        </div>

                        <label
                          style={{ fontFamily: "Roboto ", color: "#16355d" }}
                        >
                          <input
                            style={{ marginRight: "5px", padding: "2px" }}
                            name="role"
                            type="checkbox"
                            checked={selectedOption === "admin"}
                            onChange={() => handleCheckboxChange("admin")}
                          />
                          Admin
                        </label>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ alignItems: "center" }}>
                          {selectedOption === "manager" ? (
                            <ManageAccountsIcon
                              fontSize="small"
                              style={{ color: "#047681" }}
                            />
                          ) : (
                            <ManageAccountsOutlinedIcon fontSize="10px" />
                          )}
                        </div>

                        <label
                          style={{ fontFamily: "Roboto ", color: "#16355d" }}
                        >
                          <input
                            style={{ marginRight: "5px", padding: "2px" }}
                            name="role"
                            type="checkbox"
                            checked={selectedOption === "manager"}
                            value={postData.role}
                            onChange={() => handleCheckboxChange("manager")}
                          />
                          Manager
                        </label>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ alignItems: "center" }}>
                          {selectedOption === "employee" ? (
                            <BadgeIcon
                              fontSize="small"
                              style={{ color: "#16355c" }}
                            />
                          ) : (
                            <BadgeOutlinedIcon fontSize="10px" />
                          )}
                        </div>

                        <label
                          style={{ fontFamily: "Roboto ", color: "#16355d" }}
                        >
                          <input
                            style={{ marginRight: "5px", padding: "2px" }}
                            name="role"
                            type="checkbox"
                            value={postData.role}
                            checked={selectedOption === "employee"}
                            onChange={() => handleCheckboxChange("employee")}
                          />
                          Employee
                        </label>
                      </div>
                    </Grid>
                    <Typography
                      sx={{
                        margin: "30px 0px 0px 0px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                      }}
                    >
                      Role
                    </Typography>

                    <TextField
                      type="text"
                      name="role"
                      variant="outlined"
                      required
                      label="Role"
                      sx={{ marginTop: "10px" }}
                      value={postData.role}
                      disabled={true}
                      onChange={(e) =>
                        setPostData({ ...postData, role: e.target.value })
                      }
                    />
                  </>
                )}
              </div>

              <div sx={{ display: "flex", flexDirection: "row" }}>
                <Typography
                  sx={{
                    margin: "30px 0px 0px 0px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    fontFamily: "Roboto",
                  }}
                >
                  Full Name
                </Typography>

                <TextField
                  type="text"
                  name="firstName"
                  variant="outlined"
                  required
                  disabled={true}
                  label="First Name"
                  sx={{ margin: "20px" }}
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
                  disabled={true}
                  label="Last Name"
                  sx={{ margin: "20px" }}
                  value={postData.lastName}
                  onChange={(e) =>
                    setPostData({ ...postData, lastName: e.target.value })
                  }
                />

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Grid sx={{ marginTop: "40px" }}>
                    <FileBase
                      type="file"
                      multiple={false}
                      fileName="Profile.png"
                      onDone={({ base64 }) =>
                        setPostData({ ...postData, selectedFile: base64 })
                      }
                    />
                  </Grid>

                  <div
                    style={{
                      width: "150px",
                      height: "100px",
                      marginTop: "40px",
                    }}
                  >
                    <img
                      style={{ width: "150px", height: "100px" }}
                      src={postData.selectedFile}
                      alt="Profile_Picture"
                    />
                  </div>
                </div>

                <div style={{ marginTop: "30px", display: "flex" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Date of Birth"
                        slotProps={{
                          textField: {
                            error: false,
                          },
                        }}
                        value={dob}
                        selected={dob}
                        required
                        halfwidth="true"
                        dateFormat="dd.MM.yyyy"
                        onChange={handleDOB}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <div style={{ marginTop: "30px", marginLeft: "30px" }}>
                    <Typography
                      variant="standard"
                      sx={{ fontFamily: "Robota", fontSize: "18px" }}
                    >
                      {postData.dob}
                    </Typography>
                  </div>
                </div>

                <div>
                  <FormControl>
                    <Typography
                      sx={{
                        margin: "30px 0px 0px 0px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        fontFamily: "Roboto",
                      }}
                    >
                      Gender :
                    </Typography>

                    <RadioGroup
                      // defaultValue="female"
                      name="controlled-radio-buttons-group"
                      value={postData.gender}
                      onChange={(e) =>
                        setPostData(
                          { ...postData, gender: e.target.value },
                          console.log(e.target.value)
                        )
                      }
                    >
                      <Radio value="female" label="Female" color="primary" />
                      <Radio value="male" label="Male" color="primary" />
                      {/* <Radio value="other" label="Other" color="primary" /> */}
                    </RadioGroup>
                    <span style={{ fontSize: "12px", fontFamily: "Roboto" }}>
                      ** Please select the desired value
                    </span>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    sx={{ marginTop: "30px" }}
                    variant="outlined"
                    required
                    fullWidth
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="example@example.com"
                    disabled={true}
                    value={postData.email}
                    onChange={(e) =>
                      setPostData({ ...postData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <select
                    style={{
                      width: "300px",
                      height: "50px",
                      fontSize: "16px",
                      marginTop: "30px",
                    }}
                    name="maritalStatus"
                    value={postData.maritalStatus}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        maritalStatus: e.target.value,
                      })
                    }
                  >
                    <option value="">Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </select>
                  {/* )} */}
                </div>

                <div>
                  <TextField
                    sx={{ marginTop: "30px" }}
                    variant="outlined"
                    required
                    fullwidth="true"
                    label="Contact Number"
                    name="contactNumber"
                    value={postData.contactNumber}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        contactNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Typography
                    sx={{
                      margin: "30px 0px 0px 0px",
                      fontSize: "18px",
                      fontWeight: "bold",
                      fontFamily: "Roboto",
                    }}
                  >
                    Address :
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
                      setPostData({
                        ...postData,
                        streetAddress: e.target.value,
                      })
                    }
                  />
                </div>

                <Grid sx={{ display: "flex", justifyContent: "space-between", padding: '2px' }}>
                  <div style={{padding: '2px' }}>
                    <TextField
                      sx={{ marginTop: "10px" }}
                      variant="outlined"
                      required
                      label="City"
                      name="city"
                      value={postData.city}
                      onChange={(e) =>
                        setPostData({ ...postData, city: e.target.value })
                      }
                    />
                  </div>
                  <div style={{padding: '2px' }}>
                    <TextField
                      sx={{ marginTop: "10px" }}
                      variant="outlined"
                      required
                      label="State"
                      name="state"
                      value={postData.state}
                      onChange={(e) =>
                        setPostData({ ...postData, state: e.target.value })
                      }
                    />
                  </div>

                  <div style={{padding: '2px' }}>
                    <TextField
                      sx={{ marginTop: "10px" }}
                      variant="outlined"
                      required
                      label="Pincode"
                      name="pincode"
                      value={postData.pincode}
                      onChange={(e) =>
                        setPostData({ ...postData, pincode: e.target.value })
                      }
                    />
                  </div>
                </Grid>

                <Divider
                  sx={{
                    margin: "20px 0px 20px 0px",
                    borderWidth: "7px",
                    bgcolor: "#e55d17",
                  }}
                />
                <h4 style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                  Job Informations :
                </h4>
                <div sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Skills"
                    name="jobSkills"
                    value={postData.jobSkills}
                    onChange={(e) =>
                      setPostData({ ...postData, jobSkills: e.target.value })
                    }
                  />
                </div>
                <div>
                  <TextField
                    sx={{ marginTop: "10px" }}
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
                  <TextField
                    sx={{ marginTop: "10px" }}
                    variant="outlined"
                    required
                    fullWidth
                    label="Reporting Manager"
                    name="ReportingManager"
                    value={postData.reportingManager}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        reportingManager: e.target.value,
                      })
                    }
                  />
                </div>

                <Divider
                  sx={{
                    margin: "20px 0px 20px 0px",
                    borderWidth: "7px",
                    bgcolor: "#e55d17",
                  }}
                />
                <h4 style={{ fontFamily: "Roboto", fontWeight: "bold" }}>
                  Emergency Contact Informations :
                </h4>
                <div sx={{ display: "flex", flexDirection: "row" }}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="Name"
                    name="emergencyName"
                    value={postData.emergencyName}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        emergencyName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <TextField
                    sx={{ marginTop: "10px" }}
                    variant="outlined"
                    required
                    fullWidth
                    label="Address"
                    name="emergencyAddress"
                    value={postData.emergencyAddress}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        emergencyAddress: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <TextField
                    sx={{ marginTop: "10px" }}
                    variant="outlined"
                    required
                    fullWidth
                    label="Contact Number"
                    name="emergencyContact"
                    value={postData.emergencyContact}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        emergencyContact: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
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
                  <button
                    sx={{ fontFamily: "Roboto" }}
                    type="submit"
                    variant="contained"
                    required
                    fullWidth
                  >
                    Register
                  </button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        )}
      </Card>
    </Container>
  );
};

export default RegistrationForm;
// Make Textfield non editable after clicking submit button in the first time & dispatch it to the server
