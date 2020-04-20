import * as React from "react";
import {ModuleTrigger} from "../../../graphql/graphql-generated";
import JsonForm from "react-jsonschema-form";
import {useState} from "react";
import _ from "lodash";

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
  //TODO
  start_timestamp_field: {
    "ui:widget": "hidden"
  }
};

export const ModuleTriggerEditor: React.FunctionComponent<ModuleTriggerEditorProps> =
  ({
     trigger,
     onChange
   }) => {
    return (
      <JsonForm
        schema={schema}
        uiSchema={uiSchema}
        formData={trigger}
        onChange={onChange}
      >
        <br/>
      </JsonForm>
    );
  };

interface ModuleTriggerEditorProps {
  trigger: ModuleTrigger,
  onChange: any
}

export default ModuleTriggerEditor;
