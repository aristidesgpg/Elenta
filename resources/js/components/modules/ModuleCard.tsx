import * as React from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export const ModuleCard = ({module, active}) => {
  return (
      <ListGroupItem active={active}>
          {module.title}
      </ListGroupItem>
  )
};

export default ModuleCard;
