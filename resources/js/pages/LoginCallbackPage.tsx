import React, {useEffect} from "react";
import {useQuery} from '@apollo/react-hooks';
import {useParams, Redirect} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import {CURRENT_USER} from "../graphql/queries";

export const LoginCallbackPage = () => {
  const {token} = useParams();
  const storageToken = localStorage.getItem('token');
  const {data: {user}} = useQuery(CURRENT_USER);

  if (user) return (<Redirect to="/preferences"/>);

  useEffect(() => {
    if (token && token !== storageToken) {
      localStorage.setItem('token', token);
      window.location.reload();
    }
  }, [token, storageToken]);

  return (
    <Container>
      <Spinner animation="border"/>
    </Container>
  );
};

export default LoginCallbackPage;
