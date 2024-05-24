import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";

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

  const matches = useMediaQuery("(max-width:995px)");

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
    switch (action) {
      case "leave":
        navigate(`/mail/${id}/leave`);
        break;
      case "inbox":
        navigate(`/mail/${id}/communication`);
        break;
      case "payslip":
        // navigate(`/${id}/payslipLayout`);
        navigate(`/${id}/payslipLayout`);
        break;
      case "timeSheet":
        navigate(`posts/${id}/fullweeklyactivity`);
        break;
      case "profile":
        navigate(`/${id}/profile`);
        break;
      case "about":
        navigate(`/aboutUs`);
        break;
      case "payslipPreview":
        navigate(`/${id}/payslip`);
        break;
      default:
        console.log("Click something dude..!!");
    }
  };

  return (
    <Navbar sticky="top" expand="lg" className="bg-body-tertiary">
      <div>
        {user ? (
          <div>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-0 my-lg-0"
                style={{ padding: "5px" }}
                navbarScroll
              >
                <Nav.Link href="/home">
                  <IconButton id="home">
                    <HomeIcon sx={{ fontSize: "30px" }} />
                  </IconButton>
                </Nav.Link>
                <Nav.Link
                  onClick={() => openPage(user.result._id, "timeSheet")}
                  id="timeSheet"
                  style={{
                    marginTop: "8px",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    color: "#16355d",
                  }}
                >
                  Time Sheet
                </Nav.Link>

                <NavDropdown
                  title="Message"
                  id="navbarScrollingDropdown"
                  style={{
                    marginTop: "8px",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    color: "#16355d",
                  }}
                >
                  <NavDropdown.Item
                    onClick={() => openPage(user.result._id, "leave")}
                    style={{ fontFamily: "Roboto", color: "#16355d" }}
                    id="leave"
                  >
                    Leave Section
                  </NavDropdown.Item>
                  {/* <NavDropdown.Divider /> */}
                  <NavDropdown.Item
                    onClick={() => openPage(user.result._id, "inbox")}
                    style={{ fontFamily: "Roboto", color: "#16355d" }}
                    id="inbox"
                  >
                    Inbox
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title="Downloads"
                  id="navbarScrollingDropdown"
                  style={{
                    marginTop: "8px",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    color: "#16355d",
                  }}
                >
                  <NavDropdown.Item
                    onClick={() => openPage(user.result._id, "payslipPreview")}
                    style={{ fontFamily: "Roboto", color: "#16355d" }}
                    id="payslipPreview"
                  >
                    Salary Slip
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link
                  onClick={() => openPage(user.result._id, "about")}
                  style={{
                    marginTop: "8px",
                    fontFamily: "Roboto",
                    fontWeight: "bold",
                    color: "#16355d",
                  }}
                >
                  About Us
                </Nav.Link>

                {matches && (
                  <div>
                    <Nav.Link
                      onClick={() => openPage(user.result._id, "profile")}
                      style={{
                        marginTop: "8px",
                        fontFamily: "Roboto",
                        fontWeight: "bold",
                        color: "#16355d",
                      }}
                    >
                      Profile
                    </Nav.Link>
                    <Nav.Link
                      onClick={handleLogout}
                      style={{
                        marginTop: "8px",
                        fontFamily: "Roboto",
                        fontWeight: "bold",
                        color: "#16355d",
                      }}
                    >
                      Logout
                    </Nav.Link>
                  </div>
                )}
              </Nav>
              <Grid
                sx={{
                  float: "right",
                  display: "flex",
                  flexDirection: "row",
                  margin: "15px",
                  marginLeft: "400px",
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
            <Marquee
              style={{
                color: "#16355d",
                fontFamily: "Roboto",
                fontWeight: "bold",
              }}
            >
              Please Login to your account
            </Marquee>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default Navibar;
