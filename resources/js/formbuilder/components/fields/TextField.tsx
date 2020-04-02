import * as React from "react";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ReactHtmlParser from 'react-html-parser';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './css/fields.css';

export class RichText extends  React.Component<any,any>{

    constructor(props) {
        super(props);        
        this.state = {schema: props.schema};
    }

    render(){
        const { schema } = this.state;
        try{ 
            let jsonValue = JSON.parse(schema.textValue); 
            return(
                <div>{ReactHtmlParser(jsonValue)}</div>
            );
          } catch(e) { 
            //document.writeln("Caught: " + e.message)
          }
        return(
            <div>
                {schema.textValue !=="" && <div>{"JSON Parsing Error in RichText"}</div>}
            </div>            
        );
    }
}

export class TextField extends React.Component<any,any>{
    
    constructor(props) {
        super(props);
        const { schema } = props;        
        console.log("Props", props);
        this.state = {...props, editorState: EditorState.createEmpty()};
    }

    componentDidMount(){
        const { formData } = this.state;
        try{
            const htmlValue = JSON.parse(formData.textValue);            
            this.setState({editorState: convertFromRaw(htmlValue)});            
        }
        catch(e){

        }
    }

    onEditorStateChange: Function = (editorState) => {
        this.setState({
          editorState,
        });
        const { formData } = this.state;
        formData.textValue =JSON.stringify(draftToHtml(convertToRaw(editorState.getCurrentContent())));
        this.props.onChange(formData);
    };
    
    render(){
        const { editorState } = this.state;
        return (
          <div>
            <Editor
              editorState={editorState}
              wrapperClassName="rich-editor-wrapper"
              editorClassName="rich-editor-textarea"
              onEditorStateChange={this.onEditorStateChange}
            />
            {/*<textarea
              disabled
              value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
            />*/}
          </div>
        );
    }
}

