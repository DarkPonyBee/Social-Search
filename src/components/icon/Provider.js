import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  padding: 25px;
  .provider-item {
    position: relative;
    border-radius: 12px;
    border: 0.5px solid transparent !important;
    background: linear-gradient(
        45deg,
        #f6f7fe 0%,
        #f6f8fe 28.97%,
        #f2f4fe 100%,
        #f2f4fe 100%
      ),
      linear-gradient(15deg, red, blue);
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    display: flex;
    transition: all ease-out 0.3s;
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      -webkit-box-shadow: 0px 0px 15px 8px rgba(0, 0, 0, 0.29);
      -moz-box-shadow: 0px 0px 15px 8px rgba(0, 0, 0, 0.29);
      box-shadow: 0px 0px 15px 8px rgba(0, 0, 0, 0.29);
    }
  }
  .provider-container {
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 150px;
    padding: 25px 45px;
  }
  .provider-icon {
    margin: 0px auto 10px;
    display: flex;
    width: 100%;
    img {
      width: 90%;
      height: 90%;
      margin: auto;
    }
  }
  .provider-name {
    margin: auto auto 0px;
    display: flex;
    width: 100%;
    p {
      margin: auto;
      color: #132046;
      font-size: 12px;
      font-weight: bold;
      letter-spacing: 0.2px;
      line-height: 16px;
      text-align: center;
    }
  }
  .provider-addicon {
    position: absolute;
    right: 8px;
    bottom: 8px;
    text-align: center;
    color: white;
    font-weight: bold;
    height: 24px;
    width: 24px;
    border-radius: 12px;
    background: linear-gradient(180deg, #ea04d0 0%, #4f4fc4 100%);
  }
  @media only screen and (max-width: 600px) {
    padding: 10px;
  }
`;

const Provider = ({ name, icon, uiname, handleAddAccount }) => {
  return (
    <StyledContainer>
      <div
        className="provider-item"
        onClick={() => {
          handleAddAccount(name);
        }}
      >
        <div className="provider-container">
          <div className="provider-icon">
            <img src={icon} alt={uiname}></img>
          </div>
          <div className="provider-name">
            <p>{uiname}</p>
          </div>
        </div>
        <div className="provider-addicon">+</div>
      </div>
    </StyledContainer>
  );
};

export default Provider;
