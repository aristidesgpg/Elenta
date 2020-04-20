import * as React from "react";
import {get} from "lodash";

import ApolloClient from 'apollo-client';
import {defaultDataIdFromObject, InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';

import {setContext} from "apollo-link-context";
import {CURRENT_USER_PROFILE, GET_ME} from "./graphql/queries";
import LoadingContainer from "./components/hoc/LoadingContainer/LoadingContainer";
import Routes from "./Routes";

const httpLink = createHttpLink({
  uri: process.env.APP_URL + "/graphql"
});

const token = localStorage.getItem('token');
const authLink = setContext((_, {headers}) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const cache = new InMemoryCache({
  dataIdFromObject: (obj) => {
    switch (obj.__typename) {
      case 'Module': {
        const pivotId = get(obj, 'pivot.id', null);
        const moduleDataId = `${obj.__typename}:${obj.id}`;
        return pivotId ? `${moduleDataId}:${pivotId}` : moduleDataId;
      }

      default:
        return defaultDataIdFromObject(obj);
    }
  }
});

export const ElentaClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {}
});

export const App = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    (async function anyNameFunction() {
      const {data} = await ElentaClient.query({query: GET_ME});

      const consultantProfile = get(data, 'me.consultantProfile', null);
      const learnerProfile = get(data, 'me.learnerProfile', null);
      const user = get(data, 'me', null);
      ElentaClient.writeData({
        data: {
          user,
          userProfile: consultantProfile ? {...consultantProfile, type: "consultant"} : {...learnerProfile, type: "learner"}
        }
      });

      setLoading(!loading);
    })();
  }, [token]);

  return (
    <ApolloProvider client={ElentaClient}>
      {loading
        ? <LoadingContainer loading={loading}/>
        : <Routes/>
      }
    </ApolloProvider>
  );
};

export default App;
