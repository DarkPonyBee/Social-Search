import React, { useState } from "react";
import styled from "styled-components";

import { availableIcons } from "../../config";
import ConfirmAction from "../accounts/ConfirmAction";
import Truncate from "react-truncate";
import ReactTooltip from "react-tooltip";

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 5px 5px 0px;
  margin-bottom: 30px;
  .icon-indexed {
    display: ${(props) =>
      props.state === "active"
        ? "none"
        : props.state === "pause"
        ? "block"
        : ""};
    ${(props) => (props.isSyncing ? "display: block" : "")};
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
    margin: auto;
    a {
      display: flex;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 68px;
      height: 68px;
      border: 1px solid #f0f0f0;
      border-radius: 100%;
      box-shadow: 0 0 13px -5px rgba(0, 0, 0, 0.1);
      &:hover {
        box-shadow: 0 0 13px -5px rgba(0, 0, 0, 1);
      }
      img {
        width: 48px;
        height: 48px;
        ${(props) => (props.state === "pause" ? "opacity: 0.36;" : "")};
        margin: auto;
      }
    }
    &-border {
      border-radius: 100%;
      height: 68px;
      width: 68px;
      background-color: #ffffff;
      &-syncing {
        border: 5px solid transparent !important;
        background: linear-gradient(
            45deg,
            #ffffff 0%,
            #ffffff 28.97%,
            #ffffff 100%,
            #ffffff 100%
          ),
          conic-gradient(red 0%, blue 75%, #f0f0f0 75%, #f0f0f0 100%) 50% 50% /
            100% 100% no-repeat;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;

        animation-name: Rotate;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        -webkit-animation-name: Rotate;
        -webkit-animation-duration: 2s;
        -webkit-animation-iteration-count: infinite;
        -webkit-animation-timing-function: linear;
        -moz-animation-name: Rotate;
        -moz-animation-duration: 2s;
        -moz-animation-iteration-count: infinite;
        -moz-animation-timing-function: linear;
        -ms-animation-name: Rotate;
        -ms-animation-duration: 2s;
        -ms-animation-iteration-count: infinite;
        -ms-animation-timing-function: linear;
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
      &:hover {
        cursor: pointer;
        width: 18px;
        height: 18px;
      }
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
      &:hover {
        cursor: pointer;
        width: 18px;
        height: 18px;
      }
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
      &:hover {
        cursor: pointer;
        width: 18px;
        height: 18px;
      }
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
    &:hover {
      cursor: pointer;
    }
  }
  &:hover {
    .icon-indexed {
      display: block;
    }
    .icon-container {
      &-border {
        ${(props) =>
          props.state === "active" && props.isSyncing
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
          conic-gradient(red 0%, blue 75%, #f0f0f0 75%, #f0f0f0 100%) 50% 50% /
            100% 100% no-repeat;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        ${(props) =>
          props.state === "pause" || !props.isSyncing
            ? "background: none;"
            : ""};
      }
      &-delete,
      &-pause,
      &-active {
        display: flex;
      }
    }
  }
  @keyframes Rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes Rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-moz-keyframes Rotate {
    from {
      -moz-transform: rotate(0deg);
    }
    to {
      -moz-transform: rotate(360deg);
    }
  }
  @-ms-keyframes Rotate {
    from {
      -ms-transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
    }
  }
`;

const Icon = ({ data, header = false }) => {
  const [truncated, setTruncated] = useState(false);
  const accountState = data.account_state;
  const accountId = data.id;
  const accountName = data.name;
  const accountSource = data.source;
  const accountLink = data.link;

  const handleTruncate = (truncate) => {
    if (truncated !== truncate) {
      setTruncated(truncate);
    }
  };

  return (
    <StyledContainer
      state={accountState.state}
      isSyncing={accountState.is_syncing}
    >
      <div className="icon-indexed">
        {accountState.state === "active"
          ? accountState.number_of_documents + " items indexed"
          : accountState.state === "pause"
          ? "Paused"
          : ""}
      </div>
      <div className="icon-container">
        <div
          className={`icon-container-border ${
            accountState.is_syncing ? "icon-container-border-syncing" : ""
          }`}
        ></div>
        <a
          href={accountLink ? accountLink : null}
          rel="noopener noreferrer"
          target={
            accountLink
              ? !accountLink.toLowerCase().includes("trevi.io")
                ? "_blank"
                : "_self"
              : "_self"
          }
        >
          <img src={availableIcons[accountSource]} alt={accountName} />
        </a>
        <div className="icon-container-delete">
          <ConfirmAction
            icon="trash"
            accountId={accountId}
            accountName={accountName}
            accountSource={accountSource}
          ></ConfirmAction>
        </div>
        {/* ACCOUNT PAUSE ICON */}
        {/* {accountState.state === "active" ? (
          <div className="icon-container-pause">
            <ConfirmAction
              icon="pause"
              accountId={accountId}
              accountName={accountName}
              accountSource={accountSource}
            ></ConfirmAction>
          </div>
        ) : accountState.state === "pause" ? (
          <div className="icon-container-active">
            <ConfirmAction
              icon="active"
              accountId={accountId}
              accountName={accountName}
              accountSource={accountSource}
            ></ConfirmAction>
          </div>
        ) : (
          ""
        )} */}
      </div>
      <div className="icon-name">
        {header ? (
          <div data-for="accountname" data-tip={truncated ? accountName : ""}>
            <Truncate onTruncate={(truncate) => handleTruncate(truncate)}>
              {accountName}
            </Truncate>
            <ReactTooltip
              id="accountname"
              place="bottom"
              effect="solid"
              className="customToolTip"
              backgroundColor="white"
              textColor="black"
            ></ReactTooltip>
          </div>
        ) : (
          <p>{accountName}</p>
        )}
      </div>
    </StyledContainer>
  );
};

export default Icon;
