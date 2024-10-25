import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

function Layout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    const handleManageBooking = () => {
        navigate("/myappointment"); 
    };
    
    const handleProfile = () => {
        navigate("/profile"); 
    };

    return (
        <>
            <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
                <Container>
                    <Navbar.Brand href="/home" className="navbar-brand h1 mt-2">Fitness Strive</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link target="_blank" href="https://www.calculatorsoup.com/calculators/health/target-heart-rate-zone-calculator.php">HR Zone</Nav.Link>
                        <Nav.Link target="_blank" href="https://www.calculatemacro.com/">Macros Calculator & TDEE</Nav.Link>
                        <Nav.Link target="_blank" href="https://www.hydrationforhealth.com/en/hydration-tools/hydration-calculator/">Hydration Calculator</Nav.Link>
                        <Nav.Link onClick={handleManageBooking} style={{ cursor: 'pointer' }}>Manage My Booking</Nav.Link>
                        <Nav.Link onClick={handleProfile} style={{ cursor: 'pointer' }}>Profile</Nav.Link>
                    </Nav>
                    <div className="md-auto">
                        <Button variant="danger" onClick={handleLogout}>
                            <i className="bi bi-escape"></i> Logout
                        </Button>
                    </div>
                </Container>
            </Navbar>
            <Outlet />
        </>
    );
}

export default Layout;
