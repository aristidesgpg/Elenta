import * as React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {get} from "lodash";
import FormSample from "./components/consultants/ElentaFormBuilder/FormSample";

import LoginPage from "./pages/shared/LoginPage";

import ApolloClient from 'apollo-client';
import {defaultDataIdFromObject, InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink, HttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';

import ConsultantDashboard from "./pages/consultants/ConsultantDashboard";
import PageContainer from "./components/hoc/PageContainer/PageContainer";
import TemplateSettingsEditor from "./pages/consultants/TemplateSettingsEditor";
import {setContext} from "apollo-link-context";
import ProgramSettingsEditor from "./pages/consultants/ProgramSettingsEditor";
import TemplateEditorPage from "./pages/consultants/TemplateEditorPage";
import ProgramEditorPage from "./pages/consultants/ProgramEditorPage";
import LoginCallbackPage from "./pages/shared/LoginCallbackPage";
import PasswordResetPage from "./pages/shared/PasswordResetPage";
import ConsultantProfileSettingsPage from "./pages/consultants/ConsultantProfileSettingsPage";
import PrivateRoute from "./components/hoc/PrivateRoute";
import ProgramLearnerPage from "./pages/learners/ProgramLearnerPage";
import ProgramModuleSendEditor from "./components/learners/ProgramModuleSendEditor/ProgramModuleSendEditor";

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
  return (
    <ApolloProvider client={ElentaClient}>
      <BrowserRouter>
        <PageContainer>
          <Switch>
            <Route exact={true} path="/" component={FormSample}/>
            <Route exact={true} path="/login" component={LoginPage}/>
            <Route exact={true} path="/login/callback/:token" component={LoginCallbackPage}/>
            <Route exact={true} path="/password/reset/:token" component={PasswordResetPage}/>

            <Route exact={true} path="/program/respond/:id" component={ProgramLearnerPage}/>

            <PrivateRoute exact={true} path="/dashboard" component={ConsultantDashboard}/>
            <PrivateRoute exact={true} path="/preferences" component={ConsultantProfileSettingsPage}/>

            <PrivateRoute exact={true} path="/program/settings/:id" component={ProgramSettingsEditor}/>
            <PrivateRoute exact={true} path="/template/settings/:id" component={TemplateSettingsEditor}/>
            <PrivateRoute exact={true} path="/template/content/:id" component={TemplateEditorPage}/>
            <PrivateRoute exact={true} path="/program/content/:id" component={ProgramEditorPage}/>
          </Switch>
        </PageContainer>
      </BrowserRouter>
    </ApolloProvider>
  );
};

export default App;
