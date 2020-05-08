import React from "react";
import "./App.css";
import Registration from "./component/registration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/registration" component={Registration}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
