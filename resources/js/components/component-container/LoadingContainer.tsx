import * as React from "react";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import "./LoadingContainer.scss";

export const LoadingContainer = (props) => {
  let isLoading = props.loading;
  if (Array.isArray(props.loading)) {
    isLoading = props.loading.reduce((p, c) => p || c);
  }

  if (isLoading) return (
    <Container className="loading-container">
      <div className="wrapper">
        <div className="overlay">
          <Spinner className="loading-spinner" animation="border"/>
        </div>
          {props.children}
      </div>
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
