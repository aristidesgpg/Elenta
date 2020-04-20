import * as React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import {formatDate} from "../../../utils/utils";

export const TemplateRequestTable = ({requests}) => {
  const columns = [
    {dataField: "email", text: "Email"},
    {dataField: "organization", text: "Organization"},
    {dataField: "comment", text: "Comment"}
  ];

  return <BootstrapTable keyField='id' data={requests} columns={columns}/>
};

export default TemplateRequestTable;
