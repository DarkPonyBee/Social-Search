import React from "react";
import { Modal } from "react-responsive-modal";
import ReactTooltip from "react-tooltip";

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
      <ReactTooltip
        id="signupcodedesc"
        offset={{ top: -10, left: 0 }}
        effect="solid"
        className="customToolTip"
        clickable={true}
        html={true}
      ></ReactTooltip>
    </>
  );
};

export default Signup;
