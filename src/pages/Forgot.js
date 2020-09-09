import React from "react";
import { Modal } from "react-responsive-modal";

import ResetPassword from "../components/forms/ResetPassword";

const ForgotPassword = () => {
  return (
    <>
      <Modal
        open={true}
        onClose={() => {}}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}
      >
        <ResetPassword></ResetPassword>
      </Modal>
    </>
  );
};

export default ForgotPassword;
