
import * as React from "react";
import ElentaFormBuilder from "./ElentaFormBuilder";
import JsonForm from 'react-jsonschema-form-bs4';

export default class SampleFormEditor extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            schema: {
              type: "object",
              properties: {}
            },
            uiSchema: {
              "ui:field": "FormBuilder",
              "ui:order": []
            }
        };
    }

    onSave = (schema: any, uiSchema: any) => {
        console.log("Saved Schema", schema);
        console.log("Saved uiSchema", uiSchema);
    };

    tagList = () => {
        return [{
            val: "1",
            label: "Form1",
            items: [
              {parentVal: 1, val: "question1", label: "Active Lisenting"},
              {parentVal: 1, val: "question2", label: "Firday"},
              {parentVal: 1, val: "question3", label: "Saturday"}]
          },
            {
              val: "2",
              label: "Form2",
              items: [
                {parentVal: 1, val: "question4", label: "Monday"},
                {parentVal: 1, val: "question5", label: "Tuesday"},
                {parentVal: 1, val: "question6", label: "Thursday"}]
            }
          ];
    }

    render() {
        const { schema, uiSchema } = this.state;
        /*const fields = { FormBuilder:ElentaFormBuilder };
        return (<JsonForm
        schema={schema}
        uiSchema={uiSchema}
        //idSchema={{$id: props.name}}
        fields={{...fields}}                        
        >        
        </JsonForm> );*/
        return <ElentaFormBuilder schema={schema}
                                uiSchema={uiSchema} 
                                enableCorAnswer = {true}
                                tagList = {this.tagList()}
                                onSave={this.onSave}/>
    }
}
