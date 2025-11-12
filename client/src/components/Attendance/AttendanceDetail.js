// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   Typography,
//   Grid,
//   Divider,
//   Card,
//   Box,
//   Checkbox,
//   Button,
//   Avatar,
//   Stack,
// } from "@mui/material";

// import { getPosts } from "../../action/posts";
// import {
//   getAttendancePosts,
//   updateAttendance,
//   logList,
// } from "../../action/attendance";
// import { dailyAttendance } from "../../action/posts";
// // import HalfDoughnutWithPointer from "../Attendance/AttendanceChart";
// import PunctualityRadarChart from "./AttendanceChart";
// import Panel from "../Panel/Panel";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import LoadingSpinner from "../ReactSpinner/reactSpinner";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// const AttendanceDetail = ({ currentId, attend, posts, attendanceFiles }) => {
//   const dispatch = useDispatch();

//   const user = JSON.parse(localStorage.getItem("profile"));

//   const navigate = useNavigate();

//   const [totalHours, setTotalHours] = useState(null);

//   const [hoveredData, setHoveredData] = useState(false);

//   const [editIndex, setEditIndex] = useState(-1);

//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");

//   const [formData, setFormData] = useState({
//     presentEmployee: "",
//     absentEmployee: "",
//   });

//   // const auth =

//   const [logData, setLogData] = useState({
//     logDate: "",
//     logIn: "",
//     logOut: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const array = [];

//   // useEffect(() => {
//   //   currentId && setTotalHours(null);
//   // }, [currentId]);

//   useEffect(() => {
//     array.length = 0;
//     dispatch(getAttendancePosts()).then(() => {
//       attend.map((a) => {
//         if (a._id === currentId) {
//           // console.log(post.logIn);
//           for (let i = 0; i < a.logIn.length; i++) {
//             array.push({
//               logIn: a.logIn[i],
//               // editIndex: post.editIndex[i],
//             });
//           }
//         }
//       });
//     });
//   }, [currentId, dispatch]);

//   //  changes the "handle submit" code as window.location.relaod() is not good practice for sending response to server side
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault(); // Prevent default form submission
//   //   if (isSubmitting) return; // Prevent duplicate submissions

//   //   setIsSubmitting(true);
//   //   await dispatch(logList(logData, currentId))
//   //     .then(() => {
//   //       alert("Successfully Logged!");

//   //       // Update the state or perform any necessary updates instead of reloading
//   //     })
//   //     .catch((err) => {
//   //       console.log(err);
//   //     })
//   //     .finally(() => {
//   //       setIsSubmitting(false); // Reset the form submission state
//   //     });

//   //   window.location.reload();
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     setIsSubmitting(true);

//     try {
//       if (editIndex >= 0) {
//         // 🔹 UPDATE existing record
//         await dispatch(updateAttendance(currentId, editIndex, logData));
//         alert("Successfully Updated!");
//       } else {
//         // 🔹 ADD new record
//         await dispatch(logList(logData, currentId));
//         alert("Successfully Logged!");
//       }
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setIsSubmitting(false);
//       setEditIndex(-1); // reset edit mode
//       setLogData({ logDate: "", logIn: "", logOut: "" }); // clear form
//     }
//     window.location.reload();
//   };

//   const handleAttendanceSubmit = (e) => {
//     e.preventDefault();
//     dispatch(dailyAttendance(formData));
//     navigate("/home");
//   };

//   // eslint-disable-next-line array-callback-return
//   attend.map((a) => {
//     if (a._id === currentId) {
//       for (let i = 0; i < a.logDate.length; i++) {
//         array.push({
//           logDate: a.logDate[i],
//           logIn: a.logIn[i],
//           logOut: a.logOut[i],
//         });
//       }
//     }
//   });

//   const role = user.result.role;

//   const verifyTheRole = () => {
//     if (user.result.role === "admin") {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   const calculateTotalHours = (logIn, logOut) => {
//     if (logIn && logOut) {
//       const loginTime = new Date(`01/01/2022 ${logIn}`);
//       const logoutTime = new Date(`01/01/2022 ${logOut}`);
//       const diffInMilliseconds = logoutTime - loginTime;
//       const diffInHours = diffInMilliseconds / (1000 * 60 * 60);
//       return diffInHours.toFixed(2);
//     }
//     return null;
//   };

//   const handleHoverDate = (logDate) => {
//     setHoveredData(true);
//     const hoveredLog = array.find((item) => item.logDate === logDate);
//     if (hoveredLog) {
//       // Calculate total hours for the hovered log date
//       const totalHours = calculateTotalHours(
//         hoveredLog.logIn,
//         hoveredLog.logOut
//       );

//       // Update state with the total hours
//       setTotalHours(totalHours);
//     } else {
//       // If no matching log is found, reset total hours to null
//       setTotalHours(null);
//     }
//   };

//   const [checked, setChecked] = React.useState(false);

//   const headerDateCellStyle = {
//     padding: "12px",
//     width: "300px",
//     fontFamily: "Roboto",
//     fontSize: "14px",
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "white",
//     backgroundColor: "#16355d",
//   };

//   const headerCellStyle = {
//     padding: "12px",
//     fontFamily: "Roboto",
//     fontSize: "14px",
//     fontWeight: "bold",
//     textAlign: "center",
//     color: "white",
//     backgroundColor: "#16355d",
//   };

//   const cellStyle = {
//     padding: "16px",
//     fontFamily: "Roboto",
//     fontSize: "14px",
//     textAlign: "center",
//     verticalAlign: "middle",
//     backgroundColor: "#f9f9f9",
//     borderRadius: "12px",
//   };

//   const loginStyle = {
//     backgroundColor: "#d4f6dd",
//     color: "#1a8f46",
//     padding: "8px 16px",
//     borderRadius: "12px",
//     fontWeight: "500",
//     display: "inline-block",
//     fontFamily: "Roboto",
//   };

//   const logoutStyle = {
//     backgroundColor: "#ffe6d9",
//     color: "#e55d17",
//     padding: "8px 16px",
//     borderRadius: "12px",
//     fontWeight: "500",
//     display: "inline-block",
//     fontFamily: "Roboto",
//   };

//   const logdayStyle = {
//     backgroundColor: "#f5f376ff",
//     color: "#494814ff",
//     padding: "8px 16px",
//     borderRadius: "12px",
//     fontWeight: "500",
//     display: "inline-block",
//     fontFamily: "Roboto",
//     width: "100px", // fixed width
//     textAlign: "center", // keeps text centered
//     marginLeft: "30px",
//   };

//   const handleGoBack = () => {
//     navigate(-1); // this means "go back one step in history"
//   };

//   //Logic for clearing the form.........
//   const clearForm = () => {
//     setLogData({ logDate: "", logIn: "", logOut: "" });
//     setEditIndex(-1);
//   };

//   //To Edit the entry....!!!!
//   const editEntry = (index) => {
//     let updatedArray = updateArray();

//     setEditIndex(index);
//     setLogData({
//       logDate: updatedArray[index].logDate,
//       logIn: updatedArray[index].logIn,
//       logOut: updatedArray[index].logOut,
//     });
//   };

//   const updateArray = () => {
//     const newArray = [];
//     attend.forEach((a) => {
//       if (a._id === currentId) {
//         for (let i = 0; i < a.logDate.length; i++) {
//           newArray.push({
//             logDate: a.logDate[i],
//             logIn: a.logIn[i],
//             logOut: a.logOut[i],
//           });
//         }
//       }
//     });
//     return newArray;
//   };

//   const matchedPost = posts.find((post) => post._id === currentId);

//   const empAttendance = attendanceFiles.filter(
//     (item) => item.employeeId === matchedPost?.employeeId
//   );

//   // 🔹 Extract unique years from empAttendance data
//   const availableYears = Array.from(
//     new Set(
//       empAttendance.flatMap((item) =>
//         item?.dates?.map((dateStr) => new Date(dateStr).getFullYear())
//       )
//     )
//   )
//     .filter(Boolean)
//     .sort((a, b) => b - a); // sort descending (latest first)

//   return (
//     <div style={{ height: "auto" }}>
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
//           style={{ color: "#16355d", marginLeft: "20px", fontFamily: "Roboto" }}
//         >
//           Employee Attendance
//         </h2>
//       </div>

//       <Divider sx={{ fontSize: "50px", fontWeight: "bold" }} />

//       <Grid
//         container
//         sx={{
//           display: "flex",
//           flexGrow: 1,
//           alignItems: "stretch",

//           "@media (max-width: 600px)": {
//             flexDirection: "column",
//             // width: "50%",
//           },
//         }}
//       >
//         <Grid
//           item
//           xs={12}
//           md={3.5}
//           sx={{
//             // display: "flex",
//             padding: "20px",
//             width: "100%",
//             backgroundColor: "white",
//             borderRadius: "15px",
//             margin: "0px 5px 2px 10px",
//           }}
//         >
//           {verifyTheRole() && (
//             <>
//               <form className="time-sheet-form" onSubmit={handleSubmit}>
//                 <div
//                   style={{
//                     border: "1px solid #ccc",
//                     borderRadius: "16px",
//                     padding: "24px",
//                     maxWidth: "400px",
//                     backgroundColor: "#f9f9f9",
//                     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                     marginBottom: "auto",
//                     marginLeft: "auto",
//                     marginRight: "auto",
//                   }}
//                 >
//                   <Stack
//                     direction="row"
//                     justifyContent="center"
//                     alignItems="center"
//                     sx={{
//                       mt: 2,
//                     }}
//                   >
//                     <Avatar
//                       sx={{
//                         width: 50,
//                         height: 50,
//                         // marginLeft: "10px",
//                         justifyContent: "center",
//                         bgcolor: "orange",
//                         userSelect: "none", // Prevent selection
//                         pointerEvents: "none", // Prevent interaction
//                       }}
//                       src={user.result.selectedFile}
//                     />
//                   </Stack>
//                   <Typography
//                     sx={{
//                       fontFamily: "Roboto",
//                       fontWeight: "bold",
//                       margin: "5px",
//                       textAlign: "center",
//                       color: "#16355d",
//                     }}
//                   >
//                     {posts.map((post) => {
//                       if (post._id === currentId) {
//                         const firstName = post?.firstName
//                           ? post.firstName.charAt(0).toUpperCase() +
//                             post.firstName.slice(1).toLowerCase()
//                           : "";

//                         const lastName = post?.lastName
//                           ? post.lastName.charAt(0).toUpperCase() +
//                             post.lastName.slice(1).toLowerCase()
//                           : "";

//                         return (
//                           <span key={post._id}>
//                             {firstName} {lastName}
//                           </span>
//                         );
//                       }
//                       return null;
//                     })}
//                   </Typography>

//                   <Box sx={{ display: "flex", justifyContent: "center" }}>
//                     {posts.map((post) => {
//                       if (post._id === currentId) {
//                         let statusText = "Not found";
//                         let statusColor = "grey";

//                         if (post) {
//                           if (post.presentStatus === "true") {
//                             statusText = "Present";
//                             statusColor = "green";
//                           } else if (post.presentStatus === "false") {
//                             statusText = "Absent";
//                             statusColor = "red";
//                           } else {
//                             statusText = "Unknown";
//                             statusColor = "orange";
//                           }
//                         }

//                         return (
//                           <Typography
//                             sx={{
//                               fontFamily: "Roboto",
//                               fontSize: 12,
//                               color: "white",
//                               bgcolor: statusColor,
//                               borderRadius: "12px",
//                               padding: "5px",
//                               width: "50%",
//                               textAlign: "center",
//                             }}
//                           >
//                             {statusText}
//                           </Typography>
//                         );
//                       }
//                       return null;
//                     })}
//                   </Box>
//                 </div>

//                 <div
//                   style={{
//                     border: "1px solid #ccc",
//                     borderRadius: "16px",
//                     padding: "24px",
//                     maxWidth: "400px",
//                     backgroundColor: "#f9f9f9",
//                     boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//                     marginTop: "10px",
//                     marginBottom: "auto",
//                     marginLeft: "auto",
//                     marginRight: "auto",
//                   }}
//                 >
//                   <div
//                     style={{
//                       borderRadius: "20px",
//                       padding: "32px 24px",
//                       maxWidth: "420px",
//                       background: "linear-gradient(145deg, #ffffff, #f3f6fa)",
//                       boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
//                       margin: "24px auto",
//                       backdropFilter: "blur(6px)",
//                       border: "1px solid rgba(22,53,93,0.1)",
//                       transition: "transform 0.2s ease, box-shadow 0.2s ease",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.transform = "translateY(-4px)";
//                       e.currentTarget.style.boxShadow =
//                         "0 12px 30px rgba(0,0,0,0.12)";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)";
//                       e.currentTarget.style.boxShadow =
//                         "0 8px 24px rgba(0,0,0,0.08)";
//                     }}
//                   >
//                     <Card
//                       sx={{
//                         borderRadius: "16px",
//                         padding: "24px",
//                         textAlign: "center",
//                         background: "linear-gradient(135deg, #f5f8fb, #ffffff)",
//                         boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
//                         border: "1px solid rgba(22,53,93,0.1)",
//                         transition: "all 0.3s ease",
//                         "&:hover": {
//                           transform: "translateY(-4px)",
//                           boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
//                         },
//                       }}
//                     >
//                       <CloudUploadIcon
//                         sx={{ fontSize: 48, color: "#16355d", mb: 1 }}
//                       />
//                       <Typography
//                         sx={{
//                           fontFamily: "Roboto",
//                           fontWeight: "700",
//                           color: "#16355d",
//                           fontSize: "1.1rem",
//                           marginBottom: "6px",
//                         }}
//                       >
//                         Upload Attendance
//                       </Typography>
//                       <Typography
//                         sx={{
//                           fontSize: "0.9rem",
//                           color: "#5b6c8a",
//                           marginBottom: "16px",
//                           fontFamily: "Inter, sans-serif",
//                         }}
//                       >
//                         Keep your records updated in one click.
//                       </Typography>
//                       <Button
//                         variant="contained"
//                         startIcon={<CloudUploadIcon />}
//                         sx={{
//                           background:
//                             "linear-gradient(90deg, #16355d, #1f497d)",
//                           borderRadius: "10px",
//                           textTransform: "none",
//                           fontWeight: 600,
//                           "&:hover": {
//                             background:
//                               "linear-gradient(90deg, #1f497d, #2b5ca8)",
//                           },
//                         }}
//                         onClick={() => navigate("/attend/attendance/upload")}
//                       >
//                         Go to Upload Section
//                       </Button>
//                     </Card>
//                   </div>

//                   <div className="form-group" style={{ marginBottom: "20px" }}>
//                     <label
//                       htmlFor="logDate"
//                       style={{
//                         display: "block",
//                         marginBottom: "6px",
//                         color: "#16355d",
//                         fontFamily: "Roboto",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       Date:
//                     </label>
//                     <input
//                       type="date"
//                       id="logDate"
//                       value={logData.logDate || ""}
//                       onChange={(e) =>
//                         setLogData({ ...logData, logDate: e.target.value })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "8px 12px",
//                         borderRadius: "8px",
//                         border: "1px solid #ccc",
//                         outlineColor: "#16355d",
//                       }}
//                     />
//                   </div>
//                   {/* LOG IN */}
//                   <div className="form-group" style={{ marginBottom: "20px" }}>
//                     <label
//                       htmlFor="logIn"
//                       style={{
//                         display: "block",
//                         marginBottom: "6px",
//                         color: "#16355d",
//                         fontFamily: "Roboto",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       Log In Time:
//                     </label>
//                     <input
//                       type="time"
//                       id="logIn"
//                       value={logData.logIn || ""}
//                       onChange={(e) =>
//                         setLogData({ ...logData, logIn: e.target.value })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "8px 12px",
//                         borderRadius: "8px",
//                         border: "1px solid #ccc",
//                         outlineColor: "#16355d",
//                       }}
//                     />
//                   </div>
//                   {/* LOG OUT */}
//                   <div className="form-group" style={{ marginBottom: "20px" }}>
//                     <label
//                       htmlFor="logOut"
//                       style={{
//                         display: "block",
//                         marginBottom: "6px",
//                         color: "#16355d",
//                         fontFamily: "Roboto",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       Log Out Time:
//                     </label>
//                     <input
//                       type="time"
//                       id="logOut"
//                       value={logData.logOut || ""}
//                       onChange={(e) =>
//                         setLogData({ ...logData, logOut: e.target.value })
//                       }
//                       style={{
//                         width: "100%",
//                         padding: "8px 12px",
//                         borderRadius: "8px",
//                         border: "1px solid #ccc",
//                         outlineColor: "#16355d",
//                       }}
//                     />
//                   </div>
//                   {/* SUBMIT BUTTON */}
//                   <div style={{ textAlign: "right" }}>
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       sx={{
//                         bgcolor: "#16355d",
//                         borderRadius: "8px",
//                         textTransform: "none",
//                         fontWeight: "bold",
//                         px: 3,
//                         py: 1,
//                         "&:hover": { bgcolor: "#122a4a" },
//                       }}
//                     >
//                       Submit
//                     </Button>
//                     {/* <button
//                       style={{
//                         fontFamily: "Roboto",
//                         cursor: isSubmitting ? "not-allowed" : "pointer",
//                         opacity: isSubmitting ? 0.6 : 1,
//                       }}
//                       type="submit"
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? (
//                         <div style={{ display: "flex" }}>
//                           Submitting...
//                           <LoadingSpinner size={16} color="#999" />
//                         </div>
//                       ) : editIndex !== -1 ? (
//                         "Update"
//                       ) : (
//                         "Submit"
//                       )}
//                     </button> */}
//                   </div>
//                 </div>
//               </form>
//             </>
//           )}
//           {(role === "employee" || role === "manager") && (
//             <>
//               <PunctualityRadarChart data={array} />
//             </>
//           )}{" "}
//         </Grid>

//         <Grid
//           xs={12}
//           md={6}
//           item
//           sx={{
//             display: "flex",
//             width: "100%",
//             padding: "2px",
//             marginLeft: "5px",
//             "@media (max-width: 600px)": {
//               flexDirection: "column",
//             },
//           }}
//         >
//           <Grid
//             item
//             sx={{
//               borderRadius: "15px",
//               backgroundColor: "white",
//               border: "1px solid lightgray",
//               padding: "10px",
//               overflow: "auto",
//               width: "100%",
//               top: "100px",
//               height: "950px",
//               minHeight: "300px",
//               pointerEvents: "auto",
//             }}
//           >
//             <Typography
//               style={{
//                 fontFamily: "Roboto",
//                 fontWeight: "bold",
//                 margin: "5px",
//                 color: "#16355d",
//                 textAlign: "center",
//               }}
//             >
//               Daily Time Records
//             </Typography>
//             <Divider sx={{ borderWidth: "3px", margin: "5px" }} />

//             {/* Month & Year Filters */}
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: "10px",
//                 marginBottom: "15px",
//               }}
//             >
//               <select
//                 value={selectedMonth}
//                 onChange={(e) => setSelectedMonth(e.target.value)}
//                 style={{
//                   padding: "6px 10px",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   outlineColor: "#16355d",
//                   fontFamily: "Roboto",
//                 }}
//               >
//                 <option value="">Select Month</option>
//                 {[
//                   "January",
//                   "February",
//                   "March",
//                   "April",
//                   "May",
//                   "June",
//                   "July",
//                   "August",
//                   "September",
//                   "October",
//                   "November",
//                   "December",
//                 ].map((month, index) => (
//                   <option key={index} value={index + 1}>
//                     {month}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 value={selectedYear}
//                 onChange={(e) => setSelectedYear(e.target.value)}
//                 style={{
//                   padding: "6px 10px",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   outlineColor: "#16355d",
//                   fontFamily: "Roboto",
//                 }}
//               >
//                 <option value="">Select Year</option>
//                 {availableYears.map((year) => (
//                   <option key={year} value={year}>
//                     {year}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <Divider sx={{ borderWidth: "3px", margin: "5px" }} />

//             <div>
//               <table
//                 style={{
//                   width: "100%",
//                   maxWidth: "800px",
//                   margin: "10px auto",
//                   borderCollapse: "separate",
//                   borderSpacing: "0 10px", // spacing between rows
//                 }}
//               >
//                 <thead style={{ borderRadius: "12px" }}>
//                   <tr style={{ borderRadius: "12px" }}>
//                     <th style={headerDateCellStyle}>Date</th>
//                     <th style={headerCellStyle}>Log In</th>
//                     <th style={headerCellStyle}>Log Out</th>
//                     {/* {role === "admin" ? (
//                       <th style={headerCellStyle}>Action</th>
//                     ) : (
//                       ""
//                     )} */}
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {empAttendance.map((item, index) =>
//                     item.dates
//                       .filter((dateStr) => {
//                         const dateObj = new Date(dateStr);
//                         const month = dateObj.getMonth() + 1;
//                         const year = dateObj.getFullYear();
//                         return (
//                           (!selectedMonth ||
//                             month === parseInt(selectedMonth)) &&
//                           (!selectedYear || year === parseInt(selectedYear))
//                         );
//                       })
//                       .map((dateStr, i) => {
//                         const dateObj = new Date(dateStr);
//                         const formatDate = `${dateObj
//                           .getUTCDate()
//                           .toString()
//                           .padStart(2, "0")}/${(dateObj.getUTCMonth() + 1)
//                           .toString()
//                           .padStart(2, "0")}/${dateObj.getUTCFullYear()}`;

//                         const day = dateObj.getDay();
//                         const date = dateObj.getDate();
//                         const weekOfMonth = Math.ceil(date / 7);
//                         const isSunday = day === 0;
//                         const is2nd4thSaturday =
//                           day === 6 && (weekOfMonth === 2 || weekOfMonth === 4);
//                         const isHoliday = isSunday || is2nd4thSaturday;

//                         const dayColor = isHoliday ? "white" : "#494814ff";
//                         const dayBg = isHoliday ? "red" : "#f5f376ff";
//                         const rowBg = isHoliday ? "#fcf0f0ff" : "#fff";

//                         return (
//                           <tr
//                             key={`${index}-${i}`}
//                             onClick={() => handleHoverDate(dateStr)}
//                             style={{
//                               backgroundColor: rowBg,
//                               boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
//                               borderRadius: "12px",
//                               textAlign: "center",
//                             }}
//                           >
//                             <td
//                               style={{
//                                 ...cellStyle,
//                                 borderRadius: "12px 0 0 12px",
//                               }}
//                             >
//                               {formatDate}
//                               <span
//                                 style={{
//                                   ...logdayStyle,
//                                   color: dayColor,
//                                   backgroundColor: dayBg,
//                                 }}
//                               >
//                                 {dateObj.toLocaleDateString("en-US", {
//                                   weekday: "long",
//                                 })}
//                               </span>
//                             </td>
//                             <td>
//                               <span style={loginStyle}>{item?.inTimes[i]}</span>
//                             </td>
//                             <td>
//                               <span style={logoutStyle}>
//                                 {item?.outTimes[i]}
//                               </span>
//                             </td>
//                             {/* {role === "admin" && (
//                             <td
//                               style={{
//                                 display: "flex",
//                                 justifyContent: "space-around",
//                                 padding: "10px",
//                                 textAlign: "center",
//                               }}
//                             >
//                               <button
//                                 id="editButton"
//                                 style={{ fontFamily: "Roboto" }}
//                                 onClick={() => editEntry(index)}
//                               >
//                                 Edit
//                               </button>
//                             </td>
//                           )} */}
//                           </tr>
//                         );
//                       })
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default AttendanceDetail;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Grid,
  Divider,
  Card,
  Box,
  Button,
  Avatar,
  Stack,
} from "@mui/material";

// import HalfDoughnutWithPointer from "../Attendance/AttendanceChart";
import PunctualityRadarChart from "./AttendanceChart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CircularHeatmap from "./AttendanceChart";

const AttendanceDetail = ({ currentId, posts, attendanceFiles }) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  const navigate = useNavigate();

  const today = new Date();
const currentMonth = today.getMonth() + 1; // getMonth() is zero-based
const currentYear = today.getFullYear();


const [selectedMonth, setSelectedMonth] = useState(currentMonth.toString());
const [selectedYear, setSelectedYear] = useState(currentYear.toString());


  const role = user.result.role;

  const verifyTheRole = () => {
    if (user.result.role === "admin") {
      return true;
    } else {
      return false;
    }
  };

  const headerDateCellStyle = {
    padding: "12px",
    width: "300px",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#16355d",
  };

  const headerCellStyle = {
    padding: "12px",
    fontFamily: "Roboto",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "#16355d",
  };

  const cellStyle = {
    padding: "16px",
    fontFamily: "Roboto",
    fontSize: "14px",
    textAlign: "center",
    verticalAlign: "middle",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
  };

  const loginStyle = {
    backgroundColor: "#d4f6dd",
    color: "#1a8f46",
    padding: "8px 16px",
    borderRadius: "12px",
    fontWeight: "500",
    display: "inline-block",
    fontFamily: "Roboto",
  };

  const logoutStyle = {
    backgroundColor: "#ffe6d9",
    color: "#e55d17",
    padding: "8px 16px",
    borderRadius: "12px",
    fontWeight: "500",
    display: "inline-block",
    fontFamily: "Roboto",
  };

  const logdayStyle = {
    backgroundColor: "#f5f376ff",
    color: "#494814ff",
    padding: "8px 16px",
    borderRadius: "12px",
    fontWeight: "500",
    display: "inline-block",
    fontFamily: "Roboto",
    width: "100px", // fixed width
    textAlign: "center", // keeps text centered
    marginLeft: "30px",
  };

  const handleGoBack = () => {
    navigate(-1); // this means "go back one step in history"
  };

  //Logic for clearing the form.........

  const matchedPost = posts.find((post) => post._id === currentId);

  const empAttendance = attendanceFiles.filter(
    (item) => item.employeeId === matchedPost?.employeeId
  );

  // 🔹 Extract unique years from empAttendance data
  const availableYears = Array.from(
    new Set(
      empAttendance.flatMap((item) =>
        item?.dates?.map((dateStr) => new Date(dateStr).getFullYear())
      )
    )
  )
    .filter(Boolean)
    .sort((a, b) => b - a); // sort descending (latest first)

  // ⚙️ Prepare data for CircularHeatmap
  const heatmapData = empAttendance.flatMap((item) =>
    item.dates
      .map((dateStr, i) => {
        const dateObj = new Date(dateStr);
        const login = item.inTimes?.[i];
        const logout = item.outTimes?.[i];
        if (!login || !logout) return null;

        // Convert "HH:mm" strings to Date objects
        const [loginH, loginM] = login.split(":").map(Number);
        const [logoutH, logoutM] = logout.split(":").map(Number);

        const loginTime = new Date(dateObj);
        loginTime.setHours(loginH, loginM);

        const logoutTime = new Date(dateObj);
        logoutTime.setHours(logoutH, logoutM);

        const hoursWorked = (logoutTime - loginTime) / (1000 * 60 * 60);

        const week = Math.ceil(dateObj.getDate() / 7);
        const dayName = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
        });

        // Filter month/year based on selection
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        if (
          (selectedMonth && month !== parseInt(selectedMonth)) ||
          (selectedYear && year !== parseInt(selectedYear))
        ) {
          return null;
        }

        return {
          day: dayName,
          week,
          hours: parseFloat(hoursWorked.toFixed(1)),
        };
      })
      .filter(Boolean)
  );

  return (
    <div style={{ height: "auto" }}>
      <div style={{ display: "flex" }}>
        <div style={{ display: "inline" }}>
          <Button
            onClick={handleGoBack}
            sx={{
              padding: "8px 16px",
              color: "#16355d",
              display: {
                xs: "none",
                sm: "inline-block",
              },
            }}
          >
            <ArrowBackIcon />
          </Button>
        </div>
        <h2
          style={{ color: "#16355d", marginLeft: "20px", fontFamily: "Roboto" }}
        >
          Employee Attendance
        </h2>
      </div>

      <Divider sx={{ fontSize: "50px", fontWeight: "bold" }} />

      <Grid
        container
        sx={{
          display: "flex",
          flexGrow: 1,
          alignItems: "stretch",

          "@media (max-width: 600px)": {
            flexDirection: "column",
            // width: "50%",
          },
        }}
      >
        <Grid
          item
          xs={12}
          md={3.5}
          sx={{
            // display: "flex",
            padding: "20px",
            width: "100%",
            backgroundColor: "white",
            borderRadius: "15px",
            margin: "0px 5px 2px 10px",
          }}
        >
          {verifyTheRole() && (
            <>
              <form className="time-sheet-form">
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "16px",
                    padding: "24px",
                    maxWidth: "400px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    marginBottom: "auto",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        // marginLeft: "10px",
                        justifyContent: "center",
                        bgcolor: "orange",
                        userSelect: "none", // Prevent selection
                        pointerEvents: "none", // Prevent interaction
                      }}
                      src={user.result.selectedFile}
                    />
                  </Stack>
                  <Typography
                    sx={{
                      fontFamily: "Roboto",
                      fontWeight: "bold",
                      margin: "5px",
                      textAlign: "center",
                      color: "#16355d",
                    }}
                  >
                    {posts.map((post) => {
                      if (post._id === currentId) {
                        const firstName = post?.firstName
                          ? post.firstName.charAt(0).toUpperCase() +
                            post.firstName.slice(1).toLowerCase()
                          : "";

                        const lastName = post?.lastName
                          ? post.lastName.charAt(0).toUpperCase() +
                            post.lastName.slice(1).toLowerCase()
                          : "";

                        return (
                          <span key={post._id}>
                            {firstName} {lastName}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </Typography>

                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    {posts.map((post) => {
                      if (post._id === currentId) {
                        let statusText = "Not found";
                        let statusColor = "grey";

                        if (post) {
                          if (post.presentStatus === "true") {
                            statusText = "Present";
                            statusColor = "green";
                          } else if (post.presentStatus === "false") {
                            statusText = "Absent";
                            statusColor = "red";
                          } else {
                            statusText = "Unknown";
                            statusColor = "orange";
                          }
                        }

                        return (
                          <Typography
                            sx={{
                              fontFamily: "Roboto",
                              fontSize: 12,
                              color: "white",
                              bgcolor: statusColor,
                              borderRadius: "12px",
                              padding: "5px",
                              width: "50%",
                              textAlign: "center",
                            }}
                          >
                            {statusText}
                          </Typography>
                        );
                      }
                      return null;
                    })}
                  </Box>
                </div>

                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "16px",
                    padding: "24px",
                    maxWidth: "400px",
                    backgroundColor: "#f9f9f9",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    marginTop: "10px",
                    marginBottom: "auto",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "32px 24px",
                      maxWidth: "420px",
                      background: "linear-gradient(145deg, #ffffff, #f3f6fa)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      margin: "24px auto",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(22,53,93,0.1)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow =
                        "0 12px 30px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 8px 24px rgba(0,0,0,0.08)";
                    }}
                  >
                    <Card
                      sx={{
                        borderRadius: "16px",
                        padding: "24px",
                        textAlign: "center",
                        background: "linear-gradient(135deg, #f5f8fb, #ffffff)",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                        border: "1px solid rgba(22,53,93,0.1)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                        },
                      }}
                    >
                      <CloudUploadIcon
                        sx={{ fontSize: 48, color: "#16355d", mb: 1 }}
                      />
                      <Typography
                        sx={{
                          fontFamily: "Roboto",
                          fontWeight: "700",
                          color: "#16355d",
                          fontSize: "1.1rem",
                          marginBottom: "6px",
                        }}
                      >
                        Upload Attendance
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.9rem",
                          color: "#5b6c8a",
                          marginBottom: "16px",
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        Keep your records updated in one click.
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          background:
                            "linear-gradient(90deg, #16355d, #1f497d)",
                          borderRadius: "10px",
                          textTransform: "none",
                          fontWeight: 600,
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #1f497d, #2b5ca8)",
                          },
                        }}
                        onClick={() => navigate("/attend/attendance/upload")}
                      >
                        Go to Upload Section
                      </Button>
                    </Card>
                  </div>
                </div>
              </form>
            </>
          )}
          {(role === "employee" || role === "manager") && (
            // <>
            //   {/* Prepare data for chart */}
            //   {(() => {
            //     const loginData = empAttendance
            //       .flatMap((item) =>
            //         item.dates.map((dateStr, i) => {
            //           const logIn = item.inTimes?.[i];
            //           if (!logIn) return null;
            //           return { logIn };
            //         })
            //       )
            //       .filter(Boolean);

            //     return <PunctualityRadarChart data={loginData} />;
            //   })()}
            // </>

            <>
    {(() => {
      const today = new Date();
      const currentMonth = today.getMonth() + 1;
      const currentYear = today.getFullYear();

      // Use selected month/year if provided, otherwise default to current
      const monthToShow = selectedMonth || currentMonth.toString();
      const yearToShow = selectedYear || currentYear.toString();

      // Filter and prepare data for the current month/year
      const loginData = empAttendance
        .flatMap((item) =>
          item.dates.map((dateStr, i) => {
            const dateObj = new Date(dateStr);
            const month = dateObj.getMonth() + 1;
            const year = dateObj.getFullYear();

            if (
              month === parseInt(monthToShow) &&
              year === parseInt(yearToShow)
            ) {
              const logIn = item.inTimes?.[i];
              if (!logIn) return null;
              return { logIn, date: dateObj };
            }
            return null;
          })
        )
        .filter(Boolean);

      return <PunctualityRadarChart data={loginData} />;
    })()}
  </>
          )}
        </Grid>

        <Grid
          xs={12}
          md={6}
          item
          sx={{
            display: "flex",
            width: "100%",
            padding: "2px",
            marginLeft: "5px",
            "@media (max-width: 600px)": {
              flexDirection: "column",
            },
          }}
        >
          <Grid
            item
            sx={{
              borderRadius: "15px",
              backgroundColor: "white",
              border: "1px solid lightgray",
              padding: "10px",
              overflow: "auto",
              width: "100%",
              top: "100px",
              height: "950px",
              minHeight: "300px",
              pointerEvents: "auto",
            }}
          >
            <Typography
              style={{
                fontFamily: "Roboto",
                fontWeight: "bold",
                margin: "5px",
                color: "#16355d",
                textAlign: "center",
              }}
            >
              Daily Time Records
            </Typography>
            <Divider sx={{ borderWidth: "3px", margin: "5px" }} />

            {/* Month & Year Filters */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outlineColor: "#16355d",
                  fontFamily: "Roboto",
                }}
              >
                <option value="">Select Year</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  outlineColor: "#16355d",
                  fontFamily: "Roboto",
                }}
              >
                <option value="">Select Month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month, index) => (
                  <option key={index} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <Divider sx={{ borderWidth: "3px", margin: "5px" }} />

            <div>
              <table
                style={{
                  width: "100%",
                  maxWidth: "800px",
                  margin: "10px auto",
                  borderCollapse: "separate",
                  borderSpacing: "0 10px", // spacing between rows
                }}
              >
                <thead style={{ borderRadius: "12px" }}>
                  <tr style={{ borderRadius: "12px" }}>
                    <th style={headerDateCellStyle}>Date</th>
                    <th style={headerCellStyle}>Log In</th>
                    <th style={headerCellStyle}>Log Out</th>
                    {/* {role === "admin" ? (
                      <th style={headerCellStyle}>Action</th>
                    ) : (
                      ""
                    )} */}
                  </tr>
                </thead>

                {/* <tbody>
                  {empAttendance.map((item, index) =>
                    item.dates
                      .filter((dateStr) => {
                        const dateObj = new Date(dateStr);
                        const month = dateObj.getMonth() + 1;
                        const year = dateObj.getFullYear();
                        return (
                          (!selectedMonth ||
                            month === parseInt(selectedMonth)) &&
                          (!selectedYear || year === parseInt(selectedYear))
                        );
                      })
                      .map((dateStr, i) => {
                        const dateObj = new Date(dateStr);
                        const formatDate = `${dateObj
                          .getUTCDate()
                          .toString()
                          .padStart(2, "0")}/${(dateObj.getUTCMonth() + 1)
                          .toString()
                          .padStart(2, "0")}/${dateObj.getUTCFullYear()}`;

                        const day = dateObj.getDay();
                        const date = dateObj.getDate();
                        const weekOfMonth = Math.ceil(date / 7);
                        const isSunday = day === 0;
                        const is2nd4thSaturday =
                          day === 6 && (weekOfMonth === 2 || weekOfMonth === 4);
                        const isHoliday = isSunday || is2nd4thSaturday;

                        const dayColor = isHoliday ? "white" : "#494814ff";
                        const dayBg = isHoliday ? "red" : "#f5f376ff";
                        const rowBg = isHoliday ? "#fcf0f0ff" : "#fff";

                        return (
                          <tr
                            key={`${index}-${i}`}
                            style={{
                              backgroundColor: rowBg,
                              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                              borderRadius: "12px",
                              textAlign: "center",
                            }}
                          >
                            <td
                              style={{
                                ...cellStyle,
                                borderRadius: "12px 0 0 12px",
                              }}
                            >
                              {formatDate}
                              <span
                                style={{
                                  ...logdayStyle,
                                  color: dayColor,
                                  backgroundColor: dayBg,
                                }}
                              >
                                {dateObj.toLocaleDateString("en-US", {
                                  weekday: "long",
                                })}
                              </span>
                            </td>
                            <td>
                              <span style={loginStyle}>{item?.inTimes[i]}</span>
                            </td>
                            <td>
                              <span style={logoutStyle}>
                                {item?.outTimes[i]}
                              </span>
                            </td>
                          </tr>
                        );
                      })
                  )}
                </tbody> */}

                <tbody>
                  {empAttendance.flatMap((item, index) =>
                    item.dates.map((dateStr, i) => {
                      const dateObj = new Date(dateStr);
                      const month = dateObj.getMonth() + 1;
                      const year = dateObj.getFullYear();

                      // ✅ Filter here so we keep correct index pairing
                      if (
                        (selectedMonth && month !== parseInt(selectedMonth)) ||
                        (selectedYear && year !== parseInt(selectedYear))
                      ) {
                        return null;
                      }

                      const formatDate = `${dateObj
                        .getUTCDate()
                        .toString()
                        .padStart(2, "0")}/${(dateObj.getUTCMonth() + 1)
                        .toString()
                        .padStart(2, "0")}/${dateObj.getUTCFullYear()}`;

                      const day = dateObj.getDay();
                      const date = dateObj.getDate();
                      const weekOfMonth = Math.ceil(date / 7);
                      const isSunday = day === 0;
                      const is2nd4thSaturday = day === 6 && (weekOfMonth === 2 || weekOfMonth === 4);
                      const isHoliday = isSunday || is2nd4thSaturday;

                      const dayColor = isHoliday ? "white" : "#494814ff";
                      const dayBg = isHoliday ? "red" : "#f5f376ff";
                      const rowBg = isHoliday ? "#fcf0f0ff" : "#fff";

                      return (
                        <tr
                          key={`${index}-${i}`}
                          style={{
                            backgroundColor: rowBg,
                            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
                            borderRadius: "12px",
                            textAlign: "center",
                          }}
                        >
                          <td style={{ ...cellStyle, borderRadius: "12px 0 0 12px" }}>
                            {formatDate}
                            <span
                              style={{
                                ...logdayStyle,
                                color: dayColor,
                                backgroundColor: dayBg,
                              }}
                            >
                              {dateObj.toLocaleDateString("en-US", { weekday: "long" })}
                            </span>
                          </td>
                          <td>
                            <span style={loginStyle}>{item.inTimes[i]}</span>
                          </td>
                          <td>
                            <span style={logoutStyle}>{item.outTimes[i]}</span>
                          </td>
                        </tr>
                      );
                    }).filter(Boolean) // <-- ✅ filter here after mapping
                  )}
                </tbody>

              </table>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default AttendanceDetail;
