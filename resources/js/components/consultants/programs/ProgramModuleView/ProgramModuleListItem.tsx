import React from 'react';
import {ListGroup} from 'react-bootstrap';

const ProgramModuleListItem = ({
                                 module, isActive, setActiveModule
                               }) => {
  return (
    <ListGroup.Item
      as="li"
      data-id={module.id}
      active={isActive} onClick={() => setActiveModule(module)}
    >
      <span>{module.title}</span>
    </ListGroup.Item>
  );
};

export default ProgramModuleListItem;
