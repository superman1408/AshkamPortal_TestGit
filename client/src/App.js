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
import LOGO from "./assets/Company.png";
import FullWeekly from "./components/WeeklyActivity/Activity/FullWeekly";
import BirthdayMail from "./components/Birthday/BirthdayMail";
import PaySlip from "./components/Payslip/PaySlip";
import EmployeeAttendance from "./components/Attendance/EmployeeAttendance";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth={false}>
        <header>
          {/* <h1>My Cool application is here</h1> */}
          <img src={LOGO} alt="logo" style={{ width: "220px" }} />
        </header>
        <Navibar />
        <Routes>
          <Route exact path="/" element={<Authentication />} />
          {/* this part need to be examined after ward */}

          <Route path="/auth" exact element={!user && <Authentication />} />
          {/* <Route path="/profile" exact element={<Form />} /> */}
          <Route path="/profile" exact element={<RegistrationForm />} />
          <Route path="/mail/:id/leave" exact element={<Leave />} />
          <Route
            path="/mail/:id/communication"
            exact
            element={<Communication />}
          />

          {/* <Route path="/mail/:id/payslip" exact element={<Payslip />} /> */}

          <Route path="/aboutUs" exact element={<AboutUS />} />
          <Route path="/home" exact element={<Dashboard />} />
          <Route path="/fullweeklyactivity" exact element={<FullWeekly />} />
          <Route
            path="/employeeAttendance"
            exact
            element={<EmployeeAttendance />}
          />
          <Route path="/birthdaymail" exact element={<BirthdayMail />} />
          <Route path="/payslip" exact element={<PaySlip />} />
        </Routes>
      </Container>
      <footer
        style={{
          backgroundColor: "#17325C",
          color: "white",
          width: "100%",
          marginTop: "5px",
          textAlign: "center",
        }}
      >
        ASHKAM ENERGY PRIVATE LIMITED ©️ me 2023
      </footer>
    </BrowserRouter>
  );
};

export default App;
