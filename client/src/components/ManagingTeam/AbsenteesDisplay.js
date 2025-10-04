// import React, { useState, useEffect, useMemo } from "react";

// import {
//   Grid,
//   Typography,
//   Avatar,
//   Card,
//   IconButton,
//   useTheme,
// } from "@mui/material";
// import HailIcon from "@mui/icons-material/Hail";
// import { getPosts } from "../../action/posts";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const AbsenteesDisplay = () => {
//   const user = JSON.parse(localStorage.getItem("profile"));
//   const id = user.result._id;
//   const posts = useSelector((state) => state.posts);

//   const [currentId, setCurrentId] = useState(id);

//   const dispatch = useDispatch();

//   const navigate = useNavigate();

//   const theme = useTheme();

//   // useEffect(() => {
//   //   if (posts) {
//   //     dispatch(getPosts()).then(() => {
//   //       // eslint-disable-next-line array-callback-return
//   //       posts.map((post) => {
//   //         if (post._id === currentId) {
//   //           setCurrentId(post._id);
//   //         }
//   //       });
//   //     });
//   //   }
//   // }, [dispatch]);

//   useEffect(() => {
//     dispatch(getPosts());
//   }, [dispatch]);

//   const verifyTheRole = () => {
//     if (user.result.role === "admin") {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const formatName = (firstName = "", lastName = "") => {
//     return (
//       firstName.charAt(0).toUpperCase() +
//       firstName.slice(1).toLowerCase() +
//       " " +
//       lastName.charAt(0).toUpperCase() +
//       lastName.slice(1).toLowerCase()
//     );
//   };

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const sortedPosts = useMemo(() => {
//     return [...posts]
//       .filter((post) => post.firstName && post.lastName)
//       .sort((a, b) => {
//         const nameA = formatName(a.firstName, a.lastName);
//         const nameB = formatName(b.firstName, b.lastName);
//         return nameA.localeCompare(nameB);
//       });
//   });

//   return (
//     <div style={{ display: "flex", flex: 1 }}>
//       <Card
//         sx={{
//           display: "flex",
//           padding: "3px",

//           backdropFilter: "blur(8px)",
//           background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
//           boxShadow: 1,
//           maxWidth: "500px",
//           borderRadius: "10px",
//           width: "100%",
//           position: "relative", // Set position to relative
//           marginLeft: "20px",
//           marginRight: "0px",

//           "@media (max-width: 600px)": {
//             display: "flex",
//             margin: "20px 20px 0px 0px",
//           },

//           transition: "all 0.2s ease-in-out",
//           "&:hover": {
//             transform: "scale(1.02)",
//             boxShadow: theme.shadows[6],
//           },
//         }}
//       >
//         <Grid
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             marginBottom: "10px",
//             marginRight: "20px",
//           }}
//         >
//           <Grid
//             gap={1}
//             p={1.5}
//             sx={{
//               display: "flex",
//               flexDirection: "row",
//             }}
//           >
//             <IconButton
//               sx={{ color: "#16355d" }}
//               onClick={
//                 verifyTheRole() ? () => navigate(`/${id}/absentdetails`) : null // Employee Attendance Route
//               }
//             >
//               <HailIcon />
//             </IconButton>

//             <Typography
//               variant="h6"
//               fontWeight={600}
//               sx={{
//                 color: "#16355d",
//                 // color: "white",
//                 fontFamily: "Roboto",
//                 fontWeight: "bolder",
//               }}
//             >
//               Absentees
//             </Typography>
//           </Grid>
//           <Grid
//             Card
//             sx={{
//               display: "grid",
//               gridTemplateColumns: "repeat(4, 1fr)", // 4 columns per row
//               gap: "10px",
//               padding: "10px 0",
//               height: "200px",
//               overflowY: "auto",
//             }}
//           >
//             {sortedPosts.map((post, index) => {
//               if (post.presentStatus === "false") {
//                 return (
//                   <Grid
//                     item
//                     key={index}
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       textAlign: "center",
//                     }}
//                   >
//                     <Avatar
//                       sx={{
//                         width: 40,
//                         height: 40,
//                         userSelect: "none",
//                         pointerEvents: "none",
//                       }}
//                       alt={formatName(post.firstName, post.lastName)}
//                       src={post?.selectedFile}
//                     />
//                     <Typography
//                       sx={{
//                         fontSize: "13px",
//                         fontWeight: "bold",
//                         mt: "4px",
//                         color: "#16355d",
//                         fontFamily: "Roboto",
//                       }}
//                     >
//                       {formatName(post.firstName, post.lastName)}
//                     </Typography>
//                     <Typography
//                       sx={{
//                         fontSize: "11px",
//                         color: "#16355d",
//                         fontFamily: "Roboto",
//                       }}
//                     >
//                       {post.department}
//                     </Typography>
//                   </Grid>
//                 );
//               } else {
//                 return null;
//               }
//             })}
//           </Grid>
//         </Grid>
//       </Card>
//     </div>
//   );
// };

// export default AbsenteesDisplay;

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Grid,
  Typography,
  Avatar,
  Card,
  IconButton,
  useTheme,
  Box,
} from "@mui/material";
import HailIcon from "@mui/icons-material/Hail";
import { getPosts } from "../../action/posts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AbsenteesDisplay = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const id = user?.result?._id;
  const posts = useSelector((state) => state.posts) || [];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const verifyTheRole = () => user?.result?.role === "admin";

  const formatName = useCallback((firstName = "", lastName = "") => {
    return (
      firstName.charAt(0).toUpperCase() +
      firstName.slice(1).toLowerCase() +
      " " +
      lastName.charAt(0).toUpperCase() +
      lastName.slice(1).toLowerCase()
    );
  }, []);

  const sortedPosts = useMemo(() => {
    return [...posts]
      .filter((post) => post.firstName && post.lastName)
      .sort((a, b) =>
        formatName(a.firstName, a.lastName).localeCompare(
          formatName(b.firstName, b.lastName)
        )
      );
  }, [posts, formatName]);

  const absentees = sortedPosts.filter(
    (post) => post.presentStatus === "false" || post.presentStatus === false
  );

  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <Card
        elevation={6}
        sx={{
          display: "flex",
          maxWidth: "500px",
          flexDirection: "column",
          marginLeft: "20px",
          padding: "10px",
          // height: "150px",

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

            // p: 2,
            // backdropFilter: "blur(8px)",
            // // background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
            // background: "smokewhite",
            // borderRadius: 3,
            // transition: "0.3s",
            // height: "100%",
            // "&:hover": {
            //   transform: "scale(1.02)",
            //   boxShadow: theme.shadows[6],
          },
        }}
      >
        {/* Header */}
        <Grid sx={{ display: "flex", flexDirection: "row" }} Card alignItems="center" gap={1} mb={2}>
          <IconButton
            sx={{ color: "#16355d" }}
            onClick={
              verifyTheRole() ? () => navigate(`/${id}/absentdetails`) : null
            }
          >
            <HailIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#16355d",
              fontFamily: "Roboto",
            }}
          >
            Absentees
          </Typography>
        </Grid>

        {/* Absentees Grid */}
        {absentees.length > 0 ? (
          <Grid
            Card
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 2,
              maxHeight: "200px",
              overflowY: "auto",
              pr: 1,
            }}
          >
            {absentees.map((post) => (
              <Grid
                item
                key={post._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                  alt={formatName(post.firstName, post.lastName)}
                  src={post?.selectedFile}
                />
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    mt: 0.5,
                    color: "#16355d",
                    fontFamily: "Roboto",
                  }}
                >
                  {formatName(post.firstName, post.lastName)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "11px",
                    color: "#455a64",
                    fontFamily: "Roboto",
                  }}
                >
                  {post.department}
                </Typography>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="body2"
            align="center"
            sx={{ color: "#16355d", fontWeight: 500, mt: 2 }}
          >
            No absentees today!
          </Typography>
        )}
      </Card>
    </Box>
  );
};

export default AbsenteesDisplay;
