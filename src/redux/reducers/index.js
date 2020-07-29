import { combineReducers } from "redux";

import search from "./search";
import account from "./account";

export default combineReducers({
  search,
  account,
});
