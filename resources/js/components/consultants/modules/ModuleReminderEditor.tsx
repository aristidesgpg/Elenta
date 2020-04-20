import * as React from "react";
import {ModuleReminder} from "../../../graphql/graphql-generated";
import JsonForm from "react-jsonschema-form";
import {useState} from "react";

const schema = {
  title: "Module Reminders",
  type: "object",
  required: ["frequency", "max_reminders"],
  properties: {
    id: {
      type: "string"
    },
    subject: {
      type: "string",
      title: "Subject",
    },
    message: {
      type: "string",
      title: "Message",
    },
    frequency: {
      type: "integer",
      title: "Frequency (days)",
      default: 1
    },
    max_reminders: {
      type: "integer",
      title: "Max Reminder",
      default: 3
    }
  }
};

const uiSchema = {
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
      <JsonForm
        schema={schema}
        uiSchema={uiSchema}
        formData={reminder}
        onChange={onChange}
      >
        <br/>
      </JsonForm>
    );
  };

interface ModuleReminderEditorProps {
  reminder: ModuleReminder,
  onChange: any
}

export default ModuleReminderEditor;
