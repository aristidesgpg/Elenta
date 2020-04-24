import * as React from "react";
import {ModuleTrigger} from "../../../graphql/graphql-generated";
import ElentaJsonForm from "../../shared/ElentaJsonForm/ElentaJsonForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const schema = {
  type: "object",
  required: ["frequency", "max_sends"],
  properties: {
    id: {
      type: "string"
    },
    start_timestamp: {
      type: "string",
      title: "Start Time",
      format: "date-time",
      default: "2020-06-01 12:00:00"
    },
    start_timestamp_field: {
      type: "string",
      title: "Start Timestamp Field",
      enum: ["ENROL_TIME", "CHOOSE_TIME"],
      enumNames: ["Enrol Time", "Choose a Time"]
    },
    frequency: {
      type: "integer",
      title: "Frequency (days)",
      default: 1
    },
    max_sends: {
      type: "integer",
      title: "Max Sends",
      default: 3
    }
  }
};

const uiSchema = {
  "ui:layout": [
    {
      start_timestamp: {md: 4},
      frequency: {md: 4},
      max_sends: {md: 4}
    }
  ],
  id: {
    "ui:widget": "hidden"
  },
  // TODO: Allow reference to previous field
  start_timestamp_field: {
    "ui:widget": "hidden"
  },
  start_timestamp: {
    "ui:widget": "RDP"
  }
};

export const ModuleTriggerEditor: React.FunctionComponent<ModuleTriggerEditorProps> =
  ({
     trigger,
     onChange
   }) => {
    return (
      <Container>
        <Row>
          <h5>Trigger</h5>
        </Row>
        <Row>
          <ElentaJsonForm
            schema={schema}
            uiSchema={uiSchema}
            formData={trigger}
            onChange={onChange}
          />
        </Row>
      </Container>
    );
  };

interface ModuleTriggerEditorProps {
  trigger: ModuleTrigger,
  onChange: any
}

export default ModuleTriggerEditor;
