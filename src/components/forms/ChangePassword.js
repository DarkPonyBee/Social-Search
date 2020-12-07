import React, { useState, useContext } from "react";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";

import { TreviContext } from "../../utils/context";
import { bugReport, gaEvent } from "../../utils/helper";

const StyledChangePassword = styled.div`
  width: 500px;
  padding: 50px 40px 40px;

  .changepassword {
    &__header {
      color: #4f4fc4;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0;
      line-height: 24px;
      margin-bottom: 27px;
      text-align: center;
    }

    &__description {
      color: #2d2e2c;
      font-size: 16px;
      letter-spacing: 0;
      line-height: 20px;
      margin-bottom: 20px;
      text-align: center;
      padding: 0px 5%;
    }
  }

  form {
    .input-item {
      font-family: Graphik;
      position: relative;
      margin-bottom: 27px;

      &-header {
        position: absolute;
        bottom: 100%;
        left: 0px;
        color: #2c2c82;
        font-size: 11px;
        padding: 3px 24px;
      }

      input {
        position: relative;
        padding: 15px 24px;
        width: 100%;
        border-radius: 23px;
        border: 0.5px solid #575856;
        color: #000000;
        font-size: 16px;
        letter-spacing: 0;
        line-height: 18px;
        outline: none;
      }

      &-active {
        border: 0.5px solid transparent !important;
        background: linear-gradient(to right, white, white),
          linear-gradient(15deg, red, blue);
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
      }

      &-error-border {
        border: 0.5px solid #f24040 !important;
      }

      &-error {
        color: #f24040;
        font-size: 11px;
        padding: 3px 24px;
      }
    }

    .form-error {
      text-align: center;
      color: #f24040;
      font-size: 11px;
      padding: 3px 24px;
    }

    .submit-item {
      margin-bottom: 27px;
      padding: 15px;
      width: 100%;
      border: none;
      border-radius: 25px;
      background: linear-gradient(225deg, #ea04d0 0%, #4f4fc4 100%);
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
      color: #ffffff;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0;
      line-height: 22px;
      text-align: center;
      outline: none;
      transition: all ease-out 0.3s;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
`;

const ChangePassword = ({ toggleModal }) => {
  const FORM_DATA_ITEMS = {
    current_password: "",
    new_password: "",
    new_verify_password: "",
  };

  const [error, setError] = React.useState({});
  const [form, setForm] = useState(FORM_DATA_ITEMS);
  const [formerror, setFormError] = useState("");
  const { setLoading } = useContext(TreviContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFocus = (e) => {
    setError({
      ...error,
      [e.target.name]: "",
    });
    setFormError("");
  };

  const validate = () => {
    const errorState = {};
    // check validate
    if (form.current_password.length < 6)
      errorState.current_password = "Password must be at least 6 characters";
    if (form.new_password.length < 6)
      errorState.new_password = "Password must be at least 6 characters";
    if (form.new_password !== form.new_verify_password)
      errorState.new_verify_password =
        "Your password and confirmation password do not match";
    if (form.new_verify_password.length < 6)
      errorState.new_verify_password = "Password must be at least 6 characters";
    return errorState;
  };

  const handleChangePassword = async () => {
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      setError(errorState);
      return;
    }
    setLoading(true);
    gaEvent("UserAction", "Change Password");
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.changePassword(user, form.current_password, form.new_password);
      toggleModal();
    } catch (err) {
      setFormError(err.message);
      NotificationManager.error(err.message, "Error", 5000, () => {});
      bugReport(err);
    }
    setLoading(false);
  };

  return (
    <StyledChangePassword>
      <div className="changepassword__header">Change Password</div>
      <div className="changepassword__description">Change password</div>
      <form>
        <div className="input-item">
          {form.current_password && (
            <div className="input-item-header">Current Password</div>
          )}
          <input
            className={
              error.current_password
                ? "input-item-error-border"
                : form.current_password
                ? "input-item-active"
                : ""
            }
            name="current_password"
            type="password"
            placeholder="Current Password"
            onChange={handleChange}
            onFocus={handleFocus}
            value={form.current_password}
            autoComplete="new-password"
          ></input>
          {error.current_password && (
            <div className="input-item-error">{error.current_password}</div>
          )}
        </div>
        <div className="input-item">
          {form.new_password && (
            <div className="input-item-header">New Password</div>
          )}
          <input
            className={
              error.new_password
                ? "input-item-error-border"
                : form.new_password
                ? "input-item-active"
                : ""
            }
            name="new_password"
            type="password"
            placeholder="New Password"
            onChange={handleChange}
            onFocus={handleFocus}
            value={form.new_password}
            autoComplete="new-password"
          ></input>
          {error.new_password && (
            <div className="input-item-error">{error.new_password}</div>
          )}
        </div>
        <div className="input-item">
          {form.new_verify_password && (
            <div className="input-item-header">Confirm Password</div>
          )}
          <input
            className={
              error.new_verify_password
                ? "input-item-error-border"
                : form.new_verify_password
                ? "input-item-active"
                : ""
            }
            name="new_verify_password"
            type="password"
            placeholder="Confirm Password"
            onChange={handleChange}
            onFocus={handleFocus}
            value={form.new_verify_password}
            autoComplete="new-password"
          ></input>
          {error.new_verify_password && (
            <div className="input-item-error">{error.new_verify_password}</div>
          )}
        </div>
        <div className="form-error">{formerror}</div>
        <div className="submit-item" onClick={handleChangePassword}>
          Change Password
        </div>
      </form>
    </StyledChangePassword>
  );
};

export default ChangePassword;
