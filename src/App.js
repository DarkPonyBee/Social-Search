import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Modal } from "react-responsive-modal";
import { NotificationContainer } from "react-notifications";
import styled from "styled-components";
import LoadingOverlay from "react-loading-overlay";

import Mainpage from "./pages/Mainpage";
import SignUp from "./components/forms/SignUp";
import SignIn from "./components/forms/SignIn";
import ResetPassword from "./components/forms/ResetPassword";
import ConfirmSignup from "./components/forms/ConfirmSignup";
import { TreviContext } from "./utils/context";

const StyledLoader = styled(LoadingOverlay)`
  position: absolute;
  z-index: 1001;
  height: 100vh;
  width: 100vw;
`;

function App() {
  const [loading, setLoading] = useState(false);
  const [loggedin, setLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const getCurrentSession = async () => {
      await Auth.currentSession()
        .then(() => {
          setLoggedIn(true);
          handleLoggedIn();
        })
        .catch((err) => {
          setLoggedIn(false);
        });
    };
    getCurrentSession();
  }, []);

  const handleSignOut = () => {
    setLoggedIn(false);
    setShowSignIn(false);
    setShowSignUp(true);
    setShowConfirm(false);
    setShowReset(false);
  };

  const handleLoggedIn = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setShowConfirm(false);
    setShowReset(false);
    setLoggedIn(true);
  };

  const handleOpenSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
    setShowConfirm(false);
    setShowReset(false);
  };

  const handleOpenSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
    setShowConfirm(false);
    setShowReset(false);
  };

  const handleOpenConfirm = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setShowConfirm(true);
    setShowReset(false);
  };

  const handleOpenReset = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setShowConfirm(false);
    setShowReset(true);
  };

  return (
    <TreviContext.Provider value={{ loading, setLoading }}>
      {loading && <StyledLoader active={true} spinner></StyledLoader>}
      {loggedin && <Mainpage handleSignOut={handleSignOut}></Mainpage>}

      <Modal
        open={showSignUp}
        onClose={() => {}}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}
      >
        <SignUp
          handleOpenConfirm={handleOpenConfirm}
          handleOpenSignIn={handleOpenSignIn}
        ></SignUp>
      </Modal>
      <Modal
        open={showSignIn}
        onClose={() => {}}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}
      >
        <SignIn
          handleLoggedIn={handleLoggedIn}
          handleOpenSignUp={handleOpenSignUp}
          handleOpenReset={handleOpenReset}
          handleOpenConfirm={handleOpenConfirm}
        ></SignIn>
      </Modal>

      <Modal
        open={showReset}
        onClose={() => {}}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}
      >
        <ResetPassword handleOpenSignIn={handleOpenSignIn}></ResetPassword>
      </Modal>

      <Modal
        open={showConfirm}
        onClose={() => {}}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}
      >
        <ConfirmSignup handleOpenSignIn={handleOpenSignIn}></ConfirmSignup>
      </Modal>
      <NotificationContainer />
    </TreviContext.Provider>
  );
}

export default App;
