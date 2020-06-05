import {LOG_IN, LOG_OUT} from "../actions";

const initialState = false;

export const isLoggedIn = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            console.log("logging in");
            return true;
        case LOG_OUT:
            return false;
        default:
            return state;
    }

}

export default isLoggedIn;