import React from "react";
import { Modal } from "react-responsive-modal";

import ConfirmSignup from "../components/forms/ConfirmSignup";

const Confirmsignup = () => {
  return (
    <>
      <Modal
        open={true}
        onClose={() => {}}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}
      >
        <ConfirmSignup></ConfirmSignup>
      </Modal>
    </>
  );
};

export default Confirmsignup;
