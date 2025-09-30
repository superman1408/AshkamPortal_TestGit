import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Box } from "@mui/material";
import Authentication from "./components/authentication/Auth";
import Leave from "./components/Leave/leave";
import AboutUS from "./components/AboutUs/aboutUs";
import RegistrationForm from "./components/registrationForm/Registration_Form";
import Dashboard from "./components/dashboard/Dashboard";
import Navibar from "./components/Navbar/Navibar";
import Communication from "./components/Leave/Communication/Communication";
import LOGO from "./assets/AshkamOriginal.png";
import PaySlip from "./components/Payslip/PaySlip";
import ActivityDisplay from "./components/ActivityDisplay/ActivityDisplay";
import SkillDisplay from "./components/Skills/SkillDisplay";
import AttendanceDisplay from "./components/Attendance/AttendanceDisplay";
import PasswordResetForm from "./components/PasswordReset/PasswordResetForm";
import PayslipDisplay from "./components/PayslipDisplay/PayslipDisplay";
import DepartmentDetails from "./components/Department/DepartmentDetails";
import AbsentDetails from "./components/ManagingTeam/AbsentDetail/AbsentDetails";
import AbsentDetailsDisplay from "./components/ManagingTeam/AbsentDetail/AbsentDetailsDisplay";
import Decommission from "./components/Decommission/Decommission";
import Panel from "./components/Panel/Panel";

const drawerWidth = 0; // must match Panel
const collapsedWidth = 0;

const App = () => {
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("profile");
    return stored ? JSON.parse(stored) : null;
  });

  const [open, setOpen] = React.useState(false);

  //   return (
  //     <BrowserRouter>
  //       <header>
  //         <div
  //           style={{
  //             display: {
  //               xs: "0",
  //               sm: "600",
  //             },
  //             justifyContent: "space-evenly",
  //             padding: "10px",
  //           }}
  //         >
  //           <img src={LOGO} alt="logo" style={{ width: "185px" }} />
  //         </div>
  //         {/* )} */}
  //       </header>

  //       <Navibar />
  //       <Container maxWidth={false}>
  //         {
  //           user && <Panel open={open} setOpen={setOpen} user={user.result} />
  //         }
  //         {/*  */}
  //         <div>
  //           <Routes>
  //             {/* <Route path="/" exact element={<Decommission />} /> */}

  //             {/*  These Routes are important*/}

  //             <Route
  //               exact
  //               path="/"
  //               element={!user ? <Authentication /> : <Dashboard />}
  //             />
  //             {/* this part need to be examined after ward */}

  //             <Route path="/auth" exact element={!user && <Authentication />} />
  //             <Route
  //               path="/auth/reset"
  //               exact
  //               element={!user && <PasswordResetForm />}
  //             />
  //             {/* <Route path="/profile" exact element={<Form />} /> */}
  //             <Route path="/:id/profile" exact element={<RegistrationForm />} />
  //             <Route path="/mail/:id/leave" exact element={<Leave />} />
  //             <Route
  //               path="/mail/:id/communication"
  //               exact
  //               element={<Communication />}
  //             />

  //             {/* <Route path="/mail/:id/payslip" exact element={<Payslip />} /> */}

  //             <Route path="/aboutUs" exact element={<AboutUS />} />
  //             <Route path="/home" exact element={<Dashboard />} />
  //             <Route
  //               path="posts/:id/fullweeklyactivity"
  //               exact
  //               element={<ActivityDisplay />}
  //             />

  //             <Route path="posts/skill" exact element={<SkillDisplay />} />
  //             <Route path="/:id/payslip" exact element={<PayslipDisplay />} />

  //             <Route path="/:id/payslip" exact element={<PaySlip />} />
  //             <Route
  //               path="/:id/attendanceDisplay"
  //               exact
  //               element={<AttendanceDisplay />}
  //             />

  //             <Route
  //               path="/departmentdetails"
  //               exact
  //               element={<DepartmentDetails />}
  //             />

  //             <Route
  //               path="/:id/absentdetails"
  //               exact
  //               element={<AbsentDetailsDisplay />}
  //             />
  //           </Routes>
  //         </div>
  //       </Container>
  //       <div className="wave"></div>
  //       <div className="wave"></div>
  //       <div className="wave"></div>
  //       <div>
  //         <footer
  //           style={{
  //             backgroundColor: "#17325C",
  //             fontFamily: "Roboto",
  //             color: "white",
  //             width: "100%",
  //             marginTop: "5px",
  //             textAlign: "center",
  //           }}
  //         >
  //           ©️ 2023 ASHKAM ENERGY PRIVATE LIMITED. All rights reserved.
  //         </footer>
  //       </div>
  //     </BrowserRouter>
  //   );
  // };

  // export default App;

  return (
    <BrowserRouter>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Panel />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            ml: user ? (open ? `${drawerWidth}px` : `${collapsedWidth}px`) : 0,
            transition: "margin 0.3s",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box component="header" sx={{ p: 1 }}>
            <img src={LOGO} alt="logo" style={{ width: "185px" }} />
          </Box>
          <Navibar />
          <Container maxWidth={false}>
            <div>
              <Routes>
                {/* <Route path="/" exact element={<Decommission />} /> */}

                {/*  These Routes are important*/}

                <Route
                  exact
                  path="/"
                  element={!user ? <Authentication /> : <Dashboard />}
                />
                {/* this part need to be examined after ward */}

                <Route
                  path="/auth"
                  exact
                  element={!user && <Authentication />}
                />
                <Route
                  path="/auth/reset"
                  exact
                  element={!user && <PasswordResetForm />}
                />
                {/* <Route path="/profile" exact element={<Form />} /> */}
                <Route
                  path="/:id/profile"
                  exact
                  element={<RegistrationForm />}
                />
                <Route path="/mail/:id/leave" exact element={<Leave />} />
                <Route
                  path="/mail/:id/communication"
                  exact
                  element={<Communication />}
                />

                {/* <Route path="/mail/:id/payslip" exact element={<Payslip />} /> */}

                <Route path="/aboutUs" exact element={<AboutUS />} />
                <Route path="/home" exact element={<Dashboard />} />
                <Route
                  path="posts/:id/fullweeklyactivity"
                  exact
                  element={<ActivityDisplay />}
                />

                <Route path="posts/skill" exact element={<SkillDisplay />} />
                <Route path="/:id/payslip" exact element={<PayslipDisplay />} />

                <Route path="/:id/payslip" exact element={<PaySlip />} />
                <Route
                  path="/:id/attendanceDisplay"
                  exact
                  element={<AttendanceDisplay />}
                />

                <Route
                  path="/departmentdetails"
                  exact
                  element={<DepartmentDetails />}
                />

                <Route
                  path="/:id/absentdetails"
                  exact
                  element={<AbsentDetailsDisplay />}
                />
              </Routes>
            </div>
          </Container>{" "}
          <div>
            <footer
              style={{
                backgroundColor: "#17325C",
                fontFamily: "Roboto",
                color: "white",
                width: "100%",
                marginTop: "5px",
                textAlign: "center",
                position: "fixed",
                bottom: 0,
                left: 0,
              }}
            >
              ©️ 2025 ASHKAM ENERGY PRIVATE LIMITED. All rights reserved.
            </footer>
          </div>
        </Box>
      </Box>
      {/* <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div> */}
    </BrowserRouter>
  );
};

export default App;
