import React from "react";
import "./App.css";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgetPassword from "./Pages/Forgetpassword";
import Dashboard from "./Pages/Dashboard";
import ResetPassword from "./Pages/Resetpassword";
import services from "./component/Services";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/registration" component={Registration}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" exact component={services}></Route>
          <Route path="/forgetPassword" component={ForgetPassword}></Route>
          <Route path="/ResetPassword/" component={ResetPassword}></Route>
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;
