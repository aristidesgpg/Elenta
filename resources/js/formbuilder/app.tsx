import * as React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Form from "./components/builder/Form";
import "./styles.css";

export const App = () => {
  return (    
    <HashRouter>
      <Switch>
        <Route exact={true} path="/" component={Form} />
      </Switch>
    </HashRouter>
  );
};
