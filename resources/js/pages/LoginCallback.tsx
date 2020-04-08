import React, {useEffect} from "react";
import {useQuery} from '@apollo/react-hooks';
import {useParams} from "react-router-dom";
import {CURRENT_USER} from "../graphql/queries";
import {Redirect} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";

export const LoginCallback = () => {
  const {token} = useParams();
  const {data: {user}} = useQuery(CURRENT_USER);

  if (user) return (<Redirect to="/"/>);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    }
    window.location.assign('/#/consultant-dashboard');
  }, [token]);

  return (
    <Container>
      <Spinner animation="border"/>
    </Container>
  );
};

export default LoginCallback;
