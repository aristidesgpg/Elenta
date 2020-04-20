import * as React from "react";
import Container from "react-bootstrap/Container";
import ModuleReminderEditor from "./ModuleReminderEditor";
import ModuleTriggerEditor from "./ModuleTriggerEditor";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const ModuleSettingsEditor =
  ({
     reminder,
     trigger,
     setFormReminder,
     setFormTrigger
   }) => {

    return (
      //TODO: Add filter conditions
      <Container>
        <Row>
          <Col md={6}>
            <ModuleTriggerEditor
              trigger={trigger}
              onChange={({formData}) => setFormTrigger(formData)}
            />
          </Col>
          <Col md={6}>
            <ModuleReminderEditor
              reminder={reminder}
              onChange={({formData}) => setFormReminder(formData)}
            />
          </Col>
        </Row>
      </Container>
    );
  };

export default ModuleSettingsEditor;
