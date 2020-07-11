import { ADD_POSTS_TO_POSTS, MAKE_POST_SUCCESS } from "../actions/postActions";

const initialState = [];

export const posts = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS_TO_POSTS:
      return action.payload;
    case MAKE_POST_SUCCESS:
      return;
    default:
      return state;
  }
};
export default posts;
