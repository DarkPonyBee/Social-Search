import React from "react";
import styled from "styled-components";

import Provider from "../icon/Provider";
import { availableAccounts } from "../../config";

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
      background: linear-gradient(
        90deg,
        rgba(0, 1, 255, 1) 0%,
        red 50%,
        #dedfe2 50%,
        #dedfe2 100%
      );
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

const FirstConnect = ({ handleAddAccount }) => {
  return (
    <FirstConnectContainer>
      <p className="firstconnect__title">
        Thanks for signing up! Now, let's add your accounts
      </p>
      <div className="firstconnect__progressbar__container">
        <ul className="firstconnect__progressbar">
          <li>
            <div className="firstconnect__progressbar__icon firstconnect__progressbar__icon--complete">
              1
            </div>
            <div className="firstconnect__progressbar__title">Register</div>
          </li>
          <li>
            <div className="firstconnect__progressbar__icon firstconnect__progressbar__icon--active">
              2
            </div>
            <div className="firstconnect__progressbar__title">Add Accounts</div>
          </li>
          <li>
            <div className="firstconnect__progressbar__icon">3</div>
            <div className="firstconnect__progressbar__title">
              Start Searching
            </div>
          </li>
        </ul>
        <div className="firstconnect__progressbar__line"></div>
      </div>
      <p className="firstconnect__description">
        <strong>Let’s sync your 1st source-account.</strong>
        <br />
        Select any of the supported services & platforms below, and connect it
        to Trevi for it to appear in your search results
      </p>
      <div className="firstconnect__provider">
        <div className="firstconnect__provider__content">
          {availableAccounts.map((item, index) => {
            return (
              <Provider
                key={index}
                {...item}
                handleAddAccount={handleAddAccount}
              ></Provider>
            );
          })}
        </div>
      </div>
    </FirstConnectContainer>
  );
};

export default FirstConnect;
