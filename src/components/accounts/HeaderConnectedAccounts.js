import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Icon from "../icon/Icon";
import ADDICON from "../../assets/images/accouts-add-icon.svg";
import { setShowAddAccount } from "../../redux/actions/global";

const AccountsContainer = styled.div`
  position: relative;
  width: 430px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 0 0 1px rgba(111, 119, 130, 0.12),
    0 5px 20px 0 rgba(21, 27, 38, 0.08);
  .accounts-title {
    padding: 20px 0px;
    color: #2d2e2c;
    font-size: 18px;
    letter-spacing: 0;
    font-weight: bold;
    letter-spacing: -0.33px;
    line-height: 22px;
    text-align: center;
    &-border {
      height: 1px;
      background: #000000;
      opacity: 0.1;
    }
  }
  .accounts-content {
    padding: 35px 20px;
    &-container {
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      &-item {
        width: 33.33%;
      }
    }
    &-title {
      text-align: center;
      margin: auto;
      margin-bottom: 50px;
      color: #2d2e2c;
      font-size: 15px;
      letter-spacing: 0;
      line-height: 18px;
    }
    &-icon {
      position: absolute;
      width: 100px;
      height: 100px;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      transition: all ease-out 0.3s;
      img {
        width: 100%;
        height: 100%;
      }
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

const HeaderConnnectedAccounts = () => {
  const connectedAccounts = useSelector(
    (store) => store.account.connectedAccount.result.accounts
  );

  return (
    <AccountsContainer>
      <div className="accounts-title">Connected Accounts</div>
      <div className="accounts-title-border"></div>
      <div className="accounts-content">
        <div className="accounts-content-container">
          {connectedAccounts.map((item, index) => {
            return (
              <div key={index} className="accounts-content-container-item">
                <Icon data={item} header={true}></Icon>
              </div>
            );
          })}
        </div>
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

export default HeaderConnnectedAccounts;
