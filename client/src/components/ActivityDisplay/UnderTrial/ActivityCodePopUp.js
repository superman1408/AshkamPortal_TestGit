// import React, { useState } from "react";

// const ActivityCodepopUp = ({ setProjectCode, setOpen }) => {
//   const maxOffset = 10;
//   const thisYear = new Date().getFullYear();
//   const allYears = [];
//   for (let x = 0; x <= maxOffset; x++) {
//     allYears.push(thisYear - x);
//   }

//   const yearList = allYears.map((x) => {
//     return <option key={x}>{x}</option>;
//   });

//   const maxset = 12;
//   const thismonth = new Date().getMonth();
//   const allMonth = [];
//   for (let x = 0; x < maxset; x++) {
//     allMonth.push(thismonth + x);
//   }

//   const monthList = allMonth.map((x) => {
//     return <option key={x}>{x}</option>;
//   });

//   const SerialNo = [];
//   for (let i = 1; i <= 200; i++) {
//     SerialNo.push(
//       <option key={i} value={i}>
//         {i}
//       </option>
//     );
//   }

//   const [officeCode, setOfficeCode] = useState();
//   const [year, setYear] = useState();
//   const [month, setMonth] = useState();
//   const [serialNo, setserialNo] = useState();

//   const appendData = () => {
//     const updatedList = officeCode + "-" + year + "-" + month + "-" + serialNo; // Combine officeCode and year
//     setProjectCode(updatedList);
//     console.log(updatedList);
//     // console.log(officeCode);
//     // console.log(year);
//     setOpen(false);
//   };

//   return (
//     <div
//       className="modal fade show"
//       tabIndex="-1"
//       role="dialog"
//       style={{ display: "block" }}
//     >
//       <div className="modal-dialog" role="document">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title">Project Code</h5>
//             {/* <button type="button" className="close"  onClick={setOpen(false)}>
//               <span aria-hidden="true">&times;</span>
//             </button> */}
//           </div>
//           <div className="modal-body">
//             <div>
//               {/*_______________Office Code____________________  */}

//               <label>Office Code</label>
//               <select
//                 style={{
//                   width: "200px",
//                   height: "30px",
//                   fontSize: "16px",
//                   marginTop: "10px",
//                 }}
//                 name="Office Code"
//                 value={officeCode}
//                 onChange={(e) => setOfficeCode(e.target.value)}
//                 defaultValue="1"
//               >
//                 <option value="select">select</option>
//                 <option value="01">01</option>
//                 <option value="02">02</option>
//               </select>
//             </div>
//             {/*_______________Year____________________  */}
//             <div>
//               <label
//                 style={{
//                   marginTop: "20px",
//                 }}
//               >
//                 Year
//               </label>
//               <div>
//                 <select
//                   style={{
//                     width: "200px",
//                     height: "30px",
//                     fontSize: "16px",
//                     marginTop: "10px",
//                   }}
//                   name="Year"
//                   value={year}
//                   onChange={(e) => setYear(e.target.value)}
//                 >
//                   {yearList}
//                 </select>
//               </div>
//             </div>
//             {/*_______________Month____________________  */}
//             <div>
//               <label
//                 style={{
//                   marginTop: "20px",
//                 }}
//               >
//                 Month
//               </label>
//               <div>
//                 {/* <MonthSelector onChange={(e) => setMonth(e.target.value)} /> */}
//                 <select
//                   style={{
//                     width: "200px",
//                     height: "30px",
//                     fontSize: "16px",
//                     marginTop: "10px",
//                   }}
//                   name="Month"
//                   value={month}
//                   onChange={(e) => setMonth(e.target.value)}
//                 >
//                   {monthList}
//                 </select>
//               </div>
//             </div>
//             {/*_______________Serial Number____________________  */}
//             <div>
//               <label
//                 style={{
//                   marginTop: "20px",
//                 }}
//               >
//                 Serial Number
//               </label>
//               <div>
//                 <select
//                   style={{
//                     width: "200px",
//                     height: "30px",
//                     fontSize: "16px",
//                     marginTop: "10px",
//                   }}
//                   name="Month"
//                   value={serialNo}
//                   onChange={(e) => setserialNo(e.target.value)}
//                 >
//                   {SerialNo}
//                 </select>
//               </div>
//             </div>{" "}
//           </div>
//           <div className="modal-footer">
//             <button
//               type="button"
//               className="btn btn-secondary"
//               onClick={appendData}
//             >
//               Save
//             </button>
//             {/* Add additional buttons or actions if needed */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ActivityCodepopUp;
