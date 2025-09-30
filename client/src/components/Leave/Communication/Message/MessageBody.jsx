// // import React, { useEffect, useState } from "react";
// // import { useDispatch } from "react-redux";
// // import { getPost, updateStatus } from "../../../../action/posts";
// // import { useNavigate } from "react-router-dom";
// // import { Card, Typography, Avatar, Grid } from "@mui/material";

// // import CheckSharpIcon from "@mui/icons-material/CheckSharp";
// // import ClearSharpIcon from "@mui/icons-material/ClearSharp";

// // const Message = ({ post, currentId }) => {
// //   const [activeStatus, setActiveStatus] = useState({ status: "pending" });
// //   const [isLoading, setLoading] = useState(false);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const user = JSON.parse(localStorage.getItem("profile"));

// //   let array = [];

// //   const updateArray = async (post) => {
// //     const array = [];
// //     for (let index = 0; index < post.recipient.length; index++) {
// //       await array.push({
// //         emailTo: post.recipient[index],
// //         subject: post.subject[index],
// //         message: post.requiredMessage[index],
// //         status: post.status[index],
// //       });
// //     }
// //     setLoading(false);
// //   };

// //   useEffect(() => {
// //     if (isLoading === true) {
// //       dispatch(getPost(currentId));
// //       updateArray();
// //       setLoading(false);
// //     } else {
// //       console.log("there is  no change in the data");
// //       // updateArray();
// //     }
// //   }, [currentId, dispatch, isLoading]);

// //   //  ----------------- handle accept----------------------
// //   const handleAccept = () => {
// //     if (activeStatus.status === "pending") {
// //       setActiveStatus({ ...activeStatus, status: "Accepted" });
// //       dispatch(updateStatus(post._id, { status: "Accepted" }));
// //     } else {
// //       console.log("Status already set");
// //     }
// //     setActiveStatus({ ...activeStatus, status: "Accepted" });
// //     navigate("/home");
// //   };

// //   // ---------------handle reject ---------------------------

// //   const handleReject = () => {
// //     if (activeStatus.status === "pending") {
// //       setActiveStatus({ ...activeStatus, status: "Rejected" });
// //       dispatch(updateStatus(post._id, { status: "Rejected" }));
// //     } else {
// //       console.log("Status already set");
// //     }
// //     setActiveStatus({ ...activeStatus, status: "Rejected" });
// //     navigate("/home");
// //   };

// //   const verifyTheRole = () => {
// //     if (user.result.role === "admin" || user.result.role === "manager") {
// //       return true;
// //     } else {
// //       return false;
// //     }
// //   };

// //   for (let index = 0; index < post.recipient.length; index++) {
// //     array.push({
// //       emailTo: post.recipient[index],
// //       subject: post.subject[index],
// //       message: post.requiredMessage[index],
// //       status: post.status[index],
// //     });
// //   }

// //   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       setWindowWidth(window.innerWidth);
// //     };

// //     window.addEventListener("resize", handleResize);

// //     return () => {
// //       window.removeEventListener("resize", handleResize);
// //     };
// //   }, []);

// //   return (
// //     currentId && (
// //       <Grid item xs={12} md={12} justifyContent="center">
// //         {array.map((item, index) => (
// //           <Card
// //             key={index}
// //             elevation={10}
// //             sx={{
// //               padding: "10px",
// //               margin: "5px",
// //               display: "flex",
// //               flexDirection: "column",
// //               justifyContent: "space-between",
// //               bgcolor: "white",
// //               width: "auto",
// //               borderRadius: "12px",

// //               "@media (maxWidth: 600px)": {
// //                 width: "300px",
// //               },
// //             }}
// //           >
// //             <div key={post.login} className="translate-x-[42%]">
// //               <Typography
// //                 sx={{
// //                   textAlign: "center",
// //                   padding: "5px",
// //                   // fontWeight: "bold",
// //                   fontFamily: "Roboto",
// //                   // fontWeight: "bold",
// //                   color: "#16355c",
// //                 }}
// //               >
// //                 {item.subject}
// //               </Typography>
// //             </div>
// //             <div className="grid grid-rows-2 justify-between items-center">
// //               <div style={{ display: "flex", justifyContent: "space-between" }}>
// //                 <div
// //                   key={post.selectedFile}
// //                   style={{
// //                     display: "flex",
// //                     flexDirection: "row",
// //                     alignContent: "center",
// //                   }}
// //                 >
// //                   <Avatar
// //                     alt="avatar"
// //                     src={post.selectedFile}
// //                     size="xs"
// //                     withBorder="true"
// //                     className="p-0.5"
// //                   />
// //                   <Typography
// //                     sx={{
// //                       marginLeft: "10px",
// //                       marginTop: "5px",
// //                       fontFamily: "Roboto",
// //                       fontWeight: "bold",
// //                       color: "#16355c",
// //                     }}
// //                   >
// //                     {post?.firstName.charAt(0).toUpperCase() +
// //                       post?.firstName.slice(1).toLowerCase() +
// //                       " " +
// //                       post?.lastName.charAt(0).toUpperCase() +
// //                       post?.lastName.slice(1).toLowerCase()}
// //                   </Typography>
// //                 </div>
// //                 {item.status ? (
// //                   <Typography
// //                     sx={{
// //                       marginTop: "5px",
// //                       float: "right",
// //                       fontFamily: "Roboto",
// //                       fontWeight: "bold",
// //                       color: "#16355c",
// //                     }}
// //                   >
// //                     Status :{item.status}
// //                   </Typography>
// //                 ) : (
// //                   <Typography
// //                     sx={{
// //                       marginTop: "5px",
// //                       fontFamily: "Roboto",
// //                       fontWeight: "bold",
// //                       color: "#1aba7d",
// //                     }}
// //                   >
// //                     Status : Pending
// //                   </Typography>
// //                 )}
// //               </div>
// //               <div
// //                 key={post.punching}
// //                 style={{
// //                   // border: "2px solid #e55d17",
// //                   padding: "2px",
// //                   marginTop: "10px",
// //                 }}
// //               >
// //                 <textarea
// //                   style={{
// //                     margin: "2px",
// //                     // resize: "none",
// //                     height: "150px",
// //                     width: windowWidth <= 600 ? "200px" : "800px",
// //                     backgroundColor: "white",
// //                   }}
// //                   defaultValue={item.message}
// //                 ></textarea>
// //               </div>
// //               <div
// //                 key={post._id}
// //                 style={{
// //                   display: "flex",
// //                   justifyContent: "space-evenly",
// //                   marginTop: "10px",
// //                 }}
// //               >
// //                 {verifyTheRole() &&
// //                 item.status !== "Accepted" &&
// //                 item.status !== "Rejected" ? (
// //                   <>
// //                     <button
// //                       style={{ fontFamily: "Roboto" }}
// //                       variant="contained"
// //                       onClick={handleAccept}
// //                     >
// //                       <CheckSharpIcon />
// //                       Accept
// //                     </button>
// //                     <button
// //                       style={{ fontFamily: "Roboto" }}
// //                       variant="contained"
// //                       onClick={handleReject}
// //                     >
// //                       <ClearSharpIcon />
// //                       Reject
// //                     </button>
// //                   </>
// //                 ) : (
// //                   <div>Please check your status above..!!</div>
// //                 )}
// //               </div>
// //             </div>
// //           </Card>
// //         ))}
// //       </Grid>
// //     )
// //   );
// // };

// // export default Message;

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { getPost, updateStatus } from "../../../../action/posts";
// import { useNavigate } from "react-router-dom";
// import { Card, Typography, Avatar, Grid, Button, Box } from "@mui/material";
// import CheckSharpIcon from "@mui/icons-material/CheckSharp";
// import ClearSharpIcon from "@mui/icons-material/ClearSharp";

// const Message = ({ post, currentId }) => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("profile"));

//   const verifyTheRole = () =>
//     user.result.role === "admin" || user.result.role === "manager";

//   useEffect(() => {
//     const handleResize = () => setWindowWidth(window.innerWidth);
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const recipientArray = post.recipient.map((_, index) => ({
//     emailTo: post.recipient[index],
//     subject: post.subject[index],
//     message: post.requiredMessage[index],
//     status: post.status[index],
//   }));

//   const handleStatusChange = (status) => {
//     if (post.status !== "Accepted" && post.status !== "Rejected") {
//       dispatch(updateStatus(post._id, { status }));
//       navigate("/home");
//     }
//   };

//   return (
//     currentId && (
//       <Grid container spacing={3} justifyContent="center">
//         {recipientArray.map((item, index) => (
//           <Grid item xs={12} sm={10} md={8} key={index}>
//             <Card
//               elevation={6}
//               sx={{
//                 p: 3,
//                 borderRadius: 3,
//                 bgcolor: "#fefefe",
//                 boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
//               }}
//             >
//               {/* Header */}
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar src={post.selectedFile} alt="avatar" sx={{ mr: 2 }} />
//                 <Typography variant="h6" color="#16355c" fontWeight="bold">
//                   {post.firstName.charAt(0).toUpperCase() +
//                     post.firstName.slice(1).toLowerCase() +
//                     " " +
//                     post.lastName.charAt(0).toUpperCase() +
//                     post.lastName.slice(1).toLowerCase()}
//                 </Typography>
//                 <Box flexGrow={1} />
//                 <Typography
//                   variant="subtitle2"
//                   color={item.status === "Pending" ? "#1aba7d" : "#16355c"}
//                 >
//                   Status: {item.status || "Pending"}
//                 </Typography>
//               </Box>

//               {/* Subject */}
//               <Typography
//                 variant="subtitle1"
//                 fontWeight="bold"
//                 color="#16355c"
//                 mb={2}
//               >
//                 {item.subject}
//               </Typography>

//               {/* Message */}
//               <Box mb={2}>
//                 <textarea
//                   style={{
//                     width: "100%",
//                     minHeight: "150px",
//                     padding: "10px",
//                     borderRadius: "8px",
//                     border: "1px solid #ddd",
//                     fontFamily: "Roboto",
//                     fontSize: "14px",
//                     resize: "vertical",
//                     backgroundColor: "#fafafa",
//                   }}
//                   defaultValue={item.message}
//                 ></textarea>
//               </Box>

//               {/* Action Buttons */}
//               {verifyTheRole() &&
//               item.status !== "Accepted" &&
//               item.status !== "Rejected" ? (
//                 <Box display="flex" justifyContent="flex-end" gap={2}>
//                   <Button
//                     variant="contained"
//                     color="success"
//                     startIcon={<CheckSharpIcon />}
//                     onClick={() => handleStatusChange("Accepted")}
//                   >
//                     Accept
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="error"
//                     startIcon={<ClearSharpIcon />}
//                     onClick={() => handleStatusChange("Rejected")}
//                   >
//                     Reject
//                   </Button>
//                 </Box>
//               ) : (
//                 <Typography textAlign="center" color="gray">
//                   Please check your status above.
//                 </Typography>
//               )}
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     )
//   );
// };

// export default Message;


// new code

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPost, updateStatus } from "../../../../action/posts";
import { useNavigate } from "react-router-dom";
import { Card, Typography, Avatar, Grid, Button, Box } from "@mui/material";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";

const Message = ({ post, currentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [isLoading, setIsLoading] = useState(false);

  const verifyTheRole = () =>
    user.result.role === "admin" || user.result.role === "manager";

  const recipientArray = post.recipient.map((_, index) => ({
    emailTo: post.recipient[index],
    subject: post.subject[index],
    message: post.requiredMessage[index],
    status: post.status[index],
  }));

  // const handleStatusChange = (status) => {
  //   if (post.status !== "Accepted" && post.status !== "Rejected") {
  //     setIsLoading(true);
  //     dispatch(updateStatus(post._id, { status })).then(() => {return alert("Status is changed")});
  //   }
  //   // navigate(`/mail/${user?.result?._id}/communication`);
  //   alert("Status is changed")
  //   // window.location.reload();
  //   navigate(`/mail/${user?.result?._id}/communication`);
  // };

  const handleStatusChange = async (status) => {
  if (post.status !== "Accepted" && post.status !== "Rejected") {
    try {
      setIsLoading(true);
      await dispatch(updateStatus(post._id, { status }));
      alert("Status is changed");
      navigate("/home");
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Something went wrong!");
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  }
};


  const getCardColor = (status) => {
    switch (status) {
      case "Accepted":
        return "#d4edda"; // green background
      case "Rejected":
        return "#f8d7da"; // red background
      default:
        return "#ffffff"; // white for pending
    }
  };

  return (
    currentId && (
      <Grid container spacing={3} justifyContent="center">
        {recipientArray.map((item, index) => (
          <Grid item xs={12} sm={10} md={8} key={index}>
            <Card
              elevation={6}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: getCardColor(item.status),
                boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0px 12px 25px rgba(0,0,0,0.18)",
                },
              }}
            >
              {/* Header */}
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={post.selectedFile} alt="avatar" sx={{ mr: 2 }} />
                <Typography variant="h6" color="#16355c" fontWeight="bold">
                  {post.firstName.charAt(0).toUpperCase() +
                    post.firstName.slice(1).toLowerCase() +
                    " " +
                    post.lastName.charAt(0).toUpperCase() +
                    post.lastName.slice(1).toLowerCase()}
                </Typography>
                <Box flexGrow={1} />
                <Typography
                  variant="subtitle2"
                  color={
                    item.status === "Accepted"
                      ? "#155724"
                      : item.status === "Rejected"
                      ? "#721c24"
                      : "#1aba7d"
                  }
                  fontWeight="bold"
                >
                  Status: {item.status || "Pending"}
                </Typography>
              </Box>

              {/* Subject */}
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="#16355c"
                mb={2}
              >
                {item.subject}
              </Typography>

              {/* Message */}
              <Box mb={2}>
                <textarea
                  style={{
                    width: "100%",
                    minHeight: "150px",
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    resize: "vertical",
                    backgroundColor: "#fafafa",
                  }}
                  defaultValue={item.message}
                ></textarea>
              </Box>

              {/* Action Buttons */}
              {verifyTheRole() &&
              item.status !== "Accepted" &&
              item.status !== "Rejected" ? (
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckSharpIcon />}
                    onClick={() => handleStatusChange("Accepted")}
                    disabled={isLoading}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<ClearSharpIcon />}
                    onClick={() => handleStatusChange("Rejected")}
                    disabled={isLoading}
                  >
                    Reject
                  </Button>
                </Box>
              ) : (
                <Typography textAlign="center" color="gray">
                  Status finalized.
                </Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Message;