import React, { useEffect, useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import BUTTONIMG from "../../assets/images/button-img.svg";
import USERIMG from "../../assets/images/user-icon.svg";
import CONNECTIMG from "../../assets/images/icon-settings.svg";
import { TreviContext } from "../../utils/context";
import LOGO from "../../assets/images/logo.png";
import SearchBar from "../searchbar/SearchBar";
import HeaderConnnectedAccounts from "../accounts/HeaderConnectedAccounts";
import { setAuth } from "../../utils/helper";

const StyledHeader = styled.div`
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

const Header = ({ resultPage = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showConnectedAccount, setShowConnectedAccount] = useState(false);
  const dropbarRef = useRef(null);
  const droplistRef = useRef(null);
  const { setLoading } = useContext(TreviContext);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser();
        setName(userInfo.username);
        setEmail(userInfo.attributes.email);
      } catch (err) {
        console.log(err);
        NotificationManager.error(err.message, "Error", 5000, () => {});
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        droplistRef.current &&
        !droplistRef.current.contains(event.target) &&
        !dropbarRef.current.contains(event.target)
      ) {
        setShowConnectedAccount(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [droplistRef, dropbarRef]);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await Auth.signOut();
      setAuth(false);
    } catch (err) {
      console.log(err);
      NotificationManager.error(err.message, "Error", 5000, () => {});
    }
    setLoading(false);
  };

  return (
    <StyledHeader>
      <div className="header-container">
        {resultPage && (
          <div className="header-container-search">
            <Link to={{ pathname: "/", state: { fromResult: true } }}>
              <img className="header-logo" src={LOGO} alt="Logo"></img>
            </Link>
            <div className="header-searchbar">
              <SearchBar resultPage={true}></SearchBar>
            </div>
          </div>
        )}
        <div className="header-container-buttons">
          {/* <ion-icon name="help-circle-outline" class="help-icon"></ion-icon> */}
          <a
            href="https://www.trevi.io/contact/"
            rel="noopener noreferrer"
            target="_blank"
            className="contact-button"
          >
            <img src={BUTTONIMG} alt="ButtonImg"></img>
            <p>Contact Us</p>
          </a>
          <div className="connect-accounts">
            <img
              ref={dropbarRef}
              src={CONNECTIMG}
              alt="CONNECTIMG"
              onClick={() => setShowConnectedAccount(!showConnectedAccount)}
            ></img>
            <div
              ref={droplistRef}
              className={`connect-accounts-menu ${
                showConnectedAccount ? "connect-accounts-menu-active" : ""
              }`}
            >
              <HeaderConnnectedAccounts></HeaderConnnectedAccounts>
            </div>
          </div>
          <UncontrolledDropdown>
            <DropdownToggle color="">
              <div className="user-avatar">
                <img src={USERIMG} alt="UserAvatar"></img>
              </div>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>{name}</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>User ID #4625556y6</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Email: {email}</DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                onClick={() => {
                  handleLogOut();
                }}
              >
                Log out
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div className="header-mobile-button">
          <span />
          <span />
          <span />
        </div>
      </div>
    </StyledHeader>
  );
};

export default Header;
