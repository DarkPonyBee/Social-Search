import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Modal } from "react-responsive-modal";
import axios from "axios";
import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";

import Header from "../components/layout/Header";
import SearchBar from "../components/searchbar/SearchBar";
import ConnectedAccounts from "../components/accounts/ConnectedAccounts";
import AddAccounts from "../components/accounts/AddAccounts";
import FirstConnect from "../components/accounts/FirstConnect";
import LOGO from "../assets/images/logo.png";
import BG from "../assets/images/mainpage-bg.svg";
import { TreviContext } from "../utils/context";

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

let oauthPopup = null;
let previousUrl = null;

const Mainpage = ({ handleSignOut }) => {
  const [firstConnect, setFirstConnect] = useState(false);
  const [addAccount, setAddAccount] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const { setLoading } = useContext(TreviContext);

  const storageListener = () => {
    try {
      if (localStorage.getItem("code")) {
        alert(localStorage.getItem("code"));
        window.localStorage.removeItem("code"); //remove code from localStorage
        oauthPopup.close();
        window.removeEventListener("storage", storageListener);
      }
    } catch (e) {
      window.removeEventListener("storage", storageListener);
    }
  };

  useEffect(() => {
    const getConnectedAccounts = async () => {
      let token = null;
      await Auth.currentSession()
        .then((data) => {
          token = data.getIdToken().getJwtToken();
        })
        .catch((err) => {
          NotificationManager.error(err.message, "Error", 5000, () => {});
          return;
        });

      if (!token) return;
      setLoading(true);
      await axios
        .get(
          "https://devapi.trevi.io/accounts",
          // "https://cors-anywhere.herokuapp.com/https://devapi.trevi.io/accounts",
          {
            headers: {
              authorizer: token,
            },
          }
        )
        .then((response) => {
          if (response.data.length === 0) setFirstConnect(true);
          console.log(response.data);
          setConnectedAccounts(response.data);
        })
        .catch((err) => {
          console.log(err);
          NotificationManager.error(err.message, "Error", 5000, () => {});
        });
      setLoading(false);
    };
    getConnectedAccounts();
  }, [setLoading]);

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
    await axios
      .get(
        "https://devapi.trevi.io/addAccount",
        // `https://cors-anywhere.herokuapp.com/https://devapi.trevi.io/addAccount?source=${name}`,
        {
          params: {
            source: name,
          },
          headers: {
            authorizer: token,
          },
        }
      )
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
      <Header handleSignOut={handleSignOut}></Header>
      <StyledLogo>
        <img src={LOGO} alt="Logo"></img>
      </StyledLogo>
      <SearchBar></SearchBar>
      <ConnectedAccounts
        connectedAccounts={connectedAccounts}
        showAddAccount={showAddAccount}
      ></ConnectedAccounts>

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
        <AddAccounts
          handleAddAccount={handleAddAccount}
          connectedAccounts={connectedAccounts}
        ></AddAccounts>
      </Modal>
    </MainPageContainer>
  );
};

export default Mainpage;
