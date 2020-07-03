import {USERNAME, LOG_OUT} from "../actions";

const initialState = "";

export const username = (state = initialState, action) => {
    switch (action.type) {
        case USERNAME:
            return action.username;
        case LOG_OUT:
            return "";
        default:
            return state;
    }
}

export default username;