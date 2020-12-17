import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/searchbar/SearchBar";
import ConnectedAccounts from "../components/accounts/ConnectedAccounts";
import AddAccounts from "../components/accounts/AddAccounts";
import FirstConnect from "../components/accounts/FirstConnect";
import LOGO from "../assets/images/logo.png";
import BG from "../assets/images/mainpage-bg.svg";
import { getConnectedAccount } from "../redux/actions/account";
import request from "../utils/request";
import { setFirstConnect, setShowAddAccount } from "../redux/actions/global";

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

const Searchpage = ({ location: { state } }) => {
  const connectedAccounts = useSelector(
    (store) => store.account.connectedAccount.result.accounts
  );
  const isLoading = useSelector(
    (store) => store.account.connectedAccount.loading
  );
  const firstConnect = useSelector((store) => store.global.firstConnect);
  const showAddAccount = useSelector((store) => store.global.showAddAccount);
  const fromResult = state?.fromResult;

  useEffect(() => {
    const notifyUserSession = async () => {
      let token = null;
      await Auth.currentSession()
        .then((data) => {
          token = data.getIdToken().getJwtToken();
        })
        .catch((err) => {
          console.log(err);
          NotificationManager.error(err.message, "Error", 5000, () => {});
          return;
        });

      request().get("/notifyUserSession", {
        headers: {
          authorizer: token,
        },
      });
    };
    notifyUserSession();
    fromResult ? getConnectedAccount(true) : getConnectedAccount(false);
  }, [fromResult]);

  useEffect(() => {
    if (connectedAccounts.length === 0) setFirstConnect(true);
    else setFirstConnect(false);
  }, [connectedAccounts, isLoading]);

  return (
    <MainPageContainer>
      <Header />
      <StyledLogo>
        <img src={LOGO} alt="Logo"></img>
      </StyledLogo>
      <SearchBar></SearchBar>
      <MainpageConnecteAccounts>
        <ConnectedAccounts></ConnectedAccounts>
      </MainpageConnecteAccounts>
      <Footer />

      <Modal
        open={firstConnect}
        onClose={() => {
          setFirstConnect(false);
          getConnectedAccount(false);
        }}
        center
        showCloseIcon={false}
        classNames={{ modal: "addModal" }}
      >
        <FirstConnect></FirstConnect>
      </Modal>

      <Modal
        open={showAddAccount}
        onClose={() => setShowAddAccount(false)}
        center
        showCloseIcon={true}
        classNames={{ modal: "addModal" }}
      >
        <AddAccounts></AddAccounts>
      </Modal>
    </MainPageContainer>
  );
};

export default Searchpage;
