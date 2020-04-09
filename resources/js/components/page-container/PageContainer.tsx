import * as React from "react";
import ElentaNav from "./navbar/ElentaNav";
import Row from "react-bootstrap/Row";
import LoadingContainer from "../component-container/LoadingContainer";

export const PageContainer = (props) => {
  return (
    <LoadingContainer>
      <ElentaNav/>
      <Row lg={12}>
        {props.children}
      </Row>
    </LoadingContainer>
  );
};

export default PageContainer;
