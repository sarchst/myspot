import { SPOTIFY_WEB_API } from "../actions/spotifyApiActions";

const initialState = {
  accessToken: "",
  refreshToken: "",
};

export const spotifyWebApi = (state = initialState, action) => {
  switch (action.type) {
    case SPOTIFY_WEB_API:
      return {
        ...state,
        accessToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
      };
    default:
      return state;
  }
};

export default spotifyWebApi;
