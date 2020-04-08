import * as React from "react";
import {RIEInput} from "riek";
import { any } from "prop-types";

const EditorTitleField = (props: any, state: any) => {

  const onUpdate = function(title) {    
    const formData = props.getFormData();
    const updatedData = {...formData, ...title };
    props.updateTitle( updatedData );
    //props.onChange({data:}); 
    //props.updateComponentTitle
  };
  const formData = props.getFormData();
  console.log("FormData", props);
  const {id, title=""} = formData;
  let bShowStatic: boolean = false;
  if(props.title != "Title"){
    bShowStatic = true;
  }
  return (
    <React.Fragment>
      { bShowStatic && <h3 id={id}>{props.title}</h3>}
      { !bShowStatic &&
      <legend id={id}>
        <RIEInput
          className="edit-in-place"
          propName="title"
          value={title}
          change={onUpdate} />
      </legend>
      }
    </React.Fragment>    
  );
}

EditorTitleField.defaultProps = {
  updateTitle: (any)=>{},
  getFormData: ()=> any
}

export default EditorTitleField;
