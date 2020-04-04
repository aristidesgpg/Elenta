import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

export const ProgramTable = ({programs}) => {
    const columns = [
        {dataField: 'title', text: 'Name'},
        {dataField: 'format', text: 'Format'},
        //{dataField: 'request_count', text: 'Requests'},
        //{dataField: 'program_count', text: 'Programs'},
        {dataField: 'is_public', text: 'Public'},
        {dataField: 'can_request', text: 'Requestable'}
    ];
    return <BootstrapTable keyField='id' data={programs} columns={columns}/>
};

export default ProgramTable;
