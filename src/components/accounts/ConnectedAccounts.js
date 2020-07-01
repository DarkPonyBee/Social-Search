import React from "react";
import styled from "styled-components";

import Icon from "../icon/Icon";

import GMAILICON from "../../assets/images/gmail-icon.png";
import FACEBOOKICON from "../../assets/images/facebook-icon.png";
import DROPBOXICON from "../../assets/images/dropbox-icon.png";
import SLACKICON from "../../assets/images/slack-icon.svg";
import TRELLOICON from "../../assets/images/trello-icon.png";
import GOOGLEDRIVEICON from "../../assets/images/googledrive-icon.png";
import ADDICON from "../../assets/images/accouts-add-icon.svg";

const accountsList = [
  {
    name: "Ranrinat@gmail.com",
    img: GMAILICON,
  },
  {
    name: "Ranrinat@gmail.com",
    img: FACEBOOKICON,
  },
  {
    name: "Ranrinat@gmail.com",
    img: DROPBOXICON,
  },
  {
    name: "Ranrinat@gmail.com",
    img: SLACKICON,
  },
  {
    name: "Ranrinat@gmail.com",
    img: TRELLOICON,
  },
  {
    name: "Ranrinat@gmail.com",
    img: GOOGLEDRIVEICON,
  },
];

const AccountsContainer = styled.div`
  position: relative;
  margin: 95px auto auto auto;
  max-width: 1101px;
  background: white;
  border-radius: 15px;
  .accounts-title {
    padding: 23px 0px;
    color: #2d2e2c;
    font-size: 25px;
    letter-spacing: 0;
    line-height: 30px;
    text-align: center;
    p {
      margin: auto;
    }
    &-border {
      height: 0.49px;
      background: linear-gradient(90.27deg, #4f4fc4 0%, #ea04d0 100%);
    }
  }
  .accounts-content {
    padding: 35px 100px;
    &-container {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
    &-title {
      margin-top: 38px;
      margin-bottom: 50px;
      text-align: center;
      p {
        margin: auto;
        color: #2d2e2c;
        font-size: 18px;
        letter-spacing: 0;
        line-height: 22px;
      }
    }
    &-icon {
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
  @media only screen and (max-width: 1240px) {
    width: 85%;
  }
  @media only screen and (max-width: 614px) {
    .accounts-content {
      padding: 35px;
    }
  }
`;

const ConnnectedAccounts = () => {
  return (
    <AccountsContainer>
      <div className="accounts-title">
        <p>Connected Accounts</p>
      </div>
      <div className="accounts-title-border"></div>
      <div className="accounts-content">
        <div className="accounts-content-container">
          {accountsList.map((item, index) => {
            return <Icon key={index} {...item}></Icon>;
          })}
        </div>
        <div className="accounts-content-title">
          <p>Connecting additional sources means Trevi can find even more.</p>
        </div>
      </div>
      <div className="accounts-content-icon">
        <img src={ADDICON} alt="Add Icon"></img>
      </div>
    </AccountsContainer>
  );
};

export default ConnnectedAccounts;
