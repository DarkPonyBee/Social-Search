import * as types from "../constants";

const initialState = {
  connectedAccount: {
    result: {
      accounts: [],
    },
    loading: false,
    error: {},
    isFeched: false,
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.GET_CONNECTED_ACCOUNT:
      return {
        ...state,
        connectedAccount: {
          ...state.connectedAccount,
          loading: !actions.payload,
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
          isFeched: true,
        },
      };
    case types.GET_CONNECTED_ACCOUNT_FAIL:
      return {
        ...state,
        connectedAccount: {
          ...state.connectedAccount,
          result: { accounts: [] },
          error: actions.payload,
          loading: false,
        },
      };
    default:
      return state;
  }
}
