import * as React from 'react';
import { Draggable, Droppable } from "react-drag-and-drop";

export class RankField extends  React.Component<any,any>{

    constructor(props) {
      super(props);                       
      let {formData, schema} = props;
      
      if(formData === undefined || formData.length == 0 ){
        formData = [...schema.items.enum];
      } 
      this.state = { formData, schema};                
    }

    componentDidMount(){
      this.props.onChange([...this.state.formData]);
    }
    
    handleDrop(data,dropItem) {            
      if ("moved-item" in data && data["moved-item"]) {
        if (data["moved-item"] !== dropItem) {          
          const firstItem = data["moved-item"];          
          let { formData } = this.state;
          const indFirst = formData.indexOf(firstItem);
          const indSecond = formData.indexOf(dropItem);
          formData[indFirst] = dropItem;
          formData[indSecond] = firstItem;
          this.setState({ formData }, 
            ()=> this.props.onChange([...formData]));          
        }
      } 
    }
    

    render(){
        const {formData, schema} = this.state;
        return (
        <div>
          <div className="form-group">
            <label className="control-label">{schema.title}</label>
            <p className="field-description">{schema.description}</p>
            {formData.map((item, index) => {                      
                      return (
                            <Draggable  type="moved-item"
                                        key = {index} data={item}>
                              <Droppable
                                types={["moved-item"]}
                                onDrop={(data) => this.handleDrop(data, item)}>
                                <span>{item}</span>
                              </Droppable>
                            </Draggable>);
              })
            }            
          </div>          
        </div>
          
        );
    }
}