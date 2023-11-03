import React, { useState } from "react";
import { Button, Grid, TextField, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../action/auth";
import { useDispatch } from "react-redux";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import image from "../../assets/ProfileShipImage.png";
import "./style.css";
import { ToastContainer } from "react-toastify";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

const Auth = () => {
  const [isSignUp, setisSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }

    console.log(formData);
  };

  const switchMode = () => {
    setisSignUp((prevState) => !prevState);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (option, event) => {
    setSelectedOption(option);
    console.log(option);
    setFormData({
      ...formData,
      role: option,
    });
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Card className="card" elevation={10} sx={{ width: "60vh" }}>
        <Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "primary",
              marginTop: "10px",
            }}
          >
            <AccountCircleIcon fontSize="large" color="primary" />
          </div>

          <h2 style={{ fontFamily: "Abril Fatface", fontWeight: "bold" }}>
            {isSignUp ? "Register" : "Login"}
          </h2>
          {/* <Typography color="#0B7882">Welcome to Ashkam 👋 </Typography> */}

          <form autoComplete="true" onSubmit={handleSubmit}>
            {isSignUp && (
              <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ alignItems: "center" }}>
                    {selectedOption === "admin" ? (
                      <AdminPanelSettingsIcon
                        fontSize="small"
                        style={{ color: "#17325C" }}
                      />
                    ) : (
                      <AdminPanelSettingsOutlinedIcon fontSize="10px" />
                    )}
                  </div>

                  <label>
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
                        style={{ color: "#17325C" }}
                      />
                    ) : (
                      <ManageAccountsOutlinedIcon fontSize="10px" />
                    )}
                  </div>

                  <label>
                    <input
                      style={{ marginRight: "5px", padding: "2px" }}
                      name="role"
                      type="checkbox"
                      checked={selectedOption === "manager"}
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
                        style={{ color: "#17325C" }}
                      />
                    ) : (
                      <BadgeOutlinedIcon fontSize="10px" />
                    )}
                  </div>

                  <label>
                    <input
                      style={{ marginRight: "5px", padding: "2px" }}
                      name="role"
                      type="checkbox"
                      checked={selectedOption === "employee"}
                      onChange={() => handleCheckboxChange("employee")}
                    />
                    Employee
                  </label>
                </div>
              </div>
            )}

            <div style={{ marginTop: "30px", display: "flex" }}>
              {isSignUp && (
                <TextField
                  label="First Name"
                  name="firstName"
                  variant="outlined"
                  onChange={(event) =>
                    setFormData({ ...formData, firstName: event.target.value })
                  }
                />
              )}
              {isSignUp && (
                <TextField
                  sx={{ marginLeft: "10px" }}
                  label="Last Name"
                  name="lastName"
                  variant="outlined"
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      lastName: event.target.value,
                    })
                  }
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <TextField
                name="email"
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <FormControl
                sx={{ marginTop: "10px" }}
                variant="outlined"
                name="password"
                type="password"
                autoComplete="on"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>

              {isSignUp && (
                <FormControl
                  sx={{ marginTop: "10px" }}
                  variant="outlined"
                  name="confirmPassword"
                  type="confirmPassword"
                  autoComplete="on"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                >
                  <InputLabel htmlFor="outlined-adornment-confirmPassword">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                  />
                </FormControl>

                // <TextField
                //   sx={{ marginTop: "10px" }}
                //   name="confirmPassword"
                //   type="password"
                //   variant="outlined"
                //   required
                //   fullWidth
                //   label="Confirm Password"
                //   autoComplete="on"
                //   onChange={(e) =>
                //     setFormData({
                //       ...formData,
                //       confirmPassword: e.target.value,
                //     })
                //   }
                // />
              )}
            </div>
            <div>
              <Button
                variant="contained"
                required
                fullWidth
                type="submit"
                sx={{ marginTop: "10px" }}
              >
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
              {isSignUp ? <ToastContainer /> : <ToastContainer />}
              {/* this is required for rendering taost it works as a container*/}
            </div>
            <div>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "  Already have an account? Login here!  "
                  : "Don't have an account ? Register here!"}
              </Button>
            </div>
          </form>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Auth;
