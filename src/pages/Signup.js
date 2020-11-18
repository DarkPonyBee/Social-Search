import React from "react";
import { Modal } from "react-responsive-modal";

import SignUp from "../components/forms/SignUp";

const Signup = () => {
  return (
    <>
      <Modal
        open={true}
        onClose={() => {}}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}
      >
        <SignUp></SignUp>
      </Modal>
    </>
  );
};

export default Signup;
