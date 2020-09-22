import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
import { NotificationContainer } from "react-notifications";

// import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/Forgot";
import Confirmsignup from "./pages/Confirm";
import Searchpage from "./pages/Searchpage";
import Resultpage from "./pages/Resultpage";
import { TreviContext } from "./utils/context";
import RoutePrivate from "./components/route/RoutePrivate";
import RoutePublic from "./components/route/RoutePublic";
import { getAuth } from "./utils/helper";

const StyledLoader = styled(LoadingOverlay)`
  position: absolute;
  z-index: 1001;
  height: 100vh;
  width: 100vw;

  .MyLoader_overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;

function App() {
  const [loading, setLoading] = useState(false);
  const loadingContext = { loading, setLoading };
  const auth = getAuth();

  return (
    <TreviContext.Provider value={loadingContext}>
      {loading && (
        <StyledLoader
          active={true}
          classNamePrefix="MyLoader_"
          spinner
        ></StyledLoader>
      )}
      <Router>
        <Switch>
          <RoutePublic
            path="/login"
            component={Login}
            isAuthenticated={auth}
            exact
          />
          <RoutePublic
            path="/signup"
            component={Signup}
            isAuthenticated={auth}
            exact
          />
          <RoutePublic
            path="/reset-password"
            component={ForgotPassword}
            isAuthenticated={auth}
            exact
          />
          <RoutePublic
            path="/confirm-signup"
            component={Confirmsignup}
            isAuthenticated={auth}
            exact
          />
          <RoutePrivate
            path="/search"
            component={Searchpage}
            isAuthenticated={auth}
            exact
          />
          <RoutePrivate
            path="/result"
            component={Resultpage}
            isAuthenticated={auth}
            exact
          />
          <RoutePublic
            path="/"
            component={Signup}
            isAuthenticated={auth}
            exact
          />
          <Redirect to="/signup" />
        </Switch>
      </Router>
      <NotificationContainer />
    </TreviContext.Provider>
  );
}

export default App;
