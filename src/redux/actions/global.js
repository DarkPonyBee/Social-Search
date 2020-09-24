import * as types from "../constants";
import store from "../store";

export function setShowAddAccount(addAccount = false) {
  store.dispatch({ type: types.SET_SHOWADDACCOUNT, payload: addAccount });
}

export function setFirstConnect(firstConnect = false) {
  store.dispatch({ type: types.SET_FIRSTCONNECT, payload: firstConnect });
}

export function setSignupEmail(email = "") {
  store.dispatch({ type: types.SET_SIGNUPEMAIL, payload: email });
}

export function setSignupPassword(password = "") {
  store.dispatch({ type: types.SET_SIGNUPPASSWORD, payload: password });
}
