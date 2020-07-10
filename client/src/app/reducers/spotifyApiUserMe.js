import { SPOTIFY_USER_ME } from "../actions/spotifyApiActions";

const initialState = {};

const spotifyApiUserMe = (state = initialState, action) => {
  switch (action.type) {
    case SPOTIFY_USER_ME:
      return action.payload;
    default:
      return state;
  }
};

export default spotifyApiUserMe;
