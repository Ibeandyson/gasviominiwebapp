import React from "react";
import { Nav, Navbar, Container, NavDropdown } from "react-bootstrap";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Gasvio-Protal</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Gas Attendance</Nav.Link>
              <NavDropdown title="Admin Panel" id="collasible-nav-dropdown">
                <Link passHref href="/add_staff">
                  <NavDropdown.Item>Add Staff</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <Link passHref href="/add_customer">
                  <NavDropdown.Item>Register New Customer</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <Link passHref href="/create_qr_code">
                  <NavDropdown.Item>Genarate QR Code</NavDropdown.Item>
                </Link>

                <NavDropdown.Divider />
                <NavDropdown.Item>Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link eventKey={2} href="#memes">
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
