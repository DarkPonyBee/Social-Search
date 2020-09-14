import * as types from "../constants";
import store from "../store";

export function setLogin(loggedin = false) {
  store.dispatch({ type: types.SET_LOGIN, payload: loggedin });
}

export function setFirstConnect(firstConnect = false) {
  store.dispatch({ type: types.SET_FIRSTCONNECT, payload: firstConnect });
}

export function setSignupEmail(email = "") {
  store.dispatch({ type: types.SET_SIGNUPEMAIL, payload: email });
}
