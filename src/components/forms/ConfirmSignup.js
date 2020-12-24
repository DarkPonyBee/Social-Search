import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";

import { TreviContext } from "../../utils/context";
import { setFirstConnect } from "../../redux/actions/global";
import { useSelector } from "react-redux";
import { bugReport, signIn } from "../../utils/helper";

const StyledSignIn = styled.div`
  width: 500px;
  .signin-title {
    color: #2d2e2c;
    font-size: 32px;
    letter-spacing: 0;
    line-height: 39px;
    text-align: center;
    padding: 25px;
  }
  .signin-content {
    padding: 0px 40px 40px;
    &-header {
      color: #4f4fc4;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 0;
      line-height: 24px;
      margin-bottom: 27px;
      text-align: center;
    }
    &-description {
      color: #2d2e2c;
      font-size: 16px;
      letter-spacing: 0;
      line-height: 20px;
      margin-bottom: 20px;
      text-align: center;
      padding: 0px 5%;
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
        input {
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
    }
    .forgot-item {
      margin-bottom: 27px;
      text-align: center;
      font-size: 16px;
      color: #575856;
      text-decoration: underline;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
    .resend-item {
      display: flex;
      font-size: 16px;
      justify-content: center;
      color: #e606cf;
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
  @media only screen and (max-width: 530px) {
    width: 320px;
    .signin-title {
      padding: 15px;
    }
    .signin-content {
      padding: 0px 20px 20px;
    }
  }
  @media only screen and (max-width: 370px) {
    width: 280px;
  }
`;

const ConfirmSignup = () => {
  const history = useHistory();
  const signupEmail = useSelector((store) => store.global.signupemail);
  const signupPassword = useSelector((store) => store.global.signuppassword);

  const FORM_DATA_ITEMS = {
    code: "",
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
    if (form.code.length === 0) errorState.code = "Please enter a code";
    return errorState;
  };

  const handleResend = async () => {
    try {
      await Auth.resendSignUp(signupEmail);
      setFormError(
        `An email with a code has been resent to ${signupEmail}. Please check your email`
      );
    } catch (err) {
      setFormError(err.message);
      NotificationManager.error(err.message, "Error", 5000, () => {});
      bugReport(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }
    setLoading(true);
    try {
      await Auth.confirmSignUp(signupEmail, form.code);
      setFirstConnect(true);
      let loginState = await signIn(signupEmail, signupPassword);
      if (loginState === true) history.push("/search");
    } catch (err) {
      setFormError(err.message);
      NotificationManager.error(err.message, "Error", 5000, () => {});
      bugReport(err);
    }
    setLoading(false);
  };

  return (
    <StyledSignIn>
      <div className="signin-title"></div>
      <div className="signin-content">
        <div className="signin-content-header">Confirm</div>
        <div className="signin-content-description">
          An email with a code has been sent to {signupEmail}. Please check your
          email
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            {form.code && <div className="input-item-header">Code</div>}
            <input
              className={
                error.code
                  ? "input-item-error-border"
                  : form.code
                  ? "input-item-active"
                  : ""
              }
              name="code"
              type="text"
              placeholder="Code"
              onChange={handleChange}
              onFocus={handleFocus}
              value={form.code}
            ></input>
            {error.code && <div className="input-item-error">{error.code}</div>}
          </div>
          <div className="form-error">{formerror}</div>
          <div className="submit-item">
            <input type="submit" value="Confirm"></input>
          </div>
        </form>
        <div className="resend-item" onClick={handleResend}>
          Resend code
        </div>
      </div>
    </StyledSignIn>
  );
};

export default ConfirmSignup;
