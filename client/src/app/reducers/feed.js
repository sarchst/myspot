import {
  ADD_POSTS_TO_FEED,
  FILTER_MOST_LIKED,
  FILTER_MOST_COMMENTED,
  FILTER_NEW_TO_OLD,
  FILTER_OLD_TO_NEW,
} from "../actions/feedActions";

const initialState = {
  activity: true,
  posts: [],
  filter: "newToOld",
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    // case TOGGLE_LIKE:
    // console.log("action payload: ", action.payload);
    // let newUsersLiked = [...action.payload.post.usersLiked];
    // if (action.payload.post.usersLiked.includes(action.payload.userId)) {
    //   newUsersLiked = newUsersLiked.filter(
    //     (u) => u !== action.payload.userId
    //   );
    // } else {
    //   newUsersLiked.push(action.payload.userId);
    // }
    // return {
    //   ...state,
    //   // I don't like this, could take a long time if we have a lot of posts
    //   posts: state.posts.map((post) =>
    //     post._id === action.payload.post._id
    //       ? { ...post, usersLiked: newUsersLiked }
    //       : post
    //   ),
    // };
    case ADD_POSTS_TO_FEED:
      return {
        ...state,
        posts: action.payload,
      };
    case FILTER_NEW_TO_OLD:
      return {
        ...state,
        filter: "newToOld",
      };
    case FILTER_OLD_TO_NEW:
      return {
        ...state,
        filter: "oldToNew",
      };
    case FILTER_MOST_LIKED:
      return {
        ...state,
        filter: "mostLiked",
      };
    case FILTER_MOST_COMMENTED:
      return {
        ...state,
        filter: "mostCommented",
      };
    default:
      return state;
  }
};

export default feed;
