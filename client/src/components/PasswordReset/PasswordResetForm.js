import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { resetPassword } from "../../action/auth";

import { Card, Grid } from "@mui/material";

const PasswordResetForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const [code, setCode] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    emailToChange: "",
    passwordtoChange: "",
    confirmPasswordToCompare: "",
  });

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      dispatch(resetPassword(passwordForm, code, navigate))
        .then(() => {
          setMessage("Password Changed, Please Login with new password...!!!");
        })
        .catch((err) => {
          console.log("Error : ", err);
        });
    } catch (error) {
      // setMessage(error.response.data.error);
      setMessage("Error Occur, Please try Later...!!!");
    }
  };

  return (
    <Grid
      padding="20px"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <Card
        elevation={10}
        sx={{
          padding: "20px",
          backgroundColor: "#f2f2f2",
          borderCollapse: "collapse",
          // border: "1px solid black",
        }}
      >
        <h3
          style={{
            marginLeft: "70px",
            fontFamily: "Roboto ",
            color: "#0d325c",
          }}
        >
          Password Reset
        </h3>
        <form onSubmit={handleReset}>
          <Grid
            sx={{
              flexDirection: "column",
              padding: "10px",
              marginLeft: "50px",
            }}
          >
            <Grid sx={{ padding: "10px" }}>
              <input
                label="Secret Code"
                placeholder="Code"
                name="secretCode"
                variant="outlined"
                onChange={(event) => setCode(event.target.value)}
              />
            </Grid>
            <Grid sx={{ padding: "10px" }}>
              <input
                type="email"
                placeholder="Email"
                value={passwordForm.emailToChange}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    emailToChange: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid sx={{ padding: "10px" }}>
              <input
                type="password"
                placeholder="Password"
                value={passwordForm.passwordtoChange}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    passwordtoChange: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid sx={{ padding: "10px" }}>
              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordForm.confirmPasswordToCompare}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPasswordToCompare: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid sx={{ justifyContent: "space-between" }}>
            <button style={{ fontFamily: "Roboto " }} type="submit">
              Reset Password
            </button>
            <button
              onClick={() => {
                navigate("/auth", { replace: true });
              }}
              style={{ fontFamily: "Roboto " }}
            >
              Back To Login Page
            </button>
          </Grid>
        </form>
        <p>{message}</p>
      </Card>
    </Grid>
  );
};

export default PasswordResetForm;
