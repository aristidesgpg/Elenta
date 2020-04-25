import React, {useState, useEffect} from 'react';
import {Card, Row, Col} from 'react-bootstrap';
import ProgramLearnersListDropDown
  from "../../components/consultants/programs/ProgramModuleView/ProgramLearnersListDropDown";
import ProgramModulesCardList from "../../components/consultants/programs/ProgramModuleView/ProgramModulesCardList";
import ElentaJsonForm from "../../components/shared/ElentaJsonForm/ElentaJsonForm";


const ProgramModuleSendViewerPage = (props) => {
  const propsProgaam = props.program;
  const [program, setProgram] = useState(null);
  const [activeModule, setActiveModule] = useState(null);
  const [formContent, setFormContent] = useState({
    schema: {
      type: "object",
      properties: {}
    },
    uiSchema: {},
    formData: {}
  });

  useEffect(() => {
    if (propsProgaam) {
      setActiveModule(propsProgaam.modules[0]);
      setProgram(propsProgaam);
    }
  }, [propsProgaam]);

  useEffect(() => {
    if (activeModule) {
      const content = JSON.parse(activeModule.content)
      console.log("START_FORM_SCHEMA", activeModule)
      content.schema.title = activeModule.title;
      content.schema.description = activeModule.description;
      setFormContent(content);
    }
  }, [activeModule]);

  return (
    program &&
  <Card>
    <Card.Body>
      <Row>
        <Col>
          <Card.Title>{program.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{program.format}</Card.Subtitle>
        </Col>
        <Col md={"auto"}>
          <ProgramLearnersListDropDown
            className=""
            title={"Learners"}
            learnersList={program.learners || []}
            maxLearners={program.max_learners}
            openElentaJsonForm={() => console.log('LEARNER_SELECTED')}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <ProgramModulesCardList
            modules={program.modules}
            activeModule={activeModule}
            setActiveModule={setActiveModule}
          />
        </Col>
        <Col>
          <ElentaJsonForm
            schema={formContent.schema}
            uiSchema={formContent.uiSchema}
          />
        </Col>
      </Row>
    </Card.Body>
  </Card>

  );
};

export default ProgramModuleSendViewerPage;
