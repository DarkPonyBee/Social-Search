import React from "react";
import styled from "styled-components";

import Icon from "../icon/Icon";
import Provider from "../provider/Provider";

import GMAILICON from "../../assets/images/gmail.png";
import FACEBOOKICON from "../../assets/images/facebook.png";
import DROPBOXICON from "../../assets/images/dropbox.png";
import SLACKICON from "../../assets/images/slack.svg";
import TRELLOICON from "../../assets/images/trello.png";
import GOOGLEDRIVEICON from "../../assets/images/googledrive.png";

import ONEDRIVEICON from "../../assets/images/onedrive.png";
import GITHUBICON from "../../assets/images/github.png";
import ASANAICON from "../../assets/images/asana.png";
import JIRAICON from "../../assets/images/jira.png";
import TODOISTICON from "../../assets/images/todoist.png";
import BOXICON from "../../assets/images/box.png";
import OUTLOOKICON from "../../assets/images/outlook.png";

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

const providerList = [
  {
    name: "dropbox",
    icon: DROPBOXICON,
    uiname: "Dropbox",
  },
  {
    name: "outlook",
    icon: OUTLOOKICON,
    uiname: "Outlook",
  },
  {
    name: "box",
    icon: BOXICON,
    uiname: "Box",
  },
  {
    name: "todoist",
    icon: TODOISTICON,
    uiname: "Todoist",
  },
  {
    name: "jira",
    icon: JIRAICON,
    uiname: "Jira",
  },
  {
    name: "asana",
    icon: ASANAICON,
    uiname: "Asana",
  },
  {
    name: "github",
    icon: GITHUBICON,
    uiname: "Github",
  },
  {
    name: "onedrive",
    icon: ONEDRIVEICON,
    uiname: "Microsoft OneDrive",
  },
];

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
          {providerList.map((item, index) => {
            return (
              <div key={index} className="accounts-provider-content-item">
                <Provider {...item}></Provider>
              </div>
            );
          })}
        </div>
      </div>
    </AddAccountsContainer>
  );
};

export default AddAccounts;
