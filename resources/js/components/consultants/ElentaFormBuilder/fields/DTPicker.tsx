import * as React from "react";
import * as Datetime from "react-datetime";

export default class DTPicker extends React.Component<any, any> {
    render() {
        return <Datetime {...this.props} onChange={this.props.onChange}/>;
    }
}