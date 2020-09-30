import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";
import { NotificationContainer } from "react-notifications";
import { Modal } from "react-responsive-modal";
import { useSelector } from "react-redux";

// import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/Forgot";
import Confirmsignup from "./pages/Confirm";
import Searchpage from "./pages/Searchpage";
import Resultpage from "./pages/Resultpage";
import AddAccounts from "./components/accounts/AddAccounts";
import { TreviContext } from "./utils/context";
import RoutePrivate from "./components/route/RoutePrivate";
import RoutePublic from "./components/route/RoutePublic";
import { getAuth } from "./utils/helper";
import { setShowAddAccount } from "./redux/actions/global";
import { getConnectedAccount } from "./redux/actions/account";
import { accountSyncIntervalTime } from "./config";

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
  const showAddAccount = useSelector((store) => store.global.showAddAccount);
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
          <RoutePublic isAuthenticated={auth} extra />
        </Switch>
      </Router>

      <Modal
        open={showAddAccount}
        onClose={() => setShowAddAccount(false)}
        center
        showCloseIcon={true}
        classNames={{ modal: "addModal" }}
      >
        <AddAccounts></AddAccounts>
      </Modal>

      <NotificationContainer />
    </TreviContext.Provider>
  );
}

export default App;
