import * as React from "react";
import {ModuleReminder} from "../../../graphql/graphql-generated";
import ElentaJsonForm from "../../shared/ElentaJsonForm/ElentaJsonForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const schema = {
  type: "object",
  required: ["frequency", "max_reminders"],
  properties: {
    id: {
      type: "string"
    },
    frequency: {
      type: "integer",
      title: "Frequency (days)",
      default: 1
    },
    max_reminders: {
      type: "integer",
      title: "Max Reminders",
      default: 3
    }
  }
};

const uiSchema = {
  "ui:layout": [
    {
      frequency: {md: 6},
      max_reminders: {md: 6}
    }
  ],
  id: {
    "ui:widget": "hidden"
  }
};

export const ModuleReminderEditor: React.FunctionComponent<ModuleReminderEditorProps> =
  ({
     reminder,
     onChange
   }) => {

    return (
      <Container>
        <Row>
          <h5>Reminder</h5>
        </Row>
        <Row>
          <ElentaJsonForm
            schema={schema}
            uiSchema={uiSchema}
            formData={reminder}
            onChange={onChange}
          />
        </Row>
      </Container>
    );
  };

interface ModuleReminderEditorProps {
  reminder: ModuleReminder,
  onChange: any
}

export default ModuleReminderEditor;
