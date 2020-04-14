import * as React from "react";
import {useApolloClient, useQuery} from "@apollo/react-hooks";
import Row from "react-bootstrap/Row";
import {get} from "lodash";
import LoadingContainer from "../component-container/LoadingContainer";
import ElentaNav from "./navbar/ElentaNav";
import {GET_ME} from "../../graphql/queries";

export const PageContainer = (props) => {
  const client = useApolloClient();
  const token = localStorage.getItem('token');

  let response = {
    loading: false,
    error: null,
    data: null
  };

  if (token) {
    const {loading, error, data} = useQuery(GET_ME);
    response = {...{loading, error, data}};
  }
  const {loading, error, data} = response;

  if (error) {
    localStorage.removeItem('token');
    window.location.replace('/login');
  }
  // TODO change the logic of getting the correct profile
  const userProfile = get(data, 'me.consultantProfile[0]', null);
  const user = get(data, 'me', null);
  client.writeData({
    data: {
      user,
      userProfile
    }
  });

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
