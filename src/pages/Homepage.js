import React from "react";
import styled from "styled-components";

import LOGO from "../assets/images/logo.png";
import BG from "../assets/images/mainpage-bg.svg";
import HomepageHeader from "../components/homepage/HomepageHeader";
import HomepageSearchBar from "../components/homepage/HomepageSearchBar";
import HomepageConnectedAccounts from "../components/homepage/HomepageConnectedAccounts";

const MainPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  background: url(${BG}) no-repeat left -50px bottom -50px;
  height: 100vh;
`;

const StyledLogo = styled.div`
  margin: 4vh auto 0px auto;
  max-width: 180px;
  max-height: 80px;
  img {
    width: 100%;
    height: 100%;
    margin: auto;
  }
`;

const MainpageConnecteAccounts = styled.div`
  margin: 8vh auto auto auto;
  width: 100%;
  max-width: 1101px;
  @media only screen and (max-width: 1240px) {
    width: 85%;
  }
`;

const Homepage = () => {
  return (
    <MainPageContainer>
      <HomepageHeader />
      <StyledLogo>
        <img src={LOGO} alt="Logo"></img>
      </StyledLogo>
      <HomepageSearchBar />
      <MainpageConnecteAccounts>
        <HomepageConnectedAccounts />
      </MainpageConnecteAccounts>
    </MainPageContainer>
  );
};

export default Homepage;
