import React from "react";
import styled from "styled-components";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import Icon from "../icon/Icon";
import Provider from "../provider/Provider";

import { availableAccounts } from "../../config";
import { Auth } from "aws-amplify";

const accountsList = [];

const AddAccountsContainer = styled.div`
  padding: 55px 55px 35px;
  .accounts-title {
    color: #2d2e2c;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 29px;
    text-align: center;
  }
  .accounts-connected {
    padding: 20px 0px 30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .accounts-provider {
    border-radius: 15px;
    background: linear-gradient(
      45deg,
      #f6f7fe 0%,
      #f6f8fe 28.97%,
      #f2f4fe 100%,
      #f2f4fe 100%
    );
    &-title {
      color: #2d2e2c;
      font-size: 20px;
      letter-spacing: 0;
      line-height: 24px;
      text-align: center;
      padding: 25px 0px;
      border-bottom: 0.49px solid #4f4fc4;
    }
    &-content {
      padding: 25px 50px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      overflow: auto;
      &-item {
        display: flex;
        padding: 25px;
      }
      @media only screen and (max-width: 992px) {
        padding: 25px;
      }
      @media only screen and (max-width: 600px) {
        padding: 10px;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    padding-left: 25px;
    padding-right: 25px;
  }
`;

const AddAccounts = () => {
  const handleAddAccount = async (name) => {
    let token = null;
    await Auth.currentSession()
      .then((data) => {
        token = data.getIdToken().getJwtToken();
      })
      .catch((err) => {
        console.log(err);
        return;
      });

    axios
      .get(`https://devapi.trevi.io/addAccount?source=${name}`, {
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
        // console.log(`toolbar=no, location=no, directories=no, status=no, menubar=no,
        // scrollbars=no, resizable=no, copyhistory=no, width=${width},
        // height=${height}, left=${left}, top=${top}`);
        window.open(url, "", params);
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message, "Error", 5000, () => {});
      });
  };

  return (
    <AddAccountsContainer>
      <p className="accounts-title">Connected Accounts</p>
      <div className="accounts-connected">
        {accountsList.map((item, index) => {
          return <Icon key={index} {...item}></Icon>;
        })}
      </div>
      <div className="accounts-provider">
        <div className="accounts-provider-title">
          Select a provider to add an account
        </div>
        <div className="accounts-provider-content">
          {availableAccounts.map((item, index) => {
            return (
              <div key={index} className="accounts-provider-content-item">
                <Provider
                  {...item}
                  handleAddAccount={handleAddAccount}
                ></Provider>
              </div>
            );
          })}
        </div>
      </div>
      <NotificationContainer />
    </AddAccountsContainer>
  );
};

export default AddAccounts;
