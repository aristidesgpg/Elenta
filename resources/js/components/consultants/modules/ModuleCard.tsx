import * as React from "react";
import {Button} from "react-bootstrap";
import ListGroupItem from "react-bootstrap/ListGroupItem";

export const ModuleCard = (props) => {
  const {
    item, onCollapse, onExpand, module, isActive,
    setActiveModule, duplicateModules, deleteModules, renameFolder = null
  } = props;
  return (
    <ListGroupItem as="li"
                   data-id={item.id}
                   action active={isActive} onClick={() => setActiveModule(module)}>
      <div className="d-flex justify-content-between">
        <span onClick={() => (item.isFolder && renameFolder) ? renameFolder(module) : () => null}>
           {item.data.name}

          {item.hasChildren && (
            <div onClick={() => (item.isExpanded ? onCollapse() : onExpand())}>
              {item.isExpanded ? "-" : "+"}
            </div>
          )}
        </span>

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
      </div>
    </ListGroupItem>
  );
};

export default ModuleCard;
