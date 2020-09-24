import * as types from "../constants";

const initialState = {
  showAddAccount: false,
  signupemail: "",
  signuppassword: "",
  firstConnect: false,
  loggedin: false,
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_FIRSTCONNECT:
      return { ...state, firstConnect: actions.payload };
    case types.SET_SIGNUPEMAIL:
      return { ...state, signupemail: actions.payload };
    case types.SET_SIGNUPPASSWORD:
      return { ...state, signuppassword: actions.payload };
    case types.SET_SHOWADDACCOUNT:
      return { ...state, showAddAccount: actions.payload };
    default:
      return state;
  }
}
