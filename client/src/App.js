import React, { useState } from "react";

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
import LOGO from "./assets/AshKamLogo.png";
import BirthdayMail from "./components/Birthday/BirthdayMail";
import PaySlip from "./components/Payslip/PaySlip";
import EmployeeAttendance from "./components/Attendance/EmployeeAttendance";
import ActivityDisplay from "./components/ActivityDisplay/ActivityDisplay";
import SkillDisplay from "./components/Skills/SkillDisplay";
import PrintingLayout from "./components/PrinttingLayout/PrintingLayout";
<<<<<<< HEAD
import ExcelReader from "./components/ExcelReader/ExcelReader";
=======
import EvolvePrintLayout from "./components/ActivityDisplay/UnderTrial/EvolvePrintLayout";
>>>>>>> payslipLayout-fix

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [printingLayout, setPrintingLayout] = useState(true);

  return (
    <BrowserRouter>
      <Container maxWidth={false}>
        <header>
          {/* {printingLayout && ( */}
          <div
            style={{
              display: {
                xs: "0",
                sm: "600",
              },
              justifyContent: "space-evenly",
            }}
          >
            <img src={LOGO} alt="logo" style={{ width: "185px" }} />
          </div>
          {/* )} */}
        </header>
        {printingLayout && <Navibar />}

        <Routes>
          <Route
            exact
            path="/"
            element={!user ? <Authentication /> : <Dashboard />}
          />
          {/* this part need to be examined after ward */}

          <Route path="/auth" exact element={!user && <Authentication />} />
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
          <Route
            path="/employeeAttendance"
            exact
            element={<ExcelReader />}
          />

          <Route path="posts/skill" exact element={<SkillDisplay />} />
          <Route path="/birthdaymail" exact element={<BirthdayMail />} />
          <Route path="/:id/payslip" exact element={<PaySlip />} />
          <Route
            path="/printingLayout"
            exact
            element={<PrintingLayout setPrintingLayout={setPrintingLayout} />}
          />
          <Route
            path="/evolveprintlayout"
            exact
            element={<EvolvePrintLayout />}
          />
        </Routes>
      </Container>
      <div>
        <footer
          style={{
            backgroundColor: "#17325C",
            color: "white",
            width: "100%",
            marginTop: "5px",
            textAlign: "center",
            fontFamily: "Roboto",
          }}
        >
          ASHKAM ENERGY PRIVATE LIMITED ©️ me 2023
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
