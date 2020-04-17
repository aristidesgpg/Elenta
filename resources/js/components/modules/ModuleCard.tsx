import * as React from "react";
import {Button} from "react-bootstrap";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export const ModuleCard = ({
                             module, isActive, setActiveModule, duplicateModules,
                             deleteModules, children = null, renameFolder = null
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


      <div className="actions">
        <Button variant="outline-dark" size="sm"
                onClick={() => duplicateModules(module)}>
          <i className="fas fa-copy"/>
        </Button>
        <Button variant="outline-dark" size="sm"
                onClick={() => deleteModules(module)}>
          <i className="fas fa-trash"/>
        </Button>
      </div>

      {children}
    </ListGroupItem>
  )
};

export default ModuleCard;
