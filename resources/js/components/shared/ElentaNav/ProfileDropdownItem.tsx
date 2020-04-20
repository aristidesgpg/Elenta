import * as React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import {Link} from "react-router-dom";

export const ProfileDropdownItem = ({profile}) => {
  return (
    <Dropdown.Item>
      <Link to="/preferences">{profile.title}</Link>
    </Dropdown.Item>
  );
};

export default ProfileDropdownItem;
