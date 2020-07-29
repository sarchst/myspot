export const LOG_IN = "LOG_IN";
export const TOGGLE_SIDEBAR = "TOGGLE_SIDEBAR";
export const TOGGLE_NOTIFICATIONS = "TOGGLE_NOTIFICATIONS";
export const TOGGLE_DARKMODE = "TOGGLE_DARKMODE";
export const CHANGE_LANG = "CHANGE_LANG";
export const SUBMIT_DEL_POST_DIALOG = "SUBMIT_DEL_POST_DIALOG";
export const CLOSE_DEL_POST_DIALOG = "CLOSE_DEL_POST_DIALOG";
export const SUBMIT_EDIT_POST_DIALOG = "SUBMIT_EDIT_POST_DIALOG";
export const CLOSE_EDIT_POST_DIALOG = "CLOSE_EDIT_POST_DIALOG";

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const toggleNotifications = (payload) => ({
  type: TOGGLE_NOTIFICATIONS,
  payload,
});

export const toggleDarkmode = (payload) => ({
  type: TOGGLE_DARKMODE,
  payload,
});

export const changeLang = (payload) => ({
  type: CHANGE_LANG,
  payload,
});

export const submitDeletePostDialog = (payload) => ({
  type: SUBMIT_DEL_POST_DIALOG,
  payload: payload,
});

export const closeDeletePostDialog = () => ({
  type: CLOSE_DEL_POST_DIALOG,
});

export const submitEditPostDialog = (payload) => ({
  type: SUBMIT_EDIT_POST_DIALOG,
  payload: payload,
});

export const closeEditPostDialog = () => ({
  type: CLOSE_EDIT_POST_DIALOG,
});
