// import { ButtonBase, Typography, Avatar, Grid, Divider } from "@mui/material";
// import React, { useState, useEffect } from "react";

// const Inbox = ({ post, setCurrentId }) => {
//   const [isClicked, setIsClicked] = useState(false);
//   const [clickedId, setClickedId] = useState();

//   useEffect(() => {
//     setClickedId(post._id);
//   }, [clickedId]); // Log the updated clickedId when it changes

//   const openMessage = (e) => {
//     e.stopPropagation();
//     setCurrentId(post._id);
//     if (clickedId === post._id) {
//       setIsClicked(true);
//     } else setIsClicked(!isClicked);
//   };

//   // 🔒 Exclude Admin roles (case-insensitive)
//   if (post?.role?.toLowerCase() === "admin") {
//     return null; // Do not render anything
//   }

//   const formatFullName = (first, last) => {
//     return `${first} ${last}`
//       .trim()
//       .split(/\s+/)
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   return (
//     <>
//       <ButtonBase
//         xs={12}
//         md={12}
//         required
//         fullwidth="true"
//         sx={{
//           bgcolor: "white",
//           boxShadow: 9,
//           // width: "250px",
//           // padding: "5px",
//           // height: "80px",
//           margin: "2px",

//           borderRadius: "12px",
//         }}
//         onClick={openMessage}
//         // onMouseEnter={handleMouseEnter}
//       >
//         <Grid
//           item
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "space-between",
//             // marginRight: "10px",
//             // marginLeft: "10px",
//           }}
//         >
//           <Grid sx={{ padding: "10px" }}>
//             <Avatar
//               alt="avatar"
//               src={post?.selectedFile}
//               withborder="true"
//               color="green"
//             />
//           </Grid>
//           <Grid sx={{ width: "240px", padding: "10px" }}>
//             <Typography
//               variant="h6"
//               color="#16355c"
//               sx={{ fontFamily: "Roboto" }}
//             >
//               {formatFullName(post?.firstName, post?.lastName)}
//             </Typography>
//           </Grid>
//         </Grid>

//         {/* <div width="calc(50%)">
//           <Typography variant="h5" color="black">
//             {post?.firstName}
//           </Typography>
//         </div> */}
//       </ButtonBase>
//       {/* </Button> */}
//     </>
//   );
// };

// export default Inbox;

//  all avatar should align in same distance from right margin

import { ButtonBase, Typography, Avatar, Box } from "@mui/material";
import React, { useState } from "react";

const Inbox = ({ post, setCurrentId }) => {
  const [isClicked, setIsClicked] = useState(false);

  // Exclude Admin roles
  if (post?.role?.toLowerCase() === "admin") return null;

  const openMessage = (e) => {
    e.stopPropagation();
    setCurrentId(post._id);
    setIsClicked((prev) => !prev);
  };

  // Format full name
  const formatFullName = (first, last) => {
    const f = first || "";
    const l = last || "";
    return `${f} ${l}`
      .trim()
      .split(/\s+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const fullName = formatFullName(post?.firstName, post?.lastName);

  return (
    <ButtonBase
      onClick={openMessage}
      sx={{
        width: "100%",
        bgcolor: isClicked ? "#f0f4ff" : "white",
        borderRadius: 2,
        boxShadow: 3,
        padding: 1.5,
        display: "flex",
        alignItems: "center",
        transition: "all 0.2s ease",
        "&:hover": {
          bgcolor: "#e6f0ff",
          transform: "translateY(-2px)",
          boxShadow: 6,
        },
        marginBottom: 1.5,
        textAlign: "left",
      }}
    >
      <Avatar
        alt={post?.firstName || "User"}
        src={post?.selectedFile}
        sx={{ width: 56, height: 56, marginRight: 2 }}
      >
        {post?.firstName ? post.firstName.charAt(0) : "U"}
      </Avatar>

      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <Typography variant="subtitle1" fontWeight={600} color="#16355c" noWrap>
          {fullName}
        </Typography>

        {post?.lastMessage && (
          <Typography
            variant="body2"
            color="text.secondary"
            noWrap
            sx={{ textOverflow: "ellipsis" }}
          >
            {post.lastMessage}
          </Typography>
        )}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
        {post?.timeAgo || "Just now"}
      </Typography>
    </ButtonBase>
  );
};

export default Inbox;
