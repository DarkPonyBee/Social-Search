import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";

import Header from "../components/layout/Header";
import SearchBar from "../components/searchbar/SearchBar";
import ConnectedAccounts from "../components/accounts/ConnectedAccounts";
import AddAccounts from "../components/accounts/AddAccounts";
import FirstConnect from "../components/accounts/FirstConnect";
import LOGO from "../assets/images/logo.png";
import BG from "../assets/images/mainpage-bg.svg";
import { TreviContext } from "../utils/context";
import ResultPage from "./ResultPage";
import { getConnectedAccount } from "../redux/actions/account";
import { redirectMSG } from "../config";
import request from "../utils/request";

const MainPageContainer = styled.section`
  background: url(${BG}) no-repeat left -50px bottom -50px;
  min-height: 100vh;
`;

const StyledLogo = styled.div`
  margin: 80px auto auto;
  display: flex;
  max-width: 180px;
  max-height: 80px;
  img {
    width: 100%;
    height: 100%;
    margin: auto;
  }
`;

const MainpageConnecteAccounts = styled.div`
  margin: 95px auto auto auto;
  max-width: 1101px;
  @media only screen and (max-width: 1240px) {
    width: 85%;
  }
`;

let oauthPopup = null;
let previousUrl = null;

const Mainpage = ({ handleSignOut, isfirstConnect }) => {
  const [resultPage, setResultPage] = useState(false);
  const [firstConnect, setFirstConnect] = useState(isfirstConnect);
  const [addAccount, setAddAccount] = useState(false);
  const { setLoading } = useContext(TreviContext);

  const isLoading = useSelector(
    (store) => store.account.connectedAccount.loading
  );

  useEffect(() => {
    if (!resultPage) getConnectedAccount(false);
    return;
  }, [resultPage]);

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
  }, []);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  const storageListener = () => {
    try {
      if (localStorage.getItem("code")) {
        let code = localStorage.getItem("code");
        if (code === "200") {
          NotificationManager.success(
            redirectMSG[code],
            "Add Accounts",
            5000,
            () => {}
          );
          getConnectedAccount(true);
        } else
          NotificationManager.error(
            redirectMSG[code],
            "Add Accounts",
            5000,
            () => {}
          );
        oauthPopup.close();
        window.localStorage.removeItem("code");
        window.removeEventListener("storage", storageListener);
      }
    } catch (e) {
      window.removeEventListener("storage", storageListener);
    }
  };

  const showAddAccount = () => {
    setAddAccount(true);
  };

  const handleAddAccount = async (name) => {
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

    setLoading(true);
    await request()
      .get("/addAccount", {
        params: {
          source: name,
        },
        headers: {
          authorizer: token,
        },
      })
      .then((response) => {
        const url = response.data.oauth_url;
        const width = 500;
        const height = 600;
        const top = window.innerHeight / 2 - height / 2;
        const left = window.innerWidth / 2 - width / 2;
        const params = `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`;
        if (oauthPopup === null || oauthPopup.closed) {
          oauthPopup = window.open(url, name, params);
        } else if (previousUrl !== url) {
          oauthPopup = window.open(url, name, params);
          oauthPopup.focus();
        } else {
          oauthPopup.focus();
        }
        previousUrl = url;
        window.addEventListener("storage", storageListener);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message, "Error", 5000, () => {});
      });
    setLoading(false);
  };

  return (
    <MainPageContainer>
      <Header
        resultPage={resultPage}
        setResultPage={setResultPage}
        handleSignOut={handleSignOut}
        showAddAccount={showAddAccount}
      ></Header>
      {resultPage ? (
        <ResultPage></ResultPage>
      ) : (
        <>
          <StyledLogo>
            <img src={LOGO} alt="Logo"></img>
          </StyledLogo>
          <SearchBar
            setResultPage={setResultPage}
            resultPage={resultPage}
          ></SearchBar>
          <MainpageConnecteAccounts>
            <ConnectedAccounts
              showAddAccount={showAddAccount}
            ></ConnectedAccounts>
          </MainpageConnecteAccounts>
        </>
      )}

      <Modal
        open={firstConnect}
        onClose={() => setFirstConnect(false)}
        center
        showCloseIcon={false}
        classNames={{ modal: "addModal" }}
      >
        <FirstConnect handleAddAccount={handleAddAccount}></FirstConnect>
      </Modal>

      <Modal
        open={addAccount}
        onClose={() => setAddAccount(false)}
        center
        showCloseIcon={true}
        classNames={{ modal: "addModal" }}
      >
        <AddAccounts handleAddAccount={handleAddAccount}></AddAccounts>
      </Modal>
    </MainPageContainer>
  );
};

export default Mainpage;
