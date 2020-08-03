import { combineReducers } from "redux";

import toggleSidebar from "./toggleSidebar";
import user from "./user";
import feed from "./feed";
import settings from "./settings";
import profileFeed from "./profileFeed";
import spotifyApi from "./spotifyApi";
import fetchFeed from "./fetchFeed";
import fetchPosts from "./fetchPosts";
import updateSettings from "./updateSettings";
import delPostDialog from "./delPostDialog";
import editPostDialog from "./editPostDialog";
import unfollowDialog from "./unfollowDialog";
import selectedUser from "./selectedUser";
import mySpotPlaylists from "./mySpotPlaylists";
import searchResults from "./searchResults";

const allReducers = combineReducers({
  isSidebarOpen: toggleSidebar,
  spotifyApi: spotifyApi,
  user: user,
  feed: feed,
  profileFeed: profileFeed,
  fetchFeed: fetchFeed,
  fetchPosts: fetchPosts,
  delPostDialog: delPostDialog,
  selectedUser: selectedUser,
  mySpotPlaylists: mySpotPlaylists,
  editPostDialog: editPostDialog,
  unfollowDialog: unfollowDialog,
  accountSettings: settings,
  updateSettings: updateSettings,
  searchResults: searchResults,
});

export default allReducers;
