import * as React from "react";
import {HashRouter, Switch, Route} from "react-router-dom";
import Form from "./components/builder/Form";
import Login from "./pages/Login";

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
  cache: new InMemoryCache()
});

export const App = () => {
  return (
    <ApolloProvider client={ElentaClient}>
      <HashRouter>
        <PageContainer>
            <Switch>
              <Route exact={true} path="/consultant-dashboard" component={ConsultantDashboard}/>
              <Route exact={true} path="/program/settings/:id" component={ProgramSettingsEditor}/>
              <Route exact={true} path="/template/settings/:id" component={TemplateSettingsEditor}/>
              <Route exact={true} path="/login" component={Login}/>
              <Route exact={true} path="/template/content/:id" component={TemplateEditorPage}/>
              <Route exact={true} path="/program/content/:id" component={ProgramEditorPage}/>
              <Route exact={true} path="/" component={Form}/>
            </Switch>
        </PageContainer>
      </HashRouter>
    </ApolloProvider>
  );
};

export default App;
