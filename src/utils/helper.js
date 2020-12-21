import { Auth } from "aws-amplify";
import request from "./request";
import ReactGA from "react-ga";
import Bugsnag from "@bugsnag/js";

export const getAuth = () => {
  const auth = localStorage.getItem("auth");
  return typeof auth === "string" ? JSON.parse(auth) : false;
};

export const setAuth = async (dataAuth) => {
  localStorage.setItem("auth", JSON.stringify(dataAuth));
};

export const getParam = (name, search) => {
  if (!name || !search) return "";
  const urlParams = new URLSearchParams(search);
  return urlParams.get(name);
};

export const signIn = async (email, password) => {
  try {
    let cognitoUser = await Auth.signIn(email, password);
    let token = cognitoUser.signInUserSession.idToken.jwtToken;
    document.cookie = "app_login=1;domain=trevi.io;";
    await setAuth(true);
    await request().put("/user", null, {
      headers: { authorizer: token },
    });
    return true;
  } catch (err) {
    return err.message;
  }
};

export const gaEvent = (category, action, value, label) => {
  ReactGA.event({
    category: category,
    action: action,
    value: value,
    label: label,
  });
};

export const bugReport = (e) => {
  Bugsnag.notify(e);
};
