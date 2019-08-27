import React from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router
} from "react-router-dom";
import history from "./history";
import "./App.css";

import { Landing, Registration, Login, Dashboard } from "app/containers";

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
                    <Route path={`${path}/`} component={Dashboard} exact />
                    {/* <Route path={`${path}/test`} component={Login} /> */}
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
