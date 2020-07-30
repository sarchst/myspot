import { ADD_POSTS_TO_POSTS, MAKE_POST_SUCCESS } from "../actions/postActions";

import {
  FILTER_P_MOST_LIKED,
  FILTER_P_MOST_COMMENTED,
  FILTER_P_NEW_TO_OLD,
  FILTER_P_OLD_TO_NEW,
} from "../actions/filterActions";

const initialState = { posts: [], filter: "newToOld" };

export const profileFeed = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS_TO_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case MAKE_POST_SUCCESS:
      return {
        ...state,
        posts: action.payload,
      };
    case FILTER_P_NEW_TO_OLD:
      return {
        ...state,
        filter: "newToOld",
      };
    case FILTER_P_OLD_TO_NEW:
      return {
        ...state,
        filter: "oldToNew",
      };
    case FILTER_P_MOST_LIKED:
      return {
        ...state,
        filter: "mostLiked",
      };
    case FILTER_P_MOST_COMMENTED:
      return {
        ...state,
        filter: "mostCommented",
      };
    default:
      return state;
  }
};
export default profileFeed;
