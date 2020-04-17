import * as React from "react";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export const ModuleCard = ({
                             module, isActive, setActiveModule, children = null, renameFolder = null
                           }) => {
  return (
    <ListGroupItem as="li"
                   data-id={module.id}
                   action active={isActive} onClick={() => setActiveModule(module)}>
      {module.isFolder
        ? <span onClick={() => renameFolder ? renameFolder(module) : () => null}>
           {module.title}
        </span>
        : module.title
      }

      {children}
    </ListGroupItem>
  )
};

export default ModuleCard;
