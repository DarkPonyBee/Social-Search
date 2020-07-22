import React from "react";
import styled from "styled-components";

import { availableIcons } from "../../config";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  .icon-container {
    display: flex;
    border-radius: 100%;
    height: 68px;
    width: 68px;
    border: 1px solid #f0f0f0;
    background-color: #ffffff;
    box-shadow: 0 0 13px -5px rgba(0, 0, 0, 0.1);
    margin: auto;
    img {
      margin: auto;
      max-width: 42px;
    }
  }
  .icon-name {
    margin-top: 13px;
    padding: 4px 15px;
    width: 100%;
    background-color: #ffffff;
    box-shadow: 0 0 0 0.5px rgba(21, 27, 38, 0.06);
    border-radius: 15px;
    color: #2d2e2c;
    font-size: 11px;
    letter-spacing: -0.25px;
    line-height: 13px;
    text-align: center;
    p {
      margin: auto;
    }
  }
  &:hover {
    cursor: pointer;
  }
`;

const Icon = ({ name, source }) => {
  return (
    <StyledContainer>
      <div className="icon-container">
        <img src={availableIcons[source]} alt={name}></img>
      </div>
      <div className="icon-name">
        <p>{name}</p>
      </div>
    </StyledContainer>
  );
};

export default Icon;
