import {
  TOGGLE_DARKMODE_STARTED,
  TOGGLE_DARKMODE_SUCCESS,
  TOGGLE_DARKMODE_ERROR,
} from "../actions/settingsActions";

const initialState = {
  pending: false,
  error: null,
};

export const updateSettings = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARKMODE_STARTED:
      return {
        ...state,
        pending: true,
      };
    case TOGGLE_DARKMODE_SUCCESS:
      return {
        ...state,
        pending: false,
      };
    case TOGGLE_DARKMODE_ERROR:
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
