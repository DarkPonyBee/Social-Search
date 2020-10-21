import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";

import Header from "../components/layout/Header";
import SearchBar from "../components/searchbar/SearchBar";
import ConnectedAccounts from "../components/accounts/ConnectedAccounts";
import FirstConnect from "../components/accounts/FirstConnect";
import LOGO from "../assets/images/logo.png";
import BG from "../assets/images/mainpage-bg.svg";
import { TreviContext } from "../utils/context";
import { getConnectedAccount } from "../redux/actions/account";
import request from "../utils/request";
import { setFirstConnect } from "../redux/actions/global";

const MainPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  background: url(${BG}) no-repeat left -50px bottom -50px;
  height: 100vh;
`;

const StyledLogo = styled.div`
  margin: 10vh auto 0px auto;
  max-width: 180px;
  max-height: 80px;
  img {
    width: 100%;
    height: 100%;
    margin: auto;
  }
`;

const MainpageConnecteAccounts = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1101px;
  @media only screen and (max-width: 1240px) {
    width: 85%;
  }
`;

const Searchpage = ({ location: { state } }) => {
  const fromResult = state?.fromResult;
  const { setLoading } = useContext(TreviContext);
  const isLoading = useSelector(
    (store) => store.account.connectedAccount.loading
  );
  const firstConnect = useSelector((store) => store.global.firstConnect);

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

      if (firstConnect) {
        request().put("/user", null, {
          headers: { authorizer: token },
        });
      }

      request().get("/notifyUserSession", {
        headers: {
          authorizer: token,
        },
      });
    };

    notifyUserSession();
    if (!firstConnect) {
      fromResult ? getConnectedAccount(true) : getConnectedAccount(false);
    }
  }, [firstConnect, fromResult]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <MainPageContainer>
      <Header></Header>

      <StyledLogo>
        <img src={LOGO} alt="Logo"></img>
      </StyledLogo>
      <SearchBar></SearchBar>
      <MainpageConnecteAccounts>
        <ConnectedAccounts></ConnectedAccounts>
      </MainpageConnecteAccounts>

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
    </MainPageContainer>
  );
};

export default Searchpage;
