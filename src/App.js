import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
import { NotificationContainer } from "react-notifications";
import { useSelector } from "react-redux";
import { Auth } from "aws-amplify";

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
import { getConnectedAccount } from "./redux/actions/account";
import { accountSyncIntervalTime } from "./config";
import { setAuth } from "./utils/helper";

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
  const timerID = useRef(null);
  const connectedAccounts = useSelector(
    (store) => store.account.connectedAccount.result
  );
  const isSyncing = connectedAccounts.some(
    (item) => item.account_state.is_syncing
  );

  useEffect(() => {
    if (isSyncing) {
      timerID.current = setInterval(
        () => getConnectedAccount(true),
        accountSyncIntervalTime
      );
    } else clearInterval(timerID.current);
  }, [isSyncing]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        await Auth.currentSession();
      } catch (err) {
        setAuth(false);
      }
    };
    checkToken();
  });

  const loadingContext = { loading, setLoading };

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
          <RoutePublic path="/login" component={Login} exact />
          <RoutePublic path="/signup" component={Signup} exact />
          <RoutePublic
            path="/reset-password"
            component={ForgotPassword}
            exact
          />
          <RoutePublic path="/confirm-signup" component={Confirmsignup} exact />
          <RoutePrivate path="/" component={Searchpage} exact />
          <RoutePrivate path="/result" component={Resultpage} exact />
          <RoutePublic extra />
        </Switch>
      </Router>
      <NotificationContainer />
    </TreviContext.Provider>
  );
}

export default App;
