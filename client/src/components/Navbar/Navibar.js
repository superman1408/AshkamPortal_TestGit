import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";

import { IconButton, Grid } from "@mui/material";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import Marquee from "react-fast-marquee";

const Navibar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const notify = () => {
    console.log("Notification is clicked...!!!");
  };

  const handleLogout = () => {
    console.log("logout");
    dispatch({ type: LOGOUT });
    setUser(null);
    navigate("/auth");
  };

  const openPage = (id, action) => {
    console.log(action);
    switch (action) {
      case "leave":
        navigate(`/mail/${id}/leave`);
        break;
      case "inbox":
        navigate(`/mail/${id}/communication`);
        break;
      case "payslip":
        navigate(`/${id}/payslip`);
        break;
      case "registration":
        navigate(`/${id}/profile`);
        break;
      default:
        console.log("Click something dude..!!");
    }
  };

  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      {/* className=" bg-body-tertiary justify-content-between" */}
      <Container fluid>
        {/* <Navbar.Brand href="/auth">
          <img src={LOGO} alt="logo" style={{ width: "220px" }} />
        </Navbar.Brand> */}
        <div>
          {user ? (
            <div>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-0 my-lg-0"
                  // style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav.Link href="/home">
                    <IconButton id="home">
                      <HomeIcon sx={{ fontSize: "30px" }} />
                    </IconButton>
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => openPage(user.result._id, "registration")}
                    id="registration"
                    style={{ marginTop: "8px" }}
                  >
                    Registration
                  </Nav.Link>

                  <NavDropdown
                    title="Message"
                    id="navbarScrollingDropdown"
                    style={{ marginTop: "8px" }}
                  >
                    <NavDropdown.Item
                      onClick={() => openPage(user.result._id, "leave")}
                      id="leave"
                    >
                      Leave Section
                    </NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item
                      onClick={() => openPage(user.result._id, "inbox")}
                      id="inbox"
                    >
                      Inbox
                    </NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item
                      onClick={() => openPage(user.result._id, "payslip")}
                      id="payslip"
                    >
                      Pay Slips
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/aboutUs" style={{ marginTop: "8px" }}>
                    About Us
                  </Nav.Link>
                </Nav>
                <Grid
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    margin: "15px",
                    marginLeft: "550px",
                  }}
                >
                  {/* comment is added */}
                  <IconButton to="/auth" id="notification" onClick={notify}>
                    <NotificationsNoneRoundedIcon />
                  </IconButton>
                </Grid>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Navbar.Collapse>
            </div>
          ) : (
            <div>
              <Marquee style={{ color: "black" }}>
                Please Login to your account
              </Marquee>
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
};

export default Navibar;
