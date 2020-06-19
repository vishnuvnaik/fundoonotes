import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils";

export default function Privaterouter({
  component: Component,
  restricted,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/Registration" />
      }
    />
  );
}
