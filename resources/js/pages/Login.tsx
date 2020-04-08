import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import {CURRENT_USER} from "../graphql/queries";
import {Redirect} from "react-router-dom";
import {Tab, Tabs} from "react-bootstrap";

export const Login = () => {
  const {data: {user}} = useQuery(CURRENT_USER);

  if (user) return (<Redirect to="/" />);

  return (
    <Tabs defaultActiveKey="log-in" id="uncontrolled-tab-example">
      <Tab eventKey="log-in" title="Log in">
        LoginForm
      </Tab>
      <Tab eventKey="sign-up" title="Sign Up">
        SignUpForm
      </Tab>
    </Tabs>
  );
};

export default Login;
