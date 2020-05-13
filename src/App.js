import React from "react";
import "./App.css";
import Login from "./component/login";
import Registration from "./component/registration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgetPassword from "./component/forgetPassword";
import Dashboard from "./component/dashboard"

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/registration" component={Registration}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/forgetPassword" component={ForgetPassword}></Route>
          <Route path='/dashboard' component={Dashboard}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
