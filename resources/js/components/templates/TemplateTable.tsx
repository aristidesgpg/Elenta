import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export const TemplateTable = ({templates}) => {
    const columns = [
        {dataField: 'title', text: 'Name'},
        //{dataField: 'request_count', text: 'Requests'},
        //{dataField: 'program_count', text: 'Programs'},
        {dataField: 'is_public', text: 'Public'},
        {dataField: 'can_request', text: 'Requestable'}
    ];

    let tableData = templates.map(t => {
      return {
        'title': <a href={`/#/template/content/${t.id}`}>t.title</a>,
        'is_public': t.is_public,
        'can_request': t.can_request
      };
    });

    return <BootstrapTable keyField='id' data={tableData} columns={columns}/>
};

export default TemplateTable;
