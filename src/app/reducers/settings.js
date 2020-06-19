const initialState = {
  notifications: true,
  darkmode: false,
  language: "English",
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_NOTIFICATIONS":
      const newNotification = !action.payload;
      return {
        notifications: newNotification,
        darkmode: state.darkmode,
        language: state.language,
      };
    case "TOGGLE_DARKMODE":
      const newDarkmode = !action.payload;
      return {
        notifications: state.notifications,
        darkmode: newDarkmode,
        language: state.language,
      };
    case "CHANGE_LANG":
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
