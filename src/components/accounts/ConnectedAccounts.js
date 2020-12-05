import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

import Icon from "../icon/Icon";
import ADDICON from "../../assets/images/accouts-add-icon.svg";
import { setShowAddAccount } from "../../redux/actions/global";

const AccountsContainer = styled.div`
  position: relative;
  background: white;
  border-radius: 15px;
  .accounts-title {
    padding: 23px 0px;
    color: #2d2e2c;
    font-size: 25px;
    letter-spacing: 0;
    line-height: 30px;
    text-align: center;
    &-border {
      height: 1px;
      background: linear-gradient(90.27deg, #4f4fc4 0%, #ea04d0 100%);
    }
  }
  .accounts-content {
    margin-bottom: 70px;
    padding: 35px 100px;
    &-loader {
      display: flex;
      justify-content: center;
      padding-bottom: 35px;
    }
    &-container {
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
    }
    &-title {
      text-align: center;
      margin: auto;
      margin-bottom: 50px;
      color: #2d2e2c;
      font-size: 18px;
      letter-spacing: 0;
      line-height: 22px;
    }
    &-icon {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      transition: all ease-out 0.3s;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
  @media only screen and (max-width: 614px) {
    .accounts-content {
      padding: 35px;
    }
  }
  @media only screen and (max-width: 405px) {
    .accounts-content {
      padding: 35px 15px;
    }
  }
`;

const ConnnectedAccounts = () => {
  const connectedAccounts = useSelector(
    (store) => store.account.connectedAccount.result.accounts
  );
  const isLoading = useSelector(
    (store) => store.account.connectedAccount.loading
  );

  return (
    <AccountsContainer>
      <div className="accounts-title">Connected Accounts</div>
      <div className="accounts-title-border"></div>
      <div className="accounts-content">
        {isLoading && (
          <div className="accounts-content-loader">
            <ClipLoader
              size={45}
              color={"#4F4FC4"}
              loading={isLoading}
            ></ClipLoader>
          </div>
        )}
        {!isLoading && (
          <div className="accounts-content-container">
            {connectedAccounts.map((item, index) => {
              return <Icon key={index} data={item}></Icon>;
            })}
          </div>
        )}
        <div className="accounts-content-title">
          Connecting additional accounts means Trevi can find even more.
        </div>
      </div>
      <div className="accounts-content-icon">
        <img
          onClick={() => setShowAddAccount(true)}
          src={ADDICON}
          alt="Add Icon"
        ></img>
      </div>
    </AccountsContainer>
  );
};

export default ConnnectedAccounts;
