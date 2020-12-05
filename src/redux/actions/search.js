import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";

import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";

export function setSearchQuery(query = "") {
  store.dispatch({ payload: query, type: types.SET_SEARCH_QUERY });
}

export function setSearchOrigin(origin = 100) {
  store.dispatch({ payload: origin, type: types.SET_SEARCH_ORIGIN });
}

export async function getSearchResult(query = "", resultsCursor = 0, origin) {
  let token = null;
  try {
    let res = await Auth.currentSession();
    token = res.getIdToken().getJwtToken();
  } catch (err) {
    console.log(err);
    NotificationManager.error(err.message, "Error", 5000, () => {});
  }

  const headers = { authorizer: token };
  const params = origin
    ? { q: query, cursor: resultsCursor, origin: origin }
    : { q: query, cursor: resultsCursor };
  store.dispatch({ type: types.GET_SEARCH_RESULT });
  return request()
    .post("/search", null, { params, headers })
    .then((response) => {
      console.log(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_SEARCH_RESULT_SUCCEED,
      });
    })
    .catch(() => {
      return request()
        .post("/search", null, { params, headers })
        .then((response) => {
          console.log(response.data);
          store.dispatch({
            payload: response.data,
            type: types.GET_SEARCH_RESULT_SUCCEED,
          });
        })
        .catch((err) => {
          store.dispatch({
            payload: err.data,
            type: types.GET_SEARCH_RESULT_FAIL,
          });
          console.log(err);
          NotificationManager.error(err.message, "Error", 5000, () => {});
        });
    });
}
