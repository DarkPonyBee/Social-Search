import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";

import Header from "../components/layout/Header";
import SearchBar from "../components/searchbar/SearchBar";
import ConnectedAccounts from "../components/accounts/ConnectedAccounts";
import AddAccounts from "../components/accounts/AddAccounts";

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

const Mainpage = ({ handleSignOut }) => {
  const [addAccount, setAddAccount] = useState(false);

  const showAddAccount = () => {
    setAddAccount(true);
  };

  return (
    <MainPageContainer>
      <Header handleSignOut={handleSignOut}></Header>
      <StyledLogo>
        <img src={LOGO} alt="Logo"></img>
      </StyledLogo>
      <SearchBar></SearchBar>
      <ConnectedAccounts showAddAccount={showAddAccount}></ConnectedAccounts>

      <Modal
        open={addAccount}
        // open={true}
        onClose={() => setAddAccount(false)}
        center
        showCloseIcon={true}
        classNames={{ modal: "addModal" }}
      >
        <AddAccounts></AddAccounts>
      </Modal>
    </MainPageContainer>
  );
};

export default Mainpage;
