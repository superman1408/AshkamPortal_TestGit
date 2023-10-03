import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "@mui/material";

import Home from "./components_update/Home";
import Authentication from "./components_update/authentication/Auth";
import Leave from "./components_update/Leave/leave";
import AboutUS from "./components_update/AboutUs/aboutUs";
import RegistrationForm from "./components_update/registrationForm/Registration_Form";
import Dashboard from "./components_update/Dashboard/Dashboard";
import Navibar from "./components_update/Navbar/Navibar";
import Communication from "./components_update/Leave/Communication/Communication";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

  return (
    <BrowserRouter>
      <Container maxWidth={false}>
        <Navibar />
        <Routes>
          <Route
          exact path="/" element={<Authentication/>}  
          />
          {/* this part need to be examined after ward */}

          <Route
            path="/auth"
            exact
            element={!user ? <Authentication /> : <Dashboard/>}
          />
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
    </BrowserRouter>
  );
};

export default App;
