// /* eslint-disable jsx-a11y/no-distracting-elements */
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { Grid, Typography, Avatar, Card, useTheme } from "@mui/material";

// import { getPosts, getEvents } from "../../action/posts";

// import FormDialog from "./DialogBox/Dialog";
// import CakeIcon from "@mui/icons-material/Cake";
// import CelebrationIcon from "@mui/icons-material/Celebration";
// import { keyframes } from "@mui/system";
// import Image from "../../assets/b1.png";
// import "./style.css";

// const Birthday = () => {
//   const dispatch = useDispatch();
//   const [evento, setEvento] = useState("");
//   const posts = useSelector((state) => state.posts);
//   const user = JSON.parse(localStorage.getItem("profile"));

//   const theme = useTheme();

//   const [dimension, setDimension] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight,
//   });

//   const currentDay = new Date().getDate();
//   const currentMonth = new Date().getMonth() + 1;

//   const detectSize = () => {
//     setDimension((prevDimension) => ({
//       ...prevDimension,
//       width: window.innerWidth,
//       height: window.innerHeight,
//     }));
//   };

//   useEffect(() => {
//     window.addEventListener("resize", detectSize);
//     return () => {
//       window.removeEventListener("resize", detectSize);
//     };
//   }, []); // Empty dependency array to run effect only once when component mounts

//   const event = useSelector((state) => state.event);

//   useEffect(() => {
//     dispatch(getPosts());
//     dispatch(getEvents()).then(() => {
//       if (event) {
//         event.map((item) => {
//           setEvento(item.dailyevent);
//         });
//       } else {
//         setEvento("No hay eventos programados para hoy");
//       }
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch, evento, event]);

//   const bounce = keyframes`
//   0%, 100% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(-5px);
//   }
// `;

//   const birthdaysToday = posts.filter((post) => {
//     const day = new Date(post.dob).getDate();
//     const month = new Date(post.dob).getMonth() + 1;
//     return currentDay === day && currentMonth === month;
//   });

//   const verify = () => {
//     if (
//       user.result.role === "admin" ||
//       (user.result.role === "manager" &&
//         user.result.department === "Human Resource")
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   return (
//     <div style={{ display: "flex", flex: 1 }}>
//       <Card
//         sx={{
//           backgroundImage: `url(${Image})`,
//           // display: "flex",
//           // maxWidth: "500px",
//           // marginLeft: "20px",
//           // padding: "20px",
//           // boxShadow: 1,
//           // borderRadius: "10px",
//           // height: "200px",

//           // backgroundSize: "cover",
//           // transition: "all 0.2s ease-in-out",
//           // "@media (max-width: 600px)": {
//           //   display: "flex",
//           //   margin: "20px 0px 0px 0px",
//           // },
//           // "&:hover": {
//           //   transform: "scale(1.02)",
//           //   boxShadow: theme.shadows[6],
//           // },

//           display: "flex",
//           maxWidth: "500px",
//           flexDirection: "column",
//           marginLeft: "20px",
//           padding: "10px",
//           height: "150px",

//           backdropFilter: "blur(8px)",
//           // background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
//           background: "smokewhite",
//           // boxShadow: 1,
//           borderRadius: "10px",
//           overflow: "hidden",
//           position: "relative", // Set position to relative
//           flex: 1,
//           transition: "0.3s",
//           "@media (max-width: 600px)": {
//             display: "flex",
//             margin: "20px 0px 0px 0px",
//             width: "40vh",
//           },
//           "&:hover": {
//             transform: "scale(1.02)",
//             boxShadow: theme.shadows[6],
//           },
//         }}
//       >
//         <Grid sx={{ display: "flex" }}>
//           <div>
//             {birthdaysToday.length === 0 ? (
//               // eslint-disable-next-line jsx-a11y/no-distracting-elements
//               <marquee
//                 direction="up"
//                 style={{ color: "#047681", fontFamily: "Roboto" }}
//               >
//                 <strong style={{ color: "#e55d17", fontFamily: "Roboto" }}>
//                   No Birthday Today!
//                 </strong>
//                 <br />
//                 <br />
//                 {/* There are no event today. <br /> */}
//                 Please check back tomorrow or try again later.
//               </marquee>
//             ) : (
//               <div style={{}}>
//                 <Grid gap={2} p={1} style={{ display: "flex", padding: "5px" }}>
//                   <CakeIcon sx={{ color: "#16355d" }} />
//                   <Typography
//                     variant="h6"
//                     fontWeight={600}
//                     sx={{
//                       color: "#16355d",
//                       fontFamily: "Roboto",
//                       width: "100%",
//                     }}
//                   >
//                     Today's Birthday
//                   </Typography>
//                 </Grid>
//                 <div style={{ height: "100px", overflowY: "auto" }}>
//                   {birthdaysToday.map((post) => {
//                     return (
//                       <React.Fragment key={post.dob}>
//                         <div
//                           style={{
//                             display: "flex",
//                             // flexDirection: "column",
//                             marginTop: "5px",
//                             backgroundColor: "white",
//                             borderRadius: "10px",
//                             padding: "5px",
//                           }}
//                         >
//                           <div
//                             style={{
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "5px",
//                             }}
//                           >
//                             <Avatar
//                               sx={{
//                                 width: 31,
//                                 height: 30,
//                                 marginLeft: "20px",
//                                 userSelect: "none",
//                                 pointerEvents: "none",
//                               }}
//                               alt="user"
//                               src={post.selectedFile}
//                             />

//                             <Typography
//                               variant="h6"
//                               sx={{
//                                 fontFamily: "Roboto",
//                                 fontSize: "18px",
//                                 // color: "#e55d17",
//                                 color: "#16355d",
//                               }}
//                             >
//                               {post.firstName + " " + post.lastName}
//                             </Typography>
//                           </div>

//                           <span style={{ padding: "5px" }}>-</span>
//                           <div
//                             style={{
//                               display: "flex",
//                               gap: "5px",
//                               marginTop: "5px",
//                             }}
//                           >
//                             <CelebrationIcon
//                               sx={{
//                                 color: "#ff9800",
//                                 // animation: `${bounce} 1.5s infinite`,
//                                 fontSize: "20px",
//                                 padding: "3px",
//                               }}
//                             />
//                             <Typography
//                               variant="body2"
//                               color="textSecondary"
//                               sx={{
//                                 fontFamily: "Roboto",
//                                 fontSize: "13px",
//                                 padding: "3px",
//                               }}
//                             >
//                               {post.department}
//                             </Typography>
//                           </div>
//                         </div>
//                       </React.Fragment>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}

//             <div
//               style={{
//                 display: "flex",
//                 marginTop: "10px",
//                 marginLeft: "10px",
//                 // backgroundColor: "#16355d",
//               }}
//             >
//               {/* ..................................Event is being displayed from here onwards........................................................................ */}

//               <marquee
//                 style={{
//                   color: "#16355c",
//                   fontWeight: "bold",
//                   fontFamily: "Roboto",
//                 }}
//               >
//                 <div>{evento}</div>
//               </marquee>
//             </div>
//           </div>

//           <div
//             style={{
//               bgcolor: "#ecd0f5",
//             }}
//           >
//             {verify() === true && <FormDialog />}
//           </div>
//         </Grid>
//       </Card>
//     </div>
//   );
// };

// export default Birthday;

/* eslint-disable jsx-a11y/no-distracting-elements */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  Avatar,
  Card,
  Box,
  Chip,
  useTheme,
} from "@mui/material";
import { getPosts, getEvents } from "../../action/posts";

import FormDialog from "./DialogBox/Dialog";
import CakeIcon from "@mui/icons-material/Cake";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { motion } from "framer-motion";
import Image from "../../assets/birthday.png";
import "./style.css";
import spotlight from "../../assets/spotlight_icon.png";

const Birthday = () => {
  const dispatch = useDispatch();
  const [evento, setEvento] = useState("");
  const posts = useSelector((state) => state.posts);
  const event = useSelector((state) => state.event);
  const user = JSON.parse(localStorage.getItem("profile"));
  const theme = useTheme();

  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getEvents()).then(() => {
      if (event && event.length > 0) {
        setEvento(event.map((item) => item.dailyevent).join(" • "));
      } else {
        setEvento("No events scheduled for today");
      }
    });
  }, [dispatch, event]);

  const birthdaysToday = posts.filter((post) => {
    const day = new Date(post.dob).getDate();
    const month = new Date(post.dob).getMonth() + 1;
    return currentDay === day && currentMonth === month;
  });

  const verify = () =>
    user?.result?.role === "admin" ||
    (user?.result?.role === "manager" &&
      user?.result?.department === "Human Resource");

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
      }}
    >
      <Card
        elevation={6}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundSize: "cover", // makes it cover the card
          backgroundRepeat: "no-repeat", // prevents tiling
          backgroundPosition: "center", // keeps it centered
          display: "flex",
          maxWidth: "500px",
          flexDirection: "column",
          marginLeft: "20px",
          padding: "10px",
          height: "200px",

          backdropFilter: "blur(8px)",
          // background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
          background: "smokewhite",
          // boxShadow: 1,
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative", // Set position to relative
          flex: 1,
          transition: "0.3s",
          "@media (max-width: 600px)": {
            display: "flex",
            margin: "20px 0px 0px 0px",
            width: "40vh",
          },
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: theme.shadows[6],
          },
        }}
      >
        {/* Header */}
        <Grid container alignItems="center" gap={1} mb={2}>
          {/* <CakeIcon sx={{ color: "#d35400" }} /> */}
          <div style={{ padding: "10px" }}>
            <img style={{ color: "#16355d", padding: "2px" }} src={spotlight} />
          </div>

          <Typography
            variant="h6"
            sx={{
              fontFamily: "Roboto",
              fontWeight: "bold",
              // marginLeft: "100px",
              color: "#16355d",
            }}
          >
            In the Spotlight Today
          </Typography>
        </Grid>

        {/* Birthday Section */}
        {birthdaysToday.length === 0 ? (
          <>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#047681", fontWeight: 500 }}
            >
              No Event.
            </Typography>
            <Typography
              variant="body1"
              align="center"
              sx={{ color: "#047681", fontWeight: 500 }}
            >
              Check back tomorrow!
            </Typography>
          </>
        ) : (
          <Box
            sx={{
              maxHeight: "160px",
              overflowY: "auto",
              pr: 1,
            }}
          >
            {birthdaysToday.map((post) => (
              <Box
                key={post._id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "rgba(255,255,255,0.8)",
                  borderRadius: "12px",
                  p: 1.2,
                  mb: 1,
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    alt={post.firstName}
                    src={post.selectedFile}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, color: "#16355d" }}
                  >
                    {post.firstName} {post.lastName}
                  </Typography>
                </Box>

                <Chip
                  icon={<CelebrationIcon sx={{ color: "#ff9800" }} />}
                  label={post.department}
                  size="small"
                  sx={{
                    backgroundColor: "#fff8e1",
                    color: "#6d4c41",
                    fontWeight: 500,
                  }}
                />
              </Box>
            ))}
          </Box>
        )}

        {/* Event Section */}
        <Box
          mt={2}
          sx={{
            overflow: "hidden",
            position: "relative",
            height: "35px",
          }}
        >
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            style={{
              whiteSpace: "nowrap",
              fontWeight: 600,
              fontFamily: "Roboto",
              color: "#16355d",
            }}
          >
            {evento}
          </motion.div>
        </Box>

        {/* Admin Action */}
        {verify() && (
          <Box sx={{ position: "absolute", top: 15, right: 15 }}>
            <FormDialog />
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Birthday;
