import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import Header from "../components/layout/Header";
import SearchBar from "../components/searchbar/SearchBar";
import ConnectedAccounts from "../components/accounts/ConnectedAccounts";
import SignUp from "../components/forms/SignUp";
import SignIn from "../components/forms/SignIn";

import LOGO from "../assets/images/logo.png";
import BG from "../assets/images/mainpage-bg.svg";

const MainPageContainer = styled.section`
  background: url(${BG}) no-repeat left -50px bottom -50px;
  padding-bottom: 130px;
`;

const StyledLogo = styled.div`
  margin: 80px auto auto;
  display: flex;
  img {
    margin: auto;
  }
`;

const Mainpage = () => {
  const [openSignUp, setSignUp] = useState(false);
  const [openSignIn, setSignIn] = useState(false);

  const handleSignIn = () => {
    setSignUp(false);
    setSignIn(true);
  };

  return (
    <MainPageContainer>
      <Header></Header>
      <button onClick={() => setSignUp(true)}>SignUp</button>
      <button onClick={() => setSignIn(true)}>SignIn</button>
      <StyledLogo>
        <img src={LOGO} alt="Logo"></img>
      </StyledLogo>
      <SearchBar></SearchBar>
      <ConnectedAccounts></ConnectedAccounts>

      <Modal
        open={openSignUp}
        onClose={() => setSignUp(false)}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}
      >
        <SignUp handleSignIn={handleSignIn}></SignUp>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setSignIn(false)}
        center
        showCloseIcon={false}
        classNames={{ modal: "customModal" }}
      >
        <SignIn></SignIn>
      </Modal>
    </MainPageContainer>
  );
};

export default Mainpage;
