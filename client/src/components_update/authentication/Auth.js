import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../action/auth";
import { useDispatch } from "react-redux";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import image from "../images/ship1.jpg";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const handleCheckBox = () => {
  console.log("Admin is clicked");
};

const Auth = () => {
  const [isSignUp, setisSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    // <Box
    //   container
    //   component="main"
    //   sx={{
    //     backgroundImage: `url(${image})`,
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
    //   }}
    // >
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
      <Card
        elevation={10}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          textAlign: "center",
          padding: "5px",
          marginTop: "50px",
        }}
      >
        {" "}
        <Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "primary",
              marginTop: "10px",
            }}
          >
            <Avatar color="primary">
              <AccountCircleIcon />
            </Avatar>
          </div>

          <h1>{isSignUp ? "Register" : "Login"}</h1>
          <Typography color="#0B7882">Welcome to Ashkam 👋 </Typography>
          <label>
            <b>{isSignUp ? " " : "Please Sign In to your account"}</b>
          </label>

          <form autoComplete="true" onSubmit={handleSubmit}>
            {isSignUp && (
              <div style={{ display: "flex" }}>
                <FormGroup
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginLeft: "40px",
                    float: "inherit",
                  }}
                  onChange={handleCheckBox}
                >
                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="Admin"
                  />
                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="Manager"
                  />
                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="Employee"
                  />
                </FormGroup>
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
              <TextField
                sx={{ marginTop: "10px" }}
                name="password"
                type="password"
                variant="outlined"
                required
                fullWidth
                autoComplete="on"
                label="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              {isSignUp && (
                <TextField
                  sx={{ marginTop: "10px" }}
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                  label="Confirm Password"
                  autoComplete="on"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              )}
            </div>

            <Button
              variant="contained"
              required
              fullWidth
              type="submit"
              sx={{ marginTop: "10px" }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>

            <Button onClick={switchMode}>
              {isSignUp
                ? "Already have an account? Login!"
                : "Don't have an account ? Register here!"}
            </Button>
          </form>
        </Grid>
      </Card>
    </Grid>
    // </Box>
  );
};

export default Auth;
