import * as React from "react";
import Container from "react-bootstrap/Container";
import ModuleReminderEditor from "./ModuleReminderEditor";
import ModuleTriggerEditor from "./ModuleTriggerEditor";
import Row from "react-bootstrap/Row";
import ModuleRecipientListEditor from "./ModuleRecipientListEditor";
import Col from "react-bootstrap/Col";
import _ from "lodash";

export const ModuleSettingsEditor =
  ({
     reminder,
     trigger,
     setFormReminder,
     setFormTrigger,
     recipientLists,
     recipientList,
     setRecipientList
   }) => {

    return (
      //TODO: Add filter conditions
      <Container>
        <Row>
          <Col>
            <ModuleTriggerEditor
              trigger={trigger}
              onChange={({formData}) => setFormTrigger(formData)}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <ModuleRecipientListEditor
              recipientLists={recipientLists}
              recipientList={recipientList}
              onChange={formData => setRecipientList(_.cloneDeep(recipientLists.filter(rl => rl.id == formData.value)[0]))}
            />
          </Col>
          <Col md={8}>
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
