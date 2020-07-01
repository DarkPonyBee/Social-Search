import React from "react";
import styled from "styled-components";

import BUTTONIMG from "../../assets/images/button-img.svg";
import USERIMG from "../../assets/images/user-avatar.png";
import CONNECTIMG from "../../assets/images/connected-img.png";

const StyledHeader = styled.div`
  background: white;
  padding: 20px 102px;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.15);
  .header-container {
    display: flex;
    justify-content: flex-end;
  }
  .help-icon {
    width: 35px;
    height: 35px;
    margin: auto 0px;
    color: #4f4fc4;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  .contact-button {
    display: flex;
    margin: auto 0px auto 25px;
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
    }
  }
  .user-avatar {
    display: flex;
    width: 30px;
    height: 30px;
    margin: auto 0px auto 25px;
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
  .connect-accounts {
    display: flex;
    width: 30px;
    height: 100%;
    margin: auto 0px auto 25px;
    img {
      margin: auto;
      width: 100%;
    }
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
  @media only screen and (max-width: 712px) {
    padding: 20px;
  }
  @media only screen and (max-width: 614px) {
    padding: 20px 10px;
    .help-icon {
      margin-left: auto;
    }
    .user-avatar {
      margin-right: auto;
    }
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="header-container">
        <ion-icon name="help-circle-outline" class="help-icon"></ion-icon>
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
    </StyledHeader>
  );
};

export default Header;
