import React, {useEffect} from "react";
import {useQuery} from '@apollo/react-hooks';
import {useParams, Redirect} from "react-router-dom";
import {Container, Spinner} from "react-bootstrap";
import {CURRENT_USER} from "../../graphql/queries";
import _ from "lodash";

export const LoginCallbackPage = () => {
  const {token} = useParams();
  const storageToken = localStorage.getItem('token');
  const user = _.get(useQuery(CURRENT_USER), 'data.user', undefined);

  useEffect(() => {
    if (token && token !== storageToken) {
      localStorage.setItem('token', token);
      window.location.reload();
    }
  }, [token, storageToken]);

  if (user) return (<Redirect to="/preferences"/>);

  return (
    <Container>
      <Spinner animation="border"/>
    </Container>
  );
};

export default LoginCallbackPage;
