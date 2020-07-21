import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { Modal } from "react-responsive-modal";
import { NotificationContainer } from "react-notifications";

import Mainpage from "./pages/Mainpage";
import SignUp from "./components/forms/SignUp";
import SignIn from "./components/forms/SignIn";
import ConfirmSignup from "./components/forms/ConfirmSignup";

function App() {
  const [loggedin, setLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);
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
  };

  const handleLoggedIn = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setShowConfirm(false);
    setLoggedIn(true);
  };

  const handleOpenSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false);
    setShowConfirm(false);
  };

  const handleOpenSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
    setShowConfirm(false);
  };

  const handleOpenConfirm = () => {
    setShowSignIn(false);
    setShowSignUp(false);
    setShowConfirm(true);
  };

  return (
    <>
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
          handleOpenConfirm={handleOpenConfirm}
        ></SignIn>
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
    </>
  );
}

export default App;
