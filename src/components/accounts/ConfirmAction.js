import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";

import request from "../../utils/request";
import { getConnectedAccount } from "../../redux/actions/account";
import { TreviContext } from "../../utils/context";
import { availableAccounts } from "../../config";
import { gaEvent } from "../../utils/helper";

const Container = styled.div`
  position: relative;
  display: flex;
  margin: auto;

  &:hover {
    cursor: pointer;
  }

  .confirm-icon-container {
    display: flex;
    margin: auto;

    i {
      margin: auto;
      font-size: 10px;
      line-height: 10px;
    }
  }

  .confirm {
    z-index: 1;
    position: absolute;
    opacity: 0;
    max-height: 0px;
    width: 256px;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%);
    background-color: #f7f8fb;
    box-shadow: 0 1px 0 0 #f24040, 0 2px 30px 8px rgba(0, 0, 0, 0.1);
    transition: all ease-in 0.3s;
    overflow: hidden;

    &-container {
      padding: 20px;
    }

    &-active {
      opacity: 1;
      max-height: 150px;
    }

    p {
      color: #2d2e2c;
      font-size: 14px;
      letter-spacing: 0;
      line-height: 18px;
      text-align: center;
    }

    &-button-container {
      display: flex;
      justify-content: center;
    }

    &-button {
      padding: 2px 20px;
      border: 1px solid #575856;
      border-radius: 15px;
      font-size: 13px;
      color: #575856;
      letter-spacing: 0;
      line-height: 16px;
      background-color: #ffffff;
      transition: background-color ease-in 0.3s;
      &:hover {
        background-color: #f24040;
        border-color: #f24040;
        color: #ffffff;
      }
      &:first-child {
        margin-right: 10px;
      }
    }
  }
`;

const ConfirmAction = ({ icon, accountId, accountName, accountSource }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const confirmButton = useRef(null);
  const confirmModal = useRef(null);
  const { setLoading } = useContext(TreviContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        confirmModal.current &&
        !confirmModal.current.contains(event.target) &&
        !confirmButton.current.contains(event.target)
      ) {
        setShowConfirm(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [confirmButton, confirmModal]);

  const handleConfirmButton = async () => {
    let token = null;
    await Auth.currentSession()
      .then((data) => {
        token = data.getIdToken().getJwtToken();
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(err.message, "Error", 5000, () => {});
        return;
      });

    setLoading(true);
    if (icon === "trash") {
      gaEvent("Accounts", "Delete account");
      await request()
        .delete(`/accounts/${accountId}`, {
          headers: {
            authorizer: token,
          },
        })
        .then(() => getConnectedAccount(true))
        .catch((err) => {
          console.log(err);
          NotificationManager.error(err.message, "Error", 5000, () => {});
        });
    }
    setLoading(false);
  };

  const getAccountSource = () => {
    let uiName = availableAccounts.find((item) => item.name === accountSource);
    if (uiName) return uiName.uiname;
    return "";
  };

  return (
    <Container>
      <div
        className="confirm-icon-container"
        ref={confirmButton}
        onClick={(e) => {
          e.stopPropagation();
          setShowConfirm(!showConfirm);
        }}
        title="Delete account"
      >
        <i className={`fa fa-${icon === "active" ? "play" : icon}`}></i>
      </div>
      <div
        ref={confirmModal}
        className={`confirm ${showConfirm ? "confirm-active" : ""}`}
      >
        <div className="confirm-container">
          <p>
            Are you sure you want to{" "}
            {icon === "trash"
              ? "delete"
              : icon === "pause"
              ? "pause"
              : icon === "active"
              ? "active"
              : ""}{" "}
            the {getAccountSource()} account {accountName}?
          </p>
          <div className="confirm-button-container">
            <div
              className="confirm-button"
              onClick={() => {
                setShowConfirm(false);
              }}
            >
              Cancel
            </div>
            <div
              className="confirm-button"
              onClick={() => handleConfirmButton()}
            >
              {icon === "trash"
                ? "Delete"
                : icon === "pause"
                ? "Pause"
                : icon === "active"
                ? "Active"
                : ""}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ConfirmAction;
