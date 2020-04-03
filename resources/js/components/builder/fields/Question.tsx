import * as React from 'react';

export class Question extends  React.Component<any,any>{

    constructor(props) {
        super(props);                        
        this.state = { ...props.formData};
    }

    onChange(name) {
        return (event) => {
          this.setState({
            [name]: event.target.value
          }, () => this.props.onChange(this.state));
        };
      }

    render(){
        const { questionTitle, questionDesc } = this.state;
        return (
        <div>
          <div className="form-group">
            <input className="form-control" type="text" value={ questionTitle } placeholder="Title" onChange={this.onChange("questionTitle")} />
          </div>
          <div className="form-group">
            <input className="form-control" type="text" value={ questionDesc } placeholder="Description" onChange={this.onChange("questionDesc")} />
          </div>
        </div>
          
        );
    }
}