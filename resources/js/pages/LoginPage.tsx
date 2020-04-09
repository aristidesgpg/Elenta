import * as React from "react";
import {useQuery} from '@apollo/react-hooks';
import {CURRENT_USER} from "../graphql/queries";
import {Redirect} from "react-router-dom";
import LoginTabs from "../components/auth/LoginTabs";

export const LoginPage = () => {
  const {data: {user}} = useQuery(CURRENT_USER);

  if (user) return (<Redirect to="/consultant-dashboard"/>);

  return (
    <LoginTabs/>
  );
};

export default LoginPage;
