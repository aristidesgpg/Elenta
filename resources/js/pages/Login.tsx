import * as React from "react";
import {useQuery} from '@apollo/react-hooks';
import {CURRENT_USER} from "../graphql/queries";
import {Redirect} from "react-router-dom";
import LoginTabs from "../components/auth/LoginTabs";

export const Login = () => {
  const {data: {user}} = useQuery(CURRENT_USER);

  if (user) return (<Redirect to="/"/>);

  return (
    <LoginTabs/>
  );
};

export default Login;
