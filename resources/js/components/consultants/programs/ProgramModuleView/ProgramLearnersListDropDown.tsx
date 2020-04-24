import React from 'react';
import {Dropdown, DropdownButton, Image, Row, Col} from "react-bootstrap";


const ProgramLearnersListDropDown = (props) => {

  const handleFieldListAction = (learnerIndex) => {
    const learnersList = props.learnersList;
    learnerIndex = parseInt(learnerIndex, 10);
    if (learnersList[learnerIndex]) {
      const learner = learnersList[learnerIndex];
      props.openElentaJsonForm(learner);
    }
  }

  return (
    <Dropdown drop="down" id="learners-button-dropup" className={props.className}>
      <Row className="align-items-center">
        <Col className="p-0">
          <i className="fas fa-users"/>
        </Col>
        <Col className="pr-0">
          ({`${props.learnersList.length}/${props.maxLearners || props.learnersList.length}`})
        </Col>
        <Col>
          <DropdownButton
            alignRight
            id="dropdown-toggle"
            variant={props.variant || "info"}
            title={props.title}
          >
            {props.learnersList.map((learner, index) =>
              <Dropdown.Item
                key={index}
                onSelect={() => handleFieldListAction(index)}
                className="dropdown-item"
              >
                <Image src={learner.picture_url ? learner.picture_url : '/images/avatar.svg'}
                       className="avatar-learner rounded-circle"
                       alt="Profile Picture" roundedCircle
                />
                <span>{learner.user.name}</span>
              </Dropdown.Item>
            )}
          </DropdownButton>
        </Col>
      </Row>
    </Dropdown>
  );
};

export default ProgramLearnersListDropDown;
