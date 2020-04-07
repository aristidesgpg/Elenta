import * as React from "react";
import FieldListDropdown from "./FieldListDropdown";
import {Button, ButtonToolbar, ButtonGroup}  from "react-bootstrap";

interface State{
  
}

interface Props{
  schema: any;
  addField: (field: any) =>void;
  switchField: (name:string, field: any) => void;
}

export default class FormActions extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
  }

  render() {
    const filename = this.props.schema.title + ".json";
    const schemaFileContent = "data:application/json;base64," + btoa(JSON.stringify(this.props.schema));   
    
    return (
      <div>
        <ButtonToolbar className="builder-inner-actions">
          <Button className="float-right" variant="info">
            <a className="float-right" download={filename} href={schemaFileContent}>
              <i className="glyphicon glyphicon-download" />&nbsp;
                Download JSON schema
            </a>
          </Button>
          
          <FieldListDropdown className="float-right" 
            name = {""}
            addField = {this.props.addField}
            switchField = {this.props.switchField}>            
            Add a field
          </FieldListDropdown>        
        </ButtonToolbar>      
      </div>
    );
  }//<i className="fas fa-plus-square"/>
  
}
