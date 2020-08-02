const initialState = { open: false, username: "" };

export const unfollowDialog = (state = initialState, action) => {
  switch (action.type) {
    case "CONFIRM_UNFOLLOW_DIALOG":
      return {
        open: !action.payload.open,
        username: action.payload.username,
      };
    case "CLOSE_UNFOLLOW_DIALOG":
      return {
        open: false,
        postId: "",
      };
    default:
      return state;
  }
};

export default unfollowDialog;
