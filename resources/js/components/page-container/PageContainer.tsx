import * as React from "react";
import Container from "react-bootstrap/Container";
import ElentaNav from "./navbar/ElentaNav";
import Row from "react-bootstrap/Row";
import {useQuery} from "@apollo/react-hooks";
import Spinner from "react-bootstrap/Spinner";
import {GET_ME} from "../../graphql/queries";
import LoadingContainer from "../component-container/LoadingContainer";

export const PageContainer = (props) => {
  const {loading, error, data} = useQuery(GET_ME);

  return (
    <LoadingContainer loading={loading} error={error}>
      <ElentaNav profiles={data ? [data.getUser.consultantProfile[0]] : {}}/>
      <Row lg={12}>
        {props.children}
      </Row>
    </LoadingContainer>
  );
};

export default PageContainer;
