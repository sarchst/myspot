import { combineReducers } from "redux";

import toggleSidebar from "./toggleSidebar";
import isLoggedIn from "./isLoggedIn";
import username from "./username";
import selectedContentPage from "./selectedContentPage";

const allReducers = combineReducers({
  isSidebarOpen: toggleSidebar,
  isLoggedIn: isLoggedIn,
  username: username,
  selectedContentPage: selectedContentPage,
});

export default allReducers;
