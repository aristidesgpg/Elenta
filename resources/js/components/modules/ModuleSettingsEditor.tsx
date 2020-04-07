import * as React from "react";
import Container from "react-bootstrap/Container";
import ModuleReminderEditor from "./ModuleReminderEditor";
import ModuleTriggerEditor from "./ModuleTriggerEditor";

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
        <ModuleTriggerEditor
          trigger={trigger}
          onChange={({formData}) => setFormTrigger(formData)}
        />
        <ModuleReminderEditor
          reminder={reminder}
          onChange={({formData}) => setFormReminder(formData)}
        />
      </Container>
    );
  };

export default ModuleSettingsEditor;
