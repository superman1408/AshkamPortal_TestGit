import { combineReducers } from "redux";
import posts from "./posts";

import auth from "./auth";

import attend from "./attendance";

import event from "./event";

export default combineReducers({ posts, auth, attend, event });
