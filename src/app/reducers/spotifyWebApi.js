import {SPOTIFY_WEB_API} from "../actions";

const initialState = "";

export const spotifyWebApi = (state = initialState, action) => {
    switch (action.type) {
        case SPOTIFY_WEB_API:
            return action.payload;
        default:
            return state;
    }

}

export default spotifyWebApi;