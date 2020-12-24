import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { isEmail } from "validator";
import { NotificationManager } from "react-notifications";

import { setSignupEmail, setSignupPassword } from "../../redux/actions/global";
import { TreviContext } from "../../utils/context";
import { gaEvent, signIn, bugReport } from "../../utils/helper";
import { Auth } from "aws-amplify";

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
          -webkit-appearance: none;
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
    .signup-item {
      a {
        text-decoration: none;
      }
      display: flex;
      font-size: 16px;
      justify-content: center;
      color: #4f4fc4;
      &-button {
        margin-left: 10px;
        color: #e606cf;
        &:hover {
          cursor: pointer;
          opacity: 0.8;
        }
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

const SignIn = () => {
  const history = useHistory();
  const FORM_DATA_ITEMS = {
    email: "",
    password: "",
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
    if (!isEmail(form.email))
      errorState.email = "Please enter a valid e-mail address";
    if (form.password.length === 0)
      errorState.password = "Please enter a password";
    return errorState;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    gaEvent("UserAction", "Sign In");
    const errorState = validate();
    if (Object.keys(errorState).length > 0) {
      return setError(errorState);
    }

    setLoading(true);
    let loginState = await signIn(form.email, form.password);
    if (loginState === true) history.push("/search");
    else if (loginState === "User is not confirmed.") {
      setSignupEmail(form.email);
      setSignupPassword(form.password);
      try {
        await Auth.resendSignUp(form.email);
      } catch (err) {
        NotificationManager.error(err.message, "Error", 5000, () => {});
        bugReport(err);
      }
      history.push("/confirm-signup");
    } else {
      setFormError(loginState);
      NotificationManager.error(loginState, "Error", 5000, () => {});
    }
    setLoading(false);
  };

  return (
    <StyledSignIn>
      <div className="signin-title">Welcome Back!</div>
      <div className="signin-content">
        <div className="signin-content-header">Sign In</div>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            {form.email && <div className="input-item-header">Email</div>}
            <input
              className={
                error.email
                  ? "input-item-error-border"
                  : form.email
                  ? "input-item-active"
                  : ""
              }
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              onFocus={handleFocus}
              value={form.email}
            ></input>
            {error.email && (
              <div className="input-item-error">{error.email}</div>
            )}
          </div>
          <div className="input-item">
            {form.password && <div className="input-item-header">Password</div>}
            <input
              className={
                error.password
                  ? "input-item-error-border"
                  : form.password
                  ? "input-item-active"
                  : ""
              }
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              onFocus={handleFocus}
              value={form.password}
            ></input>
            {error.password && (
              <div className="input-item-error">{error.password}</div>
            )}
          </div>
          <div className="form-error">{formerror}</div>
          <div className="submit-item">
            <input type="submit" value="Sign In"></input>
          </div>
        </form>
        <Link to="/reset-password">
          <div className="forgot-item">Forgot your password?</div>
        </Link>
        <div className="signup-item">
          {formerror ? "Do you want to confirm?" : "Don't have an account?"}
          {formerror ? (
            <Link to="/confirm-signup">
              <div className="signup-item-button">Confirm Code</div>
            </Link>
          ) : (
            <Link to="/signup">
              <div className="signup-item-button">Sign Up</div>
            </Link>
          )}
        </div>
      </div>
    </StyledSignIn>
  );
};

export default SignIn;
