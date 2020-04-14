import * as React from "react";
import { Draggable, Droppable } from "react-drag-and-drop";
//import Form from "react-jsonschema-form";
import { ButtonToolbar, Button } from "react-bootstrap";
import Slider, { Range } from "rc-slider";
import 'rc-slider/assets/index.css';
import Form from 'react-jsonschema-form-bs4';
import debounce from 'lodash.debounce';
import { TextField, RichTextWidget} from "./TextField";
import EditorTitleField from "./EditorTitleField";
import EditorDescField from "./EditorDescField";
import DTPicker from "./DTPicker";
import { RankField } from "./RankField";
import { ImageWidget } from "./ImageWidget"
import { VideoWidget } from "./VideoWidget"
import RepeaterEditField from "./repeater/RepeaterEditField";


//import {withTheme} from "@rjsf/core";

export function pickKeys(source, target, excludedKeys) {
  const result = {};

  let isExcluded;
  for (let key in source) {
    isExcluded = excludedKeys.indexOf(key) !== -1;
    if (isExcluded) {
      continue;
    }
    result[key] = target[key];
  }
  return result;
}

export function shouldHandleDoubleClick(node) {
  // disable doubleclick on number input, so people can use inc/dec arrows
  if (node.tagName === "INPUT" &&
      node.getAttribute("type") === "number") {
    return false;
  }
  return true;
}

class FieldPropertiesEditor extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {editedSchema: props.schema};
    this.onChangeDebounced = debounce(this.onChangeDebounced, 500);
  }

  getFormData = () =>{
    const {schema, required} = this.props;
    const formData = {
      ...schema,
      required,
      ...this.state.editedSchema,
      name: this.state.name
    };
    return formData;
  }

  onUpdateTitleDesc = (formData) =>{    
    this.setState({editedSchema: formData});
    this.onChangeDebounced({formData});
  }

  onChange = ({formData}) => {        
    this.setState({editedSchema: formData});
    this.onChangeDebounced({formData});
  }

  onChangeDebounced = ({formData}) =>{
    this.props.onUpdate({formData})
  }

  render() {
    
    const {schema, name, required, uiSchema, onUpdate, fields} = this.props;
    const formData = {
      ...schema,
      required,
      ...this.state.editedSchema,
      name: this.state.name
    };

    return (
      <div className="row panel panel-default field-editor">
        <div className="panel-heading clearfix col-12">
            <strong className="panel-title">Setting</strong>            
        </div>
        <div className="panel-body col-12">   
          <EditorTitleField title ={formData.title} updateTitle= { this.onUpdateTitleDesc } getFormData={ this.getFormData }/>
          <EditorDescField  description={formData.description} updateDescription={ this.onUpdateTitleDesc } getFormData={ this.getFormData }/>       
          <Form
            formData={formData}
            schema={uiSchema.editSchema}
            uiSchema = {uiSchema.editUISchema}            
            fields={{...fields}}
            onChange={this.onChange}>
            <button type="submit" hidden>Submit</button>
          </Form>
        </div>
      </div>
    );
  }
}
//onSubmit={onUpdate}<button type="submit" className="btn btn-info float-right">Submit</button>

export default class EditableField extends React.Component<any,any> {
    public static defaultProps = {
    
    };

  constructor(props) {
    super(props);
    this.state = { settingUpdated: false, schema: props.schema};
  }

  handleUpdate = ({formData}) => {
    // Exclude the "type" key when picking the keys as it is handled by the
    // SWITCH_FIELD action.   
    //console.log("Update", formData); 
    const updated = pickKeys(this.props.schema, formData, ["type"]);
    const schema = {...this.props.schema, ...updated};    
    this.setState({settingUpdated: true, schema});
    this.props.updateField(
      this.props.name, schema, formData.required, formData.title);    
  }

  handleDelete = (event) => {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this field?")) {
      this.props.removeField(this.props.name);
    }
  }

  handleDrop = (data) => {
    const {name, swapFields, insertField} = this.props;
    if ("moved-field" in data && data["moved-field"]) {
      if (data["moved-field"] !== name) {
        swapFields(data["moved-field"], name);
      }
    } else if ("field" in data && data.field) {
      insertField(JSON.parse(data.field), name);
    }
  }


  render() {
    const props = this.props;    
    const fields = {RichEditor:TextField,                                  
                    Rank: RankField,                    
                    };
    const widgets = {
        RichText: RichTextWidget,   
        RDP: DTPicker,
        Range: Slider,
        Image: ImageWidget,
        Video: VideoWidget             
      };
    const { uiSchema } = props;
    const { schema } = this.state;
    const { isRepeater } = props.uiSchema;         
    if(isRepeater){
      console.log("Schema", schema);      
    }
    return (      
        <div className="container-fluid">
            <Draggable type="moved-field" data={props.name}>              
                <div className="row editable-field">
                  <div className="col editfield-title">
                    <i className="fas fa-ellipsis-v"/>
                    <strong>{props.name}</strong>
                    <ButtonToolbar className="float-right">           
                        <i className="fas fa-times-circle" onClick={this.handleDelete} style={{ cursor: "pointer" }}/>
                    </ButtonToolbar>
                  </div>              
                </div>        
              
            </Draggable>
            <Droppable types={["field", "moved-field"]}  onDrop={this.handleDrop}>
                <div className="row editfield-body">
                  <div className="col-sm-6">
                    <Form {...props}                              
                    schema={schema}
                    uiSchema={uiSchema}
                    //idSchema={{$id: props.name}}
                    fields = {{...fields}}
                    widgets = {{...widgets}}>
                      <button type="submit" hidden>Submit</button>
                    </Form>
                  </div>
                  <div className="col-sm-6">       
                  { isRepeater === true && <RepeaterEditField {...props}                     
                                            fields = {{...fields}}
                                            widgets = {{...widgets}}                                      
                                            onUpdate={this.handleUpdate}/>
                  }     
                  { isRepeater !== true && <FieldPropertiesEditor
                                            {...props}                     
                                            fields = {{...fields}}
                                            widgets = {{...widgets}}
                                            onUpdate={this.handleUpdate}/>
                  } 
                  </div>
                </div> 
            </Droppable>
        </div>                
    );
  }
}
