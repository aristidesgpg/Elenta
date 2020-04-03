import * as React from 'react';
import { EditorState, convertToRaw, convertFromRaw, Modifier, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import ReactHtmlParser from 'react-html-parser';
import SxSelect from '../../common/nestedselect/SxSelect';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './css/fields.css';

export class RichText extends  React.Component<any,any>{

  constructor(props) {
      super(props);                        
      this.state = {schema: props.schema};
  }

  render(){
      const { schema } = this.state;
      console.log(schema);
      try{ 
          let jsonValue = JSON.parse(schema.textValue);             
          return(
              <div>{ReactHtmlParser(jsonValue)}</div>
          );
        } catch(e) { 
          //document.writeln("Caught: " + e.message)
          if(schema.textValue != "")
            console.log("Json Parse Errro in RichText", e);
        }
      return(
          <div>
              {schema.textValue !=="" && <div>{"JSON Parsing Error in RichText"}</div>}
          </div>            
      );
  }
}

export class TextField extends React.Component<any,any>{
  public static defaultProps = {
    getTagList: (): any[] => { return [{}];}
  };

  constructor(props) {
      super(props);                         
      const { formData } = props;
      try{          
        const htmlValue = JSON.parse(formData.textValue);             
        const blocksFromHtml = htmlToDraft(htmlValue);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {...props, editorState};                     
      }
      catch(e){
        console.log("Error", e);
        this.state = {...props, editorState: EditorState.createEmpty()};
      }
      
  }
  componentDidUpdate(){
      
    
  }
  componentDidMount(){
      
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
        <div className="rich-editor-root">
          <Editor
            editorState={editorState}
            wrapperClassName="rich-editor-wrapper"
            editorClassName="rich-editor-textarea"
            onEditorStateChange={this.onEditorStateChange}
            toolbarCustomButtons={[<TagOption tagList={this.props.getTagList()} />]}
          />
          {/*<textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          />*/}
        </div>
      );
  }
}

interface TagOptionProps{
  tagList: [any];
  editorState: EditorState;
  onChange: (value: EditorState) => void;
}

class TagOption extends React.Component<any, any> {
  
onSelectChange = (item)=>{
  const { editorState, onChange } = this.props;
  const contentState = Modifier.replaceText(
    editorState.getCurrentContent(),
    editorState.getSelection(),
    `#${item.parentVal}:#${item.val}`,
    editorState.getCurrentInlineStyle(),
  );
  onChange(EditorState.push(editorState, contentState, 'insert-characters'));
}

render() {
  return (
    <div>
      <SxSelect
        placeholder="Form/Question" list={this.props.tagList}
        onSelectChange={this.onSelectChange}/>
    </div>
  );
}
}