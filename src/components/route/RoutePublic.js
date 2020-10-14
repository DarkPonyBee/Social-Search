import React from "react";
import { Route, Redirect } from "react-router-dom";

import { getAuth } from "../../utils/helper";

const RoutePublic = ({ component: Component, to = "/", extra, ...rest }) => {
  const isAuthenticated = getAuth();

  return (
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
};

export default RoutePublic;
