import axios from "axios";

export const UPDATE_SETTINGS_SUCCESS = "UPDATE_SETTINGS_SUCCESS";
export const UPDATE_SETTINGS_ERROR = "UPDATE_SETTINGS_ERROR";
export const UPDATE_SETTINGS_STARTED = "UPDATE_SETTINGS_STARTED";
export const FETCH_SETTINGS_SUCCESS = "FETCH_SETTINGS_SUCCESS";

export function updateSettingsStarted() {
  return {
    type: UPDATE_SETTINGS_STARTED,
  };
}

export function updateSettingsSuccess(settings) {
  return {
    type: UPDATE_SETTINGS_SUCCESS,
    payload: settings,
  };
}

export function updateSettingsError(error) {
  return {
    type: UPDATE_SETTINGS_ERROR,
    error: error,
  };
}

export function fetchUserSettingsSuccess(settings) {
  return {
    type: FETCH_SETTINGS_SUCCESS,
    payload: settings,
  };
}

export const fetchUserSettings = (id) => {
  return (dispatch) => {
    fetch(`/user/settings/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchUserSettingsSuccess(res.data.settings));
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const updateSettings = (settings, id) => {
  return (dispatch) => {
    dispatch(updateSettingsStarted());
    axios
      .put(`/user/settings/${id}`, settings)
      .then((res) => {
        dispatch(updateSettingsSuccess(res.data.settings));
      })
      .catch((err) => {
        dispatch(updateSettingsError(err));
      });
  };
};
