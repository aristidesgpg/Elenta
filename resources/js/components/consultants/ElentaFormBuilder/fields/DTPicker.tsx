import * as React from "react";
import * as Datetime from "react-datetime";
import {Moment} from "moment";

export default class DTPicker extends React.Component<any, any> {
  render() {
    return <Datetime
      {...this.props}
      onChange={(d: Moment) => {
        this.props.onChange(d.format("YYYY-MM-DD HH:mm:ss"))
      }}
      utc={true}
      dateFormat="YYYY-MM-DD"
      timeFormat="HH:mm:ss"
      timeConstraints={{
        minutes: {
          min: 0,
          max: 59,
          step: 15
        }
      }}
    />;
  }
}
