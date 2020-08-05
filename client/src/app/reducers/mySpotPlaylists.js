import { SET_PLAYLIST_IDS } from "../actions/playlistActions";

const initialState = { MySpotPlaylistID: "", TinderifyPlaylistID: "" };

export const mySpotPlaylists = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYLIST_IDS:
      return action.payload;
    default:
      return state;
  }
};

export default mySpotPlaylists;
