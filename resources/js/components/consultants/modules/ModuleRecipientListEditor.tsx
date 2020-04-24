import * as React from "react";
import Select from 'react-select'
import Container from "react-bootstrap/Container";

export const ModuleRecipientListEditor =
  ({
     recipientList,
     recipientLists,
     onChange
   }) => {

    // TODO: Fix this style
    return (
      <div>
        <h5 style={{paddingBottom: "33px"}}>Recipient List</h5>
        <Select
          value={recipientList && recipientList.id}
          options={recipientLists.map(r => {
            return {
              value: r.id,
              label: r.name,
            }
          })}
          onChange={onChange}
        />
      </div>
    );
  };

export default ModuleRecipientListEditor;
