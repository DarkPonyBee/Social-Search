import { Auth } from "aws-amplify";
import request from "./request";

export const getAuth = () => {
  const auth = localStorage.getItem("auth");
  return typeof auth === "string" ? JSON.parse(auth) : false;
};

export const setAuth = (dataAuth) => {
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
    setAuth(true);
    await request().put("/user", null, {
      headers: { authorizer: token },
    });
    return true;
  } catch (err) {
    return false;
  }
};
