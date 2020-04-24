import * as React from "react";
import {ModuleTrigger} from "../../../graphql/graphql-generated";
import ElentaJsonForm from "../../shared/ElentaJsonForm/ElentaJsonForm";

const schema = {
  title: "Module Triggers",
  type: "object",
  required: ["frequency", "max_reminders"],
  properties: {
    id: {
      type: "string"
    },
    start_timestamp: {
      type: "string",
      title: "Start Time",
      format: "date-time",
      default: ""
    },
    start_timestamp_field: {
      type: "string",
      title: "Start Timestamp Field",
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
      <ElentaJsonForm
        schema={schema}
        uiSchema={uiSchema}
        formData={trigger}
        onChange={onChange}
      >
        <br/>
      </ElentaJsonForm>
    );
  };

interface ModuleTriggerEditorProps {
  trigger: ModuleTrigger,
  onChange: any
}

export default ModuleTriggerEditor;
