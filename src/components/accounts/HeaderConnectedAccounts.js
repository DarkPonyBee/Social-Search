import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Icon from "../icon/Icon";
import ADDICON from "../../assets/images/accouts-add-icon.svg";

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
      justify-content: center;
      flex-wrap: wrap;
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

const HeaderConnnectedAccounts = ({ showAddAccount }) => {
  const connectedAccounts = useSelector(
    (store) => store.account.connectedAccount.result
  );

  return (
    <AccountsContainer>
      <div className="accounts-title">Connected Accounts</div>
      <div className="accounts-title-border"></div>
      <div className="accounts-content">
        <div className="accounts-content-container">
          {connectedAccounts.map((item, index) => {
            return <Icon key={index} data={item}></Icon>;
          })}
        </div>
        <div className="accounts-content-title">
          Connecting additional sources means Trevi can find even more.
        </div>
      </div>
      <div className="accounts-content-icon">
        <img
          onClick={() => showAddAccount()}
          src={ADDICON}
          alt="Add Icon"
        ></img>
      </div>
    </AccountsContainer>
  );
};

export default HeaderConnnectedAccounts;
