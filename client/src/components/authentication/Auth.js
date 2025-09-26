// import React, { useState } from "react";
// import { Button, Grid, TextField, Card } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { signin, signup } from "../../action/auth";
// import { useDispatch } from "react-redux";

// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import image from "../../assets/LoginBackground.png";
// import "./style.css";
// import { ToastContainer } from "react-toastify";

// const initialData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   password: "",
//   confirmPassword: "",
//   role: "",
// };

// const Auth = () => {
//   const [isSignUp, setisSignUp] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [code, setCode] = useState(null);
//   const [error, setError] = useState(false);
//   const [touched, setTouched] = useState(false);

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

//   const [formData, setFormData] = useState(initialData);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSignUp) {
//       dispatch(signup(formData, code, navigate));
//       // console.log(code);
//     } else {
//       dispatch(signin(formData, navigate));
//     }
//   };

//   const switchMode = () => {
//     setisSignUp((prevState) => !prevState);
//     console.log();
//   };

//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleCheckboxChange = (option, event) => {
//     setSelectedOption(option);
//     console.log(option);
//     setFormData({
//       ...formData,
//       role: option,
//     });
//   };

//   const resetPassword = () => {
//     navigate("/auth/reset", { replace: true });
//   };

//   return (
//     <Grid
//       container
//       spacing={0}
//       direction="column"
//       alignItems="center"
//       justify="center"
//       style={{
//         minheight: "100%",
//         // backgroundImage: `url(${image})`,
//         backgroundColor: "#ebf0f5",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         padding: "20px",
//       }}
//     >
//       <Card
//         className="card"
//         elevation={10}
//         sx={{ display: "flex", padding: "10px" }}
//       >
//         <Grid>
//           <Grid
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               color: "primary",
//               marginTop: "2px",
//             }}
//           >
//             <AccountCircleIcon
//               fontSize="large"
//               color={isSignUp ? "primary" : "secondary"}
//             />
//           </Grid>

//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center", // optional: centers vertically too if needed
//             }}
//           >
//             <h4
//               style={{
//                 fontFamily: "Roboto",
//                 color: "#16355d",
//                 margin: 0, // optional, removes default margin
//               }}
//             >
//               {isSignUp ? "Sign Up" : "Sign In"}
//             </h4>
//           </div>
//           {/* <Typography color="#0B7882">Welcome to Ashkam 👋 </Typography> */}

//           <form autoComplete="on" onSubmit={handleSubmit}>
//             {isSignUp && (
//               <div style={{ display: "flex", justifyContent: "space-evenly" }}>
//                 <div style={{ display: "flex", flexDirection: "column" }}>
//                   <div style={{ alignItems: "center" }}>
//                     {selectedOption === "admin" ? (
//                       <AdminPanelSettingsIcon
//                         fontSize="small"
//                         style={{ color: "#e55d17" }}
//                       />
//                     ) : (
//                       <AdminPanelSettingsOutlinedIcon fontSize="10px" />
//                     )}
//                   </div>

//                   <label style={{ fontFamily: "Roboto ", color: "#16355d" }}>
//                     <input
//                       style={{ marginRight: "5px", padding: "2px" }}
//                       name="role"
//                       type="checkbox"
//                       checked={selectedOption === "admin"}
//                       onChange={() => handleCheckboxChange("admin")}
//                     />
//                     Admin
//                   </label>
//                 </div>

//                 <div>
//                   {formData.role === "admin" && (
//                     // eslint-disable-next-line
//                     <TextField
//                       type="password"
//                       label="Secret Code"
//                       name="secretCode"
//                       variant="outlined"
//                       onChange={(event) => setCode(event.target.value)}
//                     />
//                   )}
//                 </div>
//               </div>
//             )}

//             <div style={{ marginTop: "30px", display: "flex" }}>
//               {isSignUp && (
//                 <TextField
//                   label="First Name"
//                   name="firstName"
//                   variant="outlined"
//                   onChange={(event) =>
//                     setFormData({ ...formData, firstName: event.target.value })
//                   }
//                 />
//               )}
//               {isSignUp && (
//                 <TextField
//                   sx={{ marginLeft: "10px" }}
//                   label="Last Name"
//                   name="lastName"
//                   variant="outlined"
//                   onChange={(event) =>
//                     setFormData({
//                       ...formData,
//                       lastName: event.target.value,
//                     })
//                   }
//                 />
//               )}
//             </div>
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 marginTop: "10px",
//               }}
//             >
//               <TextField
//                 name="email"
//                 variant="outlined"
//                 required
//                 fullWidth
//                 label="Email Address"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />

//               <FormControl
//                 sx={{ marginTop: "10px" }}
//                 variant="outlined"
//                 name="password"
//                 type="password"
//                 autoComplete="current-password"
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//               >
//                 <InputLabel htmlFor="outlined-adornment-password">
//                   Password
//                 </InputLabel>
//                 <OutlinedInput
//                   type={showPassword ? "text" : "password"}
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton
//                         aria-label="toggle password visibility"
//                         onClick={handleClickShowPassword}
//                         onMouseDown={handleMouseDownPassword}
//                         edge="end"
//                       >
//                         {showPassword ? <Visibility /> : <VisibilityOff />}
//                       </IconButton>
//                     </InputAdornment>
//                   }
//                   label="Password"
//                 />
//               </FormControl>

//               {isSignUp && (
//                 <FormControl
//                   sx={{ marginTop: "10px" }}
//                   variant="outlined"
//                   required
//                   fullWidth
//                   error={
//                     touched && formData.confirmPassword !== formData.password
//                   } // Show red border
//                 >
//                   <InputLabel htmlFor="outlined-adornment-confirmPassword">
//                     Confirm Password
//                   </InputLabel>
//                   <OutlinedInput
//                     id="outlined-adornment-confirmPassword"
//                     type={showPassword ? "text" : "password"}
//                     value={formData.confirmPassword}
//                     onChange={(e) => {
//                       setTouched(true);
//                       setFormData({
//                         ...formData,
//                         confirmPassword: e.target.value,
//                       });
//                     }}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           edge="end"
//                         >
//                           {showPassword ? <Visibility /> : <VisibilityOff />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     label="Confirm Password"
//                   />
//                   {/* Show message only if user has touched the field and it doesn't match */}
//                   {touched &&
//                     formData.confirmPassword !== formData.password && (
//                       <p
//                         style={{
//                           color: "red",
//                           fontSize: "12px",
//                           margin: "5px 14px 0",
//                         }}
//                       >
//                         Passwords do not match
//                       </p>
//                     )}
//                 </FormControl>
//               )}
//             </div>
//             <div>
//               <Button
//                 variant="contained"
//                 required
//                 color={isSignUp ? "primary" : "secondary"}
//                 fullWidth
//                 type="submit"
//                 sx={{ marginTop: "10px", fontFamily: "Roboto" }}
//               >
//                 {isSignUp ? "Sign Up" : "Sign In"}
//               </Button>
//               {isSignUp ? <ToastContainer /> : <ToastContainer />}
//               {/* this is required for rendering taost it works as a container*/}
//             </div>
//             <div>
//               <Button
//                 style={{
//                   fontFamily: "Roboto ",
//                   color: "#16355d",
//                   textAlign: "center",
//                   width: "100%",
//                 }}
//                 onClick={resetPassword}
//               >
//                 Reset The Password
//               </Button>
//             </div>
//             <div>
//               <Button
//                 style={{
//                   fontFamily: "Roboto ",
//                   color: "#16355d",
//                   textAlign: "center",
//                   width: "100%",
//                 }}
//                 onClick={switchMode}
//               >
//                 {isSignUp
//                   ? "  Already have an account? Login here!  "
//                   : "Don't have an account ? Register here!"}
//               </Button>
//             </div>
//           </form>
//         </Grid>
//       </Card>
//     </Grid>
//   );
// };

// export default Auth;

import React, { useState } from "react";
import {
  Button,
  Grid,
  TextField,
  Card,
  Box,
  Typography,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../action/auth";
import { useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import { ToastContainer } from "react-toastify";
import image from "../../assets/LoginBackground.png";
import "./style.css";

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
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState(null);
  const [touched, setTouched] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, code, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const switchMode = () => setisSignUp((prev) => !prev);

  const resetPassword = () => navigate("/auth/reset", { replace: true });

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#ebf0f5,#f9fafb)",
        alignItems: "center",
        justifyContent: "center",
        height: "full",
        // p: 2,
      }}
    >
      <Card
        elevation={6}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          width: { xs: "100%", sm: "80%", md: "65%" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Left illustration */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "none", md: "block" },
          }}
        />

        {/* Right form section */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, sm: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box textAlign="center" mb={3}>
            <AccountCircle
              fontSize="large"
              color={isSignUp ? "primary" : "secondary"}
            />
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              sx={{ mt: 1 }}
            >
              {isSignUp ? "Create Account" : "Welcome Back"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {isSignUp
                ? "Sign up to manage your workplace effortlessly."
                : "Sign in to continue your journey."}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <Box my={2} textAlign="center">
                  <ToggleButtonGroup
                    value={formData.role}
                    exclusive
                    onChange={(e, newRole) =>
                      setFormData({ ...formData, role: newRole })
                    }
                  >
                    <ToggleButton value="admin">
                      <AdminPanelSettings sx={{ mr: 1 }} /> Admin
                    </ToggleButton>
                    <ToggleButton value="user">User</ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                {formData.role === "admin" && (
                  <TextField
                    type="password"
                    label="Secret Code"
                    fullWidth
                    onChange={(e) => setCode(e.target.value)}
                    sx={{ mt: 2, mb: 2 }}
                  />
                )}

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>
              </>
            )}

            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              required
              sx={{ mt: 2 }}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
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
                fullWidth
                variant="outlined"
                sx={{ mt: 2 }}
                error={
                  touched && formData.confirmPassword !== formData.password
                }
              >
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setTouched(true);
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    });
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
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
                {touched && formData.confirmPassword !== formData.password && (
                  <Typography
                    variant="caption"
                    color="error"
                    sx={{ mt: 0.5, ml: 1 }}
                  >
                    Passwords do not match
                  </Typography>
                )}
              </FormControl>
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ mt: 3, py: 1.3, borderRadius: 2 }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>

            <ToastContainer />

            <Button
              onClick={resetPassword}
              sx={{
                mt: 2,
                textTransform: "none",
                fontSize: "0.9rem",
              }}
              fullWidth
            >
              Forgot password?
            </Button>

            <Button
              onClick={switchMode}
              sx={{
                textTransform: "none",
                fontSize: "0.9rem",
                color: "text.secondary",
              }}
              fullWidth
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don’t have an account? Register"}
            </Button>
          </form>
        </Box>
      </Card>
    </Grid>
  );
};

export default Auth;
