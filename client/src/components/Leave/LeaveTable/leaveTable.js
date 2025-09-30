// import React, { useState, useEffect } from "react";
// import { Card, Container, Typography } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { leaveList } from "../../../action/posts";
// import { CChart } from "@coreui/react-chartjs";
// import {
//   Chart,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   ArcElement, // Import ArcElement for Pie chart
// } from "chart.js";

// Chart.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const LeaveTable = ({ posts, currentId }) => {
//   const dispatch = useDispatch();
//   const user = JSON.parse(localStorage.getItem("profile"));
//   // Find the current post based on currentId
//   const currentPost = posts.find((post) => post._id === currentId);
//   const initialLeaveBalances = {
//     CL: "",
//     SL: "",
//     PL: "",
//     FL: "",
//     Coff: "",
//   };
//   const [leaveBalances, setLeaveBalances] = useState(initialLeaveBalances);

//   const verify = () => {
//     try {
//       if (
//         (user.result.department.toLowerCase() === "human resource" &&
//           user.result.role === "manager") ||
//         user.result.role === "admin"
//       ) {
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     currentId && setLeaveBalances(initialLeaveBalances);
//   }, [currentId]);

//   const headerCellStyle = {
//     display: "table-cell",
//     padding: "10px",
//     color: "#16355d",
//     fontFamily: "Roboto",
//     fontSize: "15px",
//     borderBottom: "1px solid #ccc",
//   };

//   const cellStyle = {
//     display: "table-cell",
//     padding: "10px",
//     borderBottom: "1px solid #ccc",
//   };

//   const inputStyle = {
//     width: "50px",
//   };

//   const reloadPage = () => {
//     window.location.reload();
//   };

//   const handleSubmit = async () => {
//     await dispatch(leaveList(leaveBalances, currentId)).then(() => {
//       alert("Leave Status is uploaded...!!!");
//     });
//     reloadPage();
//   };

//   return (
//     <div
//       style={{
//         padding: "5px",
//         borderRadius: "12px",
//         boxShadow: 6,
//       }}
//     >
//       {verify() === true && (
//         <Card sx={{ padding: "12px" }}>
//           <Typography
//             variant="h6"
//             sx={{
//               textAlign: "center",
//               bgcolor: "#0D325C",
//               // margin: "5px",
//               color: "#ffffff",
//               fontFamily: "Roboto",
//             }}
//           >
//             Leave Balance
//           </Typography>
//           <div style={{ display: "table", width: "100%", marginTop: "10px" }}>
//             {verify() === true && (
//               <div style={{ display: "table-row", fontWeight: "bold" }}>
//                 <div style={headerCellStyle}>Casual Leave</div>
//                 <div style={headerCellStyle}>Sick Leave</div>
//                 <div style={headerCellStyle}>Privilege Leave</div>
//                 <div style={headerCellStyle}>Floating Leave</div>
//                 <div style={headerCellStyle}>C-off</div>
//               </div>
//             )}
//             <div style={{ display: "table-row" }}>
//               <div style={cellStyle}>
//                 <input
//                   style={inputStyle}
//                   type="text"
//                   id="CL"
//                   value={leaveBalances.CL}
//                   onChange={(e) =>
//                     setLeaveBalances({ ...leaveBalances, CL: e.target.value })
//                   }
//                 />
//               </div>
//               <div style={cellStyle}>
//                 <input
//                   style={inputStyle}
//                   type="text"
//                   id="SL"
//                   value={leaveBalances.SL}
//                   onChange={(e) =>
//                     setLeaveBalances({ ...leaveBalances, SL: e.target.value })
//                   }
//                 />
//               </div>
//               <div style={cellStyle}>
//                 <input
//                   style={inputStyle}
//                   type="text"
//                   id="PL"
//                   value={leaveBalances.PL}
//                   onChange={(e) =>
//                     setLeaveBalances({ ...leaveBalances, PL: e.target.value })
//                   }
//                 />
//               </div>
//               <div style={cellStyle}>
//                 <input
//                   style={inputStyle}
//                   type="text"
//                   id="FL"
//                   value={leaveBalances.FL}
//                   onChange={(e) =>
//                     setLeaveBalances({ ...leaveBalances, FL: e.target.value })
//                   }
//                 />
//               </div>
//               <div style={cellStyle}>
//                 <input
//                   style={inputStyle}
//                   type="text"
//                   id="Coff"
//                   value={leaveBalances.Coff}
//                   onChange={(e) =>
//                     setLeaveBalances({ ...leaveBalances, Coff: e.target.value })
//                   }
//                 />
//               </div>
//             </div>
//           </div>
//           {verify() === true && (
//             <button
//               onClick={handleSubmit}
//               style={{
//                 float: "right",
//                 margin: "5px",
//                 fontFamily: "roboto",
//                 fontSize: "12px",
//               }}
//             >
//               Submit
//             </button>
//           )}
//         </Card>
//       )}
//       <Card sx={{ padding: "5px", marginTop: "5px" }}>
//         <Typography
//           variant="h6"
//           sx={{
//             textAlign: "center",
//             // margin: "2px",
//             bgcolor: "#0D325C",
//             color: "#ffffff",
//             fontFamily: "Roboto",
//           }}
//         >
//           Leave Overview
//         </Typography>
//         <Container
//           sx={{
//             // width: "350px",
//             // height: "200px",
//             display: "flex",
//             justifyContent: "center",
//             alignContent: "center",
//           }}
//         >
//           <CChart
//             type="doughnut"
//             data={{
//               labels: [
//                 "Casual Leave",
//                 "Sick Leave",
//                 "Priviledge Leave",
//                 "Floating Leave",
//                 "Comp off",
//               ],
//               datasets: [
//                 {
//                   data: currentPost
//                     ? [
//                         currentPost.CL,
//                         currentPost.SL,
//                         currentPost.PL,
//                         currentPost.FL,
//                         currentPost.Coff,
//                       ]
//                     : [0, 0, 0, 0, 0],
//                   backgroundColor: [
//                     "#FF6384",
//                     "#36A2EB",
//                     "#FFCE56",
//                     "#4BC0C0",
//                     "#9966FF",
//                   ],
//                   hoverOffset: 4,
//                 },
//               ],
//             }}
//             options={{
//               plugins: {
//                 legend: {
//                   labels: {
//                     color: "--cui-body-color",
//                   },
//                   position: "right",
//                 },
//                 tooltip: {
//                   // Example for changing tooltip position to nearest
//                   position: "top",
//                   // Additional tooltip customization can be done here
//                 },
//               },
//             }}
//           />
//         </Container>
//       </Card>
//     </div>
//   );
// };

// export default LeaveTable;

import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useDispatch } from "react-redux";
import { leaveList } from "../../../action/posts";
import { CChart } from "@coreui/react-chartjs";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const LeaveTable = ({ posts, currentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const currentPost = posts.find((post) => post._id === currentId);

  const initialLeaveBalances = {
    CL: "",
    SL: "",
    PL: "",
    FL: "",
    Coff: "",
  };

  const [leaveBalances, setLeaveBalances] = useState(initialLeaveBalances);
  const [selectedDate, setSelectedDate] = useState(null);

  // Mock international holidays
  const holidays = [
    { date: "2025-10-20", name: "Diwali" },
    { date: "2025-10-27", name: "Chhath Puja" },
    { date: "2025-12-25", name: "Christmas Day" },
    { date: "2026-01-01", name: "Happy New Year 2026" },
  ];

  const verify = () => {
    try {
      return (
        (user.result.department.toLowerCase() === "human resource" &&
          user.result.role === "manager") ||
        user.result.role === "admin"
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    currentId && setLeaveBalances(initialLeaveBalances);
  }, [currentId]);

  const handleSubmit = async () => {
    await dispatch(leaveList(leaveBalances, currentId)).then(() => {
      alert("Leave Status is uploaded...!!!");
    });
    window.location.reload();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: 6,
          background: "linear-gradient(135deg, #fdfdfd, #f4f7fb)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            textAlign: "center",
            fontWeight: 700,
            color: "#0D325C",
            letterSpacing: 1,
          }}
        >
          Leave Management
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {/* Left Side - Leave Balance Entry + Calendar */}
          <Grid item xs={12} md={6}>
            {verify() && (
              <Box
                sx={{
                  p: 2,
                  bgcolor: "white",
                  borderRadius: 2,
                  boxShadow: 2,
                  mb: 3,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 600, color: "#16355d", mb: 2 }}
                >
                  Leave Balance Entry
                </Typography>
                <Grid container spacing={2}>
                  {[
                    { key: "CL", label: "Casual Leave" },
                    { key: "SL", label: "Sick Leave" },
                    { key: "PL", label: "Privilege Leave" },
                    { key: "FL", label: "Floating Leave" },
                    { key: "Coff", label: "Comp Off" },
                  ].map((leave) => (
                    <Grid item xs={6} key={leave.key}>
                      <TextField
                        fullWidth
                        size="small"
                        label={leave.label}
                        variant="outlined"
                        value={leaveBalances[leave.key]}
                        onChange={(e) =>
                          setLeaveBalances({
                            ...leaveBalances,
                            [leave.key]: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  ))}
                </Grid>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}
                >
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                      bgcolor: "#0D325C",
                      "&:hover": { bgcolor: "#16497C" },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            )}

            {/* Calendar Section */}
            <Box
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#16355d", mb: 2 }}
              >
                Calendar & Holidays
              </Typography>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider> */}

              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  fontWeight={600}
                >
                  Upcoming Holidays:
                </Typography>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {holidays.map((holiday, i) => (
                    <li key={i} style={{ fontSize: "14px", marginTop: "5px" }}>
                      {holiday.date} — {holiday.name}
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Leave Overview Chart */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: 2,
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 2,
                height: "100%",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, color: "#16355d", mb: 2 }}
              >
                Leave Overview
              </Typography>
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "300px",
                }}
              >
                <CChart
                  type="doughnut"
                  data={{
                    labels: [
                      "Casual Leave",
                      "Sick Leave",
                      "Privilege Leave",
                      "Floating Leave",
                      "Comp Off",
                    ],
                    datasets: [
                      {
                        data: currentPost
                          ? [
                              currentPost.CL,
                              currentPost.SL,
                              currentPost.PL,
                              currentPost.FL,
                              currentPost.Coff,
                            ]
                          : [0, 0, 0, 0, 0],
                        backgroundColor: [
                          "#FF6384",
                          "#36A2EB",
                          "#FFCE56",
                          "#4BC0C0",
                          "#9966FF",
                        ],
                        hoverOffset: 8,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: {
                        labels: {
                          color: "#333",
                          font: { size: 14 },
                        },
                        position: "right",
                      },
                      tooltip: {
                        position: "nearest",
                      },
                    },
                  }}
                />
              </Container>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default LeaveTable;
