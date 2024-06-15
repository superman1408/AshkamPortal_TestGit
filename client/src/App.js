import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "@mui/material";
import Authentication from "./components/authentication/Auth";
import Leave from "./components/Leave/leave";
import AboutUS from "./components/AboutUs/aboutUs";
import RegistrationForm from "./components/registrationForm/Registration_Form";
import Dashboard from "./components/dashboard/Dashboard";
import Navibar from "./components/Navbar/Navibar";
import Communication from "./components/Leave/Communication/Communication";
import LOGO from "./assets/AshkamLogoTransparentbc.png";
import PaySlip from "./components/Payslip/PaySlip";
import ActivityDisplay from "./components/ActivityDisplay/ActivityDisplay";
import SkillDisplay from "./components/Skills/SkillDisplay";
import PrintingLayout from "./components/PrinttingLayout/PrintingLayout";
import AttendanceDisplay from "./components/Attendance/AttendanceDisplay";
import PasswordResetForm from "./components/PasswordReset/PasswordResetForm";
import PayslipDisplay from "./components/PayslipDisplay/PayslipDisplay";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <header>
        <div
          style={{
            display: {
              xs: "0",
              sm: "600",
            },
            justifyContent: "space-evenly",
            padding: "10px",
          }}
        >
          <img src={LOGO} alt="logo" style={{ width: "185px" }} />
        </div>
        {/* )} */}
      </header>

      <Navibar />
      <Container maxWidth={false}>
        <div style={{ display: "flex" }}>
          <Routes>
            <Route
              exact
              path="/"
              element={!user ? <Authentication /> : <Dashboard />}
            />
            {/* this part need to be examined after ward */}

            <Route path="/auth" exact element={!user && <Authentication />} />
            <Route
              path="/auth/reset"
              exact
              element={!user && <PasswordResetForm />}
            />
            {/* <Route path="/profile" exact element={<Form />} /> */}
            <Route path="/:id/profile" exact element={<RegistrationForm />} />
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
            <Route path="/printingLayout" exact element={<PrintingLayout />} />
          </Routes>
        </div>
      </Container>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div>
        <footer
          style={{
            backgroundColor: "#17325C",
            fontFamily: "Roboto",
            color: "white",
            width: "100%",
            marginTop: "5px",
            textAlign: "center",
          }}
        >
          ©️ 2023 ASHKAM ENERGY PRIVATE LIMITED. All rights reserved.
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
