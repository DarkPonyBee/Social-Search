import React from "react";
import styled from "styled-components";

import ADDICON from "../../assets/images/accouts-add-icon.svg";

const StyledHomepageAccountsContainer = styled.div`
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
    padding: 35px 100px;
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

const HomepageConnectedAccounts = () => {
  return (
    <StyledHomepageAccountsContainer>
      <div className="accounts-title">Connected Accounts</div>
      <div className="accounts-title-border"></div>
      <div className="accounts-content">
        <div className="accounts-content-title">
          Connecting additional accounts means Trevi can find even more.
        </div>
      </div>
      <div className="accounts-content-icon">
        <img src={ADDICON} alt="Add Icon"></img>
      </div>
    </StyledHomepageAccountsContainer>
  );
};

export default HomepageConnectedAccounts;
