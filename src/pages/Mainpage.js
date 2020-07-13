import React from "react";
import styled from "styled-components";
import "react-responsive-modal/styles.css";
import { Auth } from "aws-amplify";

import Header from "../components/layout/Header";
import SearchBar from "../components/searchbar/SearchBar";
import ConnectedAccounts from "../components/accounts/ConnectedAccounts";

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
  const handleLogout = async () => {
    try {
      await Auth.signOut({ global: true });
      handleSignOut();
    } catch (error) {
      console.log("errore signout");
    }
  };

  return (
    <MainPageContainer>
      <Header></Header>
      <button onClick={() => handleLogout()}>Logout</button>
      <StyledLogo>
        <img src={LOGO} alt="Logo"></img>
      </StyledLogo>
      <SearchBar></SearchBar>
      <ConnectedAccounts></ConnectedAccounts>
    </MainPageContainer>
  );
};

export default Mainpage;
