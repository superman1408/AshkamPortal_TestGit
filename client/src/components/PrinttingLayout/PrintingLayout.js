// import {
//   Typography,
//   Table,
//   TableContainer,
//   TableCell,
//   TableBody,
//   TableHead,
//   TableRow,
//   Paper,
//   Grid,
//   Button,
// } from "@mui/material";
// import React, { useRef } from "react";
// import { useState } from "react";
// // import html2pdf from "html2pdf";

// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// import AshkamLogo from "../../assets/AshKamLogo.png";

// const PrintingLayout = () => {
//   const user = JSON.parse(localStorage.getItem("profile"));
//   const [isPrinting, setIsPrinting] = useState(false);

//   function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
//   }

//   const rows = [
//     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//     createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//     createData("Eclair", 262, 16.0, 24, 6.0),
//     createData("Cupcake", 305, 3.7, 67, 4.3),
//     createData("Gingerbread", 356, 16.0, 49, 3.9),
//   ];

//   const pdfRef = useRef();
//   const downloadPdf = () => {
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
//       pdf.addImage(
//         imgData,
//         "PNG",
//         imgX,
//         imgY,
//         imgWidth * ratio,
//         imgHeight * ratio
//       );
//       pdf.save("invoice.pdf");
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <div ref={pdfRef}>
//       <div>
//         <table
//           border="1"
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             border: "1px solid black",
//           }}
//         >
//           <thead>
//             <tr
//               height="100px"
//               style={{
//                 backgroundColor: "#363636",
//                 color: "#ffffff",
//                 textAlign: "center",
//                 fontSize: "24px",
//                 fontWeight: "600",
//               }}
//             >
//               <td colSpan="4">Daliyaspirants.com Design Limited</td>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <th>Personel NO:</th>
//               <td>0123456</td>
//               <th>Name</th>
//               <td>{user.result.firstName}</td>
//             </tr>
//             <tr>
//               <th>Bank</th>
//               <td>x0x0x0</td>
//               <th>Bank A/c No.</th>
//               <td>0x2x6x25x6</td>
//             </tr>
//             <tr>
//               <th>DOB</th>
//               <td>23/02/xxxx</td>
//               <th>Lop Days</th>
//               <td>0</td>
//             </tr>
//             <tr>
//               <th>PF No.</th>
//               <td>26123456</td>
//               <th>STD days</th>
//               <td>30</td>
//             </tr>
//             <tr>
//               <th>Location</th>
//               <td>India</td>
//               <th>Working Days</th>
//               <td>30</td>
//             </tr>
//             <tr>
//               <th>Department</th>
//               <td>IT</td>
//               <th>Designation</th>
//               <td>Designer</td>
//             </tr>
//           </tbody>
//         </table>
//         <br />
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             border: "1px solid black",
//           }}
//         >
//           <thead>
//             <tr>
//               <th>Earnings</th>
//               <th>Amount</th>
//               <th>Deductions</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Basic</td>
//               <td>29000</td>
//               <td>provident fund</td>
//               <td>1900</td>
//             </tr>
//             <tr>
//               <td>House Rent Allowance</td>
//               <td>2000</td>
//               <td>professional tax</td>
//               <td>600</td>
//             </tr>
//             <tr>
//               <td>special Allowance</td>
//               <td>400</td>
//               <td>Income tax</td>
//               <td>500</td>
//             </tr>
//             <tr>
//               <td>conveyance</td>
//               <td>3000</td>
//             </tr>
//             <tr>
//               <td>ADD Special allowance</td>
//               <td>2000</td>
//             </tr>
//             <tr>
//               <td>shift Allowance</td>
//               <td>1000</td>
//             </tr>
//             <tr>
//               <td>bonus</td>
//               <td>500</td>
//             </tr>
//             <tr>
//               <td>medical Allowance</td>
//               <td>600</td>
//             </tr>
//             <tr>
//               <th>Gross Earnings</th>
//               <td>Rs.38500</td>
//               <th>Gross Deductions</th>
//               <td>Rs.3000</td>
//             </tr>
//             <tr>
//               <td></td>
//               <td>
//                 <strong>NET PAY</strong>
//               </td>
//               <td>Rs.35500</td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//       {/* </TableBody>
//             </TableBody> */}
//       {/* </Table>
//         </TableContainer> */}
//       <Grid>
//         {!isPrinting && (
//           <Button
//             required
//             fullWidth={true}
//             sx={{
//               bgcolor: "skyblue",
//               color: "black",
//             }}
//             onClick={downloadPdf}
//           >
//             Generate
//           </Button>
//         )}
//       </Grid>
//     </div>
//   );
// };

// export default PrintingLayout;
