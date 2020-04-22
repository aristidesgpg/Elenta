import * as React from "react";
import * as Datetime from "react-datetime";

export default class DTPicker extends React.Component<any, any> {
    render() {        
        const { schema } = this.props;
        return <Datetime dateFormat={schema.dateFormat} timeFormat={schema.timeFormat} {...this.props} onChange={this.props.onChange}/>;
    }
}