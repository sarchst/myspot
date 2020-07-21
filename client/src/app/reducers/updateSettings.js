import {
  UPDATE_SETTINGS_STARTED,
  UPDATE_SETTINGS_SUCCESS,
  UPDATE_SETTINGS_ERROR,
} from "../actions/settingsActions";

const initialState = {
  pending: false,
  error: null,
};

export const updateSettings = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SETTINGS_STARTED:
      return {
        ...state,
        pending: true,
      };
    case UPDATE_SETTINGS_SUCCESS:
      return {
        ...state,
        pending: false,
      };
    case UPDATE_SETTINGS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    default:
      return state;
  }
};
export default updateSettings;
