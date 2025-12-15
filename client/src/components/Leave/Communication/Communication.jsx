// import React, { useState, useEffect } from "react";
// import { Grid, Divider, Button } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import Panel from "../../Panel/Panel";

// import { useNavigate } from "react-router-dom";
// import Inbox from "./Inbox/inbox";
// import MessageBody from "./Message/MessageBody";
// import { getPosts } from "../../../action/posts";

// import useMediaQuery from "@mui/material/useMediaQuery";
// // import MessageBodyImage from "../../../../src/assets/MessageBodyImage.png";
// import InboxBodyImage from "../../../../src/assets/InboxBodyImage.png";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// const Communication = () => {
//   const user = JSON.parse(localStorage.getItem("profile"));
//   const [currentId, setCurrentId] = useState(user.result.id);
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);

//   const navigate = useNavigate();

//   // const matches = useMediaQuery("(min-width:1024px) and (max-width:1440px)");
//   const matches = useMediaQuery("(min-width:600px)");

//   useEffect(() => {
//     dispatch(getPosts());
//   }, [dispatch, currentId]);

//   const verifyTheRole = () => {
//     if (user.result.role === "admin") {
//       return true;
//     } else if (
//       user.result.role === "manager" &&
//       user.result.department.toLowerCase() === "human resource"
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const verifyManager = () => {
//     if (user.result.role === "manager") {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const sortedPosts = [...posts].sort((a, b) => {
//     const nameA = a.firstName.toLowerCase() + " " + a.lastName.toLowerCase();
//     const nameB = b.firstName.toLowerCase() + " " + b.lastName.toLowerCase();
//     if (nameA < nameB) return -1;
//     if (nameA > nameB) return 1;
//     return 0;
//   });

//   const handleGoBack = () => {
//     navigate(-1); // this means "go back one step in history"
//   };

//   return (
//     <>
//       <div style={{ display: "flex" }}>
//         <div style={{ display: "inline" }}>
//           <Button
//             onClick={handleGoBack}
//             sx={{
//               padding: "8px 16px",
//               color: "#16355d",
//               display: {
//                 xs: "none",
//                 sm: "inline-block",
//               },
//             }}
//           >
//             <ArrowBackIcon />
//           </Button>
//         </div>
//         <h2
//           style={{
//             color: "#16355d",
//             marginLeft: "20px",
//             fontFamily: "Roboto",
//           }}
//         >
//           Message Center
//         </h2>
//       </div>
//       <Grid
//         container
//         spacing={2}
//         sx={{
//           padding: "2px",
//           flexDirection: matches ? "row" : "column", // Switch layout based on screen
//           width: "100%",
//         }}
//       >
//         {/* {matches && (
//           <Grid item md={2} sx={{ minWidth: "200px" }}>
//             <Panel />
//           </Grid>
//         )} */}

//         {/* Inbox + Message Body Container */}

//         <Grid
//           item
//           xs={12}
//           md={10}
//           sx={{
//             display: "flex",
//             flexDirection: matches ? "row" : "column",
//             gap: 2,
//           }}
//         >
//           {/* Inbox Section */}
//           <Grid
//             item
//             xs={12}
//             md={3}
//             sx={{
//               maxHeight: "100vh",
//               overflowY: "auto",
//               padding: 1,
//               borderRadius: 2,
//             }}
//           >
//             {verifyTheRole()
//               ? sortedPosts.map((post) => (
//                   <div key={post._id} style={{ marginTop: "10px" }}>
//                     <Inbox post={post} setCurrentId={setCurrentId} />
//                     <Divider sx={{ borderWidth: "1px" }} />
//                   </div>
//                 ))
//               : verifyManager()
//               ? sortedPosts.map(
//                   (post) =>
//                     post.department === user.result.department && (
//                       <div key={post._id} style={{ marginTop: "10px" }}>
//                         <Inbox post={post} setCurrentId={setCurrentId} />
//                         <Divider sx={{ borderWidth: "1px" }} />
//                       </div>
//                     )
//                 )
//               : sortedPosts.map(
//                   (post) =>
//                     post._id === user.result._id && (
//                       <div key={post._id} style={{ marginTop: "10px" }}>
//                         <Inbox post={post} setCurrentId={setCurrentId} />
//                         <Divider sx={{ borderWidth: "1px" }} />
//                       </div>
//                     )
//                 )}
//           </Grid>

//           {/* Message Body Section */}
//           <Grid
//             item
//             xs={12}
//             md={8}
//             sx={{
//               maxHeight: "100vh",
//               overflowY: "auto",
//               bgcolor: "white",
//               padding: 2,
//               borderRadius: 2,
//               backgroundImage: `url(${InboxBodyImage})`,
//               // backgroundSize: "contain", // or "cover", "auto" based on your design
//               backgroundRepeat: "no-repeat",
//               backgroundPosition: "center",
//             }}
//           >
//             {user &&
//               posts.map(
//                 (post) =>
//                   post._id === currentId && (
//                     <div key={post._id}>
//                       <MessageBody post={post} currentId={currentId} />
//                     </div>
//                   )
//               )}
//           </Grid>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default Communication;

import React, { useState, useEffect } from "react";
import { Grid, Divider, Button, Box, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import Inbox from "./Inbox/inbox";
import MessageBody from "./Message/MessageBody";
import { getPosts } from "../../../action/posts";
// import InboxBodyImage from "../../../../src/assets/Inbox.gif";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Communication = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [currentId, setCurrentId] = useState(user.result.id);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const navigate = useNavigate();

  const matches = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, currentId]);

  const verifyTheRole = () => {
    if (user.result.role === "admin") return true;
    if (
      user.result.role === "manager" &&
      user.result.department.toLowerCase() === "human resource"
    )
      return true;
    return false;
  };

  const verifyManager = () => user.result.role === "manager";

  const sortedPosts = [...posts].sort((a, b) => {
    const nameA = a.firstName.toLowerCase() + " " + a.lastName.toLowerCase();
    const nameB = b.firstName.toLowerCase() + " " + b.lastName.toLowerCase();
    return nameA.localeCompare(nameB);
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Button
          onClick={handleGoBack}
          sx={{
            color: "#16355d",
            display: { xs: "none", sm: "inline-flex" },
          }}
        >
          <ArrowBackIcon />
        </Button>
        <Typography
          variant="h5"
          sx={{ ml: 2, fontWeight: 600, color: "#16355d" }}
        >
          Message Center
        </Typography>
      </Box>

      {/* Layout */}
      <Grid container spacing={2}>
        {/* Inbox */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            elevation={2}
            sx={{
              p: 1,
              borderRadius: 2,
              height: "calc(100vh - 150px)",
              overflowY: "auto",
            }}
          >
            {verifyTheRole()
              ? sortedPosts.map((post) => (
                  <Box key={post._id} sx={{ mb: 1 }}>
                    <Inbox post={post} setCurrentId={setCurrentId} />
                    <Divider />
                  </Box>
                ))
              : verifyManager()
              ? sortedPosts.map(
                  (post) =>
                    post.department === user.result.department && (
                      <Box key={post._id} sx={{ mb: 1 }}>
                        <Inbox post={post} setCurrentId={setCurrentId} />
                        <Divider />
                      </Box>
                    )
                )
              : sortedPosts.map(
                  (post) =>
                    post._id === user.result._id && (
                      <Box key={post._id} sx={{ mb: 1 }}>
                        <Inbox post={post} setCurrentId={setCurrentId} />
                        <Divider />
                      </Box>
                    )
                )}
          </Paper>
        </Grid>

        {/* Message Body */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 2,
              height: "calc(100vh - 150px)",
              overflowY: "auto",
              backgroundImage: `url("https://res.cloudinary.com/realtimeapp/image/upload/v1727179087/samples/landscapes/beach-boat.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {user &&
              posts.map(
                (post) =>
                  post._id === currentId && (
                    <Box key={post._id}>
                      <MessageBody post={post} currentId={currentId} />
                    </Box>
                  )
              )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Communication;
