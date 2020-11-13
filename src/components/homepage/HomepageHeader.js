import React from "react";
import styled from "styled-components";

import BUTTONIMG from "../../assets/images/button-img.svg";
import CONNECTIMG from "../../assets/images/icon-settings.svg";
import USERIMG from "../../assets/images/user-icon.svg";
import LOGO from "../../assets/images/logo.png";

const StyledHomepageHeader = styled.div`
  background: white;
  padding: 20px 102px;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.15);
  .header-container {
    display: flex;
    &-search {
      display: flex;
      margin: auto auto auto 0px;
      width: calc(100% - 300px);
    }
    &-buttons {
      display: flex;
      margin: auto 0px auto auto;
    }
  }
  .help-icon {
    width: 35px;
    height: 35px;
    margin: auto 20px auto 0px;
    color: #4f4fc4;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  .contact-button {
    display: flex;
    margin: auto 20px auto 0px;
    padding: 0px 15px;
    color: #ffffff;
    font-size: 15px;
    letter-spacing: 0.25px;
    line-height: 18px;
    text-align: center;
    height: 30px;
    border-radius: 15px;
    border: none;
    outline: none;
    background: linear-gradient(231.18deg, #ea04d0 0%, #4f4fc4 100%);
    img {
      width: 25px;
      margin: auto 10px auto auto;
    }
    p {
      margin: auto;
    }
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      text-decoration: none;
    }
  }
  .connect-accounts {
    position: relative;
    display: flex;
    width: 30px;
    height: 100%;
    margin: auto 20px auto 0px;
    > img {
      margin: auto;
      width: 100%;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
    &-menu {
      display: none;
      z-index: 1;
      position: absolute;
      top: calc(100% + 10px);
      right: -100px;
      border-radius: 15px;
      box-shadow: 0 0 0 1px rgba(111, 119, 130, 0.12),
        0 5px 20px 0 rgba(21, 27, 38, 0.08);
      &-active {
        display: block;
      }
    }
  }
  .user-avatar {
    display: flex;
    width: 30px;
    height: 30px;
    margin: auto 0px auto auto;
    img {
      margin: auto;
      border-radius: 50%;
      width: 100%;
    }
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  .dropdown {
    display: flex;
    > button {
      margin: auto;
      padding: 0px;
      box-shadow: none;
    }
    &-menu {
      box-shadow: 0 0 0 1px rgba(111, 119, 130, 0.12),
        0 5px 20px 0 rgba(21, 27, 38, 0.08);
    }
    &-divider {
      margin: 0px;
    }
  }
  .header-logo {
    max-width: 120px;
    max-height: 50px;
    cursor: pointer;
  }
  .header-searchbar {
    width: 100%;
    margin: auto;
  }
  .header-mobile-button {
    display: none;
    margin: auto 0px auto auto;
    position: relative;
    width: 25px;
    height: 20px;
    background: transparent;
    padding: 0;
    transition: 0.25s ease;
    &:hover {
      span {
        background: #6254e8;
      }
    }
    span {
      width: 100%;
      height: 3px;
      display: block;
      background: #082487;
      position: absolute;
      left: 0;
      transition: 0.25s ease;
      border-radius: 8px;
      transform-origin: 0;
      &:nth-child(1) {
        top: 0;
      }
      &:nth-child(2) {
        top: 50%;
      }
      &:nth-child(3) {
        top: 100%;
      }
    }
  }
  @media only screen and (max-width: 890px) {
    padding: 20px;
    .header-container {
      &-buttons {
        display: none;
      }
      &-search {
        width: calc(100% - 30px);
      }
    }
    .header-mobile-button {
      display: block;
    }
  }
`;

const HomepageHeader = () => {
  return (
    <StyledHomepageHeader>
      <div className="header-container">
        <div className="header-container-search">
          <img className="header-logo" src={LOGO} alt="Logo"></img>
        </div>
        <div className="header-container-buttons">
          <div className="contact-button">
            <img src={BUTTONIMG} alt="ButtonImg"></img>
            <p>Contact Us</p>
          </div>
          <div className="connect-accounts">
            <img src={CONNECTIMG} alt="CONNECTIMG"></img>
          </div>
          <div className="user-avatar">
            <img src={USERIMG} alt="UserAvatar"></img>
          </div>
        </div>
        <div className="header-mobile-button">
          <span />
          <span />
          <span />
        </div>
      </div>
    </StyledHomepageHeader>
  );
};

export default HomepageHeader;
