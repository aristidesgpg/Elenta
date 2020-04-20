import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {formatDate} from "../../../../utils/utils";

export const ProgramInviteTable = ({invites}) => {
  const columns = [
    {dataField: "email", text: "Email"},
    {dataField: "invited_at", text: "Sent"},
    {dataField: "enrolled", text: "Enrolled"}
  ];

  let tableData = invites.map(i => {
    return {
      email: i.email,
      invited_at: formatDate(i.created_at),
      enrolled: (i.learner && i.learner.id) ? "Yes" : "No"
    };
  });

  return <BootstrapTable keyField='id' data={tableData} columns={columns}/>
};

export default ProgramInviteTable;
