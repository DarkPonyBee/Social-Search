import { combineReducers } from "redux";

import search from "./search";
import account from "./account";
import global from "./global";

export default combineReducers({
  search,
  account,
  global,
});
