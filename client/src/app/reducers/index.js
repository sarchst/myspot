import { combineReducers } from "redux";

import toggleSidebar from "./toggleSidebar";
import isLoggedIn from "./isLoggedIn";
import username from "./username";
import feed from "./feed";
import settings from "./settings";
import posts from "./posts";
import spotifyWebApi from "./spotifyWebApi";
import fetchFeed from "./fetchFeed";
import fetchPosts from "./fetchPosts";
import spotifyApiUserMe from "./spotifyApiUserMe";
// import selectedContentPage from "./selectedContentPage";

const allReducers = combineReducers({
  isSidebarOpen: toggleSidebar,
  isLoggedIn: isLoggedIn,
  username: username,
  feed: feed,
  accountSettings: settings,
  spotifyWebApi: spotifyWebApi,
  fetchFeed: fetchFeed,
  fetchPosts: fetchPosts,
  posts: posts,
  spotifyApiUserMe: spotifyApiUserMe,
  // selectedContentPage: selectedContentPage,
});

export default allReducers;
