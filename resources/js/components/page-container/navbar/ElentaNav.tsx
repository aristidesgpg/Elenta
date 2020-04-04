import * as React from "react";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import Navbar, {NavbarText} from "react-bootstrap/Navbar";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import Dropdown from "react-bootstrap/Dropdown";
import ProfileDropdownItem from "./ProfileDropdownItem";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export const ElentaNav = ({profiles}) => {

  return (
    <Container>
      <Row>
        <Navbar bg="light" fixed="top">
          <NavbarBrand href="/">Elenta</NavbarBrand>
          <NavbarToggle/>
          <NavbarCollapse className="justify-content-end">
            <Dropdown>
              <Dropdown.Toggle id="account-dropdown">
                Welcome Back
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {
                  profiles.map(p => {
                    return <ProfileDropdownItem key={p.id} profile={p} />
                  })
                }
              </Dropdown.Menu>
            </Dropdown>
          </NavbarCollapse>
        </Navbar>
      </Row>
    </Container>
  );
};

export default ElentaNav;
