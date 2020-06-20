export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const USERNAME = "USERNAME";
export const SPOTIFY_WEB_API = "SPOTIFY_WEB_API";

export const registerSpotifyWebApi = (spotifyWebApi) => ({
  type: SPOTIFY_WEB_API,
  payload: spotifyWebApi
});

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

let postId = 1;
export const makePost = (payload) => ({
  type: "NEW_POST",
  payload: {
    id: ++postId,
    userID: ++postId,
    username: payload.username,
    content: payload.content,
    title: payload.title,
    type: payload.type,
    usersLiked: new Set([]),
  },
});
