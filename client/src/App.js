import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "@mui/material";

<<<<<<< HEAD
// import Home from "./components_update/Dashboard/Dashboard";
// import Home from "./components_update/Check/check";
=======
// import Home from "./components_update/Home";
>>>>>>> pay-slip
import Authentication from "./components_update/authentication/Auth";
import Leave from "./components_update/Leave/leave";
import AboutUS from "./components_update/AboutUs/aboutUs";
import RegistrationForm from "./components_update/registrationForm/Registration_Form";
import Dashboard from "./components_update/Dashboard/Dashboard";
import Navibar from "./components_update/Navbar/Navibar";
import Communication from "./components_update/Leave/Communication/Communication";
<<<<<<< HEAD
// import Payslip from "./components_update/payslip";
import LOGO from "./components_update/images/Company.png";
=======
import PaySlip from "./components_update/PaySlip/PaySlip";
>>>>>>> pay-slip

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

<<<<<<< HEAD
          <Route path="/auth" exact element={<Authentication />} />
=======
          <Route
            path="/auth"
            exact
            element={!user ? <Authentication /> : <Dashboard />}
          />
>>>>>>> pay-slip
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
          <Route path="/payslip" exact element={<PaySlip />} />
        </Routes>
      </Container>
      <footer> ASHKAM ENERGY PRIVATE LIMITED ©️ me 2023</footer>
    </BrowserRouter>
  );
};

export default App;
