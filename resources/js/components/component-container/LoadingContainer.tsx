import * as React from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

export const LoadingContainer = (props) => {
  if (props.loading) return (
    <Container>
        <Spinner animation="border"/>
    </Container>
  );

  if (props.error) return (
    <Container>
      <Alert variant="danger" transition={null}>
        {
          props.error.graphQLErrors.map(e => {
            return <p key={e.message}>{e.message}</p>
          })
        }
      </Alert>
    </Container>
  );

  return (
    <Container>
      {props.children}
    </Container>
  );
};

export default LoadingContainer;
