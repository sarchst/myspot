import { combineReducers } from "redux";

import toggleSidebar from "./toggleSidebar";
import user from "./user";
import feed from "./feed";
import settings from "./settings";
import posts from "./makePost";
import spotifyApi from "./spotifyApi";
import fetchFeed from "./fetchFeed";
import fetchPosts from "./fetchPosts";
import updateSettings from "./updateSettings";
import delPostDialog from "./delPostDialog";
import editPostDialog from "./editPostDialog";

const allReducers = combineReducers({
  isSidebarOpen: toggleSidebar,
  user: user,
  feed: feed,
  accountSettings: settings,
  spotifyApi: spotifyApi,
  fetchFeed: fetchFeed,
  fetchPosts: fetchPosts,
  posts: posts,
  updateSettings: updateSettings,
  delPostDialog: delPostDialog,
  editPostDialog: editPostDialog,
});

export default allReducers;
