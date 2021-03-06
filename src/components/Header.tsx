import React, { useEffect, useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap";
import Link from "next/link";
import crypto from "crypto";
import { useRouter } from "next/router";

const Header = () => {
  const [role, setRole] = useState("");
  const [token, setToken] = useState(false);
  const Router = useRouter();
  const logout = () => {
    localStorage.removeItem("staff_data");
    Router.replace("/login");
  };

  //LOCAL STORAGE ENCRYPTION AND DECYPTION keys
  let aeskey: any = "MvYiDO2ePasOLVcN";
  let ivKey: any = "RQBblIzmI3UhH0N9";
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("staff_data")) {
        let data: any = localStorage.getItem("staff_data");
        const md5Key = crypto
          .createHash("md5")
          .update(aeskey)
          .digest("hex")
          .substr(0, 24);
        const decipher = crypto.createDecipheriv(
          "des-ede3",
          md5Key,
          ivKey,
          aeskey
        );
        let decrypted = decipher.update(data, "base64", "utf8");
        decrypted += decipher.final("utf8");
        const access = JSON.parse(decrypted);
        setRole(access.role);
        if (access.token) {
          setToken(true);
        }
      }
    }
  }, []);

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href={role === "admin" ? "/" : "staff_home"}>
            Gas-Vio Portal
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {role === "attendant" && (
                <NavDropdown title="Gas Attendant" id="collasible-nav-dropdown">
                  <Link passHref href="/add_customer">
                    <NavDropdown.Item>Register New Customer</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <Link passHref href="/gas_purchase">
                    <NavDropdown.Item>Sell Gas</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              )}

              {role === "admin" && (
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
                  <Link passHref href="/gas_purchase">
                    <NavDropdown.Item>Sell Gas</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <Link passHref href="/customers">
                    <NavDropdown.Item>Customers</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <Link passHref href="/staff">
                    <NavDropdown.Item>Staffs</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Divider />
                  <Link passHref href="/sales">
                    <NavDropdown.Item>Gas Sold</NavDropdown.Item>
                  </Link>
                </NavDropdown>
              )}

              {token && (
                <Nav.Link eventKey={2} href="#memes">
                  <Button variant="light" onClick={logout}>
                    logout{" "}
                  </Button>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
