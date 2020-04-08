import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as moment from "moment";

export const ProgramLearnerTable = ({program}) => {
  const columns = [
    {dataField: "name", text: "Name"},
    {dataField: "role", text: "Role"}
  ].concat(program.modules.map(m => {
    return {
      dataField: m.id,
      text: m.title
    };
  }));

  const sends = {};
  program.programModules.forEach(pm => {
    pm.sends.forEach(s => {
      sends[JSON.stringify([pm.module.id, s.learner.id])] = {
        send_timestamp: s.send_timestamp,
        open_timestamp: s.open_timestamp,
        click_timestamp: s.click_timestamp,
        response_timestamp: s.response_timestamp,
        response_feedback: s.response_feedback,
        response_rating: s.response_rating
      }
    });
  });

  const tableData = program.learners.map(l => {
    let obj = {
      "name": l.user.name,
      "role": l.role,
    };

    program.modules.forEach(m => {
      let send = sends[JSON.stringify([m.id, l.id])];
      if (send) {
        if (send.response_timestamp) {
          // TODO change to thumb up/down icon in red or green
          obj[m.id] = (<p>
            Completed on {moment(send.response_timestamp).format("ddd Do MMM YY")}, with a rating
            of {send.response_rating}
          </p>)
        } else if (send.click_timestamp) {
          obj[m.id] = <p>Clicked on {moment(send.click_timestamp).format("ddd Do MMM YY")}</p>
        } else if (send.open_timestamp) {
          obj[m.id] = <p>Opened on {moment(send.open_timestamp).format("ddd Do MMM YY")}</p>
        } else if (send.send_timestamp) {
          obj[m.id] = <p>Sent on {moment(send.send_timestamp).format("ddd Do MMM YY")}</p>
        } else {
          obj[m.id] = <p>Not sent yet</p>
        }

        if (!send.response_timestamp && moment().diff(moment(send.send_timestamp), 'days') >= 2) {
          obj[m.id].style = "{'color': 'red'}";
        }
      }
    });
    return obj;
  });

  return <BootstrapTable keyField='id' data={tableData} columns={columns}/>
};

export default ProgramLearnerTable;
