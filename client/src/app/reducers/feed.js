import {
  TOGGLE_LIKE,
  ADD_POSTS_TO_FEED,
} from "../actions/feedActions";

const initialState = {
  activity: true,
  posts: [],
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIKE:
      console.log("action payload: ", action.payload);
      let newUsersLiked = [...action.payload.post.usersLiked];
      if (action.payload.post.usersLiked.includes(action.payload.userId)) {
        newUsersLiked = newUsersLiked.filter(
          (u) => u !== action.payload.userId
        );
      } else {
        newUsersLiked.push(action.payload.userId);
      }
      return {
        ...state,
        // I don't like this, could take a long time if we have a lot of posts
        posts: state.posts.map((post) =>
          post._id === action.payload.post._id
            ? { ...post, usersLiked: newUsersLiked }
            : post
        ),
      };
    case ADD_POSTS_TO_FEED:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      return state;
  }
};

export default feed;
