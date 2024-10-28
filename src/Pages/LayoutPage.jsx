import React, { useContext, useState } from "react";
import { Button, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AuthContext } from "../components/AuthProvider";
import { auth } from "../firebase";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      navigate("/"); // Redirect to home or login page
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleManageBooking = () => {
    navigate("/myappointment");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="/home" className="navbar-brand h1 mt-2">
              Fitness Strive
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Fitness Strive
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link
                    onClick={handleProfile}
                    style={{ cursor: "pointer" }}
                  >
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    onClick={handleManageBooking}
                    style={{ cursor: "pointer" }}
                  >
                    Manage My Booking
                  </Nav.Link>

                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      Fitness Tools
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        target="_blank"
                        href="https://www.calculatorsoup.com/calculators/health/target-heart-rate-zone-calculator.php"
                      >
                        HR Zone
                      </Dropdown.Item>
                      <Dropdown.Item
                        target="_blank"
                        href="https://www.calculatemacro.com/"
                      >
                        Macros Calculator & TDEE
                      </Dropdown.Item>
                      <Dropdown.Item
                        target="_blank"
                        href="https://www.hydrationforhealth.com/en/hydration-tools/hydration-calculator/"
                      >
                        Hydration Calculator
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div className="sm-auto mt-3">
                    <Button variant="danger" onClick={handleLogout}>
                      <i className="bi bi-escape"></i> Logout
                    </Button>
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <Outlet />
    </>
  );
}
export default Layout;
