import * as React from "react";
import {ModuleTrigger} from "../../../graphql/graphql-generated";
import ElentaJsonForm from "../../shared/ElentaJsonForm/ElentaJsonForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const schema = {
  title: "Trigger",
  type: "object",
  required: ["frequency", "max_sends"],
  properties: {
    id: {
      type: "string"
    },
    start_timestamp: {
      type: "string",
      title: "Latest Start Time",
      dateFormat: true,
      timeFormat: true,
      format: "date-time"
    },
    start_timestamp_field: {
      type: "string",
      title: "Start Time",
      enum: ["ENROL_TIME"],
      default: "ENROL_TIME",
      enumNames: ["Enrol Time"]
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
      start_timestamp_field: {md: 3},
      start_timestamp: {md: 4},
      frequency: {md: 3},
      max_sends: {md: 2}
    }
  ],
  id: {
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
          <ElentaJsonForm
            schema={schema}
            uiSchema={uiSchema}
            formData={trigger}
            onChange={onChange}
          />
      </Container>
    );
  };

interface ModuleTriggerEditorProps {
  trigger: ModuleTrigger,
  onChange: any
}

export default ModuleTriggerEditor;
