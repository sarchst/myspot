export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const USERNAME = "USERNAME";

export const toggleSidebar = () => ({
  type: "TOGGLE_SIDEBAR",
});

export const logIn = () => ({
  type: LOG_IN,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const usernameSubmit = (payload) => ({
  type: USERNAME,
  username: payload,
});

// export const selectContentPage = (payload) => ({
//   type: payload,
// });

export const toggleNotifications = (payload) => ({
  type: "TOGGLE_NOTIFICATIONS",
  payload,
});

export const toggleDarkmode = (payload) => ({
  type: "TOGGLE_DARKMODE",
  payload,
});

export const changeLang = (payload) => ({
  type: "CHANGE_LANG",
  payload,
});
