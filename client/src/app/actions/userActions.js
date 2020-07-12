export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_ACTIVE_USER = "SET_ACTIVE_USER";
export const LOG_OUT = "LOG_OUT";

export const setCurrentUser = (id, username) => ({
  type: SET_CURRENT_USER,
  id: id,
  username: username,
});

export const setActiveUser = (id, username) => ({
  type: SET_ACTIVE_USER,
  id: id,
  username: username,
});

export const logOut = () => ({
  type: LOG_OUT,
});
