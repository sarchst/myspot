import axios from "axios";
export const TOGGLE_DARKMODE_SUCCESS = "TOGGLE_DARKMODE_SUCCESS";
export const TOGGLE_DARKMODE_ERROR = "TOGGLE_DARKMODE_ERROR";
export const TOGGLE_DARKMODE_STARTED = "TOGGLE_DARKMODE_STARTED";

export function toggleDarkmodeStarted() {
  return {
    type: TOGGLE_DARKMODE_STARTED,
  };
}

export function toggleDarkmodeSuccess() {
  return {
    type: TOGGLE_DARKMODE_SUCCESS,
  };
}

export function toggleDarkmodeError(error) {
  return {
    type: TOGGLE_DARKMODE_ERROR,
    error: error,
  };
}
export const toggleDarkmode = (settings, id) => {
  console.log("Settings from action " + settings);
  console.log("ID " + id);
  return (dispatch) => {
    dispatch(toggleDarkmodeStarted());
    console.log(settings);
    console.log("active user is " + id);
    axios
      .put(`http://localhost:9000/user/settings/${id}`, settings)
      .then((res) => {
        console.log("Update settings res: " + res);
        dispatch(toggleDarkmodeSuccess());
      })
      .catch((err) => {
        dispatch(toggleDarkmodeError(err));
      });
  };
};
