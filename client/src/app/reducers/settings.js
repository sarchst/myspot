// import { TOGGLE_DARKMODE, TOGGLE_NOTIFICATIONS, CHANGE_LANG } from "../actions";
import {
  UPDATE_SETTINGS_SUCCESS,
  FETCH_SETTINGS_SUCCESS,
} from "../actions/settingsActions";

const initialState = {
  notification: true,
  darkMode: false,
  language: "English",
  disableAcc: false,
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case TOGGLE_NOTIFICATIONS:
    //   const newNotification = !action.payload;
    //   return {
    //     notification: newNotification,
    //     darkMode: state.darkmode,
    //     language: state.language,
    //   };
    // case TOGGLE_DARKMODE:
    //   const newDarkmode = !action.payload;
    //   return {
    //     notification: state.notification,
    //     darkMode: newDarkmode,
    //     language: state.language,
    //   };
    // case CHANGE_LANG:
    //   return {
    //     ...state,
    //     language: action.payload,
    //   };
    case FETCH_SETTINGS_SUCCESS:
      // console.log("FETCH USERS SETTINGS SUCCCESS PAYLOAD: " + action.payload);
      return action.payload;
    case UPDATE_SETTINGS_SUCCESS:
      // console.log("UPDATE SETTINGS SUCCCESS PAYLOAD: " + action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default settingsReducer;
