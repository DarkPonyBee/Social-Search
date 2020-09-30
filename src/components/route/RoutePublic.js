import React from "react";
import { Route, Redirect } from "react-router-dom";

const RoutePublic = ({
  component: Component,
  isAuthenticated,
  to = "/search",
  extra,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Redirect to={to} />
      ) : extra ? (
        <Redirect to="/signup" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default RoutePublic;
