import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Icon from "../icon/Icon";
import Provider from "../icon/Provider";
import { availableAccounts } from "../../config";
import { setFirstConnect } from "../../redux/actions/global";
import { gaEvent } from "../../utils/helper";

const FirstConnectContainer = styled.div`
  .firstconnect {
    &__title {
      color: #2d2e2c;
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 0;
      line-height: 29px;
      text-align: center;
    }
    &__progressbar__container {
      position: relative;
    }
    &__progressbar__line {
      z-index: 1;
      position: absolute;
      top: 20px;
      height: 3px;
      width: 100%;
      background: ${(props) =>
        props.addAccount
          ? "linear-gradient(90deg, rgba(0, 1, 255, 1) 0%, red 100%)"
          : "linear-gradient(90deg, rgba(0, 1, 255, 1) 0%, red 50%, #dedfe2 50%, #dedfe2 100%)"};
      border-left: 20px solid white;
      border-right: 50px solid white;
    }
    &__progressbar {
      display: flex;
      list-style: none;
      padding: 0px;
      justify-content: space-between;
      li {
        z-index: 2;
        .firstconnect__progressbar__icon {
          margin: auto;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          line-height: 34px;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #4f4fc4;
          border: 3px solid #dedfe2;
          background: white;
          &--active {
            border: 3px solid transparent;
            background: linear-gradient(
                45deg,
                #ffffff 0%,
                #ffffff 28.97%,
                #ffffff 100%,
                #ffffff 100%
              ),
              linear-gradient(15deg, red, blue);
            background-clip: padding-box, border-box;
            background-origin: padding-box, border-box;
          }
          &--complete {
            border: 3px solid #4f4fc4;
            background: #4f4fc4;
            color: white;
          }
        }
        .firstconnect__progressbar__title {
          padding-top: 8px;
          color: #141413;
          font-size: 13px;
          letter-spacing: 0;
          text-align: center;
        }
      }
    }
    &__accounts {
      display: flex;
      justify-content: center;
      margin-top: 30px;
    }
    &__buttons {
      display: flex;
      &__add {
        margin-left: auto;
        padding: 12px;
        width: 248px;
        border-radius: 25px;
        border: 0.5px solid transparent !important;
        background: linear-gradient(45deg, #ffffff 0%, #ffffff 100%),
          linear-gradient(15deg, red, blue);
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        color: #141413;
        font-size: 18px;
        font-weight: bold;
        -webkit-letter-spacing: 0;
        -moz-letter-spacing: 0;
        -ms-letter-spacing: 0;
        letter-spacing: 0;
        line-height: 22px;
        text-align: center;
        outline: none;
        -webkit-transition: all ease-out 0.3s;
        transition: all ease-out 0.3s;
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
      &__split {
        margin: auto 12px;
        height: 23px;
        width: 27px;
        color: #2d2e2c;
        font-size: 19px;
        letter-spacing: 0;
        line-height: 23px;
        text-align: center;
      }
      &__start {
        margin-right: auto;
        padding: 12px;
        width: 248px;
        border: none;
        border-radius: 25px;
        background: linear-gradient(225deg, #ea04d0 0%, #4f4fc4 100%);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
        color: #ffffff;
        font-size: 18px;
        font-weight: bold;
        -webkit-letter-spacing: 0;
        -moz-letter-spacing: 0;
        -ms-letter-spacing: 0;
        letter-spacing: 0;
        line-height: 22px;
        text-align: center;
        outline: none;
        -webkit-transition: all ease-out 0.3s;
        transition: all ease-out 0.3s;
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
      }
    }
    &__description {
      margin: 30px auto;
      max-width: 50%;
      font-size: 18px;
      color: #2d2e2c;
      text-align: center;
      @media only screen and (max-width: 992px) {
        max-width: 90%;
      }
    }
    &__provider {
      margin-top: 30px;
      border-radius: 15px;
      background: linear-gradient(
        45deg,
        #f6f7fe 0%,
        #f6f8fe 28.97%,
        #f2f4fe 100%,
        #f2f4fe 100%
      );
      &__content {
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
  }
`;

const FirstConnect = () => {
  const [showProvider, setShowProvider] = useState(false);
  const connectedAccounts = useSelector(
    (store) => store.account.connectedAccount.result.accounts
  );

  useEffect(() => {
    gaEvent("UserAction", "Onboarding");
  }, []);

  const addAccount = connectedAccounts.length === 0 ? false : true;
  const addAccountTitle =
    connectedAccounts.length <= 0
      ? "Thanks for signing up! Now, let's add your accounts."
      : connectedAccounts.length === 1
      ? "Great Job! Your first account is synching with Trevi!"
      : "Your accounts are syncing with Trevi!";

  return (
    <FirstConnectContainer addAccount={addAccount}>
      <p className="firstconnect__title">{addAccountTitle}</p>
      <div className="firstconnect__progressbar__container">
        <ul className="firstconnect__progressbar">
          <li>
            <div className="firstconnect__progressbar__icon firstconnect__progressbar__icon--complete">
              1
            </div>
            <div className="firstconnect__progressbar__title">Register</div>
          </li>
          <li>
            <div
              className={`firstconnect__progressbar__icon firstconnect__progressbar__icon--${
                addAccount ? "complete" : "active"
              }`}
            >
              2
            </div>
            <div className="firstconnect__progressbar__title">Add Accounts</div>
          </li>
          <li>
            <div
              className={`firstconnect__progressbar__icon ${
                addAccount ? "firstconnect__progressbar__icon--active" : ""
              }`}
            >
              3
            </div>
            <div className="firstconnect__progressbar__title">
              Start Searching
            </div>
          </li>
        </ul>
        <div className="firstconnect__progressbar__line"></div>
      </div>
      {addAccount && (
        <>
          <div className="firstconnect__accounts">
            {connectedAccounts.map((item, index) => {
              return <Icon key={index} data={item}></Icon>;
            })}
          </div>
          <div className="firstconnect__buttons">
            <div
              className="firstconnect__buttons__add"
              onClick={() => setShowProvider(!showProvider)}
            >
              Add another account
            </div>
            <div className="firstconnect__buttons__split">OR</div>
            <div
              className="firstconnect__buttons__start"
              onClick={() => setFirstConnect(false)}
            >
              Start Searching
            </div>
          </div>
        </>
      )}
      {!showProvider && (
        <p className="firstconnect__description">
          <strong>
            {addAccount ? "PRO TIP: " : "Let’s sync your first account."}
          </strong>
          {!addAccount && <br />}
          {addAccount
            ? "You can start searching as soon as your first account is connected and syncing. For full results, allow your accounts to fully sync."
            : "Select any of the supported services and platforms below, and connect it to Trevi for it to appear in your search results."}
        </p>
      )}
      {(!addAccount || showProvider) && (
        <div className="firstconnect__provider">
          <div className="firstconnect__provider__content">
            {availableAccounts.map((item, index) => {
              return <Provider key={index} {...item}></Provider>;
            })}
          </div>
        </div>
      )}
    </FirstConnectContainer>
  );
};

export default FirstConnect;
