import * as React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";

import Form from "./components/builder/Form";
import Login from "./pages/Login";

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import "./styles.css";
import TemplateEditor from "./pages/TemplateEditor";

const client = new ApolloClient({
    uri: 'http://elenta.dev/graphql',
});

export const App = () => {
  return (
      <ApolloProvider client={client}>
        <HashRouter>
          <Switch>
            <Route exact={true} path="/" component={Form} />
            <Route exact={true} path="/login" component={Login} />
            <Route exact={true} path="/template/:id" component={TemplateEditor} />
          </Switch>
        </HashRouter>
      </ApolloProvider>
  );
};
