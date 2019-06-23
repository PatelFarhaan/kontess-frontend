import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import history from "./history";
import './App.css';

import {
  Landing,
  Registration
} from "app/containers";

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/registration" component={Registration} />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;
