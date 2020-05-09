import React from "react";
import "./App.css";
import Login from "./component/login";
import Registration from "./component/registration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgetPassword from "./component/forgetPassword";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/registration" component={Registration}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/forgetPassword" component={ForgetPassword}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
