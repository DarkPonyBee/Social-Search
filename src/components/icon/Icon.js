import React from "react";
import styled from "styled-components";

import { availableIcons } from "../../config";
import ConfirmAction from "../accounts/ConfirmAction";

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 5px 5px 30px;
  .icon-indexed {
    display: ${(props) =>
      props.state === "active"
        ? "none"
        : props.state === "pause"
        ? "block"
        : ""};
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: fit-content;
    padding: 2px 10px;
    font-size: 9px;
    letter-spacing: -0.2px;
    line-height: 11px;
    text-align: center;
    color: #ffffff;
    background-color: rgba(79, 79, 196, 0.82);
    border-radius: 7px;
  }
  .icon-container {
    position: relative;
    display: flex;
    border-radius: 100%;
    height: 68px;
    width: 68px;
    border: 1px solid #f0f0f0;
    background-color: #ffffff;
    box-shadow: 0 0 13px -5px rgba(0, 0, 0, 0.1);
    margin: auto;
    transition: all linear 0.1s;
    img {
      margin: auto;
      max-width: 42px;
      ${(props) => (props.state === "pause" ? "opacity: 0.36;" : "")};
      &:hover {
        cursor: pointer;
      }
    }
    &-delete {
      display: none;
      position: absolute;
      bottom: -5px;
      left: -25px;
      width: 15px;
      height: 15px;
      background-color: #e60622;
      border-radius: 50%;
      color: #ffffff;
    }
    &-pause {
      display: none;
      position: absolute;
      bottom: -5px;
      right: -25px;
      width: 15px;
      height: 15px;
      background-color: rgba(1, 1, 3, 0.72);
      border-radius: 50%;
      color: #ffffff;
    }
    &-active {
      display: none;
      position: absolute;
      bottom: -5px;
      right: -25px;
      width: 15px;
      height: 15px;
      background-color: #4fc47f;
      border-radius: 50%;
      color: #ffffff;
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
    .icon-indexed {
      display: block;
    }
    .icon-container {
      ${(props) =>
        props.state === "active"
          ? "border: 5px solid transparent !important;"
          : props.state === "pause"
          ? "border: 5px solid #f0f0f0 !important;"
          : ""};
      background: linear-gradient(
          45deg,
          #ffffff 0%,
          #ffffff 28.97%,
          #ffffff 100%,
          #ffffff 100%
        ),
        conic-gradient(red 0%, blue 89%, #f0f0f0 89%, #f0f0f0 100%) 50% 50% /
          100% 100% no-repeat;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      ${(props) => (props.state === "pause" ? "background: none;" : "")};
      &-delete,
      &-pause,
      &-active {
        display: flex;
      }
    }
  }
`;

const Icon = ({ data }) => {
  const accountState = data.account_state;
  const accountId = data.id;
  console.log(accountState.is_syncing);
  return (
    <StyledContainer state={accountState.state}>
      <div className="icon-indexed">
        {accountState.state === "active"
          ? accountState.number_of_documents + " items indexed"
          : accountState.state === "pause"
          ? "Paused"
          : ""}
      </div>
      <div className="icon-container">
        <img src={availableIcons[data.source]} alt={data.name}></img>
        <div className="icon-container-delete">
          <ConfirmAction icon="trash" accountId={accountId}></ConfirmAction>
        </div>
        {accountState.state === "active" ? (
          <div className="icon-container-pause">
            <ConfirmAction icon="pause" accountId={accountId}></ConfirmAction>
          </div>
        ) : accountState.state === "pause" ? (
          <div className="icon-container-active">
            <ConfirmAction icon="active" accountId={accountId}></ConfirmAction>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="icon-name">
        <p>{data.name}</p>
      </div>
    </StyledContainer>
  );
};

export default Icon;
