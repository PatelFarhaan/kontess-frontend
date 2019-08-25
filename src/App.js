import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import history from "./history";
import './App.css';
import * as session from "./utils/session"


import {
  Landing,
  Registration,
  Login,
  DashBoardWrapper
} from "app/containers";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={DashBoardWrapper} />
              {/* <Route component={NotFound} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
