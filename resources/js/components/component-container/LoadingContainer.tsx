import * as React from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import {GET_ME} from "../../graphql/queries";
import {useApolloClient, useQuery} from "@apollo/react-hooks";

export const LoadingContainer = (props) => {
  const client = useApolloClient();
  const token  = localStorage.getItem('token');

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

  if (loading) return (
    <Container>
        <Spinner animation="border"/>
    </Container>
  );

  if (error) return (
    <Container>
      <Alert variant="danger" transition={null}>
        {
          error.graphQLErrors.map(e => {
            return <p key={e.message}>{e.message}</p>
          })
        }
      </Alert>
    </Container>
  );

  client.writeData({data: {user: data ? data.getUser : null}});

  return (
    <Container>
      {props.children}
    </Container>
  );
};

export default LoadingContainer;
