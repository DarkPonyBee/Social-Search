import { Auth } from "aws-amplify";
import { NotificationManager } from "react-notifications";

import * as types from "../constants";
import request from "../../utils/request";
import store from "../store";
import { bugReport } from "../../utils/helper";

export async function getConnectedAccount(isSyncing = false) {
  let token = null;
  try {
    let res = await Auth.currentSession();
    token = res.getIdToken().getJwtToken();
  } catch (err) {
    console.log(err);
    NotificationManager.error(err.message, "Error", 5000, () => {});
    bugReport(err);
    return;
  }
  const headers = { authorizer: token };

  store.dispatch({ type: types.GET_CONNECTED_ACCOUNT, payload: isSyncing });

  return request()
    .get("/accounts?include_earliest=true", { headers })
    .then((response) => {
      console.log(response.data);
      store.dispatch({
        payload: response.data,
        type: types.GET_CONNECTED_ACCOUNT_SUCCEED,
      });
    })
    .catch(() => {
      return request()
        .get("/accounts?include_earliest=true", { headers })
        .then((response) => {
          console.log(response.data);
          store.dispatch({
            payload: response.data,
            type: types.GET_CONNECTED_ACCOUNT_SUCCEED,
          });
        })
        .catch((err) => {
          store.dispatch({
            payload: err.data,
            type: types.GET_CONNECTED_ACCOUNT_FAIL,
          });
          console.log(err);
          NotificationManager.error(
            err.message,
            "Get Connected Accounts",
            5000,
            () => {}
          );
        });
    });
}
