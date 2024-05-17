// import { Grid, Button } from "@mui/material";
// import React, { useRef } from "react";
// import { useState } from "react";

// import { useLocation } from "react-router-dom";
// import LOGO from "../../../assets/AshkamLogoTransparentbc.png";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const EvolvePrintingLayout = () => {
//   const location = useLocation();
//   const { projectCode, activityCode, date, netTime, overTime } = location.state;
//   const user = JSON.parse(localStorage.getItem("profile"));
//   const [isPrinting, setIsPrinting] = useState(false);

//   const pdfRef = useRef();
//   const downloadPdf = (e) => {
//     const input = pdfRef.current;
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4", true);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const imgWidth = canvas.width;
//       const imgHeight = canvas.height;
//       const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
//       const imgX = (pdfWidth - imgWidth * ratio) / 2;
//       const imgY = 30;

//       // Set font size here
//       // pdf.setFontSize(20); // Adjust 16 to your desired font size

//       pdf.addImage(
//         imgData,
//         "PNG",
//         imgX,
//         imgY,
//         imgWidth * ratio,
//         imgHeight * ratio
//       );

//       const currentDate = new Date().toLocaleDateString();
//       const currentTime = new Date().toLocaleTimeString();
//       const dateTime = `${currentDate} ${currentTime}`;
//       pdf.setFontSize(10);
//       pdf.text(dateTime, 10, pdfHeight - 10, { align: "left" }); // Adjust the position as needed
//       pdf.save("Timesheet.pdf");
//     });
//   };

//   return (
//     <>
//       <div style={{ display: "flex", float: "right" }}>
//         <button>⬅️ Go Back</button>
//       </div>
//       <div ref={pdfRef}>
//         <div style={{ overflowX: "auto" }}>
//           <table
//             table
//             style={{
//               padding: "10px",
//               // marginLeft: "100px",
//               borderCollapse: "collapse",
//               border: "1px solid black",
//               marginLeft: "auto",
//               marginRight: "auto",
//               width: "100%",
//               maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
//             }}
//           >
//             {/* <thead> */}
//             <tr
//               height="100px"
//               style={{
//                 // backgroundColor: "lightgray",
//                 color: "black",
//                 // textAlign: "center",
//                 fontSize: "30px",
//                 fontWeight: "600",
//                 border: "1px solid black",
//               }}
//             >
//               <div
//                 style={{
//                   // marginLeft: "20px",
//                   marginTop: "30px",
//                   width: "100px",
//                   height: "30px",
//                 }}
//               >
//                 <img src={LOGO} alt="logo" />
//               </div>
//               <td style={{ textAlign: "left" }}>TimeSheet </td>
//               {/* <span
//                   style={{
//                     fontSize: "15px",
//                     // marginRight: "-20px",
//                     // marginTop: "20px",
//                     textAlign: "right",
//                   }}
//                 >
//                   {new Date().toLocaleDateString()}
//                 </span> */}
//             </tr>
//             {/* </thead> */}
//           </table>
//           <br />
//           <table
//             style={{
//               // marginLeft: "100px",
//               padding: "10px",
//               // marginLeft: "100px",
//               borderCollapse: "collapse",
//               border: "1px solid black",
//               marginLeft: "auto",
//               marginRight: "auto",
//               width: "100%",
//               maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
//             }}
//           >
//             <tbody>
//               <tr>
//                 <th style={{ border: "1px solid black" }}>Employee Id</th>
//                 <td style={{ border: "1px solid black" }}>
//                   {/* {user.result.employeeId} */}
//                 </td>
//                 <th style={{ border: "1px solid black" }}>Name</th>
//                 <td style={{ border: "1px solid black" }}>
//                   {/* {user.result.firstName + " " + user.result.lastName} */}
//                 </td>
//               </tr>
//               <tr>
//                 <th style={{ border: "1px solid black" }}>Bank</th>
//                 <td style={{ border: "1px solid black" }}></td>
//                 <th style={{ border: "1px solid black" }}>Bank A/c No.</th>
//                 <td style={{ border: "1px solid black" }}></td>
//               </tr>
//               <tr>
//                 <th style={{ border: "1px solid black" }}>DOB</th>
//                 <td style={{ border: "1px solid black" }}>{user.result.dob}</td>
//               </tr>
//               <tr>
//                 <th style={{ border: "1px solid black" }}>UAN No.</th>
//                 <td style={{ border: "1px solid black" }}>{}</td>
//                 <th style={{ border: "1px solid black" }}>Pay days</th>
//                 <td style={{ border: "1px solid black" }}>{}</td>
//               </tr>
//               <tr>
//                 <th style={{ border: "1px solid black" }}>Location</th>
//                 <td style={{ border: "1px solid black" }}>India</td>
//                 <th style={{ border: "1px solid black" }}>Pay Date</th>
//                 <td style={{ border: "1px solid black" }}>{}</td>
//               </tr>
//               <tr>
//                 <th style={{ border: "1px solid black" }}>Department</th>
//                 <td style={{ border: "1px solid black" }}>
//                   {user.result.department}
//                 </td>
//                 <th style={{ border: "1px solid black" }}>Pay Period</th>
//                 <td style={{ border: "1px solid black" }}>{}</td>
//               </tr>
//             </tbody>
//           </table>
//           <br />
//           <table
//             style={{
//               // marginLeft: "100px",
//               padding: "10px",
//               // marginLeft: "100px",
//               borderCollapse: "collapse",
//               border: "1px solid black",
//               marginLeft: "auto",
//               marginRight: "auto",
//               width: "100%",
//               maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
//             }}
//           >
//             <thead>
//               <tr>
//                 <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
//                   Project Code
//                 </th>
//                 <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
//                   Activity Code
//                 </th>
//                 <th style={{ color: "#16355d", fontFamily: "Roboto" }}>Date</th>
//                 <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
//                   Net Time (hrs)
//                 </th>
//                 <th style={{ color: "#16355d", fontFamily: "Roboto" }}>
//                   Over Time (hrs)
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td
//                   style={{
//                     color: "#e55d17",
//                     fontFamily: "Roboto",
//                     padding: "10px",
//                     alignContent: "center",
//                   }}
//                 >
//                   {projectCode}
//                 </td>
//                 <td
//                   style={{
//                     color: "#e55d17",
//                     fontFamily: "Roboto",
//                     padding: "10px",
//                     alignContent: "center",
//                   }}
//                 >
//                   {activityCode}
//                 </td>
//                 <td
//                   style={{
//                     color: "#e55d17",
//                     fontFamily: "Roboto",
//                     padding: "10px",
//                     alignContent: "center",
//                   }}
//                 >
//                   {date}
//                 </td>
//                 <td
//                   style={{
//                     color: "#e55d17",
//                     fontFamily: "Roboto",
//                     padding: "10px",
//                     alignContent: "center",
//                   }}
//                 >
//                   {netTime}
//                 </td>
//                 <td
//                   style={{
//                     color: "#e55d17",
//                     fontFamily: "Roboto",
//                     padding: "10px",
//                     alignContent: "center",
//                   }}
//                 >
//                   {overTime}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <br />
//           <table
//             style={{
//               // marginLeft: "100px",
//               padding: "10px",
//               // marginLeft: "100px",
//               borderCollapse: "collapse",
//               border: "1px solid black",
//               marginLeft: "auto",
//               marginRight: "auto",
//               width: "100%",
//               maxWidth: "800px", // Set a max-width to prevent tables from expanding too much
//             }}
//           >
//             <tbody>
//               <tr>
//                 <td
//                   style={{
//                     border: "1px solid black",
//                     padding: "30px",
//                     width: "33.33%",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid black",
//                     padding: "30px",
//                     width: "33.33%",
//                   }}
//                 ></td>
//                 <td
//                   style={{
//                     border: "1px solid black",
//                     padding: "30px",
//                     width: "33.33%",
//                   }}
//                 ></td>
//               </tr>
//               <tr>
//                 <td
//                   style={{
//                     border: "1px solid black",
//                     textAlign: "center",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   HUMAN RESOURCE
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid black",
//                     textAlign: "center",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   ACCOUNT MANAGER
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid black",
//                     textAlign: "center",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   DIR-F&A
//                 </td>
//               </tr>

//               <tr>
//                 <td
//                   style={{
//                     border: "1px solid black",
//                     textAlign: "center",
//                     fontSize: "12px",
//                     backgroundColor: "#027580",
//                   }}
//                 >
//                   Prepared by
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid black",
//                     textAlign: "center",
//                     fontSize: "12px",
//                     backgroundColor: "#027580",
//                   }}
//                 >
//                   Checked by
//                 </td>
//                 <td
//                   style={{
//                     border: "1px solid black",
//                     textAlign: "center",
//                     fontSize: "12px",
//                     backgroundColor: "#027580",
//                   }}
//                 >
//                   Approved by
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Grid sx={{ paddingBottom: "50px" }}>
//         {!isPrinting && (
//           <Button
//             required
//             variant="outlined"
//             sx={{
//               bgcolor: "skyblue",
//               color: "black",
//               float: "right",
//               marginRight: "160px",
//               marginTop: "10px",
//             }}
//             onClick={downloadPdf}
//           >
//             Download
//           </Button>
//         )}
//       </Grid>
//     </>
//   );
// };

// export default EvolvePrintingLayout;
