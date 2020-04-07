import * as React from "react";
import JsonForm from "react-jsonschema-form";
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";
import {getDefaultRegistry} from "react-jsonschema-form/lib/utils";
import {slugify, clone, unique} from "../../utils/utils"
import FormActions from "./FormActions";
import EditableField from "./fields/EditableField";
import TitleField from "./fields/TitleField";
import DescriptionField from "./fields/DescriptionField";
import { TextField, RichTextWidget} from "./fields/TextField";
import { Question } from "./fields/Question";
import { RankField } from "./fields/RankField";
import * as Datetime from 'react-datetime';

interface State{
  error: string;
  schema: any;
  uiSchema: any;
  formData: any;
  currentIndex: number;
  newKey: number;
}

interface Props{

}

export default class Form extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
      schema: {
        type: "object",
        title: "Untitled form",
        description: "Enter some description for your form here",
        properties: {}
      },
      uiSchema: {        
        "ui:order": []
      },
      formData: {},
      currentIndex: 0,
      newKey: 0
    };    
    DescriptionField.defaultProps = { updateFormDescription: this.updateFormDescription };
    TitleField.defaultProps = { updateFormTitle: this.updateFormTitle };
    EditableField.defaultProps = { addField: this.addField, switchField: this.swapFields,
                                  removeField: this.removeField, updateField: this.updateField,
                                  renameField: this.renameField, insertField: this.insertField,
                                  swapFields: this.swapFields };
      TextField.defaultProps ={ getTagList: this.getTagList };
    
  }

  componentDidMount() {
    
    //Object.assign(
    //{}, DescriptionField.defaultProps || {}, {updateFormDescription: this.updateFormDescription});
  }

  onChange = (e) => {
    console.log("FormData" , e);    
  }

  //*********  Actions  ***********/
  
  updateFormDescription = (description: string)=>{
    this.setState({ schema: { ...this.state.schema, description } })
  }

  updateFormTitle = (title: string)=>{
    this.setState({ schema: { ...this.state.schema, title } })
  }
  

  addField = (field: any) : any =>{
    const { currentIndex, schema, uiSchema } = this.state;
    this.setState({ currentIndex: currentIndex + 1 });
    const name = `Question ${currentIndex}`;
    const _slug = slugify(name);
    schema.properties[_slug] = {...field.jsonSchema, title: name};
    uiSchema[_slug] = field.uiSchema;
    uiSchema["ui:order"] = (uiSchema["ui:order"] || []).concat(_slug);
    let newKey = Math.random();
    return this.setState({ schema, uiSchema, newKey });    
  }

  switchField = (propertyName:string, newField: any) => {
    const { schema, uiSchema } = this.state;
    schema.properties[propertyName] = {...newField.jsonSchema};
    uiSchema[propertyName] = newField.uiSchema;
    this.setState({ schema, uiSchema });    
  }

  removeField = (name: string) => {
    const { schema, uiSchema } = this.state;    
    
    const requiredFields = schema.required || [];
    delete schema.properties[name];
    delete uiSchema[name];
    uiSchema["ui:order"] = uiSchema["ui:order"].filter(
      (field) => field !== name);
    schema.required = requiredFields
      .filter(requiredFieldName => name !== requiredFieldName);
    if (schema.required.length === 0) {
      delete schema.required;
    }
    const newSchema = clone(schema);
    let newKey = Math.random();
    return this.setState({ ...newSchema, uiSchema, error: null, newKey });
  }

  updateField = (name: string, newSchema: any, required: boolean, newLabel: string) => {    
    const { schema } = this.state;
    const existing = Object.keys(schema.properties);
    const newName = slugify(newLabel);
       
    if (name !== newName && existing.indexOf(newName) !== -1) {
      // Field name already exists, we can't update state
      const error = `Duplicate field name "${newName}", operation aborted.`;
      return this.setState({ error });
    }
    const requiredFields = schema.required || [];
    schema.properties[name] = newSchema;
    if (required) {
      // Ensure uniquely required field names
      schema.required = unique(requiredFields.concat(name));
    } else {
      schema.required = requiredFields
        .filter(requiredFieldName => name !== requiredFieldName);
    }
    if (newName !== name) {
      return this.renameField(name, newName);
    }
    let newKey = Math.random();
    return this.setState({ schema, error: null, newKey });    
  }

  renameField = (name: string, newName: string) => {
    const { schema, uiSchema } = this.state;
    const newSchema = clone(schema.properties[name]);
    const newUiSchema = clone(uiSchema[name]);
    const order = uiSchema["ui:order"];
    const required = schema.required;
    delete schema.properties[name];
    delete uiSchema[name];
    schema.properties[newName] = newSchema;
    schema.required = required.map(fieldName => {
      return fieldName === name ? newName : fieldName;
    });
    uiSchema[newName] = newUiSchema;
    uiSchema["ui:order"] = order.map(fieldName => {
      return fieldName === name ? newName : fieldName;
    });
    let newKey = Math.random();
    this.setState({ schema, uiSchema, error: null, newKey });
  }

  insertField = (field:any, before:any) => {
    const insertedState = this.addField(field);
    const order = insertedState.uiSchema["ui:order"];
    const added = order[order.length - 1];
    const idxBefore = order.indexOf(before);
    const newOrder = [].concat(
      order.slice(0, idxBefore),
      added,
      order.slice(idxBefore, order.length - 1)
    );
    insertedState.uiSchema["ui:order"] = newOrder;
    this.setState({ ...insertedState, error: null });
  }
  
  swapFields = (source, target) => {
    const { uiSchema } = this.state;
    const order = uiSchema["ui:order"];
    const idxSource = order.indexOf(source);
    const idxTarget = order.indexOf(target);
    order[idxSource] = target;
    order[idxTarget] = source;
    let newKey = Math.random();
    this.setState({ uiSchema, error: null, newKey });
  }

  getTagList = (): any[] =>{
    return [{ val:"1",
              label:"Form1",
              items:[
                { parentVal:1, val:"question1", label:"Active Lisenting" },
                { parentVal:1, val:"question2", label:"Firday" },
                { parentVal:1, val:"question3", label:"Saturday" }]
            },
            { val:"2",
              label:"Form2",
              items:[
                { parentVal:1, val:"question4", label:"Monday" },
                { parentVal:1, val:"question5", label:"Tuesday" },
                { parentVal:1, val:"question6", label:"Thursday" }]
            }
          ];
  }
  
  //********  Render *******/
  render() {
    const { error, schema, newKey, uiSchema } = this.state;
    console.log("State", this.state);
    const widgets = {
      RichText: RichTextWidget      
    };
    const registry = {    
      ...getDefaultRegistry(),
      fields: {      
        ...getDefaultRegistry().fields,
        SchemaField: EditableField,
        TitleField: TitleField,
        DescriptionField: DescriptionField,       
      },
      //widgets:{...widgets,...getDefaultRegistry().widgets}
    };      
    return (      
      <div>
        {error ? <div className="alert alert-danger">{error}</div> : <div/>}
        <div className="rjsf builder-form">
        {true && <SchemaField key={newKey} {...this.state} 
                              schema={schema}                               
                              registry={registry} 
                              onChange={this.onChange}>              
                  </SchemaField>}
        {false && <h1>Preview</h1>}
        {false && <JsonForm key={newKey+1} {...this.state} 
                    schema ={schema} uiSchema = {uiSchema}
                    fields={{Question: Question, Rank:RankField, rdp: Datetime}} 
                    widgets={{...widgets}} onChange={this.onChange} >
          <button type="submit" className="hidden">Submit</button>
          </JsonForm>}
        </div>
  
        <FormActions  
            schema = {schema}
            addField = {this.addField}
            switchField = {this.switchField}/>
      </div>
    );
  }  
  
}