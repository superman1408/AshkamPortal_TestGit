import React, { useState, useEffect, useRef } from "react";

import {
  Divider,
  Grid,
  Card,
  TextField,
  Typography,
  Container,
  CircularProgress,
  Button,
} from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import FormControl from "@mui/joy/FormControl";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import FileBase from "react-file-base64";
import Panel from "../Panel/Panel";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, updatePost } from "../../action/posts";
import { useNavigate, useParams } from "react-router-dom";
import ComboBox from "../ComboBox/ComboBox";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "react-select";
import customSelectStyles from "./selectStyles";

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
  };

  const { id } = useParams();
  // console.log("id in registration page", id);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (id) {
  //     setCurrentId(id);
  //   }
  // }, [id]);

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, isLoading]);

  // useEffect(() => {
  //   if (!currentId) return setCurrentId(id);
  //   posts.map((items) => {
  //     for (let index = 0; index < items; index++) {
  //       if (items._id === currentId) {
  //         setPostData(() => ({
  //           ...postData,
  //           firstName: items.firstName,
  //           lastName: items.lastName,
  //           role: items.role,
  //           dob: items.dob,
  //           gender: items.gender,
  //           email: items.email,
  //           maritalStatus: items.maritalStatus,
  //           contactNumber: items.contactNumber,
  //           streetAddress: items.streetAddress,
  //           city: items.city,
  //           state: items.state,
  //           pincode: items.pincode,
  //           jobSkills: items.jobSkills,
  //           jobTitle: items.jobTitle,
  //           employeeId: items.employeeId,
  //           department: items.department,
  //           reportingManager: items.reportingManager,
  //           emergencyName: items.emergencyName,
  //           emergencyAddress: items.emergencyAddress,
  //           emergencyContact: items.emergencyContact,
  //           relationship: items.relationship,
  //           selectedFile: items.selectedFile,
  //         }));
  //         setSelectedOption(items.role);
  //         break;
  //       }
  //     }
  //   });

  //   setIsLoading(false);
  // }, [currentId, posts, isLoading, id, postData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, postData));
      setUser(null);
      alert(
        "✅ Registration successful. Please log out and sign in again to see changes."
      );

      navigate(`/home`, { replace: true });
      // navigate("/home");
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

  const handleGoBack = () => {
    navigate(-1); // this means "go back one step in history"
  };

  const maritalOptions = [
    { value: "Single", label: "Single" },
    { value: "Married", label: "Married" },
  ];

  const options = [
    { value: "Business Development", label: "Business Development" },
    { value: "Civil & Structural", label: "Civil & Structural" },
    { value: "Design", label: "Design" },
    { value: "Finanace", label: "Finanace" },
    { value: "Human Resource", label: "Human Resource" },
    { value: "Information Technology", label: "Information Technology" },
    {
      value: "Naval Architecture & Marine",
      label: "Naval Architecture & Marine",
    },
    { value: "Projects", label: "Projects" },
  ];

  return (
    <>
      <div style={{ display: "inline" }}>
        <Button
          onClick={handleGoBack}
          sx={{
            padding: "8px 16px",
            color: "#16355d",
            display: {
              xs: "none",
              sm: "inline-block",
            },
          }}
        >
          <ArrowBackIcon />
        </Button>
      </div>
      <div style={{ display: "flex" }}>
        <Panel prop={user.result} />

        <Container
          fluid="true"
          ref={componentRef}
          maxwidth="true"
          sx={{
            display: "flex",
            // justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Card elevation={24} sx={{ width: "800px", height: "100%" }}>
            {isLoading ? (
              <div style={{ marginLeft: "350px" }}>
                <CircularProgress />
                Loading...
              </div>
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
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
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
                              style={{
                                fontFamily: "Roboto ",
                                color: "#16355d",
                              }}
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

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
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
                              style={{
                                fontFamily: "Roboto ",
                                color: "#16355d",
                              }}
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

                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
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
                              style={{
                                fontFamily: "Roboto ",
                                color: "#16355d",
                              }}
                            >
                              <input
                                style={{ marginRight: "5px", padding: "2px" }}
                                name="role"
                                type="checkbox"
                                value={postData.role}
                                checked={selectedOption === "employee"}
                                onChange={() =>
                                  handleCheckboxChange("employee")
                                }
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
                          Role :
                        </Typography>

                        <TextField
                          type="text"
                          name="role"
                          variant="outlined"
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
                      Full Name:
                    </Typography>

                    <TextField
                      type="text"
                      name="firstName"
                      variant="outlined"
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
                      disabled={true}
                      label="Last Name"
                      sx={{ margin: "20px" }}
                      value={postData.lastName}
                      onChange={(e) =>
                        setPostData({ ...postData, lastName: e.target.value })
                      }
                    />

                    <Grid
                      sx={{
                        display: "flex",
                        "@media (max-width: 600px)": {
                          flexDirection: "column",
                        },
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid sx={{ marginTop: "20px" }}>
                        <Typography
                          sx={{
                            margin: "30px 0px 10px 0px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            fontFamily: "Roboto",
                          }}
                        >
                          Profile Picture :
                        </Typography>
                        <FileBase
                          type="file"
                          multiple={false}
                          fileName="Profile.png"
                          onDone={({ base64 }) =>
                            setPostData({ ...postData, selectedFile: base64 })
                          }
                        />
                      </Grid>

                      <Grid
                        sx={{
                          width: "150px",
                          height: "100px",
                          marginTop: "40px",
                        }}
                      >
                        <img
                          onContextMenu={(e) => e.preventDefault()}
                          style={{
                            width: "150px",
                            height: "100px",
                            userSelect: "none",
                            webkitTouchCallout: "none",
                            webkitUserSelect: "none",
                            mozUserSelect: "none",
                            msUserSelect: "none",
                          }}
                          src={postData.selectedFile}
                          alt="Profile_Picture"
                        />
                      </Grid>
                    </Grid>

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
                          <Radio
                            value="female"
                            label="Female"
                            color="primary"
                          />
                          <Radio value="male" label="Male" color="primary" />
                          {/* <Radio value="other" label="Other" color="primary" /> */}
                        </RadioGroup>
                        <span
                          style={{ fontSize: "12px", fontFamily: "Roboto" }}
                        >
                          ** Please select the desired value
                        </span>
                      </FormControl>
                    </div>
                    <div>
                      <TextField
                        sx={{ marginTop: "30px" }}
                        variant="outlined"
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
                    <div style={{ marginTop: "10px", padding: "3px" }}>
                      {/* <select
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
                      </select> */}
                      {/* )} */}

                      <Select
                        placeholder="Select Marital Status..."
                        name="maritalStatus"
                        value={maritalOptions.find(
                          (opt) => opt.value === postData.maritalStatus
                        )}
                        options={maritalOptions}
                        onChange={(selectedOption) =>
                          setPostData({
                            ...postData,
                            maritalStatus: selectedOption.value,
                          })
                        }
                        styles={{
                          ...customSelectStyles,
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#fff",
                            zIndex: 1000,
                            overflow: "hidden",
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected
                              ? "#0d325c"
                              : state.isFocused
                              ? "#f3f4f6"
                              : "#fff",
                            color: state.isSelected ? "#fff" : "#000",
                            fontWeight: state.isSelected ? 600 : 400,
                            borderBottom: "1px solid #f0f0f0",
                          }),
                        }}
                      />
                    </div>

                    <div>
                      <TextField
                        sx={{ marginTop: "10px" }}
                        variant="outlined"
                        fullWidth
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

                    <Grid
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "2px",
                      }}
                    >
                      <div style={{ padding: "2px" }}>
                        <TextField
                          sx={{ marginTop: "10px" }}
                          variant="outlined"
                          label="City"
                          name="city"
                          value={postData.city}
                          onChange={(e) =>
                            setPostData({ ...postData, city: e.target.value })
                          }
                        />
                      </div>
                      <div style={{ padding: "2px" }}>
                        <TextField
                          sx={{ marginTop: "10px" }}
                          variant="outlined"
                          label="State"
                          name="state"
                          value={postData.state}
                          onChange={(e) =>
                            setPostData({ ...postData, state: e.target.value })
                          }
                        />
                      </div>

                      <div style={{ padding: "2px" }}>
                        <TextField
                          sx={{ marginTop: "10px" }}
                          variant="outlined"
                          label="Pincode"
                          name="pincode"
                          value={postData.pincode}
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              pincode: e.target.value,
                            })
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
                        fullWidth
                        label="Skills"
                        name="jobSkills"
                        value={postData.jobSkills}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            jobSkills: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <TextField
                        sx={{ marginTop: "10px" }}
                        variant="outlined"
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
                        fullWidth
                        label="Employee Id"
                        name="employeeId"
                        value={postData.employeeId}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            employeeId: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div style={{ marginTop: "10px", padding: "3px" }}>
                      {/* <TextField
                        sx={{ marginTop: "10px" }}
                        variant="outlined"
                        fullWidth
                        label="Department"
                        name="department"
                        value={postData.department}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            department: e.target.value,
                          })
                        }
                      /> */}

                      <Select
                        placeholder="Select Department..."
                        name="department"
                        value={options.find(
                          (opt) => opt.value === postData.department
                        )}
                        options={options}
                        onChange={(selectedOption) =>
                          setPostData({
                            ...postData,
                            department: selectedOption.value,
                          })
                        }
                        styles={{
                          ...customSelectStyles,
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#fff",
                            zIndex: 1000,
                            overflow: "hidden",
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected
                              ? "#0d325c"
                              : state.isFocused
                              ? "#f3f4f6"
                              : "#fff",
                            color: state.isSelected ? "#fff" : "#000",
                            fontWeight: state.isSelected ? 600 : 400,
                            borderBottom: "1px solid #f0f0f0",
                          }),
                        }}
                      />
                    </div>
                    <div>
                      <TextField
                        sx={{ marginTop: "10px" }}
                        variant="outlined"
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
                        fullWidth
                        label="Relationship"
                        name="relationship"
                        value={postData.relationship}
                        onChange={(e) =>
                          setPostData({
                            ...postData,
                            relationship: e.target.value,
                          })
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
      </div>
    </>
  );
};

export default RegistrationForm;
// Make Textfield non editable after clicking submit button in the first time & dispatch it to the server
