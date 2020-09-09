import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
import { Auth } from "aws-amplify";
import { NotificationContainer } from "react-notifications";

import { TreviContext } from "./utils/context";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Seachpage from "./pages/Searchpage";
import ForgotPassword from "./pages/Forgot";
import Confirmsignup from "./pages/Confirm";
import Resultpage from "./pages/Resultpage";

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
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    const getCurrentSession = async () => {
      await Auth.currentSession()
        .then(() => {
          setLoggedIn(true);
        })
        .catch(() => {
          setLoggedIn(false);
        });
    };
    getCurrentSession();
  }, []);

  return (
    <TreviContext.Provider value={{ loading, setLoading }}>
      {loading && (
        <StyledLoader
          active={true}
          classNamePrefix="MyLoader_"
          spinner
        ></StyledLoader>
      )}
      <Router>
        <Switch>
          <Route path="/login" exact component={Login}></Route>
          <Route path="/signup" exact component={Signup}></Route>
          <Route
            path="/reset-password"
            exact
            component={ForgotPassword}
          ></Route>
          <Route path="/confirm-signup" exact component={Confirmsignup}></Route>
          <Route path="/search" exact component={Seachpage}></Route>
          <Route path="/result" exact component={Resultpage}></Route>
          <Route path="/" component={Homepage}></Route>
        </Switch>
      </Router>
      <NotificationContainer />
    </TreviContext.Provider>
  );
}

export default App;
