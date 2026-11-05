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
import images from "../../assets/images.png";
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

  // return (
  //   <Grid
  //     container
  //     sx={{
  //       minHeight: "100vh",
  //       background: "linear-gradient(135deg,#ebf0f5,#f9fafb)",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       height: "full",
  //       // p: 2,
  //     }}
  //   >
  //     <Card
  //       elevation={6}
  //       sx={{
  //         borderRadius: 4,
  //         overflow: "hidden",
  //         width: { xs: "100%", sm: "80%", md: "65%" },
  //         display: "flex",
  //         flexDirection: { xs: "column", md: "row" },
  //       }}
  //     >
  //       {/* Left illustration */}
  //       <Box
  //         sx={{
  //           backgroundColor: "#fff9c7",
  //           flex: 1,
  //           backgroundImage: `url(${image})`,
  //           backgroundSize: "contain",
  //           backgroundRepeat: "no-repeat",
  //           backgroundPosition: "center",
  //           display: { xs: "none", md: "block" },
  //         }}
  //       />

  //       {/* Right form section */}
  //       <Box
  //         sx={{
  //           flex: 1,
  //           p: { xs: 3, sm: 5 },
  //           display: "flex",
  //           flexDirection: "column",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <Box textAlign="center" mb={3}>
  //           <AccountCircle
  //             fontSize="large"
  //             color={isSignUp ? "primary" : "secondary"}
  //           />
  //           <Typography
  //             variant="h5"
  //             fontWeight="bold"
  //             color="primary"
  //             sx={{ mt: 1 }}
  //           >
  //             {isSignUp ? "Create Account" : "Welcome Back"}
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary">
  //             {isSignUp
  //               ? "Sign up to manage your workplace effortlessly."
  //               : "Sign in to continue your journey."}
  //           </Typography>
  //         </Box>

  //         <form onSubmit={handleSubmit}>
  //           {isSignUp && (
  //             <>
  //               <Box my={2} textAlign="center">
  //                 <ToggleButtonGroup
  //                   value={formData.role}
  //                   exclusive
  //                   onChange={(e, newRole) =>
  //                     setFormData({ ...formData, role: newRole })
  //                   }
  //                 >
  //                   <ToggleButton value="admin">
  //                     <AdminPanelSettings sx={{ mr: 1 }} /> Admin
  //                   </ToggleButton>
  //                   <ToggleButton value="user">User</ToggleButton>
  //                 </ToggleButtonGroup>
  //               </Box>

  //               {formData.role === "admin" && (
  //                 <TextField
  //                   type="password"
  //                   label="Secret Code"
  //                   fullWidth
  //                   onChange={(e) => setCode(e.target.value)}
  //                   sx={{ mt: 2, mb: 2 }}
  //                 />
  //               )}

  //               <Grid container spacing={2}>
  //                 <Grid item xs={12} sm={6}>
  //                   <TextField
  //                     fullWidth
  //                     label="First Name"
  //                     variant="outlined"
  //                     onChange={(e) =>
  //                       setFormData({ ...formData, firstName: e.target.value })
  //                     }
  //                   />
  //                 </Grid>
  //                 <Grid item xs={12} sm={6}>
  //                   <TextField
  //                     fullWidth
  //                     label="Last Name"
  //                     variant="outlined"
  //                     onChange={(e) =>
  //                       setFormData({ ...formData, lastName: e.target.value })
  //                     }
  //                   />
  //                 </Grid>
  //               </Grid>
  //             </>
  //           )}

  //           <TextField
  //             fullWidth
  //             label="Email Address"
  //             variant="outlined"
  //             required
  //             sx={{ mt: 2 }}
  //             value={formData.email}
  //             onChange={(e) =>
  //               setFormData({ ...formData, email: e.target.value })
  //             }
  //           />

  //           <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
  //             <InputLabel>Password</InputLabel>
  //             <OutlinedInput
  //               type={showPassword ? "text" : "password"}
  //               onChange={(e) =>
  //                 setFormData({ ...formData, password: e.target.value })
  //               }
  //               endAdornment={
  //                 <InputAdornment position="end">
  //                   <IconButton
  //                     onClick={handleClickShowPassword}
  //                     onMouseDown={handleMouseDownPassword}
  //                     edge="end"
  //                   >
  //                     {showPassword ? <Visibility /> : <VisibilityOff />}
  //                   </IconButton>
  //                 </InputAdornment>
  //               }
  //               label="Password"
  //             />
  //           </FormControl>

  //           {isSignUp && (
  //             <FormControl
  //               fullWidth
  //               variant="outlined"
  //               sx={{ mt: 2 }}
  //               error={
  //                 touched && formData.confirmPassword !== formData.password
  //               }
  //             >
  //               <InputLabel>Confirm Password</InputLabel>
  //               <OutlinedInput
  //                 type={showPassword ? "text" : "password"}
  //                 value={formData.confirmPassword}
  //                 onChange={(e) => {
  //                   setTouched(true);
  //                   setFormData({
  //                     ...formData,
  //                     confirmPassword: e.target.value,
  //                   });
  //                 }}
  //                 endAdornment={
  //                   <InputAdornment position="end">
  //                     <IconButton
  //                       onClick={handleClickShowPassword}
  //                       onMouseDown={handleMouseDownPassword}
  //                       edge="end"
  //                     >
  //                       {showPassword ? <Visibility /> : <VisibilityOff />}
  //                     </IconButton>
  //                   </InputAdornment>
  //                 }
  //                 label="Confirm Password"
  //               />
  //               {touched && formData.confirmPassword !== formData.password && (
  //                 <Typography
  //                   variant="caption"
  //                   color="error"
  //                   sx={{ mt: 0.5, ml: 1 }}
  //                 >
  //                   Passwords do not match
  //                 </Typography>
  //               )}
  //             </FormControl>
  //           )}

  //           <Button
  //             variant="contained"
  //             color="primary"
  //             type="submit"
  //             fullWidth
  //             sx={{ mt: 3, py: 1.3, borderRadius: 2 }}
  //           >
  //             {isSignUp ? "Sign Up" : "Sign In"}
  //           </Button>

  //           <ToastContainer />

  //           <Button
  //             onClick={resetPassword}
  //             sx={{
  //               mt: 2,
  //               textTransform: "none",
  //               fontSize: "0.9rem",
  //             }}
  //             fullWidth
  //           >
  //             Forgot password?
  //           </Button>

  //           <Button
  //             onClick={switchMode}
  //             sx={{
  //               textTransform: "none",
  //               fontSize: "0.9rem",
  //               color: "text.secondary",
  //             }}
  //             fullWidth
  //           >
  //             {isSignUp
  //               ? "Already have an account? Sign in"
  //               : "Don’t have an account? Register"}
  //           </Button>
  //         </form>
  //       </Box>
  //     </Card>
  //   </Grid>
  // );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "#F3F5F8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        px: 2,
        py: 4,
      }}
    >
      {/* BACKGROUND DECORATIONS */}

      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          border: "1px solid #DCE2EA",
          top: "-180px",
          left: "-120px",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          border: "1px solid #DCE2EA",
          bottom: "-150px",
          right: "-80px",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 12,
          height: 12,
          bgcolor: "#E55D17",
          borderRadius: "50%",
          top: "15%",
          right: "15%",
        }}
      />

      {/* MAIN FLOATING ISLAND */}

      <Box
        sx={{
          width: "100%",
          maxWidth: 1050,
          minHeight: { xs: "auto", md: 620 },
          bgcolor: "#16355D",
          borderRadius: { xs: 3, md: 5 },
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 0.85fr",
          },
          overflow: "hidden",
          position: "relative",
          zIndex: 2,
          boxShadow: "0 35px 90px rgba(22,53,93,0.18)",
        }}
      >
        {/* LEFT SIDE */}

        <Box
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#FFFFFF",
            position: "relative",
            overflow: "hidden",
            minHeight: { xs: 260, md: 620 },
          }}
        >
          {/* Decorative geometry */}

          <Box
            sx={{
              position: "absolute",
              width: 350,
              height: 350,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50%",
              right: -130,
              top: 100,
            }}
          />

          <Box
            sx={{
              position: "absolute",
              width: 250,
              height: 250,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "50%",
              right: -80,
              top: 150,
            }}
          />

          {/* LOGO */}

          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Box display="flex" alignItems="center" gap={1.5}>
              {/* <Box
                sx={{
                  width: 45,
                  height: 45,
                  bgcolor: "#FFFFFF",
                  color: "#16355D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 900,
                  borderRadius: 2,
                }}
              >
                A
              </Box> */}

              <Box>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 23,
                    letterSpacing: 2,
                    lineHeight: 1.2,
                  }}
                >
                  ASHKAM
                </Typography>

                <Typography
                  sx={{
                    fontSize: 9,
                    letterSpacing: 2,
                    color: "#B9C8D9",
                  }}
                >
                  ENERGY PRIVATE LIMITED
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* MAIN TEXT */}

          <Box sx={{ position: "relative", zIndex: 1, my: 4 }}>
            <Typography
              sx={{
                fontSize: 11,
                letterSpacing: 4,
                color: "#A9BED6",
                fontWeight: 700,
                mb: 2,
              }}
            >
              ENGINEERING • INNOVATION • EXCELLENCE
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: 38,
                  sm: 48,
                  md: 58,
                },
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: -2,
              }}
            >
              Work
              <br />
              Beyond
              <br />
              <Box component="span" sx={{ color: "#E55D17" }}>
                Limits.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,
                color: "#C3CFDD",
                fontSize: 14,
                lineHeight: 1.9,
                maxWidth: 340,
              }}
            >
              A smarter workspace connecting people, projects and possibilities.
              Manage your professional journey with ASHKAM.
            </Typography>
          </Box>

          {/* BOTTOM IMAGE */}

          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              height: 165,
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <Box
              component="img"
              src={images}
              alt="Engineering and infrastructure"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.85,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(0deg,rgba(8,25,48,0.8),transparent)",
              }}
            />

            <Typography
              sx={{
                position: "absolute",
                bottom: 15,
                left: 18,
                color: "#FFFFFF",
                fontSize: 12,
                letterSpacing: 2,
                fontWeight: 700,
              }}
            >
              BUILDING THE FUTURE
            </Typography>
          </Box>

          <Typography
            sx={{
              mt: 3,
              fontSize: 10,
              letterSpacing: 1,
              color: "#9DAFC4",
            }}
          >
            © ASHKAM ENERGY PVT. LTD.
          </Typography>
        </Box>

        {/* RIGHT SIDE - LOGIN FORM */}

        <Box
          sx={{
            bgcolor: "#FFFFFF",
            p: { xs: 3, sm: 5, md: 5 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          {/* FORM HEADER */}

          <Box sx={{ mb: 3.5 }}>
            <Box
              sx={{
                width: 45,
                height: 4,
                bgcolor: "#E55D17",
                mb: 2.5,
              }}
            />

            <Typography
              sx={{
                fontSize: 11,
                letterSpacing: 3,
                fontWeight: 800,
                color: "#8A96A5",
                mb: 1,
              }}
            >
              {isSignUp ? "JOIN ASHKAM" : "EMPLOYEE WORKSPACE"}
            </Typography>

            <Typography
              sx={{
                fontSize: 32,
                fontWeight: 900,
                color: "#16355D",
                letterSpacing: -1,
              }}
            >
              {isSignUp ? "Get Started." : "Welcome Back."}
            </Typography>

            <Typography
              sx={{
                fontSize: 13,
                color: "#8994A3",
                mt: 1,
              }}
            >
              {isSignUp
                ? "Create your account and join our team."
                : "Please enter your details to sign in."}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            {/* REGISTER SECTION */}

            {isSignUp && (
              <>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#16355D",
                    mb: 1,
                  }}
                >
                  SELECT ACCOUNT TYPE
                </Typography>

                <ToggleButtonGroup
                  value={formData.role}
                  exclusive
                  fullWidth
                  onChange={(e, newRole) => {
                    if (newRole) {
                      setFormData({
                        ...formData,
                        role: newRole,
                      });
                    }
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiToggleButton-root": {
                      borderColor: "#DDE3EB",
                      color: "#16355D",
                      textTransform: "none",
                      fontWeight: 700,
                      py: 1,
                    },
                    "& .Mui-selected": {
                      bgcolor: "#16355D !important",
                      color: "#FFFFFF !important",
                    },
                  }}
                >
                  <ToggleButton value="admin">
                    <AdminPanelSettings sx={{ mr: 1 }} />
                    Admin
                  </ToggleButton>

                  <ToggleButton value="user">User</ToggleButton>
                </ToggleButtonGroup>

                {formData.role === "admin" && (
                  <TextField
                    type="password"
                    label="Secret Code"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                    onChange={(e) => setCode(e.target.value)}
                  />
                )}

                <Grid container spacing={1.5}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      required
                      value={formData.firstName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      required
                      value={formData.lastName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {/* EMAIL */}

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              required
              value={formData.email || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              sx={{ mt: 2 }}
            />

            {/* PASSWORD */}

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Password</InputLabel>

              <OutlinedInput
                type={showPassword ? "text" : "password"}
                required
                value={formData.password || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                label="Password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      type="button"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            {/* CONFIRM PASSWORD */}

            {isSignUp && (
              <FormControl
                fullWidth
                sx={{ mt: 2 }}
                error={
                  touched && formData.confirmPassword !== formData.password
                }
              >
                <InputLabel>Confirm Password</InputLabel>

                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword || ""}
                  onChange={(e) => {
                    setTouched(true);
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    });
                  }}
                  label="Confirm Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        type="button"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                {touched && formData.confirmPassword !== formData.password && (
                  <Typography
                    sx={{
                      color: "error.main",
                      fontSize: 11,
                      mt: 0.5,
                      ml: 1.5,
                    }}
                  >
                    Passwords do not match
                  </Typography>
                )}
              </FormControl>
            )}

            {/* FORGOT PASSWORD */}

            {!isSignUp && (
              <Box sx={{ textAlign: "right", mt: 1 }}>
                <Button
                  type="button"
                  onClick={resetPassword}
                  sx={{
                    color: "#16355D",
                    fontSize: 12,
                    textTransform: "none",
                    fontWeight: 700,
                  }}
                >
                  Forgot Password?
                </Button>
              </Box>
            )}

            {/* SUBMIT BUTTON */}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                bgcolor: "#16355D",
                color: "#FFFFFF",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: 1,
                textTransform: "uppercase",
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "#E55D17",
                  boxShadow: "none",
                },
              }}
            >
              {isSignUp ? "Create Account  →" : "Sign In  →"}
            </Button>

            {/* SWITCH LOGIN / REGISTER */}

            <Box
              sx={{
                mt: 3,
                textAlign: "center",
                borderTop: "1px solid #EDF0F4",
                pt: 2.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  color: "#8B96A4",
                }}
              >
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Typography>

              <Button
                type="button"
                onClick={switchMode}
                sx={{
                  color: "#16355D",
                  fontWeight: 800,
                  fontSize: 13,
                  textTransform: "none",
                }}
              >
                {isSignUp ? "Sign In" : "Register Now →"}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>

      <ToastContainer />
    </Box>
  );
};

export default Auth;
