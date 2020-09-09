import React from "react";
import { Modal } from "react-responsive-modal";

import SignIn from "../components/forms/SignIn";

const Login = () => {
  return (
    <>
      <Modal
        open={true}
        onClose={() => {}}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}
      >
        <SignIn></SignIn>
      </Modal>
    </>
  );
};

export default Login;
