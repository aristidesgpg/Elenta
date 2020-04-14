import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

export const TemplateTable = ({templates}) => {
  if (templates && templates.length > 0) {
    const columns = [
      {dataField: 'title', text: 'Name'},
      //{dataField: 'request_count', text: 'Requests'},
      //{dataField: 'program_count', text: 'Programs'},
      {dataField: 'is_public', text: 'Public'},
      {dataField: 'can_request', text: 'Requestable'}
    ];

    let tableData = templates.map(t => {
      return {
        'title': <a href={`/#/template/content/${t.id}`}>{t.title}</a>,
        'is_public': t.is_public,
        'can_request': t.can_request
      };
    });

    return <BootstrapTable keyField='id' data={tableData} columns={columns}/>
  } else {
    return (
      <Alert variant="info">
        It looks like you don't have any Templates yet, start by creating one below
        <Button href="/template/settings/new">Create Template</Button>
      </Alert>
    );
  }
};

export default TemplateTable;
