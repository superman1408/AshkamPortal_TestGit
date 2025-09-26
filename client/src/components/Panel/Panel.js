// import React from "react";

// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import decode from "jwt-decode";

// import { LOGOUT } from "../../constants/actionTypes";

// import useMediaQuery from "@mui/material/useMediaQuery";

// import {
//   Box,
//   Grid,
//   Typography,
//   Divider,
//   ListItemButton,
//   ListItemText,
//   ListItemIcon,
//   Stack,
//   Avatar,
//   Card,
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// // import SettingsIcon from "@mui/icons-material/Settings";
// import AnalyticsIcon from "@mui/icons-material/Analytics";
// import BadgeIcon from "@mui/icons-material/Badge";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// // import EventAvailableIcon from "@mui/icons-material/EventAvailable";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ForwardToInboxTwoToneIcon from "@mui/icons-material/ForwardToInboxTwoTone";

// // import avatar1 from "../../assets/Profile.jpg";

// const Panel = () => {
//   // eslint-disable-next-line no-unused-vars
//   const [state, setState] = useState({
//     left: false,
//   });
//   // const [Btn, setBtn] = useState(false);

//   const matches = useMediaQuery("(min-width:990px)");

//   const dispatch = useDispatch();

//   const location = useLocation();

//   const navigate = useNavigate();

//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

//   const id = user.result._id;

//   // console.log("id in home page", prop);

//   useEffect(() => {
//     const token = user?.token;
//     if (token) {
//       const decodedToken = decode(token);
//       if (decodedToken.exp * 1000 < new Date().getTime()) switchMode();
//     }
//     setUser(JSON.parse(localStorage.getItem("profile")));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location]);

//   const switchMode = () => {
//     setUser(null);
//     dispatch({ type: LOGOUT });
//     navigate("/auth");
//   };

//   const dashboardMode = () => {
//     navigate("/home");
//   };

//   const inboxMode = () => {
//     navigate(`/mail/${id}/communication`);
//   };

//   const employeeMode = () => {
//     navigate(`/${id}/profile`);
//   };

//   const analytics = () => {
//     navigate(`/posts/${id}/fullweeklyactivity`);
//   };

//   const attendance = () => {
//     navigate(`/${id}/attendanceDisplay`);
//   };

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const fullName = `${user.result.firstName} ${user.result.lastName}`;

//   const formatFullName = (name) => {
//     return name
//       .trim()
//       .split(/\s+/)
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   const userName = formatFullName(fullName);

//   return (
//     <Card
//       sx={{
//         bgcolor: "smokewhite",
//         borderRadius: "12px",
//         padding: "10px",
//         "@media (max-width: 600px)": {
//           flexDirection: "column",
//           width: "50vh",
//           padding: "0px",
//         },

//         "@media (min-width: 600px)": {
//           flexDirection: "column",
//           // padding: "0px",
//         },
//       }}
//       elevation={10}
//     >
//       <div>
//         {matches && (
//           <Grid
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               bgcolor: "smokewhite",
//               width: "100%",
//               height: "100vh",
//             }}
//           >
//             <Grid>
//               <Stack
//                 direction="row"
//                 justifyContent="center"
//                 alignItems="center"
//                 sx={{
//                   mt: 2,
//                 }}
//               >
//                 <Avatar
//                   sx={{
//                     width: 50,
//                     height: 50,
//                     // marginLeft: "10px",
//                     justifyContent: "center",
//                     bgcolor: "orange",
//                     userSelect: "none", // Prevent selection
//                     pointerEvents: "none", // Prevent interaction
//                   }}
//                   src={user.result.selectedFile}
//                 />
//               </Stack>
//             </Grid>
//             <Grid>
//               <Typography
//                 sx={{
//                   justifyContent: "center",
//                   textAlign: "center",
//                   fontFamily: "Roboto",
//                   // marginLeft: "70px",
//                   marginTop: "10px",
//                   color: "#16355d",
//                 }}
//               >
//                 {userName}
//               </Typography>
//             </Grid>

//             <Divider sx={{ mb: 6, ml: 0, mr: 0 }} />
//             <Card
//               elevation={5}
//               sx={{
//                 backgroundColor: "#16355d",
//                 marginLeft: "50px",
//                 marginRight: "50px",
//                 marginTop: "-30px",
//                 marginBottom: "30px",
//               }}
//             >
//               <Typography
//                 sx={{
//                   color: "white",
//                   textAlign: "center",
//                   fontFamily: "Roboto",
//                   fontWeight: "bold",
//                   fontSize: "10px",
//                 }}
//               >
//                 {user.result.role.toUpperCase()}
//               </Typography>
//             </Card>
//             <Grid>
//               <Box sx={{ mb: "10px" }}>
//                 <ListItemButton sx={{ mb: "10px" }} onClick={dashboardMode}>
//                   <ListItemIcon>
//                     <DashboardIcon sx={{ color: "#038f7c" }} />
//                   </ListItemIcon>
//                   <ListItemText sx={{ color: "#16355d" }} primary="Dashboard" />
//                 </ListItemButton>

//                 <ListItemButton
//                   sx={{ mb: "10px" }}
//                   onClick={() => employeeMode(user.result._id, "registration")}
//                 >
//                   <ListItemIcon>
//                     <PeopleAltIcon sx={{ color: "#038f7c" }} />
//                   </ListItemIcon>
//                   <ListItemText sx={{ color: "#16355d" }} primary="Profile" />
//                 </ListItemButton>

//                 {/* inbox added here */}
//                 <ListItemButton
//                   sx={{ mb: "10px" }}
//                   onClick={() => inboxMode(user.result._id, "inbox")}
//                 >
//                   <ListItemIcon sx={{ mb: "10px" }} onClick={dashboardMode}>
//                     <ForwardToInboxTwoToneIcon sx={{ color: "#038f7c" }} />
//                   </ListItemIcon>
//                   <ListItemText sx={{ color: "#16355d" }} primary="Inbox" />
//                 </ListItemButton>

//                 <ListItemButton sx={{ mb: "10px" }} onClick={analytics}>
//                   <ListItemIcon>
//                     <AnalyticsIcon sx={{ color: "#038f7c" }} />
//                   </ListItemIcon>
//                   <ListItemText sx={{ color: "#16355d" }} primary="Analytics" />
//                 </ListItemButton>

//                 <ListItemButton sx={{ mb: "10px" }} onClick={attendance}>
//                   <ListItemIcon>
//                     <BadgeIcon sx={{ color: "#038f7c" }} />
//                   </ListItemIcon>
//                   <ListItemText
//                     sx={{ color: "#16355d" }}
//                     primary="Attendance Report"
//                   />
//                 </ListItemButton>

//                 {/* <ListItemButton sx={{ mb: "10px" }}>
//               <ListItemIcon>
//                 <SettingsIcon sx={{ color: "#038f7c" }} />
//               </ListItemIcon>
//               <ListItemText sx={{color: "#16355d"}} primary="settings" />
//             </ListItemButton> */}

//                 <ListItemButton sx={{ mb: "10px" }} onClick={switchMode}>
//                   <ListItemIcon>
//                     <LogoutIcon sx={{ color: "#038f7c" }} />
//                   </ListItemIcon>
//                   <ListItemText sx={{ color: "#16355d" }} primary="Logout" />
//                 </ListItemButton>
//               </Box>
//             </Grid>
//           </Grid>
//         )}
//       </div>
//     </Card>
//   );
// };

// export default Panel;

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import decode from "jwt-decode";

// import { LOGOUT } from "../../constants/actionTypes";

// import useMediaQuery from "@mui/material/useMediaQuery";
// import {
//   Box,
//   Typography,
//   ListItemButton,
//   ListItemText,
//   ListItemIcon,
//   Avatar,
//   Card,
//   Divider,
//   Stack,
// } from "@mui/material";

// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AnalyticsIcon from "@mui/icons-material/Analytics";
// import BadgeIcon from "@mui/icons-material/Badge";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import LogoutIcon from "@mui/icons-material/Logout";
// import ForwardToInboxTwoToneIcon from "@mui/icons-material/ForwardToInboxTwoTone";

// const Panel = () => {
//   const matches = useMediaQuery("(min-width:990px)");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

//   const id = user?.result?._id;

//   useEffect(() => {
//     const token = user?.token;
//     if (token) {
//       const decodedToken = decode(token);
//       if (decodedToken.exp * 1000 < new Date().getTime()) switchMode();
//     }
//     setUser(JSON.parse(localStorage.getItem("profile")));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [location]);

//   const switchMode = () => {
//     setUser(null);
//     dispatch({ type: LOGOUT });
//     navigate("/auth");
//   };

//   // Navigation helpers
//   const dashboardMode = () => navigate("/home");
//   const inboxMode = () => navigate(`/mail/${id}/communication`);
//   const employeeMode = () => navigate(`/${id}/profile`);
//   const analytics = () => navigate(`/posts/${id}/fullweeklyactivity`);
//   const attendance = () => navigate(`/${id}/attendanceDisplay`);

//   const fullName = `${user.result.firstName} ${user.result.lastName}`;
//   const userName = fullName
//     .trim()
//     .split(/\s+/)
//     .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
//     .join(" ");

//   return (
//     <Card
//       sx={{
//         borderRadius: "20px",
//         p: 2,
//         height: "100vh",
//         width: matches ? "270px" : "100%",
//         display: matches ? "flex" : "none",
//         flexDirection: "column",
//         backdropFilter: "blur(12px)",
//         background: "smokewhite",
//         boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
//       }}
//     >
//       {/* User Section */}
//       <Stack spacing={1.5} alignItems="center" mt={2} mb={2}>
//         <Avatar
//           src={user.result.selectedFile}
//           sx={{
//             width: 76,
//             height: 76,
//             bgcolor: "#038f7c",
//             fontSize: 28,
//             boxShadow: "0 6px 14px rgba(3,143,124,0.3)",
//           }}
//         >
//           {userName.charAt(0)}
//         </Avatar>
//         <Typography
//           variant="subtitle1"
//           sx={{
//             fontWeight: 700,
//             color: "#1b3a57",
//             letterSpacing: 0.3,
//           }}
//         >
//           {userName}
//         </Typography>
//         <Typography
//           variant="caption"
//           sx={{
//             bgcolor: "#038f7c",
//             color: "white",
//             px: 2,
//             py: 0.5,
//             borderRadius: "16px",
//             fontSize: "11px",
//             fontWeight: 600,
//             letterSpacing: 0.5,
//             boxShadow: "0 2px 6px rgba(3,143,124,0.3)",
//           }}
//         >
//           {user.result.role.toUpperCase()}
//         </Typography>
//       </Stack>

//       <Divider sx={{ my: 2 }} />

//       {/* Menu Items */}
//       <Box sx={{ flexGrow: 1 }}>
//         {[
//           { text: "Dashboard", icon: <DashboardIcon />, action: dashboardMode },
//           { text: "Profile", icon: <PeopleAltIcon />, action: employeeMode },
//           {
//             text: "Inbox",
//             icon: <ForwardToInboxTwoToneIcon />,
//             action: inboxMode,
//           },
//           { text: "Analytics", icon: <AnalyticsIcon />, action: analytics },
//           {
//             text: "Attendance Report",
//             icon: <BadgeIcon />,
//             action: attendance,
//           },
//         ].map((item, idx) => (
//           <ListItemButton
//             key={idx}
//             onClick={item.action}
//             sx={{
//               mb: 1,
//               borderRadius: "14px",
//               transition: "all 0.25s",
//               "&:hover": {
//                 bgcolor: "rgba(3,143,124,0.08)",
//                 transform: "translateX(6px)",
//               },
//             }}
//           >
//             <ListItemIcon
//               sx={{
//                 minWidth: "44px",
//                 color: "#038f7c",
//                 bgcolor: "rgba(3,143,124,0.1)",
//                 p: 1,
//                 borderRadius: "12px",
//               }}
//             >
//               {item.icon}
//             </ListItemIcon>
//             <ListItemText
//               primary={item.text}
//               primaryTypographyProps={{
//                 fontSize: "15px",
//                 fontWeight: 600,
//                 color: "#1b3a57",
//               }}
//             />
//           </ListItemButton>
//         ))}
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       {/* Logout */}
//       <ListItemButton
//         onClick={switchMode}
//         sx={{
//           borderRadius: "14px",
//           transition: "0.2s",
//           "&:hover": {
//             bgcolor: "rgba(211,47,47,0.08)",
//             transform: "translateX(6px)",
//           },
//         }}
//       >
//         <ListItemIcon
//           sx={{
//             color: "#d32f2f",
//             minWidth: "44px",
//             bgcolor: "rgba(211,47,47,0.1)",
//             p: 1,
//             borderRadius: "12px",
//           }}
//         >
//           <LogoutIcon />
//         </ListItemIcon>
//         <ListItemText
//           primary="Logout"
//           primaryTypographyProps={{
//             fontSize: "15px",
//             fontWeight: 600,
//             color: "#d32f2f",
//           }}
//         />
//       </ListItemButton>
//     </Card>
//   );
// };

// export default Panel;

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";

import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  Typography,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  Stack,
  IconButton,
  Drawer,
  Tooltip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import BadgeIcon from "@mui/icons-material/Badge";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import ForwardToInboxTwoToneIcon from "@mui/icons-material/ForwardToInboxTwoTone";

const drawerWidth = 260;
const collapsedWidth = 72;

const Panel = () => {
  const matches = useMediaQuery("(min-width:990px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [open, setOpen] = useState(true);

  const id = user?.result?._id;

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  if (!user) return null;

  const handleLogout = () => {
    setUser(null);
    dispatch({ type: LOGOUT });
    navigate("/auth");
  };

  // Navigation helpers
  const dashboardMode = () => navigate("/home");
  const inboxMode = () => navigate(`/mail/${id}/communication`);
  const employeeMode = () => navigate(`/${id}/profile`);
  const analytics = () => navigate(`/posts/${id}/fullweeklyactivity`);
  const attendance = () => navigate(`/${id}/attendanceDisplay`);

  // const handleLogout = () => {
  //     dispatch({ type: LOGOUT });
  //     setUser(null);
  //     navigate("/auth");
  //   };

  const fullName = `${user.result.firstName} ${user.result.lastName}`;
  const userName = fullName
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, action: dashboardMode },
    { text: "Profile", icon: <PeopleAltIcon />, action: employeeMode },
    { text: "Inbox", icon: <ForwardToInboxTwoToneIcon />, action: inboxMode },
    { text: "Analytics", icon: <AnalyticsIcon />, action: analytics },
    { text: "Attendance Report", icon: <BadgeIcon />, action: attendance },
  ];

  return (
    <>
      {/* Drawer */}

      {!user ? null : (
        <Drawer
          variant={matches ? "permanent" : "temporary"}
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            width: open ? drawerWidth : collapsedWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: open ? drawerWidth : collapsedWidth,
              transition: "width 0.3s",
              overflowX: "hidden",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              borderRight: "none",
              backdropFilter: "blur(12px)",
            },
          }}
        >
          {/* Toggle Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: open ? "flex-end" : "center",
              alignItems: "center",
              px: 1,
              py: 1,
            }}
          >
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
          </Box>

          {/* User Section */}
          {open && (
            <Stack spacing={1.5} alignItems="center" mt={1} mb={2}>
              <Avatar
                src={user.result.selectedFile}
                sx={{
                  width: 76,
                  height: 76,
                  bgcolor: "#038f7c",
                  fontSize: 28,
                  boxShadow: "0 6px 14px rgba(3,143,124,0.3)",
                }}
              >
                {userName.charAt(0)}
              </Avatar>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "#1b3a57", letterSpacing: 0.3 }}
              >
                {userName}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  bgcolor: "#038f7c",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: "16px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  boxShadow: "0 2px 6px rgba(3,143,124,0.3)",
                }}
              >
                {user.result.role.toUpperCase()}
              </Typography>
            </Stack>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Menu Items */}
          <Box sx={{ flexGrow: 1 }}>
            {menuItems.map((item, idx) => (
              <Tooltip
                key={idx}
                title={!open ? item.text : ""}
                placement="right"
                arrow
              >
                <ListItemButton
                  onClick={item.action}
                  sx={{
                    mb: 1,
                    borderRadius: "14px",
                    justifyContent: open ? "flex-start" : "center",
                    px: open ? 2 : 1,
                    transition: "all 0.25s",
                    "&:hover": {
                      bgcolor: "rgba(3,143,124,0.08)",
                      transform: "translateX(6px)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "44px",
                      color: "#038f7c",
                      bgcolor: "rgba(3,143,124,0.1)",
                      p: 1,
                      borderRadius: "12px",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "#1b3a57",
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            ))}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Logout */}
          <Tooltip title={!open ? "Logout" : ""} placement="right" arrow>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                borderRadius: "14px",
                justifyContent: open ? "flex-start" : "center",
                px: open ? 2 : 1,
                transition: "0.2s",
                "&:hover": {
                  bgcolor: "rgba(211,47,47,0.08)",
                  transform: "translateX(6px)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: "#d32f2f",
                  minWidth: "44px",
                  bgcolor: "rgba(211,47,47,0.1)",
                  p: 1,
                  borderRadius: "12px",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "#d32f2f",
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </Drawer>
      )}
    </>
  );
};

export default Panel;
