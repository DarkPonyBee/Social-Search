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

  const routes = loggedin ? (
    <Switch>
      <Route path="/search" exact component={Searchpage}></Route>
      <Route path="/result" exact component={Resultpage}></Route>
      <Redirect to="/search"></Redirect>
    </Switch>
  ) : (
    <Switch>
      <Route path="/login" exact component={Login}></Route>
      <Route path="/signup" exact component={Signup}></Route>
      <Route path="/reset-password" exact component={ForgotPassword}></Route>
      <Route path="/confirm-signup" exact component={Confirmsignup}></Route>
      <Redirect to="/signup"></Redirect>
    </Switch>
  );

  return (
    <TreviContext.Provider value={loadingContext}>
      {loading && (
        <StyledLoader
          active={true}
          classNamePrefix="MyLoader_"
          spinner
        ></StyledLoader>
      )}
      <Router>{routes}</Router>
      <NotificationContainer />
    </TreviContext.Provider>
  );
}

export default App;
