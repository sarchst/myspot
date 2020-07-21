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
  // console.log("top of fetch user settings");
  // console.log(id);
  return (dispatch) => {
    fetch(`http://localhost:9000/user/settings/${id}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        // console.log("Res " + JSON.stringify(res));
        dispatch(fetchUserSettingsSuccess(res.data.settings));
      })
      .catch((err) => {
        console.log("fetch user settings err: " + err);
        throw err;
      });
  };
};

// export const fetchUserSettings = (id) => {
//   console.log("top of fetch user settings");
//   return (dispatch) => {
//     return axios
//       .get(`http://localhost:9000/user/settings/${id}`)
//       .then((res) => {
//         console.log("Res " + JSON.stringify(res));
//         dispatch(fetchUserSettingsSuccess(res.data.settings));
//       })
//       .catch((err) => {
//         console.log("fetch user settings err: " + err);
//         throw err;
//       });
//   };
// };

export const updateSettings = (settings, id) => {
  // console.log("Settings from action " + settings);
  // console.log("ID " + id);
  return (dispatch) => {
    dispatch(updateSettingsStarted());
    // console.log("current user is " + id);
    // console.log("settings are :" + JSON.stringify(settings));
    axios
      .put(`http://localhost:9000/user/settings/${id}`, settings)
      .then((res) => {
        // console.log("Update settings response: " + JSON.stringify(res));
        // console.log("settings only: " + JSON.stringify(res.data.settings));
        dispatch(updateSettingsSuccess(res.data.settings));
      })
      .catch((err) => {
        dispatch(updateSettingsError(err));
      });
  };
};
