import * as React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const ProfileDropdownItem = ({profile, onClick}) => {
  return (
    <Dropdown.Item onClick={onClick}>
      ({profile.__typename == "ConsultantProfile" ? "Consultant" : "Learner"}) {profile.title || profile.role}
    </Dropdown.Item>
  );
};

export default ProfileDropdownItem;
