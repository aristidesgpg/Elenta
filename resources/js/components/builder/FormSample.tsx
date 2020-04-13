
import * as React from "react";
import ElentaFormBuilder from "./ElentaFormBuilder";

export default class SampleFormEditor extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {            
            schema: {
              type: "object",
              title: "Untitled form",
              description: "Enter some description for your form here",
              properties: {}
            },
            uiSchema: {        
              "ui:order": []
            }            
        };    
    }

    onSave = (schema: any, uiSchema: any) => {
        console.log("Saved Schema", schema);
        console.log("Saved uiSchema", uiSchema);
    };

    render() {
        const { schema, uiSchema } = this.state;
        return <ElentaFormBuilder schema={schema} 
                                uiSchema={uiSchema} onSave={this.onSave}/>
    }
}