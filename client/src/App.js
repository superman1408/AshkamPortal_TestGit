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

const App = () => {
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

          <Route path="/auth" exact element={<Authentication />} />
          {/* <Route path="/profile" exact element={<Form />} /> */}
          <Route path="/profile" exact element={<RegistrationForm />} />
          <Route path="/mail/:id/leave" exact element={<Leave />} />
          <Route
            path="/mail/:id/communication"
            exact
            element={<Communication />}
          />
          <Route path="/aboutUs" exact element={<AboutUS />} />
          <Route path="/home" exact element={<Dashboard />} />
        </Routes>
      </Container>
      <footer> ASHKAM ENERGY PRIVATE LIMITED ©️ me 2023</footer>
    </BrowserRouter>
  );
};

export default App;
