import { combineReducers } from "redux";
import posts from "./posts";

import auth from "./auth";

import attend from "./attendance";

export default combineReducers({ posts, auth, attend });
