import React, { useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import ProgramModuleListItem from "./ProgramModuleListItem";

const ProgramModulesCardList = (props) => {

  return (
    <Card>
      <Card.Header>Modules</Card.Header>
      <ListGroup as="ul">
        {props.modules.map(module =>
         <ProgramModuleListItem
           key={module.pivot.id}
           module={module}
           isActive={props.activeModule ? module.id === props.activeModule.id : false}
           setActiveModule={props.setActiveModule}
         />)}
      </ListGroup>
    </Card>
  );
};

export default ProgramModulesCardList;
