import React from "react";
import { Route, Redirect } from "react-router-dom";

const RoutePrivate = ({
  component: Component,
  isAuthenticated,
  to = "/login",
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: to,
            state: { redirect: props.location.pathname, isAuthenticated },
          }}
        />
      )
    }
  />
);

export default RoutePrivate;
