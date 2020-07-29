const initialState = { open: false, postId: "" };

export const delPostDialog = (state = initialState, action) => {
  switch (action.type) {
    case "SUBMIT_DEL_POST_DIALOG":
      return {
        open: !action.payload.open,
        postId: action.payload.postId,
      };
    case "CLOSE_DEL_POST_DIALOG":
      return {
        open: false,
        postId: "",
      };
    default:
      return state;
  }
};

export default delPostDialog;
