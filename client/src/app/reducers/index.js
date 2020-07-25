import { combineReducers } from "redux";

import toggleSidebar from "./toggleSidebar";
import user from "./user";
import feed from "./feed";
import settings from "./settings";
import posts from "./makePost";
import spotifyWebApi from "./spotifyWebApi";
import fetchFeed from "./fetchFeed";
import fetchPosts from "./fetchPosts";
import spotifyApiUserMe from "./spotifyApiUserMe";
import updateSettings from "./updateSettings";
import delPostDialog from "./delPostDialog";
import searchResults from "./searchResults";

const allReducers = combineReducers({
  isSidebarOpen: toggleSidebar,
  user: user,
  feed: feed,
  accountSettings: settings,
  spotifyWebApi: spotifyWebApi,
  fetchFeed: fetchFeed,
  fetchPosts: fetchPosts,
  posts: posts,
  spotifyApiUserMe: spotifyApiUserMe,
  updateSettings: updateSettings,
  delPostDialog: delPostDialog,
  searchResults: searchResults,
});

export default allReducers;
