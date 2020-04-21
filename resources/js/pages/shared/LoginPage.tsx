import * as React from "react";
import {useQuery} from '@apollo/react-hooks';
import {CURRENT_USER} from "../../graphql/queries";
import {Redirect} from "react-router-dom";
import LoginTabs from "../../components/shared/auth/LoginTabs";

export const LoginPage = () => {
  const data = useQuery(CURRENT_USER);

  if (data.data) return (<Redirect to="/dashboard"/>);

  return (
    <LoginTabs/>
  );
};

export default LoginPage;
