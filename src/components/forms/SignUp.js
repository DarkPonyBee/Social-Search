import React, { useState, createRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { isEmail } from "validator";
import ReCAPTCHA from "react-google-recaptcha";
import { NotificationManager } from "react-notifications";
import { Auth } from "aws-amplify";

import { TreviContext } from "../../utils/context";
import { availableIcons, recaptchaKey, passcode } from "../../config";

const StyledSignUp = styled.div`
  width: 900px;
  .signup-title {
    color: #2d2e2c;
    font-size: 32px;
    letter-spacing: 0;
    line-height: 39px;
    text-align: center;
    padding: 25px;
  }
  .signup-content {
    display: flex;
    &-left,
    &-right {
      width: 50%;
    }
    &-left {
      padding: 50px 32px;
      border-radius: 0 8px 0 10px;
      background: linear-gradient(
        45deg,
        #f6f7fe 0%,
        #f6f8fe 28.97%,
        #f2f4fe 100%,
        #f2f4fe 100%
      );
      &-header {
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 20px;
        margin-bottom: 30px;
        color: #2d2e2c;
      }
      &-up {
        &-item {
          ion-icon {
            margin: auto 10px auto 0px;
            color: #4f4fc4;
          }
          display: flex;
          font-size: 16px;
          letter-spacing: -0.4px;
          color: #575856;
          margin-bottom: 20px;
        }
      }
      &-down {
        display: flex;
        flex-wrap: wrap;
        padding-right: 120px;
        &-item {
          display: flex;
          padding: 0px 20px 20px 0px;
          color: #575856;
          align-items: flex-end;
          img {
            margin: auto;
            width: 35px;
          }
        }
      }
    }
    &-right {
      display: flex;
      flex-direction: column;
      padding: 0px 40px 40px;
      &-header {
        color: #4f4fc4;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 0;
        line-height: 24px;
        margin-bottom: 27px;
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
        .check-item {
          font-family: Graphik;
          margin-bottom: 27px;
          &-container {
            display: flex;
            color: #575856;
            font-size: 13px;
            justify-content: center;
            input {
              margin-top: auto;
              margin-bottom: auto;
              margin-right: 10px;
              &:hover {
                cursor: pointer;
              }
            }
            div {
              display: flex;
              p {
                margin: auto;
                a {
                  color: #575856;
                  text-decoration: underline;
                  &:hover {
                    cursor: pointer;
                    color: blue;
                  }
                }
              }
            }
          }
          &-error {
            text-align: center;
            color: #f24040;
            font-size: 11px;
            padding: 3px 24px;
          }
        }
        .recaptcha-item {
          display: flex;
          flex-direction: column;
          margin-bottom: 27px;
          &-desktop {
            margin: auto;
            iframe {
              border: 1px solid #d6d6d6;
              border-radius: 12px;
            }
            @media only screen and (max-width: 400px) {
              display: none;
            }
          }
          &-mobile {
            display: none;
            margin: auto;
            @media only screen and (max-width: 400px) {
              display: block;
            }
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
          /* input { */
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
      .login-item {
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
  }
  @media only screen and (max-width: 940px) {
    width: 100%;
    .signup-content-left {
      width: 30%;
    }
    .signup-content-right {
      width: 70%;
    }
    .signup-content-left-down {
      padding-right: 0px;
    }
  }
  @media only screen and (max-width: 630px) {
    .signup-content-left {
      display: none;
    }
    .signup-content-right {
      width: 100%;
    }
    .signup-content-right-header {
      text-align: center;
    }
    .signup-title {
      padding: 15px;
    }
    .signup-content-right {
      padding: 0px 20px 20px;
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const drecaptchaRef = createRef();
  const mrecaptchaRef = createRef();

  const FORM_DATA_ITEMS = {
    passcode: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
    captcha: false,
  };

  const [error, setError] = React.useState({});
  const [form, setForm] = useState(FORM_DATA_ITEMS);
  const [formerror, setFormError] = useState("");
  const { setLoading } = useContext(TreviContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTermsChange = () => {
    setForm({ ...form, terms: !form.terms });
    setError({ ...error, terms: "" });
  };

  const handleFocus = (e) => {
    setError({
      ...error,
      [e.target.name]: "",
    });
    setFormError("");
  };

  const handleCaptcha = (e) => {
    setForm({ ...form, captcha: true });
  };

  const validate = () => {
    const errorState = {};
    if (form.passcode !== passcode)
      errorState.passcode = "Please enter a valid Sign-Up Code";
    if (!isEmail(form.email))
      errorState.email = "Please enter a valid e-mail address";
    if (form.password.length < 6)
      errorState.password = "Password must be at least 6 Char long";
    if (form.password !== form.confirmPassword)
      errorState.confirmPassword =
        "Confirm Password must be same with Password";
    if (form.confirmPassword.length === 0)
      errorState.confirmPassword = "Password must be at least 6 Char long";
    if (!form.terms) errorState.terms = "You must read and confirm the T&A";
    if (!form.captcha) errorState.captcha = "Are you Robot?";
    return errorState;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorState = validate();
    setForm({ ...form, captcha: false });
    if (Object.keys(errorState).length > 0) {
      drecaptchaRef.current.reset();
      mrecaptchaRef.current.reset();
      return setError(errorState);
    }
    setLoading(true);
    try {
      await Auth.signUp({
        username: form.email,
        password: form.password,
      });
      history.push("/confirm-signup");
    } catch (err) {
      drecaptchaRef.current.reset();
      mrecaptchaRef.current.reset();
      setFormError(err.message);
      NotificationManager.error(err.message, "Error", 5000, () => {});
    }
    setLoading(false);
  };

  return (
    <StyledSignUp>
      <div className="signup-title">Get Started with a free Trevi account</div>
      <div className="signup-content">
        <div className="signup-content-left">
          <div className="signup-content-left-header">
            Trevi helps you easily find what you need:
          </div>
          <div className="signup-content-left-up">
            <div className="signup-content-left-up-item">
              <ion-icon name="document-outline"></ion-icon>Files
            </div>
            <div className="signup-content-left-up-item">
              <ion-icon name="mail-outline"></ion-icon>E-mails
            </div>
            <div className="signup-content-left-up-item">
              <ion-icon name="chatbox-ellipses-outline"></ion-icon>Text messages
            </div>
            <div className="signup-content-left-up-item">
              <ion-icon name="folder-outline"></ion-icon>Folders
            </div>
            <div className="signup-content-left-up-item">...and more</div>
          </div>
          <div className="signup-content-left-header">
            Across all your accounts:
          </div>
          <div className="signup-content-left-down">
            <div className="signup-content-left-down-item">
              <img src={availableIcons.gmail} alt="Gmail"></img>
            </div>
            <div className="signup-content-left-down-item">
              <img src={availableIcons.slack} alt="Slack"></img>
            </div>
            <div className="signup-content-left-down-item">
              <img src={availableIcons.dropbox} alt="Dropbox"></img>
            </div>
            <div className="signup-content-left-down-item">
              <img src={availableIcons.teams} alt="Teams"></img>
            </div>
            <div className="signup-content-left-down-item">
              <img src={availableIcons.outlook} alt="Outlook"></img>
            </div>
            <div className="signup-content-left-down-item">
              <img src={availableIcons.gdrive} alt="Google Drive"></img>
            </div>
            <div className="signup-content-left-down-item">
              ...and many more!
            </div>
          </div>
        </div>
        <div className="signup-content-right">
          <div className="signup-content-right-header">Sign Up</div>
          <form autoComplete={"off"}>
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
                // autoComplete={"off"}
              ></input>
              {error.email && (
                <div className="input-item-error">{error.email}</div>
              )}
            </div>
            <div className="input-item">
              {form.password && (
                <div className="input-item-header">Password</div>
              )}
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
                // autoComplete={"off"}
              ></input>
              {error.password && (
                <div className="input-item-error">{error.password}</div>
              )}
            </div>
            <div className="input-item">
              {form.confirmPassword && (
                <div className="input-item-header">Confirm Password</div>
              )}
              <input
                className={
                  error.confirmPassword
                    ? "input-item-error-border"
                    : form.confirmPassword
                    ? "input-item-active"
                    : ""
                }
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
                onFocus={handleFocus}
                value={form.confirmPassword}
                // autoComplete={"off"}
              ></input>
              {error.confirmPassword && (
                <div className="input-item-error">{error.confirmPassword}</div>
              )}
            </div>
            <div className="input-item">
              {form.passcode && (
                <div className="input-item-header">Sign-Up Code</div>
              )}
              <input
                className={
                  error.passcode
                    ? "input-item-error-border"
                    : form.passcode
                    ? "input-item-active"
                    : ""
                }
                name="passcode"
                type="text"
                placeholder="Sign-Up Code"
                onChange={handleChange}
                onFocus={handleFocus}
                value={form.passcode}
                // autoComplete={"off"}
              ></input>
              {error.passcode && (
                <div className="input-item-error">{error.passcode}</div>
              )}
            </div>
            <div className="check-item">
              <div className="check-item-container">
                <input
                  name="terms"
                  type="checkbox"
                  onChange={handleTermsChange}
                  defaultChecked={form.terms}
                ></input>
                <div>
                  <p>
                    I accept the Trevi <a href="/">terms & conditions</a>
                  </p>
                </div>
              </div>
              {error.terms && (
                <div className="check-item-error">{error.terms}</div>
              )}
            </div>
            <div className="recaptcha-item">
              <div className="recaptcha-item-desktop">
                <ReCAPTCHA
                  ref={drecaptchaRef}
                  onChange={handleCaptcha}
                  sitekey={recaptchaKey}
                ></ReCAPTCHA>
              </div>
              <div className="recaptcha-item-mobile">
                <ReCAPTCHA
                  ref={mrecaptchaRef}
                  onChange={handleCaptcha}
                  sitekey={recaptchaKey}
                  size="compact"
                ></ReCAPTCHA>
              </div>
            </div>
            <div className="form-error">{formerror}</div>
            <div className="submit-item" onClick={handleSubmit}>
              Sign Up
            </div>
          </form>
          <div className="login-item">
            Already have an account?
            <Link to="/login">
              <div className="login-item-button">Log in</div>
            </Link>
          </div>
        </div>
      </div>
    </StyledSignUp>
  );
};

export default SignUp;
