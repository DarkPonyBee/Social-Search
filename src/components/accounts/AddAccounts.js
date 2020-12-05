import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Icon from "../icon/Icon";
import Provider from "../icon/Provider";
import { availableAccounts } from "../../config";

const AddAccountsContainer = styled.div`
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
    justify-content: left;
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
      height: 410px;
      @media only screen and (max-width: 992px) {
        padding: 25px;
      }
      @media only screen and (max-width: 600px) {
        padding: 10px;
      }
    }
  }
`;

const AddAccounts = () => {
  const connectedAccounts = useSelector(
    (store) => store.account.connectedAccount.result.accounts
  );

  return (
    <AddAccountsContainer>
      <p className="accounts-title">Connected Accounts</p>
      <div className="accounts-connected">
        {connectedAccounts.map((item, index) => {
          return <Icon key={index} data={item}></Icon>;
        })}
      </div>
      <div className="accounts-provider">
        <div className="accounts-provider-title">
          Select a provider to add an account
        </div>
        <div className="accounts-provider-content">
          {availableAccounts.map((item, index) => {
            return <Provider key={index} {...item}></Provider>;
          })}
        </div>
      </div>
    </AddAccountsContainer>
  );
};

export default AddAccounts;
