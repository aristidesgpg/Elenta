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
import {get} from "lodash";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import ProfileDropdownItem from "./ProfileDropdownItem";
import {Link, NavLink} from "react-router-dom";
import {useQuery} from "@apollo/react-hooks";
import {CURRENT_USER, CURRENT_USER_PROFILE} from "../../../graphql/queries";
import './ElentaNav.scss';

export const ElentaNav = () => {
  const {data: {user}} = useQuery(CURRENT_USER);
  const {data: {userProfile}} = useQuery(CURRENT_USER_PROFILE);

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
          <NavbarBrand>
            <Link to="/dashboard">
              <Image src="/images/logo.png" alt="logo" style={{height: '30px'}}/>
            </Link>
          </NavbarBrand>
          <NavbarToggle/>
          <NavbarCollapse className="justify-content-end">
            {user
              ?
              <>
                <Dropdown>
                  <Dropdown.Toggle id="account-dropdown"
                                   className="account-dropdown rounded-circle">
                    {
                      userProfile &&
                      <Image src={userProfile.picture_url ? userProfile.picture_url : '/images/avatar.svg'}
                             className="profile-image"
                             alt="Profile Picture" roundedCircle/>
                    }
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {userProfile && <ProfileDropdownItem key={userProfile.id} profile={userProfile}/>}
                    <Dropdown.Item onClick={() => logout()}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                  <b className="pl-2 pr-4">{user.name}</b>
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
