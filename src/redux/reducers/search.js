import * as types from "../constants";

const initialState = {
  searchQuery: "",
  searchOrigin: 100,
  searchResult: {
    result: {},
    loading: false,
    error: {},
  },
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: actions.payload,
      };
    case types.SET_SEARCH_ORIGIN:
      return {
        ...state,
        searchOrigin: actions.payload,
      };
    case types.GET_SEARCH_RESULT:
      return {
        ...state,
        searchResult: {
          ...state.searchResult,
          loading: true,
          error: {},
        },
      };
    case types.GET_SEARCH_RESULT_SUCCEED:
      return {
        ...state,
        searchResult: {
          ...state.searchResult,
          result: actions.payload,
          loading: false,
        },
      };
    case types.GET_SEARCH_RESULT_FAIL:
      return {
        ...state,
        searchResult: {
          ...state.searchResult,
          error: actions.payload,
          loading: false,
        },
      };
    default:
      return state;
  }
}
