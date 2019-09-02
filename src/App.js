import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import history from "./history";
import "./App.css";

import {
  Landing,
  Registration,
  Login,
  Dashboard,
  TeamList
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
              <Route
                path="/dashboard"
                render={({ match: { path } }) => (
                  <>
                    <Route path={`${path}/home`} component={Dashboard} exact />
                    <Route path={`${path}/teams`} component={TeamList} />
                  </>
                )}
              />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
