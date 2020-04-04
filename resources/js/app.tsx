import * as React from "react";
import {HashRouter, Switch, Route} from "react-router-dom";

import Form from "./components/builder/Form";
import Login from "./pages/Login";

import ApolloClient, {gql} from 'apollo-boost';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';

import TemplateEditor from "./pages/TemplateEditor";
import ConsultantDashboard from "./pages/ConsultantDashboard";
import PageContainer from "./components/page-container/PageContainer";
import ProgramEditor from "./pages/ProgramEditor";

const client = new ApolloClient({
  uri: 'http://elenta.dev/graphql',
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
        <PageContainer>
          <HashRouter>
            <Switch>
              <Route exact={true} path="/consultant-dashboard" component={ConsultantDashboard}/>
              <Route exact={true} path="/login" component={Login}/>
              <Route exact={true} path="/template/:id" component={TemplateEditor}/>
              <Route exact={true} path="/program/:id" component={ProgramEditor}/>
              <Route exact={true} path="/" component={Form}/>
            </Switch>
          </HashRouter>
        </PageContainer>
    </ApolloProvider>
  );
};
