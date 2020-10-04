import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getAuth } from "../../utils/helper";

const RoutePrivate = ({ component: Component, to = "/login", ...rest }) => {
  const isAuthenticated = getAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: to,
              state: { redirect: props.location.pathname },
            }}
          />
        )
      }
    />
  );
};

export default RoutePrivate;
