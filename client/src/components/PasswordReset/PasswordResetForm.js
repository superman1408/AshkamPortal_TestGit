// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { resetPassword } from "../../action/auth";

// import { Card, Grid } from "@mui/material";

// const PasswordResetForm = () => {
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");
//   const dispatch = useDispatch();
//   const [code, setCode] = useState(null);
//   const [passwordForm, setPasswordForm] = useState({
//     emailToChange: "",
//     passwordtoChange: "",
//     confirmPasswordToCompare: "",
//   });

//   const handleReset = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(resetPassword(passwordForm, code, navigate))
//         .then(() => {
//           setMessage("Password Changed, Please Login with new password...!!!");
//         })
//         .catch((err) => {
//           console.log("Error : ", err);
//         });
//     } catch (error) {
//       // setMessage(error.response.data.error);
//       setMessage("Error Occur, Please try Later...!!!");
//     }
//   };

//   return (
//     <Grid
//       padding="10px"
//       container
//       spacing={0}
//       direction="column"
//       alignItems="center"
//       justifyContent="center"
//     >
//       <Card
//         elevation={10}
//         sx={{
//           justifyContent: "center",
//           padding: "20px",
//           backgroundColor: "#f2f2f2",
//           borderCollapse: "collapse",
//           marginBottom: "130px",
//           // border: "1px solid black",
//         }}
//       >
//         <h3
//           style={{
//             textAlign: "center",
//             fontFamily: "Roboto ",
//             color: "#0d325c",
//           }}
//         >
//           Password Reset
//         </h3>
//         <form onSubmit={handleReset}>
//           <Grid
//             sx={{
//               flexDirection: "column",
//               paddingLeft: "50px",
//               justifyContent: "center",
//             }}
//           >
//             <Grid sx={{ padding: "10px", alignItems: "center" }}>
//               <input
//                 type="password"
//                 label="Secret Code"
//                 placeholder="Secret Code"
//                 name="secretCode"
//                 variant="outlined"
//                 onChange={(event) => setCode(event.target.value)}
//               />
//             </Grid>
//             <Grid sx={{ padding: "10px" }}>
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={passwordForm.emailToChange}
//                 onChange={(e) =>
//                   setPasswordForm({
//                     ...passwordForm,
//                     emailToChange: e.target.value,
//                   })
//                 }
//               />
//             </Grid>
//             <Grid sx={{ padding: "10px" }}>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={passwordForm.passwordtoChange}
//                 onChange={(e) =>
//                   setPasswordForm({
//                     ...passwordForm,
//                     passwordtoChange: e.target.value,
//                   })
//                 }
//               />
//             </Grid>
//             <Grid sx={{ padding: "10px" }}>
//               <input
//                 type="password"
//                 placeholder="Confirm Password"
//                 value={passwordForm.confirmPasswordToCompare}
//                 onChange={(e) =>
//                   setPasswordForm({
//                     ...passwordForm,
//                     confirmPasswordToCompare: e.target.value,
//                   })
//                 }
//               />
//             </Grid>
//           </Grid>
//           <Grid sx={{ justifyContent: "space-between" }}>
//             <button style={{ fontFamily: "Roboto " }} type="submit">
//               Reset Password
//             </button>
//             <button
//               onClick={() => {
//                 navigate("/auth", { replace: true });
//               }}
//               style={{ fontFamily: "Roboto " }}
//             >
//               Back To Login Page
//             </button>
//           </Grid>
//         </form>
//         <p>{message}</p>
//       </Card>
//     </Grid>
//   );
// };

// export default PasswordResetForm;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../action/auth";

import {
  Card,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordResetForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          setMessage("Password changed. Please log in with your new password.");
          setIsSuccess(true);
        })
        .catch((err) => {
          console.error("Error : ", err);
          setMessage("Something went wrong. Please try again.");
          setIsSuccess(false);
        });
    } catch (error) {
      setMessage("Error occurred. Please try later.");
      setIsSuccess(false);
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ebf0f5, #f9fafb)",
        p: 2,
      }}
    >
      <Card
        elevation={6}
        sx={{
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          width: { xs: "100%", sm: "450px" },
          backgroundColor: "#fff",
        }}
      >
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            sx={{ mb: 1 }}
          >
            Reset Your Password
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Enter your details to create a new password.
          </Typography>
        </Box>

        <form onSubmit={handleReset}>
          <Stack spacing={2}>
            <TextField
              label="Verification Code"
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Email"
              type="email"
              value={passwordForm.emailToChange}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  emailToChange: e.target.value,
                })
              }
              fullWidth
              required
            />

            <TextField
              label="New Password"
              type={showPassword ? "text" : "password"}
              value={passwordForm.passwordtoChange}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  passwordtoChange: e.target.value,
                })
              }
              fullWidth
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              value={passwordForm.confirmPasswordToCompare}
              onChange={(e) =>
                setPasswordForm({
                  ...passwordForm,
                  confirmPasswordToCompare: e.target.value,
                })
              }
              fullWidth
              required
              error={
                passwordForm.confirmPasswordToCompare.length > 0 &&
                passwordForm.confirmPasswordToCompare !==
                  passwordForm.passwordtoChange
              }
              helperText={
                passwordForm.confirmPasswordToCompare.length > 0 &&
                passwordForm.confirmPasswordToCompare !==
                  passwordForm.passwordtoChange
                  ? "Passwords do not match"
                  : ""
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.2, borderRadius: 2 }}
            >
              Reset Password
            </Button>

            <Button
              variant="text"
              onClick={() => navigate("/auth", { replace: true })}
              fullWidth
              sx={{ textTransform: "none" }}
            >
              Back to Login
            </Button>
          </Stack>
        </form>

        {message && (
          <Alert
            severity={isSuccess ? "success" : "error"}
            sx={{ mt: 3, borderRadius: 2 }}
          >
            {message}
          </Alert>
        )}
      </Card>
    </Grid>
  );
};

export default PasswordResetForm;
