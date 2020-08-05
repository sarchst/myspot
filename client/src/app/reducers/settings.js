import {
  UPDATE_SETTINGS_SUCCESS,
  FETCH_SETTINGS_SUCCESS,
} from "../actions/settingsActions";

const initialState = {
  notification: true,
  darkMode: true,
  language: "English",
  disableAcc: false,
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SETTINGS_SUCCESS:
      return action.payload;
    case UPDATE_SETTINGS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default settingsReducer;
