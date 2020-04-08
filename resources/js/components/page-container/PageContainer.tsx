import * as React from "react";
import ElentaNav from "./navbar/ElentaNav";
import Row from "react-bootstrap/Row";
import {useQuery, useApolloClient} from "@apollo/react-hooks";
import {GET_ME} from "../../graphql/queries";
import LoadingContainer from "../component-container/LoadingContainer";

export const PageContainer = (props) => {
  const client = useApolloClient();
  const {loading, error, data} = useQuery(GET_ME);

  client.writeData({data: {user: data.getUser}});

  return (
    <LoadingContainer loading={loading} error={error}>
      <ElentaNav/>
      <Row lg={12}>
        {props.children}
      </Row>
    </LoadingContainer>
  );
};

export default PageContainer;
