import {
  Box,
  Grid,
  CardMedia,
  Paper,
  TextField,
  Button,
  Video,
} from "@mui/material";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { signin, signup } from "../../action/auth";
import { useDispatch } from "react-redux";

import login from "../../components/images/login.jpg";
import vid from "../images/Presentation.mp4";
import useStyles from "./style";
import ReactPlayer from "react-player";

// import login from "../../components/images/login.jpg";

const initialData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Authentication = () => {
  const classes = useStyles();
  const [isSignUp, setisSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialData);

  const switchMode = () => {
    setisSignUp((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const playerRef = useRef(null);

  return (
    <Box
      className={classes.mainContainer}
      container
      component="main"
      sx={{
        display: "flex",

        marginTop: "10px",
        padding: "10px",

        boxShadow: 5,
      }}
    >
      <Grid>
        {/* <CardMedia
          className={classes.cardMedia}
          component="img"
          src={login}
        ></CardMedia> */}
        <div className={classes.reactplayer}>
          <ReactPlayer
            width="100%"
            height="100%"
            ref={playerRef}
            url={vid}
            controls={true}
          />
        </div>
      </Grid>

      <Grid>
        <Paper className={classes.form}>
          <Grid className={classes.header}>
            <h1>{isSignUp ? "Register" : "Login"}</h1>
          </Grid>
          <form autoComplete="true" onSubmit={handleSubmit}>
            <Grid style={{ flexWrap: "wrap" }}>
              <Grid container>
                <Grid item xs={6} padding={1}>
                  {isSignUp && (
                    <TextField
                      name="firstName"
                      label="First Name"
                      variant="outlined"
                      required
                      fullWidth
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          firstName: event.target.value,
                        })
                      }
                    />
                  )}
                </Grid>
                <Grid item xs={6} paddingTop={1} paddingLeft={2}>
                  {isSignUp && (
                    <TextField
                      name="lastName"
                      label="Last Name"
                      variant="outlined"
                      required
                      fullWidth
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          lastName: event.target.value,
                        })
                      }
                    />
                  )}
                </Grid>
              </Grid>

              <Grid>
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  className={classes.container}
                  fullWidth
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Grid>

              <Grid>
                <TextField
                  label="Password"
                  name="password"
                  variant="outlined"
                  type="password"
                  className={classes.container}
                  fullWidth
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Grid>

              <Grid>
                {isSignUp && (
                  <TextField
                    name="confirmPassword"
                    label="confirm passward"
                    variant="outlined"
                    type="password"
                    className={classes.container}
                    fullWidth
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                )}
              </Grid>
              <Grid marginLeft={2}>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  required
                  fullWidth
                >
                  {isSignUp ? "Register" : "Login"}
                </Button>
              </Grid>

              <Grid marginLeft={2}>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Login!"
                    : "Don't have an account ? Register here!"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Authentication;
