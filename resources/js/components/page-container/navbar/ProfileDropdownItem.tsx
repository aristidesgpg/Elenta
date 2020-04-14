import * as React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {NavLink} from "react-router-dom";

export const ProfileDropdownItem = ({path, profile}) => {
  return (
    <Dropdown.Item>
      <NavLink to={path} activeClassName="disabled">
        {profile.title}
      </NavLink>
    </Dropdown.Item>
  );
};

export default ProfileDropdownItem;
