import * as types from "../constants";

const initialState = {
  connectedAccount: {
    result: [],
    loading: false,
    error: {},
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_CONNECTED_ACCOUNT:
      return {
        ...state,
        connectedAccount: {
          ...state.connectedAccount,
          loading: true,
          error: {},
        },
      };
    case types.GET_CONNECTED_ACCOUNT_SUCCEED:
      return {
        ...state,
        connectedAccount: {
          ...state.connectedAccount,
          result: actions.payload,
          loading: false,
        },
      };
    case types.GET_CONNECTED_ACCOUNT_FAIL:
      return {
        ...state,
        connectedAccount: {
          ...state.connectedAccount,
          result: [],
          error: actions.payload,
          loading: false,
        },
      };
    default:
      return state;
  }
}
