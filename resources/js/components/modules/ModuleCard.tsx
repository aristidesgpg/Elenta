import * as React from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export const ModuleCard = ({module, isActive, setActiveModule}) => {
  return (
      <ListGroupItem action active={isActive} onClick={() => setActiveModule(module)}>
          {module.title}
      </ListGroupItem>
  )
};

export default ModuleCard;
