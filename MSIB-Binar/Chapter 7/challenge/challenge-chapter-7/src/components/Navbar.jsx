import React from "react";
import { Nav, Button, Navbar, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import Swal from "sweetalert2";

function NavBar(props) {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    await Swal.fire({
      icon: "success",
      title: "Success",
      text: "You have successfully logged out",
    });
    dispatch(logout());
  };
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
              {!isAuthenticated ? (
                <Button variant="success" className="mx-3" href="/login">
                  Login
                </Button>
              ) : (
                <>
                  <Nav.Link>{user}</Nav.Link>
                  <Button
                    variant="danger"
                    className="mx-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
