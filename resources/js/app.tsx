import * as React from "react";
import {HashRouter, Switch, Route} from "react-router-dom";
import Form from "./components/builder/Form";
import LoginPage from "./pages/LoginPage";

import ApolloClient from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink, HttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';

import ConsultantDashboard from "./pages/ConsultantDashboard";
import PageContainer from "./components/page-container/PageContainer";
import TemplateSettingsEditor from "./pages/TemplateSettingsEditor";
import {setContext} from "apollo-link-context";
import ProgramSettingsEditor from "./pages/ProgramSettingsEditor";
import TemplateEditorPage from "./pages/TemplateEditorPage";
import ProgramEditorPage from "./pages/ProgramEditorPage";
import LoginCallbackPage from "./pages/LoginCallbackPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import PrivateRoute from "./hoc/PrivateRoute";

const httpLink = createHttpLink({
  uri: process.env.APP_URL + "/graphql"
});

const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

export const ElentaClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  resolvers: {}
});

export const App = () => {
  return (
    <ApolloProvider client={ElentaClient}>
      <HashRouter>
        <PageContainer>
            <Switch>
              <Route exact={true} path="/login" component={LoginPage}/>
              <Route exact={true} path="/login/callback/:token" component={LoginCallbackPage}/>
              <Route exact={true} path="/password/reset/:token" component={PasswordResetPage}/>
              <Route exact={true} path="/" component={Form}/>
              <PrivateRoute exact={true} path="/consultant-dashboard" component={ConsultantDashboard}/>
              <PrivateRoute exact={true} path="/program/settings/:id" component={ProgramSettingsEditor}/>
              <PrivateRoute exact={true} path="/template/settings/:id" component={TemplateSettingsEditor}/>
              <PrivateRoute exact={true} path="/template/content/:id" component={TemplateEditorPage}/>
              <PrivateRoute exact={true} path="/program/content/:id" component={ProgramEditorPage}/>
            </Switch>
        </PageContainer>
      </HashRouter>
    </ApolloProvider>
  );
};

export default App;
