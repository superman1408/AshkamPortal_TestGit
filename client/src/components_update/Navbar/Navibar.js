import React from 'react';


import { IconButton,Grid } from "@mui/material";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomeIcon from "@mui/icons-material/Home";
import LOGO from "../images/Company.png";
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';

const Navibar = () => {
  return (
      <Navbar sticky='top' expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/auth">
          <img src={LOGO} alt="logo" style={{ width: "220px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/home">
              <IconButton to="/home" id="home">
                <HomeIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Nav.Link>
            <Nav.Link href="/profile" style={{marginTop:'8px'}} >Registration</Nav.Link>
            <NavDropdown title="Message" id="navbarScrollingDropdown" style={{marginTop:'8px'}}>
              <NavDropdown.Item href="/mail/:id/leave">Leave Section</NavDropdown.Item>
              <NavDropdown.Item href="/mail/:id/communication">
                Inbox
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/aboutUs" style={{marginTop:'8px'}} >
              About Us
            </Nav.Link>
          </Nav>
          <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                margin:'5px',
              }}
            >
              
              {/* <Button > */}
                  <NotificationsNoneRoundedIcon />
              {/* </Button> */}
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
      </Container>
    </Navbar>
  )
}

export default Navibar;
