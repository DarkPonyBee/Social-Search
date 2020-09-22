import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
import { Auth } from "aws-amplify";
import { NotificationContainer } from "react-notifications";
import { useSelector } from "react-redux";

// import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/Forgot";
import Confirmsignup from "./pages/Confirm";
import Searchpage from "./pages/Searchpage";
import Resultpage from "./pages/Resultpage";
import { TreviContext } from "./utils/context";
import { setLogin } from "./redux/actions/global";
import RoutePrivate from "./components/route/RoutePrivate";
import RoutePublic from "./components/route/RoutePublic";

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
  const loggedin = useSelector((store) => store.global.loggedin);

  useEffect(() => {
    const getCurrentSession = async () => {
      await Auth.currentSession()
        .then(() => {
          setLogin(true);
        })
        .catch(() => {
          setLogin(false);
        });
    };
    getCurrentSession();
  }, []);

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
            isAuthenticated={loggedin}
            exact
          />
          <RoutePublic
            path="/signup"
            component={Signup}
            isAuthenticated={loggedin}
            exact
          />
          <RoutePublic
            path="/reset-password"
            component={ForgotPassword}
            isAuthenticated={loggedin}
            exact
          />
          <RoutePublic
            path="/confirm-signup"
            component={Confirmsignup}
            isAuthenticated={loggedin}
            exact
          />
          <RoutePrivate
            path="/search"
            component={Searchpage}
            isAuthenticated={loggedin}
            exact
          />
          <RoutePrivate
            path="/result"
            component={Resultpage}
            isAuthenticated={loggedin}
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
