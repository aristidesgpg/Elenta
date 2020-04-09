import * as React from "react";
import axios from "axios";
import {
  NavbarBrand,
  Navbar,
  Dropdown,
  Container,
  Button,
  Image,
  Row
} from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import ProfileDropdownItem from "./ProfileDropdownItem";
import {NavLink} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {CURRENT_USER} from "../../../graphql/queries";
import './ElentaNav.scss';

export const ElentaNav = () => {
  const {data: {user}} = useQuery(CURRENT_USER);

  const logout = () => {
    localStorage.removeItem('token');

    axios.post('/logout')
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        window.location.reload();
      });
  };

  return (
    <Container>
      <Row>
        <Navbar bg="light" fixed="top">
          <NavbarBrand href="/">Elenta</NavbarBrand>
          <NavbarToggle/>
          <NavbarCollapse className="justify-content-end">
            {user
              ?
              <>
                Welcome Back, <b>{user.name}</b>
                <Dropdown>
                  <Dropdown.Toggle id="account-dropdown"
                                   className="account-dropdown rounded-circle">
                    {
                      user.consultantProfile.length &&
                      <Image src={
                        user.consultantProfile[0].picture_url
                          ? user.consultantProfile[0].picture_url
                          : 'https://lorempixel.com/30/30/?64665'
                      }
                             className="profile-image"
                             alt="Profile image" roundedCircle/>
                    }
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {
                      user.consultantProfile.map(p => {
                        return <ProfileDropdownItem key={p.id} profile={p}/>
                      })
                    }

                    <Dropdown.Item onClick={() => logout()}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
              :
              <div>
                <NavLink to={'/login'} activeClassName="disabled">
                  <Button>Log in</Button>
                </NavLink>
              </div>
            }
          </NavbarCollapse>
        </Navbar>
      </Row>
    </Container>
  );
};

export default ElentaNav;
