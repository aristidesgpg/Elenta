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
    return <BootstrapTable keyField='id' data={templates} columns={columns}/>
};

export default TemplateTable;
