import { combineReducers } from "redux";

import toggleSidebar from "./toggleSidebar";
import isLoggedIn from "./isLoggedIn";
import username from "./username";
import feed from "./feed";
import settings from "./settings";
// import selectedContentPage from "./selectedContentPage";

const allReducers = combineReducers({
  isSidebarOpen: toggleSidebar,
  isLoggedIn: isLoggedIn,
  username: username,
  feed: feed,
  accountSettings: settings,
  // selectedContentPage: selectedContentPage,
});

export default allReducers;
