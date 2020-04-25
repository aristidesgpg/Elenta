import * as React from "react";
import Select from 'react-select'

// TODO: This doesn't load in default
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
          value={recipientList && {
            value: recipientList.id,
            label: recipientList.name
          }}
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
