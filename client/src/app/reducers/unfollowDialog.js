const initialState = { open: false, username: "", userId: "" };

export const unfollowDialog = (state = initialState, action) => {
  switch (action.type) {
    case "CONFIRM_UNFOLLOW_DIALOG":
      return {
        open: !action.payload.open,
        username: action.payload.username,
        userId: action.payload.userId,
      };
    case "CLOSE_UNFOLLOW_DIALOG":
      return {
        open: false,
        username: "",
        userId: "",
      };
    default:
      return state;
  }
};

export default unfollowDialog;
