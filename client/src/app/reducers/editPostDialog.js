const initialState = { open: false, postId: "", content: "" };

export const editPostDialog = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_EDIT_POST_DIALOG":
      return {
        open: !action.payload.open,
        postId: action.payload.postId,
        postContent: action.payload.postContent,
      };
    case "CLOSE_EDIT_POST_DIALOG":
      return {
        open: false,
        postId: "",
        postContent: "",
      };
    default:
      return state;
  }
};

export default editPostDialog;
