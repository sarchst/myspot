import { SPOTIFY_WEB_API } from "../actions/spotifyApiActions";
// import { SPOTIFY_USER_ME } from "../actions/spotifyApiActions";

const initialState = {
  accessToken: "",
  refreshToken: "",
  user: {},
};

export const spotifyWebApi = (state = initialState, action) => {
  switch (action.type) {
    case SPOTIFY_WEB_API:
      return {
        ...state,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
      };
    // case SPOTIFY_USER_ME:
    //   return {
    //     ...state,
    //     user: action.payload,
    //   };
    default:
      return state;
  }
};

export default spotifyWebApi;
