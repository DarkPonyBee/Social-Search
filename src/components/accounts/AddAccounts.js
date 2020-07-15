import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

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

import { availableAccounts } from "../../utils/constants";
import { Auth } from "aws-amplify";

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
  const [addError, setAddError] = useState("");

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
      .get(
        `https://cors-anywhere.herokuapp.com/https://devapi.trevi.io/addAccount?source=${name}`,
        {
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
        // console.log(`toolbar=no, location=no, directories=no, status=no, menubar=no,
        // scrollbars=no, resizable=no, copyhistory=no, width=${width},
        // height=${height}, left=${left}, top=${top}`);
        window.open(url, "", params);
      })
      .catch((err) => {
        console.log(err);
        setAddError(err);
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
