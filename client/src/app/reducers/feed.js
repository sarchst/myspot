import {
  TOGGLE_LIKE,
  ADD_POSTS_TO_FEED,
  COMBINE_P_POSTS_WITH_FEED,
} from "../actions/feedActions";

const initialState = {
  activity: true,
  posts: [],
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LIKE:
      let newUsersLiked = [...action.payload.usersLiked];
      if (action.payload.usersLiked.includes(action.payload.userId)) {
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
          post.id === action.payload.post.id
            ? { ...post, usersLiked: newUsersLiked }
            : post
        ),
      };
    case "NEW_POST":
      return [
        ...state,
        {
          id: action.payload.id,
          userID: action.payload.userID,
          username: action.payload.username,
          content: action.payload.content,
          title: action.payload.title,
          type: action.payload.type,
          usersLiked: action.payload.usersLiked,
        },
      ];
    case ADD_POSTS_TO_FEED:
      return {
        ...state,
        // posts: [...state.posts, ...action.payload],
        posts: action.payload,
      };
    // TODO: need to find the best way to combine personal and other users posts and then rendering
    case COMBINE_P_POSTS_WITH_FEED:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    default:
      return state;
  }
};

export default feed;
