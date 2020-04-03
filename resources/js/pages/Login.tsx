import * as React from "react";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Spinner from "react-bootstrap/Spinner";

const USERS = gql`
    query USERS {
        users {
            id
            name
        }
    }
`

export const Login = () => {
 const { loading, error, data } = useQuery(USERS);

  if (loading) return <Spinner animation="border" />;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ id, name }) => (
      <p>
          {id}: {name}
      </p>
  ));
};

export default Login;
