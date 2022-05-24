import React from "react";
import { Nav, Button, Navbar, Container } from "react-bootstrap";

function NavBar() {
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="bg-nav fw-bold"
        fixed="top"
      >
        <Container>
          <Navbar.Brand href="/cars">Binar Car Rental</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cars" className="mx-3">
                Our Service
              </Nav.Link>
              <Nav.Link href="/cars" className="mx-3">
                Why Us
              </Nav.Link>
              <Nav.Link href="/cars" className="mx-3">
                Testimonial
              </Nav.Link>
              <Nav.Link href="/cars" className="mx-3">
                FAQ
              </Nav.Link>
              <Button variant="success" className="mx-3">
                Register
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
