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
import selectedUser from "./selectedUser";

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
  selectedUser: selectedUser,
});

export default allReducers;
