import * as React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const ProfileDropdownItem = ({profile}) => {
  return (
    <Dropdown.Item>
      {profile.title}
    </Dropdown.Item>
  );
};

export default ProfileDropdownItem;
