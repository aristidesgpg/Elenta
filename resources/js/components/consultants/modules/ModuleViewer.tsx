import React from 'react';
import {Row, Col} from 'react-bootstrap';
import ElentaJsonForm from "../../shared/ElentaJsonForm/ElentaJsonForm";
import ProgramLearnersListDropDown from '../programs/ProgramModuleView/ProgramLearnersListDropDown';

const ModuleViewer = ({
                        activeModule,
                        formContent,
                        learners,
                        maxLearners
                      }) => {
  return (
    <>
      <Row>
        <Col>
          <h5>Title</h5>
          {activeModule && activeModule.title}
        </Col>
        <Col md={"auto"}>g
          <ProgramLearnersListDropDown
            className=""
            variant=""
            title={"Learners"}
            learnersList={learners || []}
            maxLearners={maxLearners}
            selectedLearner={() => console.log('LEARNER_SELECTED')}
          />
        </Col>
      </Row>
      <Row>
        <Col md={9}>
          <h5>Description</h5>
          {activeModule && activeModule.description}
        </Col>
      </Row>
      <Row>
        <Col>
          <ElentaJsonForm
            schema={formContent.schema}
            uiSchema={formContent.uiSchema}
            disabled
          />
        </Col>
      </Row>
    </>
  );
};

export default ModuleViewer;
