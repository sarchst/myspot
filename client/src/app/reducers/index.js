import { combineReducers } from "redux";

import toggleSidebar from "./toggleSidebar";
import isLoggedIn from "./isLoggedIn";
import username from "./username";
import feed from "./feed";
import settings from "./settings";
import posts from "./profile";
import spotifyWebApi from "./spotifyWebApi";
import fetchFeed from "./fetchFeed";
// import selectedContentPage from "./selectedContentPage";

const allReducers = combineReducers({
  isSidebarOpen: toggleSidebar,
  isLoggedIn: isLoggedIn,
  username: username,
  feed: feed,
  accountSettings: settings,
  posts: posts,
  spotifyWebApi: spotifyWebApi,
  fetchFeed: fetchFeed,
  // selectedContentPage: selectedContentPage,
});

export default allReducers;
