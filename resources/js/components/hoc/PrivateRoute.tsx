import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import {CURRENT_USER} from "../../graphql/queries";
import {Redirect, Route} from "react-router-dom";

export const PrivateRoute = ({component: Component, ...rest}) => {
  const {data: {user}} = useQuery(CURRENT_USER);

  /*{user ? <Component/> : <Redirect to="/login" />}*/
  return (
    <Route {...rest}>
      <Component/>
    </Route>
  );
};

export default PrivateRoute;
